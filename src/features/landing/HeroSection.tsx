"use client";
import { Input } from "@/components/ui/input";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { signInAction } from "../auth/auth.action";

export const HeroSection = () => {
  const [name, setName] = useState<String>();
  return (
    <>
      <Section className="lg:py-16 py-8">
        <div
          className="flex w-full justify-center bg-contain bg-repeat bg- items-center flex-col gap-10"
          style={{
            backgroundImage: "url(back.svg)",
          }}
        >
          <div className="flex flex-col gap-1">
            <h1 className="max-w-2xl mb-4 text-4xl text-center font-black tracking-tight leading-none md:text-5xl xl:text-7xl text-noir">
              Your portfolio.
            </h1>
            <h1 className="max-w-2xl mb-4 text-4xl text-center font-black tracking-tight leading-none md:text-5xl xl:text-7xl text-primary">
              In few clics.
            </h1>
          </div>
          <p className="max-w-lg mb-6 text-center font-semibold text-noir lg:mb-8 md:text-lg lg:text-lg dark:text-gray-400">
            Build your portfolio in just a few clicks: showcase your talents
            with our intuitive{" "}
            <span className="text-primary font-bold">Sidefolio Builder</span>!
          </p>
          <div className="flex items-center flex-col md:flex-row h-full gap-3">
            <div className="h-full">
              <label className="flex border h-full border-noir bg-primary-foreground flex-row  items-center rounded ">
                <span className="pl-5 w-full h-full flex-1 py-3 font-medium">
                  sidepro.net/
                </span>
                <Input
                  type="text"
                  placeholder="yourname"
                  className="flex-[2] pl-0.5 text-base focus-visible:ring-0 shadow-none h-full border-0 rounded-sm  min-w-[8rem] w-full"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <Button
              className="h-full p-3 rounded w-full text-base"
              disabled={!name}
              onClick={() => signInAction()}
            >
              Claim my sidefolio <ArrowRight className="ml-2" size={15} />
            </Button>
          </div>
        </div>
      </Section>
      <div className="h-[200px] my-20 w-full  overflow-hidden ">
        <div className=" h-full rotate-3 w-[200%] -ml-8 bg-primary"></div>
      </div>
    </>
  );
};
