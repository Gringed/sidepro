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
import { CircleCheck, CircleX } from "lucide-react";

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

          <div className="mt-5 w-full  grid gap-y-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 md:gap-x-12 xl:gap-x-24">
            <div className="py-12 px-4 flex flex-col rounded-xl border shadow bg-white text-gray-900 text-center transition duration-75 hover:-rotate-1 hover:scale-105 focus:-rotate-1 focus:scale-105">
              <div className="flex flex-col justify-center items-center">
                <h3 className="px-6 py-2 inline-block text-2xl md:text-3xl font-bold border-none bg-neutral-200 outline-none text-noir rotate-1">
                  Freemium
                </h3>
                <span
                  className="text-sm font-bold rotate-1"
                  style={{ verticalAlign: "super" }}
                >
                  <br />
                </span>
              </div>

              <div className=" py-12 font-bold leading-none text-6xl md:text-7xl md:leading-none lg:text-7xl lg:leading-none  xl:leading-none">
                <div className="inline-block">
                  Free
                  <small className="block text-lg text-right">for life</small>
                </div>
              </div>

              <ul className="mx-auto text-left md:text-base md:leading-normal font-bold space-y-4">
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>
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
                  </div>
                </li>
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>All your data in one</div>
                </li>
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>Customizable</div>
                </li>
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>Review Support</div>
                </li>
                <li className="flex gap-2 items-center">
                  <CircleX className=" h-5 text-red-500" />
                  <div>
                    Visible to{" "}
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger className="font-medium underline decoration-primary decoration-dashed underline-offset-2 hover:decoration-solid duration-200 cursor-help">
                          others
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
                  </div>
                </li>
              </ul>

              <div className="mt-16">
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex flex-wrap h-full items-center justify-center text-xl md:text-2xl font-bold  "
                  )}
                  href="auth/signIn"
                >
                  Start for free
                  <svg
                    className="ml-2 fill-current group-hover:translate-x-1 group-focus:translate-x-1"
                    width="25"
                    height="16"
                    viewBox="0 0 25 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M25 7.99947C24.9989 7.56503 24.8167 7.1507 24.4971 6.85604L17.4153 0.285578C17.1043 -0.00338775 16.6514 -0.0806904 16.262 0.0887195C15.8726 0.258129 15.6207 0.642027 15.6206 1.06635V4.53291C15.6206 4.68018 15.5011 4.79957 15.3537 4.79957H10.0677C9.47801 4.79957 9 5.27712 9 5.8662V10.1327C9 10.7218 9.47801 11.1994 10.0677 11.1994H15.3537C15.5011 11.1994 15.6206 11.3188 15.6206 11.466V14.9326C15.6203 15.3571 15.872 15.7414 16.2615 15.9111C16.651 16.0807 17.1042 16.0035 17.4153 15.7144L24.4961 9.14503C24.816 8.84966 24.9986 8.43467 25 7.99947Z"></path>
                    <path d="M5 6C5 5.44772 5.44772 5 6 5H7C7.55228 5 8 5.44772 8 6V10.5C8 11.0523 7.55228 11.5 7 11.5H6C5.44772 11.5 5 11.0523 5 10.5V6Z"></path>
                    <path d="M0 6C0 5.44772 0.447715 5 1 5H2C2.55228 5 3 5.44772 3 6V10.5C3 11.0523 2.55228 11.5 2 11.5H1C0.447715 11.5 0 11.0523 0 10.5V6Z"></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="py-12 px-4 flex flex-col rounded-xl border-2 border-primary shadow-xl bg-white text-gray-900 text-center transition duration-75 hover:-rotate-1 hover:scale-105 focus:-rotate-1 focus:scale-105">
              <div className="flex items-center justify-center flex-col">
                <h3 className="px-6 py-2 inline-block text-2xl md:text-3xl font-bold bg-primary outline-none text-white -rotate-1">
                  Lifetime
                </h3>
                <span
                  className="text-sm font-bold -rotate-1"
                  style={{ verticalAlign: "super" }}
                >
                  No subscription
                </span>
              </div>

              <div className=" py-12 font-bold leading-none text-6xl md:text-7xl md:leading-none lg:text-7xl lg:leading-none  xl:leading-none">
                <div className="inline-block">
                  12<sup className="text-3xl">€</sup>
                  <small className="block text-lg text-right">for life</small>
                </div>
              </div>

              <ul className="mx-auto text-left md:text-base md:leading-normal font-bold space-y-4">
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>
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
                  </div>
                </li>
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>All your data in one</div>
                </li>
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>Customizable</div>
                </li>
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>Review Support</div>
                </li>
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>
                    Visible to{" "}
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger className="font-medium underline decoration-primary decoration-dashed underline-offset-2 hover:decoration-solid duration-200 cursor-help">
                          others
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
                  </div>
                </li>
              </ul>

              <div className="mt-16">
                <Link
                  href="auth/signIn"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "group flex flex-wrap h-full items-center justify-center text-xl md:text-2xl font-bold  "
                  )}
                >
                  Start for free
                  <svg
                    className="ml-2 fill-current group-hover:translate-x-1 group-focus:translate-x-1"
                    width="25"
                    height="16"
                    viewBox="0 0 25 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M25 7.99947C24.9989 7.56503 24.8167 7.1507 24.4971 6.85604L17.4153 0.285578C17.1043 -0.00338775 16.6514 -0.0806904 16.262 0.0887195C15.8726 0.258129 15.6207 0.642027 15.6206 1.06635V4.53291C15.6206 4.68018 15.5011 4.79957 15.3537 4.79957H10.0677C9.47801 4.79957 9 5.27712 9 5.8662V10.1327C9 10.7218 9.47801 11.1994 10.0677 11.1994H15.3537C15.5011 11.1994 15.6206 11.3188 15.6206 11.466V14.9326C15.6203 15.3571 15.872 15.7414 16.2615 15.9111C16.651 16.0807 17.1042 16.0035 17.4153 15.7144L24.4961 9.14503C24.816 8.84966 24.9986 8.43467 25 7.99947Z"></path>
                    <path d="M5 6C5 5.44772 5.44772 5 6 5H7C7.55228 5 8 5.44772 8 6V10.5C8 11.0523 7.55228 11.5 7 11.5H6C5.44772 11.5 5 11.0523 5 10.5V6Z"></path>
                    <path d="M0 6C0 5.44772 0.447715 5 1 5H2C2.55228 5 3 5.44772 3 6V10.5C3 11.0523 2.55228 11.5 2 11.5H1C0.447715 11.5 0 11.0523 0 10.5V6Z"></path>
                  </svg>
                </Link>
              </div>
            </div>

            <div className="py-12 px-4 flex flex-col rounded-xl border border-neutral-500 shadow bg-white text-gray-900 text-center transition duration-75 hover:-rotate-1 hover:scale-105 focus:-rotate-1 focus:scale-105">
              <div className="flex items-center justify-center flex-col">
                <h3 className="px-6 py-2 inline-block text-2xl md:text-3xl font-bold bg-foreground outline-none text-white rotate-1">
                  One year
                </h3>
                <span
                  className="text-sm font-bold rotate-1"
                  style={{ verticalAlign: "super" }}
                >
                  No subscription
                </span>
              </div>

              <div className=" py-12 font-bold leading-none text-6xl md:text-7xl md:leading-none lg:text-7xl lg:leading-none  xl:leading-none">
                <div className="inline-block">
                  30<sup className="text-3xl">€</sup>
                  <small className="block text-lg text-right">
                    for one year
                  </small>
                </div>
              </div>

              <ul className="mx-auto text-left md:text-base md:leading-normal font-bold space-y-4">
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>
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
                  </div>
                </li>
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>All your data in one</div>
                </li>
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>Customizable</div>
                </li>
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>Review Support</div>
                </li>
                <li className="flex gap-2 items-center">
                  <CircleCheck className=" h-5 text-primary" />
                  <div>
                    Visible to{" "}
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger className="font-medium underline decoration-primary decoration-dashed underline-offset-2 hover:decoration-solid duration-200 cursor-help">
                          others
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
                  </div>
                </li>
              </ul>

              <div className="mt-16">
                <Link
                  href="auth/signIn"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group  flex flex-wrap h-full items-center text-primary justify-center text-xl md:text-2xl font-bold   "
                  )}
                >
                  Start for free
                  <svg
                    className="ml-2 fill-current group-hover:translate-x-1 group-focus:translate-x-1"
                    width="25"
                    height="16"
                    viewBox="0 0 25 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M25 7.99947C24.9989 7.56503 24.8167 7.1507 24.4971 6.85604L17.4153 0.285578C17.1043 -0.00338775 16.6514 -0.0806904 16.262 0.0887195C15.8726 0.258129 15.6207 0.642027 15.6206 1.06635V4.53291C15.6206 4.68018 15.5011 4.79957 15.3537 4.79957H10.0677C9.47801 4.79957 9 5.27712 9 5.8662V10.1327C9 10.7218 9.47801 11.1994 10.0677 11.1994H15.3537C15.5011 11.1994 15.6206 11.3188 15.6206 11.466V14.9326C15.6203 15.3571 15.872 15.7414 16.2615 15.9111C16.651 16.0807 17.1042 16.0035 17.4153 15.7144L24.4961 9.14503C24.816 8.84966 24.9986 8.43467 25 7.99947Z"></path>
                    <path d="M5 6C5 5.44772 5.44772 5 6 5H7C7.55228 5 8 5.44772 8 6V10.5C8 11.0523 7.55228 11.5 7 11.5H6C5.44772 11.5 5 11.0523 5 10.5V6Z"></path>
                    <path d="M0 6C0 5.44772 0.447715 5 1 5H2C2.55228 5 3 5.44772 3 6V10.5C3 11.0523 2.55228 11.5 2 11.5H1C0.447715 11.5 0 11.0523 0 10.5V6Z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Pricing;
