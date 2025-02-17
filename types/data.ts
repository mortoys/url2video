


// interface SlideBase {
//   duration: number
//   transition: 'fade' | 'slide' | 'wipe' | 'flip' | 'clockWipe' | 'cube'
//   subtitle: string
// }

// interface BlankSlide {
//   type: 'blank'
// }

// interface ImageSlide extends SlideBase {
//   type: 'image'
//   image?: string
//   // tiltShift: 
// }

// export type Slide = BlankSlide | ImageSlide

import { z } from 'zod';

const SlideBase = z.object({
  duration: z.number(),
  transition: z.enum(['fade', 'slide', 'wipe', 'flip', 'clockWipe', 'cube']),
  subtitle: z.string(),
  boundaries: z.array(
    z.object({
      audio_offset: z.number(),
      duration: z.number(),
      text: z.string(),
      text_offset: z.number(),
      word_length: z.number(),
    })
  ),
  audio: z.string(),

  type: z.string(),
  image: z.string(),
});

// const BlankSlide = SlideBase.extend({
//   type: z.literal('blank'),
// });

// const ImageSlide = SlideBase.extend({
//   type: z.literal('image'),
//   image: z.string().optional(),
// });

// export const SlideSchema = z.union([BlankSlide, ImageSlide]);

export const SlideSchema = SlideBase

export type Slide = z.infer<typeof SlideBase>

