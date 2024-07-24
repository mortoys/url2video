import { z } from "zod";
import {
  AbsoluteFill,
  // Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate
} from "remotion";
import { CompositionProps } from "../../types/constants";
// import { NextLogo } from "./NextLogo";
// import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import React, { useEffect, useMemo } from "react";
// import { Rings } from "./Rings";
// import { TextFade } from "./TextFade";

import { Audio, Img } from "remotion";

import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { flip } from "@remotion/transitions/flip";

// loadFont();

const Subtitle = ({ text, text_offset, word_length }) => {
  const safeTextOffset = Math.min(text_offset, text.length);
  const safeWordLength = Math.min(word_length, text.length - safeTextOffset);

  return (
    <div style={{
      position: 'fixed',
      bottom: '60px',
      width: '100%',
      fontSize: '35px',
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      fontFamily: 'Inter',
      padding: '10px',
      // boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      // borderRadius: '10px'
    }}>
      {text.slice(0, safeTextOffset)}
      <strong style={{ color: '#ff5733' }}>
        {text.slice(safeTextOffset, safeTextOffset + safeWordLength)}
      </strong>
      {text.slice(safeTextOffset + safeWordLength)}
    </div>
  );
}

const ImageShift = ({ src, fps, durationInFrames }) => {

  const frame = useCurrentFrame();

  // 使用 spring 函数生成平滑的动画效果
  const factor = spring({
    fps,
    config: {
      damping: 100,
    },
    durationInFrames: 200,
    // delay: durationInFrames - 20,
    frame,
  });

  // 使用 interpolate 函数进行平移动画，可以使用同一个 spring 计算的值
  const translateX = interpolate(factor, [0, 1], [-200, 0]);
  const translateY = interpolate(factor, [0, 1], [-200, 0]);
  const scale = interpolate(factor, [0, 1], [1.8, 1]);
  const opacity = interpolate(factor, [0, 1], [0.2, 1]);

  return (
    <Img
      style={{
        // position: 'absolute',
        // marginTop: '50%',
        // top: '-50%',
        opacity: opacity,
        transform: `scale(${scale}) translateX(${translateX}px) translateY(${translateY}px)`,
      }}
      src={src}
      alt=""
    />
  );
};

export const Main = ({ slides }: z.infer<typeof CompositionProps>) => {
  // const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // const transitionStart = 2 * fps;
  // const transitionDuration = 1 * fps;

  // const logoOut = spring({
  //   fps,
  //   frame,
  //   config: {
  //     damping: 200,
  //   },
  //   durationInFrames: transitionDuration,
  //   delay: transitionStart,
  // });

  // const boundaries = useMemo(() => {

  // }, slides)

  const splitBoundaries = boundaries => {
    let word_length = 0
    const result = [{
      duration: 0,
      subtitle: '',
      groups: [],
      word_length
    }]

    for (let i = 0;i < boundaries.length;i++) {
      if ([',','.','，','。','?','!','？','！'].includes(boundaries[i].text)) {
        const lastItem = result[result.length - 1]
        lastItem.duration = lastItem.groups.reduce((acc, item) => acc + item.duration, 0)
        lastItem.subtitle = lastItem.groups.reduce((acc, item) => acc + item.text, '')
        lastItem.word_length = word_length
        word_length += lastItem.groups.reduce((acc, item) => acc + item.word_length, 1)

        result.push({
          duration: 0,
          subtitle: '',
          groups: [],
          word_length
        })
        continue
      }

      result[result.length - 1].groups.push(boundaries[i])
    }

    // console.log(result)

    return result.filter(item => item.groups.length)
  }

  return (
    <AbsoluteFill className="bg-white">
      <TransitionSeries>{
        slides.map(
            ({ duration, image, boundaries, audio }, index) => 
            <>
              <TransitionSeries.Sequence durationInFrames={fps*duration} key={duration * index}>
                <ImageShift src={image} fps={fps} durationInFrames={fps*duration} />
                <TransitionSeries>
                {
                  boundaries && splitBoundaries(boundaries)
                    // .filter(boundary => boundary.duration > 100)
                    // from={boundary.audio_offset / 1000 * fps}
                    .map(
                      ({ duration, subtitle, groups, word_length }, index) => 
                        groups.map((boundary, index2) => 
                          <TransitionSeries.Sequence
                            durationInFrames={(boundary.duration/1000 || 0.0001) * fps}
                            key={boundary.text + index*index2}>
                            <Subtitle
                              text={subtitle}
                              text_offset={boundary.text_offset - word_length}
                              word_length={boundary.word_length} />
                          </TransitionSeries.Sequence>
                        )
                    )
                }
                </TransitionSeries>
                {/* <Subtitle text={subtitle} /> */}
                { audio && <Audio src={audio} /> }
              </TransitionSeries.Sequence>
              <TransitionSeries.Transition
                presentation={
                  index % 3 === 0
                  ? slide()
                  : index % 3 === 1
                  ? fade()
                  : flip()
                }
                timing={linearTiming({ durationInFrames: 30 })}
                key={duration * index}
              />
            </>
        )
      }
      </TransitionSeries>
    </AbsoluteFill>
  );
};
