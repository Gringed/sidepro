import React from "react";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "./FadeInSection";

const About = () => {
  return (
    <FadeInSection>
      <div className=" mb-28 md:mb-48 w-full relative py-20" id="about">
        <Section className=" z-10">
          <div className="flex flex-col gap-14 items-center z-10 justify-center w-full">
            <h1 className="text-2xl text-noir md:text-3xl lg:text-4xl font-black">
              About us
            </h1>
            <div className="flex px-5 flex-wrap lg:px-32 flex-col lg:flex-row-reverse items-center gap-10 lg:gap-32 justify-center">
              <div className="flex-initial flex justify-center"></div>
              <div className="flex flex-col flex-1 justify-end pb-0 gap-10">
                <p className=" text-lg lg:text-xl  font-normal text-justify text-noir">
                  Welcome to{" "}
                  <span className="text-tertiary font-bold">Linkers</span>, your
                  ultimate creative hub. We serve as the bridge between{" "}
                  <span className="text-secondary font-bold">
                    content creators
                  </span>{" "}
                  and a diverse array of{" "}
                  <span className="text-secondary font-bold">
                    creative professionals
                  </span>
                  , including video editors, designers, thumbnail creators,
                  developers, and more. Our mission is clear: to facilitate
                  seamless collaboration and unleash the full potential of every
                  project.{" "}
                  <span className="text-tertiary font-bold">Join us</span> in
                  revolutionizing the way content is created and let's make
                  magic together.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </FadeInSection>
  );
};

export default About;
