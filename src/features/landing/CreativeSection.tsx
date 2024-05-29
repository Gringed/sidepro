import React from "react";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "./FadeInSection";

const CreativeSection = () => {
  return (
    <FadeInSection>
      <div className="flex justify-center flex-col items-center relative">
        <div className="text-xl md:text-3xl lg:text-5xl font-extrabold absolute flex flex-col items-center gap-10 top-1/2  text-white">
          <h1>
            <span className="text-tertiary">For</span> Creatives
          </h1>
        </div>
      </div>
      <div className="w-full relative py-20">
        <Section className=" z-10">
          <div className="flex flex-col z-10 justify-center w-full">
            <div className="flex  flex-col lg:flex-row-reverse items-center lg:items-end justify-between">
              <div className="flex-1 flex justify-end">
                <img
                  src="http://res.cloudinary.com/dhgoagdvr/image/upload/v1715854900/Linkers/si9xxng6ycbav8z6bxo8.svg"
                  alt="Creatives person"
                  className=""
                />
              </div>
              <div className="flex flex-col flex-1 pb-0 gap-10">
                <h1 className="text-xl text-noir md:text-3xl lg:text-4xl font-black">
                  It's for me?
                </h1>
                <p className=" text-lg font-medium text-justify text-noir">
                  You're a{" "}
                  <span className="text-tertiary font-bold">
                    versatile creative.
                  </span>{" "}
                  You excel in video editing, design, creating thumbnails, or
                  even development. Your{" "}
                  <span className="text-tertiary font-bold">expertise</span>{" "}
                  allows you to bring ideas to life, captivate your audience,
                  and inspire with every project you undertake.
                </p>
                <div className="flex justify-between flex-wrap">
                  <div className="flex items-center gap-5 font-semibold">
                    Additional income
                  </div>
                  <div className="flex items-center gap-5 font-semibold">
                    New opportunities
                  </div>
                  <div className="flex items-center gap-5 font-semibold">
                    Secure app
                  </div>
                </div>
                <div className="py-2 mb-10 h-12 font-medium">
                  <Button variant={"btnTertiary"} className="flex self-start">
                    Yes it's me
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </FadeInSection>
  );
};
export default CreativeSection;
