"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Main } from "../remotion/MyComp/Main";
import {
  CompositionProps,
  // defaultMyCompProps,
  // DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { z } from "zod";
import { RenderControls } from "../components/RenderControls";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { getDataFromUrlClient, getAudio, getScription } from "../request/resource"

import { getAudioDuration } from '../helpers/api-response'

import { Slide } from '../types/data';

import { Section } from '../components/Sections'
// import { getVideoMetadata } from "@remotion/media-utils";

const Home: NextPage = () => {
  const urlDefault = 'https://readmedium.com/data-visualization-using-color-strategically-for-impactful-storytelling-c58dbbd4694a'

  const [url, setURL] = useState<string>(urlDefault);
  // const [data, setData] = 
  const [slides, setSlides] = useState<Slide[]>([])

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    console.log('slides change', slides)

    return {
      slides,
    };
  }, [slides]);

  const durationInFrames = useMemo(() => {
    console.log('durationInFrames', slides, slides.reduce((sum, slide) => sum + slide.duration, 0))
    return Math.floor(slides.reduce((sum, slide) => sum + slide.duration, 0) * VIDEO_FPS)
  }, [slides]);

  const loading = useRef(false)

  const parseArticle = (url: string) => {
    if (loading.current) return
    loading.current = true
    getDataFromUrlClient(url)
  //   Promise.resolve({data: {
  //     "script": [
  //         "在宁静的木叶村，火影们的日常生活显得一片祥和。",
  //         "突然，死神从天而降，带来了恐怖的氛围和不可忽视的敌意。",
  //         "火影们迅速集结，准备迎战强大的敌人。",
  //         "战斗打响，火影与死神在风暴中激烈交锋。",
  //         "死神施展黑暗魔法，试图压倒火影们的力量。",
  //         "火影们合力反击，以强大的忍术和凝聚的力量与死神抗衡。",
  //         "最终，火影们以坚定信念和团队合作成功击退死神。",
  //         "木叶村重新恢复和平，阳光再次洒在每一个角落。"
  //     ],
  //     "image": [
  //         "https://oaidalleapiprodscus.blob.core.windows.net/private/org-S9EOgpzD6Ya1tbmYoQcrdQEr/user-I2hhfRpYb7jBVZHWmO4d325a/img-mDT9XIvJ7FvZ8a98TZ4Fkf7l.png?st=2024-06-25T06%3A49%3A31Z&se=2024-06-25T08%3A49%3A31Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-24T16%3A57%3A06Z&ske=2024-06-25T16%3A57%3A06Z&sks=b&skv=2023-11-03&sig=4fJfXeKhdzMUd7rjWTmnQ2NFxGkQfu6zzJqGd2z4hYE%3D",
  //         "https://oaidalleapiprodscus.blob.core.windows.net/private/org-S9EOgpzD6Ya1tbmYoQcrdQEr/user-I2hhfRpYb7jBVZHWmO4d325a/img-pBlZEFckH6zZIr6HsmXtuPmY.png?st=2024-06-25T06%3A49%3A42Z&se=2024-06-25T08%3A49%3A42Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-24T17%3A23%3A33Z&ske=2024-06-25T17%3A23%3A33Z&sks=b&skv=2023-11-03&sig=3hC%2BU95hFqc1vw7blBlJEAa2eFLf6TKlMZug6NHucR4%3D",
  //         "https://oaidalleapiprodscus.blob.core.windows.net/private/org-S9EOgpzD6Ya1tbmYoQcrdQEr/user-I2hhfRpYb7jBVZHWmO4d325a/img-R5ApQc5Bn5bA5wLADH6ngQDX.png?st=2024-06-25T06%3A49%3A52Z&se=2024-06-25T08%3A49%3A52Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-24T16%3A52%3A30Z&ske=2024-06-25T16%3A52%3A30Z&sks=b&skv=2023-11-03&sig=DEhJ3eT0XyxqI56vqmsvLLWR4HGhKRuhJDb2qje7rsY%3D",
  //         "https://oaidalleapiprodscus.blob.core.windows.net/private/org-S9EOgpzD6Ya1tbmYoQcrdQEr/user-I2hhfRpYb7jBVZHWmO4d325a/img-mGR0irN6YQzMfZo9OIWWHANm.png?st=2024-06-25T06%3A50%3A05Z&se=2024-06-25T08%3A50%3A05Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-24T17%3A00%3A37Z&ske=2024-06-25T17%3A00%3A37Z&sks=b&skv=2023-11-03&sig=odiS7tMhOyQfwiLtpG7CXU8GtdbofaKt7kE/504K6Z0%3D",
  //         "https://oaidalleapiprodscus.blob.core.windows.net/private/org-S9EOgpzD6Ya1tbmYoQcrdQEr/user-I2hhfRpYb7jBVZHWmO4d325a/img-0KSEhGScqOS8bvID8cm31B2L.png?st=2024-06-25T06%3A50%3A17Z&se=2024-06-25T08%3A50%3A17Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-24T16%3A56%3A07Z&ske=2024-06-25T16%3A56%3A07Z&sks=b&skv=2023-11-03&sig=88zUko7OWB5FKHp6AHCX2OWOkv7hNgBwdEOqSMZcFnc%3D",
  //         "https://oaidalleapiprodscus.blob.core.windows.net/private/org-S9EOgpzD6Ya1tbmYoQcrdQEr/user-I2hhfRpYb7jBVZHWmO4d325a/img-1dETcbQzWlKCD0YKWws6vBON.png?st=2024-06-25T06%3A50%3A30Z&se=2024-06-25T08%3A50%3A30Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-24T16%3A57%3A38Z&ske=2024-06-25T16%3A57%3A38Z&sks=b&skv=2023-11-03&sig=msiqXRNZJuT78T3tekiC8uG2yXmblfPUv5feJn3kNcM%3D",
  //         "https://oaidalleapiprodscus.blob.core.windows.net/private/org-S9EOgpzD6Ya1tbmYoQcrdQEr/user-I2hhfRpYb7jBVZHWmO4d325a/img-E63PROy9OMEqA85aNE2t2axJ.png?st=2024-06-25T06%3A50%3A43Z&se=2024-06-25T08%3A50%3A43Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-24T17%3A06%3A40Z&ske=2024-06-25T17%3A06%3A40Z&sks=b&skv=2023-11-03&sig=5so9ILsZ5XqyxD/xBVg6ayizgNk04uMRR0AyaWQ9Xhk%3D",
  //         "https://oaidalleapiprodscus.blob.core.windows.net/private/org-S9EOgpzD6Ya1tbmYoQcrdQEr/user-I2hhfRpYb7jBVZHWmO4d325a/img-XUKrR2tVAiwwRlTR2g0DpLvO.png?st=2024-06-25T06%3A50%3A56Z&se=2024-06-25T08%3A50%3A56Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-24T16%3A57%3A47Z&ske=2024-06-25T16%3A57%3A47Z&sks=b&skv=2023-11-03&sig=Sq2UQT2jStFk7NV2iGfOVGptgNqCaEgGyKSfg%2B3sWME%3D"
  //     ]
  // }})
    .then(({ data: { script, image } }) => {
      console.log(script, image)
      setSlides(script.map((subtitle, i) => ({
        type: 'image',
        duration: 10,
        subtitle: subtitle,
        boundaries: [],
        transition: 'fade',
        audio: undefined,
        image: image[i]
      })))
      return script
    })
    .then(script => {
      script.forEach(
        (text, index) => 
            getAudio(text)
              .then(async ({ data: base64 }) => {
                const duration = await getAudioDuration(base64)
                return { base64, duration: Math.floor(duration+2) }
              })
              .then(({ base64, duration }) => {
                setSlides(slides => {
                  console.log('audio change', index, duration)

                  slides[index].audio = `data:audio/mp3;base64,${base64}`
                  slides[index].duration = duration
                  return slides.slice()
                })
              })
              .then(() => getScription(text))
              .then(({ data: word_boundaries }) => {
                // console.log(word_boundaries)
                // word_boundaries
                setSlides(slides => {
                  console.log('word_boundaries change', index, word_boundaries)

                  slides[index].boundaries = word_boundaries
                  return slides.slice()
                })
              })
      )
    })
    .finally(() => loading.current = false)
  }

  const handleArticleParse = () => {
    parseArticle(url)
  }

  useEffect(() => {
    parseArticle(url)
  }, [])

  return (
    <div className="flex flex-col mx-auto">
    <div className="border border-unfocused-border-color p-geist rounded-geist bg-background flex flex-row items-center gap-4">
      <Input setText={setURL} text={url} />
      {/* disabled={state.status === "invoking"} */}
      {/* loading={state.status === "invoking"} */}
      <Button onClick={handleArticleParse}>Read Article</Button>
    </div>
    <div className="flex flex-row gap-5 mx-auto">
      <div className="mb-5 w-[600px]">
        <div className="overflow-hidden rounded-geist shadow-[0_0_200px_rgba(0,0,0,0.15)] mb-10 mt-16">
          <Player
            component={Main}
            inputProps={inputProps}
            // durationInFrames={DURATION_IN_FRAMES}
            durationInFrames={durationInFrames || 1}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={{
              // Can't use tailwind class for width since player's default styles take presedence over tailwind's,
              // but not over inline styles
              width: "100%",
            }}
            controls
            autoPlay
            loop
          />
        </div>
        <RenderControls
          text={url}
          setText={setURL}
          inputProps={inputProps}
        ></RenderControls>
      </div>

      <div className="flex flex-col mt-8 border border-unfocused-border-color p-geist rounded-geist bg-background">
      {
        slides.map((slide) => 
          <Section 
            key={slide.subtitle}
            image={slide.image}
            subtitle={slide.subtitle}
            duration={slide.duration}
          />
        )
      }
      </div>
    </div>
    </div>
  );
};

export default Home;
