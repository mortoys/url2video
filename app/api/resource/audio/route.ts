// import {
//   speculateFunctionName,
//   AwsRegion,
//   getRenderProgress,
// } from "@remotion/lambda/client";
// import { DISK, RAM, REGION, TIMEOUT } from "../../../../config.mjs";
import { executeGetApi } from "../../../../helpers/api-response";
import { AudioRequest, AudioResponse } from "../../../../types/schema";

// import { getDataFromUrlServer } from "../../../../request/resource";
import { convertBlobToBase64 } from '../../../../helpers/api-response'

export const getAudio = async text => {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0MjA4LCJyZWdpc3Rlcl90eXBlIjoicGhvbmUiLCJhcHBfbmFtZSI6IkNoaXRDaGF0X0Nocm9tZV9FeHQiLCJ0b2tlbl9pZCI6ImQ0YTMwMzEzLWIzZGItNGMwMS04NjE5LWZlY2VkNTZjYjI1OSIsImlzcyI6ImRldi53aXNlaG9vZC5haSIsImF1ZCI6WyIiXSwiZXhwIjoxNzMxOTEyNjcyLCJuYmYiOjE3MDA4MDg2NzIsImlhdCI6MTcwMDgwODY3Mn0.afG45v6_oYxIHLGSNTl7fmWSe8c4FsH3-rm3oTBjJco`;

  var speechHeaders = new Headers();
  speechHeaders.append("Content-Type", "application/json");
  speechHeaders.append("Authorization", `Bearer ${token}`);
  // speechHeaders.append("mode", "cors");
  // speechHeaders.append("cache", "force-cache");

  var raw = JSON.stringify({
    app_name: "ChitChat_Chrome_Ext",
    app_version: "4.7.4",
    tz_name: "Asia/Shanghai",
    input: text,
    voice: "Xiaoxiao",
    scene: "text_to_video",
    scene_id: "https://pkg.go.dev/database/sqll",
  });

  // console.log(raw)

  // try {
  const response = await fetch(
    "https://dev.wisehood.ai/api/v1/audio/speech",
    {
      method: "POST",
      headers: speechHeaders,
      body: raw,
      // cache: 'force-cache',
      // mode: "cors",
    }
  );

  // console.log(response.statusText)

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const arrayBuffer = await response.arrayBuffer();

  const blob = new Blob([arrayBuffer], { type: "audio/mpeg" }); // 你可以根据实际音频的 MIME 类型进行调整

  // const base64 = await convertBlobToBase64(blob);
  // const duration = await getAudioDuration(blob);

  // console.log("Base64:", base64);
  // console.log("Duration:", duration, "seconds");

  // return { base64, duration };
  return convertBlobToBase64(blob)
}

export const GET = executeGetApi<AudioResponse, typeof AudioRequest>(
  AudioRequest,
  async (req, { text }) => await getAudio(text)
);
