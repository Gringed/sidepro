"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignInButton } from "@/features/auth/SignInButton";
import { LandingHeader } from "@/features/landing/LandingHeader";
import { Section } from "@/features/landing/Section";
import { CopyrightIcon, Menu } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col">
      <div className="h-[80px]" />
      <div className="fixed z-20 inset-x-0 flex h-20 shadow bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-screen-2xl flex w-full items-center justify-between sm:px-[100px] px-8">
          <div
            onClick={() => router.push("/")}
            className="flex cursor-pointer origin-left items-center gap-2 text-xl"
          >
            <Image src="/icon.svg" width={30} height={30} alt="Linkers logo" />{" "}
            <h1 className="md:block hidden font-MontserratAlt font-extrabold">
              Sidepro
            </h1>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium  ">
            <div className="hidden items-center gap-5 sm:flex">
              <SignInButton />
            </div>
          </nav>
        </div>
      </div>
      <Section className="mx-auto flex-wrap mt-auto py-20  max-w-7xl gap-16 sm:gap-y-24 grid lg:grid-cols-2 lg:items-center">
        <div className="w-full h-full object-cover">
          <img
            src="http://res.cloudinary.com/dhgoagdvr/image/upload/v1720096078/Sidepro/e6el4o0kji4zpwjlw8w9.png"
            alt=""
          />
        </div>
        <div className=" w-full flex flex-col gap-4 items-start">
          <div className="text-3xl font-bold tracking-tight text-gray-900  sm:text-4xl lg:text-5xl">
            <span className="text-primary">Sign in</span> or{" "}
            <span className="text-primary">Sign up</span> to continue
          </div>
          <Button
            variant={"outline"}
            onClick={() => {
              signIn("google", { redirect: true, callbackUrl: "/dashboard" });
            }}
            className="flex gap-3  h-full items-center"
          >
            <img
              loading="lazy"
              height="24"
              width="24"
              id="provider-logo"
              src="https://authjs.dev/img/providers/google.svg"
            />
            Sign in with Google
          </Button>
        </div>
      </Section>
      <footer className="mt-auto w-full bottom-0">
        <div className="w-full relative bg-primary text-white  border-t-4 border-black">
          <Section className="py-4">
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
      </footer>
    </div>
  );
};

export default page;
