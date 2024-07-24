// export const maxDuration = 60;

import { executeApi } from "../../../../helpers/api-response";
import { SlidesRequest, SlidesResponse } from "../../../../types/schema";

import { RenderMediaOnLambdaOutput } from "@remotion/lambda/client";
// import { RenderRequest } from "../../../../types/schema";
import { z } from 'zod';
// import { slide } from "@remotion/transitions/slide";

import { AwsRegion, RenderMediaOnLambdaOutput } from "@remotion/lambda/client";
import {
  renderMediaOnLambda,
  speculateFunctionName,
} from "@remotion/lambda/client";
import { DISK, RAM, REGION, SITE_NAME, TIMEOUT } from "../../../../config.mjs";

const SlidesItem = z.object({
  type: z.string(),
  subtitle: z.string(),
  transition: z.enum(['fade', 'slide', 'wipe', 'flip', 'clockWipe', 'cube']),
  image: z.string(),
});

const SlidesRequest = z.object({
  info: z.object({
    // id: z.string(),
    width: z.number(),
    height: z.number(),
    fps: z.number(),
  }),
  slides: z.array(SlidesItem)
})

type SlidesResponse = RenderMediaOnLambdaOutput

import { getAudio} from "../audio/route"
import { getScription } from "../scription/route"

export const POST = executeApi<SlidesResponse, typeof SlidesRequest>(
  SlidesRequest,
  async (req, { info, slides }) => {

    const inputProps = await Promise.all(slides.map(
      ({ subtitle, ... slide }) => Promise.all([
        getAudio(subtitle),
        getScription(subtitle)
      ])
      .then(([base64, word_boundaries]) => {
        const last = word_boundaries[word_boundaries.length - 1]
        return {
          ... slide,
          subtitle,
          audio: base64,
          boundaries: word_boundaries,
          duration: Math.floor((last['audio_offset'] + last['duration'] / 1000) + 2)
        }
      })
    ))

    console.log('inputProps', inputProps)

    const result = await renderMediaOnLambda({
      forceWidth: info.width,
      forceHeight: info.height,
      codec: "h264",
      functionName: speculateFunctionName({
        diskSizeInMb: DISK,
        memorySizeInMb: RAM,
        timeoutInSeconds: TIMEOUT,
      }),
      region: REGION as AwsRegion,
      serveUrl: SITE_NAME,
      composition: 'MyComp',
      inputProps: { slides: inputProps },
      framesPerLambda: 120*30/8,
      downloadBehavior: {
        type: "download",
        fileName: "video.mp4",
      },
    });

    return result;
  },
);
