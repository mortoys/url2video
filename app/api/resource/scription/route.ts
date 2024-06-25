// const url = '/v1/audio/speech/word_boundaries'

// {
//   "code": 0,
//   "msg": "string",
//   "data": {
//     "word_boundaries": [
//       {
//   "text": "这",
//   "audio_offset": 50,
//   "duration": 212,
//   "text_offset": 0,
//   "word_length": 1
// },
//     ]
//   }
// }

// import {
//   speculateFunctionName,
//   AwsRegion,
//   getRenderProgress,
// } from "@remotion/lambda/client";
// import { DISK, RAM, REGION, TIMEOUT } from "../../../../config.mjs";
import { executeGetApi } from "../../../../helpers/api-response";
import { ScriptionRequest, ScriptionResponse } from "../../../../types/schema";

// import { getDataFromUrlServer } from "../../../../request/resource";
// import { convertBlobToBase64, getAudioDuration } from '../../../../helpers/api-response'

export const GET = executeGetApi<ScriptionResponse, typeof ScriptionRequest>(
  ScriptionRequest,
  async (req, { text }) => {
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0MjA4LCJyZWdpc3Rlcl90eXBlIjoicGhvbmUiLCJhcHBfbmFtZSI6IkNoaXRDaGF0X0Nocm9tZV9FeHQiLCJ0b2tlbl9pZCI6ImQ0YTMwMzEzLWIzZGItNGMwMS04NjE5LWZlY2VkNTZjYjI1OSIsImlzcyI6ImRldi53aXNlaG9vZC5haSIsImF1ZCI6WyIiXSwiZXhwIjoxNzMxOTEyNjcyLCJuYmYiOjE3MDA4MDg2NzIsImlhdCI6MTcwMDgwODY3Mn0.afG45v6_oYxIHLGSNTl7fmWSe8c4FsH3-rm3oTBjJco`;

    var speechHeaders = new Headers();
    speechHeaders.append("Content-Type", "application/json");
    speechHeaders.append("Authorization", `Bearer ${token}`);
    // speechHeaders.append("mode", "cors");
    // speechHeaders.append("cache", "force-cache");

    var raw = JSON.stringify({
      voice: 'Xiaoxiao',
      input: text
    });

    // try {
    const response = await fetch(
      "https://dev.wisehood.ai/api/v1/audio/speech/word_boundaries",
      {
        method: "POST",
        headers: speechHeaders,
        body: raw,
        cache: 'force-cache',
        // mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json()

    if(json.code !== 0) {
      throw new Error("response data was not ok");
    }

    // console.log(json.data?.word_boundaries)

    return json.data?.word_boundaries ?? []
  }
);
