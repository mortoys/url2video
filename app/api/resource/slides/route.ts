// import {
//   speculateFunctionName,
//   AwsRegion,
//   getRenderProgress,
// } from "@remotion/lambda/client";
// import { DISK, RAM, REGION, TIMEOUT } from "../../../../config.mjs";
import { executeApi } from "../../../../helpers/api-response";
import { SlidesRequest, SlidesResponse } from "../../../../types/schema";

import { getDataFromUrlServer } from "../../../../request/resource"

export const POST = executeApi<SlidesResponse, typeof SlidesRequest>(
  SlidesRequest,
  async (req, { uri }) => {
    return await getDataFromUrlServer(uri)
  },
);
