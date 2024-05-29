"use client";
import React, { useEffect, useRef, useState } from "react";
import { Section } from "./Section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "./FadeInSection";

const Footer = () => {
  return (
    <FadeInSection>
      <div className="flex justify-center flex-col items-center relative">
        <div className="text-xl md:text-3xl lg:text-5xl font-black absolute flex flex-col items-center gap-5 sm:gap-14 md:gap-16 top-[25%] 2xl:top-[30%]  text-white">
          <h1>Ready to join us?</h1>
          <Button variant={"btnSecondary"} className="lg:hidden z-20 ">
            Get Linkers
          </Button>
        </div>
        <div className="lg:absolute hidden lg:flex  lg:-bottom-12 xl:-bottom-10 2xl:bottom-8">
          <div className="relative  overflow-hidden flex items-center justify-center">
            <svg
              id="cut-circ"
              className="w-full h-full rotateL -me-40 transition-all"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="23"
                stroke="white"
                strokeWidth={20}
                fill="none"
              />
            </svg>
            <Button variant={"btnSecondary"} className="absolute z-20 ">
              Get Linkers
            </Button>
            <svg
              id="cut-circ"
              className="w-full rotateR transition-all"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="23"
                stroke="white"
                strokeWidth={20}
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full relative ">
        <Section className="">
          <div className="flex flex-col justify-center w-full">
            <div className="flex items-center lg:justify-between flex-col lg:flex-row gap-5 my-5 lg:my-1">
              <div className="flex items-center gap-3 font-medium">
                2024 • Linkers Co
              </div>
              <div className="flex gap-5 font-medium flex-col lg:flex-row flex-wrap items-center">
                <Link href={"/terms"}>Terms</Link>
                <Link href={"/policy"}>Privacy Policy</Link>
                <Link href={"/contact"}>Contact</Link>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </FadeInSection>
  );
};

export default Footer;
