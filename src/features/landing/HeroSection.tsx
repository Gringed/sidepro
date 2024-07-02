"use client";
import { Input } from "@/components/ui/input";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { ArrowRight, CircleAlert } from "lucide-react";
import { useState } from "react";
import { signInAction } from "../auth/auth.action";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { FlipWords } from "@/components/ui/flip-words";

export const HeroSection = () => {
  const [name, setName] = useState<string>();
  return (
    <>
      <Section className="lg:py-16 py-8 h-full relative">
        <div className="flex  w-full justify-center overflow-hidden bg-contain bg-repeat h-full bg- items-center flex-col gap-10">
          <div className="flex flex-col z-10 gap-1">
            <h1 className="max-w-2xl mb-4 text-4xl text-center font-black tracking-tight leading-none md:text-5xl xl:text-7xl text-noir">
              Your portfolio.
            </h1>
            <h1 className="max-w-2xl mb-4 text-4xl  items-center gap-4 text-center font-black tracking-tight leading-none md:text-5xl xl:text-7xl text-primary">
              In few{" "}
              <FlipWords
                className="  text-primary"
                words={["Moves.", "Blocks."]}
              />
            </h1>
          </div>
          <div className="flex items-center z-10 gap-8 flex-col">
            <p className="max-w-lg  text-justify font-semibold text-noir  md:text-lg lg:text-lg dark:text-gray-400">
              Build a portfolio or anything in just a few moves: showcase your
              talents with our intuitive{" "}
              <span className="text-primary font-bold">Bento Builder</span>!
            </p>
            <a
              href="https://www.producthunt.com/posts/sidepro?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-sidepro"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=463493&theme=light"
                alt="SidePro - Create&#0032;and&#0032;publish&#0032;professional&#0032;sidefolio&#0032;easily | Product Hunt"
                width="250"
                height="54"
              />
            </a>
          </div>

          <div className="flex items-center flex-col md:flex-row h-full gap-3">
            <div className="h-full">
              <label className="flex border h-full border-noir bg-primary-foreground flex-row  items-center rounded ">
                <span className="pl-5 w-full h-full flex-1 py-3 font-medium">
                  sidepro.me/
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
          <div>
            <img />
          </div>
        </div>
        <AnimatedGridPattern
          numSquares={30}
          width={100}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
            "inset-x-0 w-full -top-20  h-[100%] opacity-50 skew-y-6"
          )}
        />
      </Section>
      <div className="h-[200px] my-20 w-full  overflow-hidden ">
        <div className=" h-full    bg-gradient-to-b to-90% from-primary to-white"></div>
        <div className=" h-full  w-[200%] -ml-8 bg-gradient-to-b to-90% from-primary to-white"></div>
      </div>
    </>
  );
};
