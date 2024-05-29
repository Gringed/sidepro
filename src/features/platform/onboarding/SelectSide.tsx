"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Section } from "@/features/landing/Section";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

const SelectSide = () => {
  const router = useRouter();

  return (
    <Section className="">
      <div className="flex flex-col items-center gap-20 justify-center h-screen w-full">
        <div className="">
          <h1 className="relative font-MontserratAlt text-center text-4xl sm:text-5xl md:text-6xl  font-bold">
            Select your <span className=" text-noir">side</span>
            <svg
              className="hidden md:flex absolute -rotate-3 -bottom-4 mix-blend-difference -end-10"
              width="230"
              height="38"
              viewBox="0 0 212 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3122 26.1487C16.3226 24.6094 20.5487 23.7818 24.7786 22.9175C37.6547 20.2865 50.6827 18.1149 63.7362 16.3759C82.4658 13.8808 101.265 12.1733 120.24 12.218C147.234 12.2817 173.638 15.9907 200.5 18.1424"
                stroke="white"
                strokeWidth="23"
                strokeLinecap="round"
              />
            </svg>
          </h1>
        </div>
        <div className="w-full md:hidden">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Content creator</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                <p>
                  You produce and publish a variety of original online content,
                  such as videos, streams, articles or images, with the aim of
                  attracting and engaging a specific audience.
                </p>
                <Button>Yes it's me</Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Creatives</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                <p>
                  You produce and publish a variety of original online content,
                  such as videos, streams, articles or images, with the aim of
                  attracting and engaging a specific audience.
                </p>
                <Button>Yes it's me</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="hidden md:flex overflow-hidden justify-between items-end w-full">
          <Popover>
            <PopoverTrigger
              asChild
              className="flex flex-col relative  overflow-hidden  justify-center gap-2 items-center"
            >
              <div className="cursor-pointer select-none">
                <svg
                  className="absolute z-0 w-[100%] transition-all overflow-hidden"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#f4f4f9"
                    d="M30,-43.2C41.1,-33.1,54.1,-27.5,57.8,-18.3C61.6,-9,56.1,3.7,50,14.4C43.9,25,37.3,33.7,28.9,40.4C20.5,47.2,10.2,52.2,-2.4,55.5C-15.1,58.8,-30.1,60.5,-37.5,53.4C-44.8,46.2,-44.4,30.3,-45.6,17.1C-46.8,3.8,-49.6,-6.6,-47.8,-16.5C-45.9,-26.4,-39.3,-35.7,-30.5,-46.6C-21.8,-57.5,-10.9,-70,-0.8,-69C9.4,-67.9,18.8,-53.4,30,-43.2Z"
                    transform="translate(100 100)"
                  />
                </svg>
                <Image
                  className="object-contain isTriggered  z-10"
                  sizes="100vw"
                  style={{
                    width: "80%",
                    height: "auto",
                  }}
                  width={150}
                  height={150}
                  src="http://res.cloudinary.com/dhgoagdvr/image/upload/v1715937145/Linkers/sdkxfe0ajqslvkamxd3b.svg"
                  alt=""
                />
                <span className="font-bold z-10 md:text-2xl lg:text-3xl xl:text-4xl">
                  Content creator
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent side="right" className="w-80">
              <div className="flex flex-col text-justify gap-4">
                <h2 className="text-center font-bold text-noir">Resume</h2>
                <p>
                  You produce and publish a variety of original online content,
                  such as videos, streams, articles or images, with the aim of
                  attracting and engaging a specific audience.
                </p>
                <Button
                  onClick={() => router.push(`/onboarding/content`)}
                  variant={"btnPrimary"}
                >
                  Yes it's me
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger
              asChild
              className="flex flex-col relative cursor-pointer justify-center gap-2 items-center"
            >
              <div className=" select-none">
                <svg
                  className="absolute z-0 w-[100%]  transition-all overflow-hidden"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#f4f4f9"
                    d="M27.5,-37.1C39.2,-29.3,54.9,-26.1,63.2,-16.7C71.4,-7.4,72.2,8.2,63.6,16.4C55.1,24.6,37.1,25.5,25,35C12.8,44.4,6.4,62.3,0.3,61.9C-5.9,61.6,-11.8,43,-26.8,34.5C-41.7,26,-65.8,27.6,-67.2,22.1C-68.6,16.6,-47.5,4,-37.2,-7.2C-26.9,-18.5,-27.4,-28.5,-23,-38.7C-18.6,-49,-9.3,-59.5,-0.7,-58.5C7.9,-57.5,15.7,-45,27.5,-37.1Z"
                    transform="translate(100 100)"
                  />
                </svg>
                <Image
                  className="object-contain isTriggered  z-10"
                  sizes="100vw"
                  style={{
                    width: "80%",
                    height: "auto",
                  }}
                  width={150}
                  height={150}
                  src="http://res.cloudinary.com/dhgoagdvr/image/upload/v1715954190/Linkers/rxupjstfbon8e0wkpf7a.svg"
                  alt=""
                />
                <span className="font-bold z-10 md:text-2xl lg:text-3xl xl:text-4xl">
                  Creative
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent side="left" className="w-80">
              <div className="flex flex-col text-justify gap-4">
                <h2 className="text-center font-bold text-noir">Resume</h2>
                <p>
                  You produce and publish a variety of original online content,
                  such as videos, streams, articles or images, with the aim of
                  attracting and engaging a specific audience.
                </p>
                <Button
                  onClick={() => router.push(`/onboarding/creative`)}
                  variant={"btnPrimary"}
                >
                  Yes it's me
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Section>
  );
};

export default SelectSide;
