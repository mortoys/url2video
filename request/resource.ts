// import { z } from "zod";
// import type { RenderMediaOnLambdaOutput } from "@remotion/lambda/client";
// import {
//   ProgressRequest,
//   ProgressResponse,
//   RenderRequest,
// } from "../types/schema";
// import { CompositionProps } from "../types/constants";

// import { ApiResponse } from "../helpers/api-response";
// import { convertBlobToBase64, getAudioDuration } from '../helpers/api-response'
import { AudioResponse, ScriptionResponse } from "../types/schema";

const DOMAIN = 'https://dev.wisehood.ai'

export const makeGet = async <Res>(
  endpoint: string,
  params: Record<string, string> | undefined,
  cache?: boolean,
  // options: RequestInit
): Promise<{ data: Res }> => {
  const url = endpoint + (params ? ('?' + new URLSearchParams(params).toString()) : '')
  console.log(url)

  const result = await fetch(url, 
  {
    method: 'get',
    mode: "cors",
    cache: cache ? "force-cache" : 'default',
    // ... options,
  });
  const json = (await result.json()) as { data: Res };
  // if (json.type === "error") {
  //   throw new Error(json.message);
  // }

  // console.log(json)

  return json;
};

export const makePost = async <Res>(
  endpoint: string,
  body: unknown,
): Promise<{ data: Res }> => {
  const result = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
  const json = (await result.json()) as { data: Res };
  // if (json.type === "error") {
  //   throw new Error(json.message);
  // }

  // console.log(json)

  return json;
};

export const getDataFromUrlServer = async (url: string) => {
  return makeGet<{ script:string[], image:string[] }>(DOMAIN + "/gchat/get_script", {
    uri: url
  }, true);
}

export const getDataFromUrlClient = async (url: string) => {
  return makeGet<{ script:string[], image:string[] }>("/api/resource/slides", {
    uri: url
  });
}


export const getAudio = async (text: string) => {
  return makeGet<AudioResponse>("/api/resource/audio", {
    text: text
  });
}

export const getScription = async (text: string) => {
  return makeGet<ScriptionResponse>("/api/resource/scription", {
    text: text
  }, true)
}