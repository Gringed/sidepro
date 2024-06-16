import React from "react";
import { Section } from "./Section";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Pricing = () => {
  return (
    <>
      <Section className="lg:py-16 py-8">
        <div className="flex w-full justify-center items-center flex-col gap-10">
          <div className="flex flex-col gap-1">
            <h1 className="max-w-2xl text-4xl text-center font-black tracking-tight leading-none md:text-5xl  text-noir">
              Build your Sidefolio for{" "}
              <span className="text-primary">free</span>
            </h1>
          </div>
          <p className="max-w-lg  text-center font-medium text-foreground/70 lg:mb-8 text-base">
            Grab the lifetime deal and showcase your work to the world!
          </p>

          <div className="mx-auto mb-16 md:mb-16 p-8 lg:p-12 bg-secondary/30 rounded-3xl flex flex-col lg:flex-row gap-8 lg:gap-12 lg:justify-between ">
            <div className="space-y-6 flex-1 w-full">
              <p className="text-2xl tracking-tight text-primary font-bold">
                Build your best of you
              </p>
              <ul className="space-y-4 ">
                <li className="flex gap-3 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] shrink-0 inline opacity-80"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Show everything with{" "}
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger className="font-medium underline decoration-primary decoration-dashed underline-offset-2 hover:decoration-solid duration-200 cursor-help">
                          blocks
                        </TooltipTrigger>
                        <TooltipContent className="bg-white">
                          <div className="text-foreground text-medium text-base">
                            <h2>Blocks build your sidefolio</h2>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </li>
                <li className="flex gap-3 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] shrink-0 inline opacity-80"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  All your data in one
                </li>

                <li className="flex gap-3 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] shrink-0 inline opacity-80"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Customizable
                </li>
                <li className="flex gap-3 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] shrink-0 inline opacity-80"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Be visible to other{" "}
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger className="font-medium underline decoration-primary decoration-dashed underline-offset-2 hover:decoration-solid duration-200 cursor-help">
                          users
                        </TooltipTrigger>
                        <TooltipContent className="bg-white">
                          <div className="text-foreground text-medium text-base">
                            <h2>
                              Publish your sidefolio and share link to everyone
                            </h2>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </li>
                <li className="flex gap-3 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] shrink-0 inline opacity-80"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Premium support
                </li>
              </ul>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
              <div className="border border-foreground/30 bg-zinc-200 rounded-2xl lg:rounded-3xl text-center p-8 lg:p-12 -mx-4 -mb-4 lg:-my-8">
                <div className="flex flex-col gap-6 lg:gap-8 justify-center h-full">
                  <p className="text-xl font-semibold">1-Year Pass</p>
                  <div className="flex items-baseline justify-center gap-x-2">
                    <span className="text-lg tracking-tight text-base-content-secondary/80 line-through decoration-[1.5px]">
                      50
                    </span>
                    <div className="text-5xl font-bold tracking-tight">20</div>
                    <span className="text-sm font-base leading-6 tracking-wide text-base-content-secondary/80">
                      €
                    </span>
                  </div>
                  <p className="text-sm text-base-content-secondary">
                    One-time payment. No subscription
                  </p>
                  <div className="w-full">
                    <Link
                      className={cn(buttonVariants({ variant: "default" }))}
                      href="/#signup"
                    >
                      Start for free
                    </Link>
                  </div>
                </div>
              </div>
              <div className="border-2  border-primary relative lg:!py-16 lg:!-my-16 lg:!px-16 lg:!-mx-16 z-10 bg-zinc-100 rounded-2xl lg:rounded-3xl text-center p-8 lg:p-12 -mx-4 -mb-4 ">
                <Badge className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 badge badge-accent badge-sm uppercase font-semibold">
                  Popular
                </Badge>
                <div className="flex flex-col gap-6 lg:gap-8 justify-center h-full">
                  <p className="text-xl font-semibold">Lifetime Deal</p>
                  <div className="flex items-baseline justify-center gap-x-2">
                    <span className="text-lg tracking-tight text-base-content-secondary/80 line-through decoration-[1.5px]">
                      80
                    </span>
                    <div className="text-5xl font-bold tracking-tight">45</div>
                    <span className="text-sm font-base leading-6 tracking-wide text-base-content-secondary/80">
                      €
                    </span>
                  </div>
                  <p className="text-sm text-base-content-secondary">
                    One-time payment. No subscription
                  </p>
                  <div className="w-full">
                    <Link
                      className={cn(buttonVariants({ variant: "default" }))}
                      href="/#signup"
                    >
                      Start for free
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Pricing;
