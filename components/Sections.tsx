import Image from "next/image"

export const Section = ({ image, subtitle, duration }) => {
  // <div className="border border-unfocused-border-color p-geist rounded-geist bg-background flex flex-col"></div>
  return <div className="flex flex-row w-[400px] gap-2 h-[48px] mb-2">
    <Image src={image} width={128/3*2} height={72/3*2} />

    <div>
      <div className="text-xs text-foreground mt-2">{ subtitle } { duration }s</div>
      {/* <div className="text-xs text-foreground mt-1">{ duration }s</div> */}
    </div>
  </div>
}

// export const Sections = ()