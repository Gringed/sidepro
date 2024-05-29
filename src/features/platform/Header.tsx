import React from "react";
import { LoggedInButton } from "../auth/LoggedInButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogOutButton } from "../auth/LogOutButton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NavLinks from "./dashboard/NavLinks";
declare type pathType = {
  path: "dashboard" | "onboarding";
};
const Header = ({ path }: pathType) => {
  return (
    <div className="fixed z-20 inset-x-0 flex h-20 shadow bg-white/85 backdrop-blur-md">
      <div className="mx-auto max-w-screen-2xl flex w-full items-center justify-between sm:px-[100px] px-8">
        <div className="flex origin-left items-center gap-4 text-xl">
          <Image src="/icon.svg" width={59} height={59} alt="Linkers logo" />{" "}
          {path !== "dashboard" ? (
            <h1 className="md:block hidden font-MontserratAlt font-extrabold">
              Linkers
            </h1>
          ) : (
            <NavLinks />
          )}
        </div>
        <nav className="flex items-center gap-10 text-sm font-medium  text-muted-foreground">
          {path === "onboarding" ? (
            <>
              <Sheet>
                <SheetTrigger>
                  <Menu className="text-noir sm:hidden" />
                </SheetTrigger>
                <SheetContent className="sm:w-72 flex gap-10 flex-col overflow-y-scroll">
                  <span className="font-semibold text-noir">
                    Welcome to your onboard
                  </span>
                  <LogOutButton />
                </SheetContent>
              </Sheet>
              <div className="hidden items-center gap-5 sm:flex">
                <span className="font-semibold text-noir">
                  Welcome to your onboard
                </span>
                <LogOutButton />
              </div>
            </>
          ) : path === "dashboard" ? (
            <>
              <Sheet>
                <SheetTrigger>
                  <Menu className="text-noir sm:hidden" />
                </SheetTrigger>
                <SheetContent className="sm:w-72 overflow-y-scroll">
                  <>
                    <ul className="flex flex-col gap-8">
                      <li className="border-b">
                        <a href="#about" className="font-bold text-noir">
                          About
                        </a>
                      </li>
                      <li className="border-b">
                        <a href="#about" className="font-bold text-secondary">
                          Explore
                        </a>
                      </li>
                      <li className="border-b">
                        <a href="#about" className="font-bold text-tertiary">
                          Enroll now
                        </a>
                      </li>
                      <LoggedInButton />
                    </ul>
                  </>
                </SheetContent>
              </Sheet>
              <div className="hidden items-center gap-5 sm:flex">
                <LoggedInButton />
              </div>
            </>
          ) : (
            <>
              <Sheet>
                <SheetTrigger>
                  <Menu className="text-noir sm:hidden" />
                </SheetTrigger>
                <SheetContent className="sm:w-72 overflow-y-scroll">
                  <>
                    <ul className="flex flex-col gap-8">
                      <li className="border-b">
                        <a href="#about" className="font-bold text-noir">
                          About
                        </a>
                      </li>
                      <li className="border-b">
                        <a href="#about" className="font-bold text-secondary">
                          Explore
                        </a>
                      </li>
                      <li className="border-b">
                        <a href="#about" className="font-bold text-tertiary">
                          Enroll now
                        </a>
                      </li>
                    </ul>
                  </>
                </SheetContent>
              </Sheet>
              <div className="hidden items-center gap-5 sm:flex">
                <a href="#about" className="font-bold text-noir">
                  About
                </a>
                <Button variant={"cornerTr"}>Explore</Button>
                <LoggedInButton />
              </div>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
