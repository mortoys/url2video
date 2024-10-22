export const maxDuration = 60;

// import {
//   speculateFunctionName,
//   AwsRegion,
//   getRenderProgress,
// } from "@remotion/lambda/client";
// import { DISK, RAM, REGION, TIMEOUT } from "../../../../config.mjs";
import { executeGetApi } from "../../../../helpers/api-response";
import { SlidesRequest, SlidesResponse } from "../../../../types/schema";

import { getDataFromUrlServer } from "../../../../request/resource"

export const GET = executeGetApi<SlidesResponse, typeof SlidesRequest>(
  SlidesRequest,
  async (req, { uri }) => {
    return await getDataFromUrlServer(uri) as unknown as Promise<{ script:string[], image:string[] }>
  },
);
