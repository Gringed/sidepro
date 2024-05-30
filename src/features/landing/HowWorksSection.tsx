import React from "react";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "./FadeInSection";

const HowWorksSection = () => {
  return (
    <FadeInSection>
      <div className="relative">
        <Section id="howworks" className="py-2 my-20">
          <div className="flex flex-col justify-center w-full">
            <div className="flex items-center mb-7 gap-1 flex-col w-full justify-center">
              <h1 className="max-w-2xl  text-4xl font-black tracking-tight leading-none md:text-5xl text-noir">
                How it works ?
              </h1>
              <p className="font-medium">It's so easy</p>
            </div>
            <div className="relative mt-10 flex flex-col lg:items-center gap-10 w-full">
              <div className="scroll flex items-start w-1 h-full"></div>
              <div className="border border-dashed border-primary absolute  w-[2px] rounded-full m-[1px] h-full"></div>
              <div className="flex px-5 relative lg:px-0  flex-wrap w-full justify-center lg:justify-start">
                <div className="flex bg-white/50 w-full relative lg:max-w-sm xl:max-w-lg p-10 shadow-xl border rounded-xl flex-col gap-1">
                  <span className="absolute justify-center text-2xl top-6 font-extrabold items-center border text-white flex -right-8 lg:-left-8 w-16 h-16 bg-primary rounded-full">
                    1
                  </span>
                  <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none text-noir">
                    Register | Login
                  </h1>
                  <p>With a simple Google account it couldn't be easier.</p>
                </div>
              </div>
              <div className="flex px-5 lg:px-0  flex-wrap w-full justify-center lg:justify-end">
                <div className="flex bg-white/50 w-full relative lg:max-w-sm xl:max-w-lg p-10 shadow-lg shadow-secondary border rounded-xl flex-col gap-1">
                  <span className="absolute justify-center text-2xl top-6 font-extrabold items-center border text-white flex -right-8 w-16 h-16 bg-primary rounded-full">
                    2
                  </span>
                  <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none text-noir">
                    Setup your sidefolio name
                  </h1>
                  <p>
                    Find your sidefolio name (
                    <span className="text-primary font-semibold">
                      very cool name
                    </span>
                    )
                  </p>
                </div>
              </div>
              <div className="flex px-5 lg:px-0  flex-wrap w-full justify-center lg:justify-start">
                <div className="flex bg-white/50 w-full relative lg:max-w-sm xl:max-w-lg p-10 shadow-lg shadow-tertiary border rounded-xl flex-col gap-1">
                  <span className="absolute justify-center text-2xl top-6 font-extrabold items-center border text-white flex -right-8 lg:-left-8 w-16 h-16 bg-primary rounded-full">
                    3
                  </span>
                  <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none text-noir">
                    Build anything
                  </h1>
                  <p>
                    Build your sidefolio your way with{" "}
                    <span className="text-primary font-semibold">
                      what you want to showcase.
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex px-5 lg:px-0  flex-wrap w-full justify-center lg:justify-end">
                <div className="flex bg-white/50 w-full relative lg:max-w-sm xl:max-w-lg p-10 border-2 border-tertiary shadow-xl rounded-xl flex-col gap-1">
                  <span className="absolute justify-center text-2xl top-6 font-extrabold items-center border-tertiary text-white flex -right-8 w-16 h-16 bg-primary rounded-full">
                    4
                  </span>
                  <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none text-noir">
                    Publish It
                  </h1>
                  <p>
                    Make your work accessible to everyone once it's finished, no
                    need to host it{" "}
                    <span className="text-primary font-semibold">
                      {" "}
                      just C/C your link
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
      <div className="h-[200px] w-full  overflow-hidden ">
        <div className=" h-full -rotate-3 w-[200%] -ml-8 bg-primary"></div>
      </div>
    </FadeInSection>
  );
};

export default HowWorksSection;
