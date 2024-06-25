import { z } from "zod";
import { CompositionProps } from "./constants";

export const RenderRequest = z.object({
  id: z.string(),
  inputProps: CompositionProps,
});

export const ProgressRequest = z.object({
  bucketName: z.string(),
  id: z.string(),
});

export type ProgressResponse =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "progress";
      progress: number;
    }
  | {
      type: "done";
      url: string;
      size: number;
    };

export const SlidesRequest = z.object({
  uri: z.string(),
});

export type SlidesResponse = {
  image: string[]
  script: string[]
}

export const AudioRequest = z.object({
  text: z.string(),
});

export type AudioResponse = string

export const ScriptionRequest = z.object({
  // voice: z.string(),
  text: z.string(),
});
export type ScriptionResponse = Array<{
  audio_offset: number
  duration: number
  text: string
  text_offset: number
  word_length: number
}>