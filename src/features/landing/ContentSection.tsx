import { Button } from "@/components/ui/button";
import React from "react";
import { Section } from "./Section";

const ContentSection = () => {
  return (
    <>
      <div className="flex justify-center flex-col items-center relative">
        <Button
          variant={"btnPrimary"}
          className="absolute md:top-[15%] top-[10%] text-sm lg:text-lg px-8 md:px-16 py-2 md:py-6"
          style={{ borderRadius: "50px 50px 15px 15px" }}
        >
          Get Linkers now
        </Button>

        <h1 className="text-xl md:text-3xl lg:text-5xl font-extrabold absolute top-1/2  text-white">
          For <span className="text-tertiary">Content Creator</span>
        </h1>
      </div>
      <div className="bg-secondary mb-28 md:mb-48 w-full relative py-20">
        <Section className=" z-10">
          <div className="flex flex-col z-10 justify-center w-full">
            <div className="flex  flex-col lg:flex-row items-center lg:items-end justify-between">
              <div className="flex-1 flex">
                <img
                  src="http://res.cloudinary.com/dhgoagdvr/image/upload/v1715854900/Linkers/y1boziu3btr4doxioj2q.svg"
                  alt=""
                  className="Content creator person"
                />
              </div>
              <div className="flex flex-col flex-1 pb-0 gap-10">
                <h1 className="text-xl text-noir md:text-3xl lg:text-4xl font-black">
                  It's for me?
                </h1>
                <p className=" text-lg font-medium text-justify text-white">
                  You're a content creator. You{" "}
                  <span className="font-extrabold text-noir">
                    produce and share media online
                  </span>{" "}
                  to entertain, educate, or inform your audience. Your work can
                  cover a variety of topics, and you often influence online
                  trends and opinions.
                </p>
                <div className="flex justify-between flex-wrap">
                  <div className="flex items-center gap-5 font-semibold">
                    Easy collaboration
                  </div>
                  <div className="flex items-center gap-5 font-semibold">
                    Access to a list of talent
                  </div>
                  <div className="flex items-center gap-5 font-semibold">
                    Secure app
                  </div>
                </div>
                <div className="py-2 mb-5 h-12 font-medium">
                  <Button variant={"btnSecondary"} className="flex self-start">
                    Yes it's me
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default ContentSection;
