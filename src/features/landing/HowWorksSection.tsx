"use client";
import React from "react";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "./FadeInSection";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import {
  CircleUserRound,
  ClipboardCopy,
  Heading,
  Image,
  Link,
  Send,
  Share,
  Share2,
  Type,
} from "lucide-react";
import { motion } from "framer-motion";
const HowWorksSection = () => {
  const infosVariant = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const SkeletonOne = () => {
    return (
      <motion.div
        initial="initial"
        whileHover="animate"
        whileTap="animate"
        className="flex flex-1 gap-5 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
      >
        <motion.div
          variants={variants}
          className="flex  justify-center rounded-full border border-neutral-100  p-2  items-center space-x-2 bg-white dark:bg-black"
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white border flex-shrink-0">
            <img
              className="h-8 w-8 text-neutral-500"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
            />
          </div>
        </motion.div>

        <motion.div
          variants={variantsSecond}
          className="flex flex-row rounded-full border border-neutral-100  p-2 items-center space-x-2 bg-white dark:bg-black"
        >
          <div className="h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-r from-neutral-300 border flex-shrink-0">
            <img
              className="h-4 w-4 "
              src="https://www.svgrepo.com/show/475656/google-color.svg"
            />
          </div>
          <div className="w-full text-neutral-700 flex items-center text-sm px-3 bg-gray-100 h-6 rounded-full dark:bg-neutral-900">
            Sign in with Google
          </div>
        </motion.div>
      </motion.div>
    );
  };
  return (
    <FadeInSection>
      <div className="relative">
        <Section id="howworks" className="py-2 my-2 lg:my-20">
          <div className="flex flex-col justify-center w-full">
            <div className="flex items-center mb-16 gap-3 flex-col w-full justify-center">
              <h1 className="max-w-2xl text-center text-4xl font-black tracking-tight leading-none md:text-5xl text-noir">
                Build anything,{" "}
                <span className="text-primary">effortlessly</span>
              </h1>
              <p className="font-medium italic">"Very easily"</p>
            </div>
            <BentoGrid className="!max-w-full mx-auto md:grid-cols-2 lg:grid-cols-3 w-full md:auto-rows-[20rem] grid-rows-3">
              <BentoGridItem
                title={"Sign up"}
                description={
                  <span className="text-sm">
                    Sign in/up with Google, easy way.
                  </span>
                }
                header={<SkeletonOne />}
                className={cn("[&>p:text-lg] md:col-span-1 border-neutral-300")}
                icon={
                  <img
                    className="h-4 w-4 text-neutral-500"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                  />
                }
              />
              <BentoGridItem
                title={"Informations Block"}
                description={
                  <span className="text-sm">
                    This block contains your profile picture, your first name,
                    your bio and your location.
                  </span>
                }
                header={
                  <motion.div
                    initial="initial"
                    whileHover="animate"
                    whileTap="animate"
                    className="h-full w-full"
                  >
                    <motion.div
                      className="h-full w-full object-cover object-left"
                      variants={infosVariant}
                    >
                      <video
                        className="h-full w-full object-cover object-left"
                        loop
                        autoPlay={true}
                        muted
                      >
                        <source
                          src="https://res.cloudinary.com/dhgoagdvr/video/upload/v1719949507/Sidepro/klxdfcfuejipcvnzkvbp.mp4"
                          type="video/webm"
                        />
                        <source
                          src="https://res.cloudinary.com/dhgoagdvr/video/upload/v1719949507/Sidepro/klxdfcfuejipcvnzkvbp.mp4"
                          type="video/mp4"
                        />
                        Download the
                        <a href="https://res.cloudinary.com/dhgoagdvr/video/upload/v1719949507/Sidepro/klxdfcfuejipcvnzkvbp.mp4">
                          WEBM
                        </a>
                        or
                        <a href="https://res.cloudinary.com/dhgoagdvr/video/upload/v1719949507/Sidepro/klxdfcfuejipcvnzkvbp.mp4">
                          MP4
                        </a>
                        video.
                      </video>
                    </motion.div>
                  </motion.div>
                }
                className={cn(
                  "[&>p:text-lg] md:col-span-1 md:row-span-3 border-neutral-300"
                )}
                icon={
                  <CircleUserRound
                    strokeWidth={2}
                    className="h-4 w-4 text-neutral-500"
                  />
                }
              />
              <BentoGridItem
                title={"Text Block"}
                description={
                  <span className="text-sm">
                    This block lets you insert any text of any size.
                  </span>
                }
                header={
                  <motion.div
                    initial="initial"
                    whileHover="animate"
                    whileTap="animate"
                    className="flex flex-1 gap-5 w-full h-full min-h-[6rem]  bg-dot-black/[0.2] flex-col space-y-2"
                  >
                    <motion.div
                      variants={variantsSecond}
                      className=" flex justify-center  items-center h-full w-fit object-cover object-left"
                    >
                      <img
                        className="h-fit w-fit object-cover object-left"
                        src="http://res.cloudinary.com/dhgoagdvr/image/upload/v1720009454/Sidepro/bpksew5aorlw4exoqujc.png"
                      />
                    </motion.div>
                  </motion.div>
                }
                className={cn("[&>p:text-lg] md:col-span-1 border-neutral-300")}
                icon={
                  <Type strokeWidth={3} className="h-4 w-4 text-neutral-500" />
                }
              />
              <BentoGridItem
                title={"Title Block"}
                description={
                  <span className="text-sm">
                    This block is used to create a title to separate your
                    different blocks.
                  </span>
                }
                header={
                  <motion.div
                    initial="initial"
                    whileHover="animate"
                    whileTap="animate"
                    className="flex flex-1 gap-5 w-full h-full min-h-[6rem]  bg-dot-black/[0.2] flex-col space-y-2"
                  >
                    <motion.div
                      variants={variants}
                      className=" flex justify-center  items-center h-full w-fit object-cover object-left"
                    >
                      <img
                        className="h-fit w-fit object-cover object-left"
                        src="http://res.cloudinary.com/dhgoagdvr/image/upload/v1720009254/Sidepro/ltuf9a6yyoi7l3u0ffbl.png"
                      />
                    </motion.div>
                  </motion.div>
                }
                className={cn(
                  "[&>p:text-lg] md:col-span-1  border-neutral-300"
                )}
                icon={
                  <Heading
                    strokeWidth={3}
                    className="h-4 w-4 text-neutral-500"
                  />
                }
              />
              <BentoGridItem
                title={"Links and Images Blocks"}
                description={
                  <span className="text-sm">
                    You can implement links with associated visuals and images,
                    both customizable.
                  </span>
                }
                header={
                  <motion.div
                    initial="initial"
                    whileHover="animate"
                    whileTap="animate"
                    className="flex flex-1 gap-5 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
                  >
                    <motion.div
                      variants={variants}
                      className="flex  justify-center  border border-neutral-100  p-2  items-center space-x-2 bg-white dark:bg-black"
                    >
                      <div className=" flex items-center w-fit justify-center  text-primary font-medium flex-shrink-0">
                        <img
                          className="h-fit w-fit object-cover object-left"
                          src="http://res.cloudinary.com/dhgoagdvr/image/upload/v1720010500/Sidepro/o6cjqjiqs1td9gstqf7a.png"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      variants={variantsSecond}
                      className="flex justify-center  border border-neutral-100  p-2 items-center space-x-2 bg-white dark:bg-black"
                    >
                      <div className=" flex items-center justify-center  text-primary font-medium ">
                        <img
                          className="h-fit w-fit object-cover object-left"
                          src="http://res.cloudinary.com/dhgoagdvr/image/upload/v1720010377/Sidepro/cvqkcy9ftubsjlfcbxpq.png"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                }
                className={cn(
                  "[&>p:text-lg] md:col-span-1 row-span-2 border-neutral-300"
                )}
                icon={
                  <div className=" flex gap-2">
                    <Link
                      strokeWidth={2.5}
                      className="h-4 w-4 text-neutral-500"
                    />
                    <Image
                      strokeWidth={2.5}
                      className="h-4 w-4 text-neutral-500"
                    />
                  </div>
                }
              />
              <BentoGridItem
                title={"Publish it"}
                description={
                  <span className="text-sm">
                    You can publish your sidefolio online for all to see!
                  </span>
                }
                header={
                  <motion.div
                    initial="initial"
                    whileHover="animate"
                    whileTap="animate"
                    className="flex flex-1 gap-5 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
                  >
                    <motion.div
                      variants={variants}
                      className="flex  justify-center rounded-full border border-neutral-100  p-2  items-center space-x-2 bg-white dark:bg-black"
                    >
                      <div className=" flex items-center justify-center  text-primary font-medium flex-shrink-0">
                        Let everyone see your sidefolio
                      </div>
                    </motion.div>

                    <motion.div
                      variants={variantsSecond}
                      className="flex flex-row rounded-full border border-neutral-100  p-2 items-center space-x-2 bg-white dark:bg-black"
                    >
                      <div className="h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-r from-neutral-300 border flex-shrink-0">
                        <Send className="h-4 w-4 " />
                      </div>
                      <div className="w-full text-neutral-700 flex items-center text-sm px-3 bg-gray-100 h-6 rounded-full dark:bg-neutral-900">
                        Publish my sidefolio
                      </div>
                    </motion.div>
                  </motion.div>
                }
                className={cn("[&>p:text-lg] md:col-span-1 border-neutral-300")}
                icon={<Send className="h-4 w-4 text-neutral-500" />}
              />
            </BentoGrid>
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
