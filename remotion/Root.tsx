import { Composition } from "remotion";
import { Main } from "./MyComp/Main";
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
// import { NextLogo } from "./MyComp/NextLogo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
        // calculateMetadata={({ props: { slides } }) => {
        //   const durationInFrames = slides.reduce((sum, { duration }) => sum + duration, 0)

        //   console.log('durationInFrames', durationInFrames)
   
        //   return {
        //     durationInFrames: Math.floor(durationInFrames * VIDEO_FPS),
        //   };
        // }}
      />
    </>
  );
};
