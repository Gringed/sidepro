"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";

import Image from "next/image";
import { Menu } from "lucide-react";
import { useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useRouter } from "next/navigation";
import { SignInButton } from "../auth/SignInButton";
import Link from "next/link";
import { cn } from "@/lib/utils";

function useBoundedScroll(threshold: number) {
  let { scrollY } = useScroll();
  let scrollYBounded = useMotionValue(0);
  let scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, threshold],
    [0, 1]
  );

  useEffect(() => {
    return scrollY.on("change", (current) => {
      let previous = scrollY.getPrevious();
      if (!previous) return;
      let diff = current - previous;
      let newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, threshold));
    });
  }, [threshold, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}

export function LandingHeader() {
  let { scrollYBoundedProgress } = useBoundedScroll(400);
  let scrollYBoundedProgressDelayed = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1]
  );
  const router = useRouter();
  return (
    <motion.header
      style={{
        height: useTransform(scrollYBoundedProgressDelayed, [0, 1], [80, 50]),
      }}
      className="fixed z-20 inset-x-0 flex h-20 shadow bg-white/85 backdrop-blur-md"
    >
      <div className="mx-auto max-w-screen-2xl flex w-full items-center justify-between sm:px-[100px] px-8">
        <motion.div
          onClick={() => router.push("/")}
          style={{
            scale: useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [1, 0.9]
            ),
          }}
          className="flex cursor-pointer origin-left items-center gap-4 text-xl"
        >
          <Image src="/icon.png" width={40} height={35} alt="Linkers logo" />{" "}
          <h1 className="md:block hidden font-MontserratAlt font-extrabold">
            SidePro
          </h1>
        </motion.div>
        <motion.nav
          style={{
            opacity: useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [1, 0]
            ),
          }}
          className="flex items-center gap-4 text-sm font-medium  "
        >
          <Sheet>
            <SheetTrigger>
              <Menu className="text-noir sm:hidden" />
            </SheetTrigger>
            <SheetContent className="sm:w-72 overflow-y-scroll">
              <>
                <ul className="flex flex-col gap-8">
                  <li className="border-b">
                    <a href="#about" className="font-bold text-noir">
                      Explore
                    </a>
                  </li>
                  <li className="border-b">
                    <SignInButton />
                  </li>
                </ul>
              </>
            </SheetContent>
          </Sheet>
          <div className="hidden items-center gap-5 sm:flex">
            <Link
              href={"#howworks"}
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Explore
            </Link>
            <SignInButton />
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}

let clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);
