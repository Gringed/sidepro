import React from "react";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "./FadeInSection";

const HowWorksSection = () => {
  return (
    <FadeInSection>
      <div className="relative">
        <Section className="py-2 mb-20">
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
                  <span className="absolute justify-center text-2xl top-6 font-extrabold items-center border text-white flex -right-8 lg:-left-8 w-16 h-16 bg-tertiary rounded-full">
                    1
                  </span>
                  <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none text-noir">
                    Register
                  </h1>
                  <p>
                    A Google account or an email address, it couldn't be easier.
                  </p>
                </div>
              </div>
              <div className="flex px-5 lg:px-0  flex-wrap w-full justify-center lg:justify-end">
                <div className="flex bg-white/50 w-full relative lg:max-w-sm xl:max-w-lg p-10 shadow-lg shadow-secondary border rounded-xl flex-col gap-1">
                  <span className="absolute justify-center text-2xl top-6 font-extrabold items-center border text-white flex -right-8 w-16 h-16 bg-tertiary rounded-full">
                    2
                  </span>
                  <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none text-noir">
                    Content creator request
                  </h1>
                  <p>
                    A content creator (
                    <span className="text-tertiary font-semibold">
                      perhaps you
                    </span>
                    ) writes a request.
                  </p>
                </div>
              </div>
              <div className="flex px-5 lg:px-0  flex-wrap w-full justify-center lg:justify-start">
                <div className="flex bg-white/50 w-full relative lg:max-w-sm xl:max-w-lg p-10 shadow-lg shadow-tertiary border rounded-xl flex-col gap-1">
                  <span className="absolute justify-center text-2xl top-6 font-extrabold items-center border text-white flex -right-8 lg:-left-8 w-16 h-16 bg-tertiary rounded-full">
                    3
                  </span>
                  <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none text-noir">
                    Make a contact
                  </h1>
                  <p>
                    The artist matching the request description (
                    <span className="text-tertiary font-semibold">
                      wich could be you
                    </span>
                    ) responds to the request and discusses it with the
                    requester.
                  </p>
                </div>
              </div>
              <div className="flex px-5 lg:px-0  flex-wrap w-full justify-center lg:justify-end">
                <div className="flex bg-white/50 w-full relative lg:max-w-sm xl:max-w-lg p-10 border-2 border-tertiary shadow-xl rounded-xl flex-col gap-1">
                  <span className="absolute justify-center text-2xl top-6 font-extrabold items-center border-tertiary text-white flex -right-8 w-16 h-16 bg-tertiary rounded-full">
                    4
                  </span>
                  <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none text-noir">
                    Successful process
                  </h1>
                  <p>
                    Both sides agree that the work delivered is in accordance
                    with the original request. Marking and payment can take
                    place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </FadeInSection>
  );
};

export default HowWorksSection;
