"use client";
import React, { useEffect, useRef, useState } from "react";
import { Section } from "./Section";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeInSection } from "./FadeInSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, CopyrightIcon } from "lucide-react";
import Image from "next/image";
import { signInAction } from "../auth/auth.action";

const Footer = () => {
  const [name, setName] = useState<String>();
  return (
    <FadeInSection>
      <Section
        id="signup"
        className="py-2 !max-w-full  bg-gray-100 w-full col-start-1 row-start-1 h-full bg-opacity-20"
      >
        <section
          className=" col-start-1 row-start-1 grid place-items-center w-full h-full overflow-hidden min-h-screen"
          id="signup"
        >
          <div className="col-start-1 row-start-1 text-center ">
            <div className="max-w-4xl space-y-12 md:space-y-24 p-6">
              <h2 className="text-5xl relative font-black text-primary  md:text-6xl md:leading-tight lg:text-7xl lg:leading-tight">
                Build now!
                <Image
                  unselectable="on"
                  className="absolute  pointer-events-none  left-0 sm:left-1/4 inset-x-0"
                  src={"lines.svg"}
                  width={200}
                  height={20}
                  alt="d"
                />
              </h2>
              <div className="max-w-lg mx-auto">
                <div className="flex items-center flex-col w-full h-full gap-3">
                  <div className="h-full w-full">
                    <label className="flex border h-full border-noir bg-primary-foreground flex-row  items-center rounded ">
                      <span className="pl-2 w-full h-full flex-1 py-3 font-medium">
                        sidepro.me/
                      </span>
                      <Input
                        type="text"
                        placeholder="yourname"
                        className="flex-[3] pl-0.5 text-base focus-visible:ring-0 shadow-none h-full border-0 rounded-sm  w-full"
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </label>
                  </div>
                  <Button
                    className="h-full p-3 rounded w-full text-base"
                    disabled={!name}
                    onClick={() => {
                      signInAction();
                    }}
                  >
                    Claim my sidefolio <ArrowRight className="ml-2" size={15} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Section>
      <div className="w-full relative bg-primary text-white  border-t-4 border-black">
        <Section className="py-10">
          <div className="flex flex-col justify-center w-full">
            <div className="flex items-center lg:justify-between flex-col lg:flex-row gap-5 my-5 lg:my-1">
              <div className="flex items-center gap-3 font-medium">
                <CopyrightIcon />
                2024 ♥ SidePro
              </div>
              <div className="flex gap-5 font-medium flex-col lg:flex-row flex-wrap items-center">
                <Link href={"/tos"}>Terms</Link>
                <Link href={"/policy"}>Privacy Policy</Link>
                <Link
                  href={
                    "mailto:contact@sidepro.me?subject=Help me with SidePro"
                  }
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </FadeInSection>
  );
};

export default Footer;
