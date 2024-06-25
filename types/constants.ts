import { z } from "zod";
export const COMP_NAME = "MyComp";

import { SlideSchema } from '../types/data'

export const CompositionProps = z.object({
  slides: z.array(SlideSchema),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  slides: [],
};


export const VIDEO_WIDTH = 1024;
export const VIDEO_HEIGHT = 1024;
export const VIDEO_FPS = 30;
export const DURATION_IN_FRAMES = VIDEO_FPS * 9 * 10;
