import { currentUser } from "@/auth/current-user";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageParams } from "@/lib/types/next";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import React from "react";
import SectionsPreview from "@/features/platform/preview/components/SectionsPreview";
import PublishedSections from "@/features/platform/published/PublishedSections";
import { signInAction } from "@/features/auth/auth.action";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signIn } from "@/auth/auth";
import { SignInButton } from "@/features/auth/SignInButton";
import { LoggedInButton } from "@/features/auth/LoggedInButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShinyButton from "@/components/magicui/shiny-button";
const page = async (props: PageParams<{ slug: string }>) => {
  const user = await currentUser();
  if (!props.params.slug) {
    redirect("/dashboard");
  }

  const sidefolio = await prisma.sidefolio.findFirst({
    where: {
      slug: decodeURI(props.params.slug),
      publish: true,
    },
  });
  const sections = await prisma.section.findMany({
    where: {
      sideId: sidefolio?.id,
    },
  });
  console.log(sidefolio);
  return (
    <>
      {sidefolio ? (
        <div>
          <div className="fixed bottom-5 right-5 bg-transparent p-2   z-50">
            {user ? (
              <Link
                href={"/dashboard"}
                className="relative cursor-pointer hover:bg-slate-200 transition-all rounded-md p-2 flex items-center gap-2 w-fit"
              >
                <Avatar className="size-6  ">
                  <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                  {user.image ? (
                    <AvatarImage
                      src={user.image}
                      alt={`${user.name ?? "-"}'s profile picture`}
                    />
                  ) : null}
                </Avatar>
                <span className="text-sm font-medium">My sidefolio</span>
              </Link>
            ) : (
              <>
                {/* <Link
                href={"/api/auth/signin"}
                className="relative cursor-pointer hover:bg-slate-200 transition-all rounded-md p-2 flex items-center gap-2 w-fit"
                >
                <Avatar className="size-6  ">
                <AvatarFallback>{"S"}</AvatarFallback>
                
                <AvatarImage
                src={"./icon.svg"}
                className=" object-cover border rounded-full"
                alt={`logo}'s profile picture`}
                />
                </Avatar>
                <span className="text-sm font-medium">Create my sidefolio</span>
                </Link> */}
                <ShinyButton text="Create my sidefolio" />
              </>
            )}
          </div>
          <PublishedSections sections={sections} sidefolio={sidefolio} />
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center flex-col gap-4">
          <div>
            The{" "}
            <span className="font-bold text-primary">
              {decodeURI(props.params.slug)}
            </span>{" "}
            sidefolio doesn't exist now or it's not pusblished, create it for
            now 😉
          </div>
          {user ? (
            <Link
              href={"/dashboard"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Go to my dashboard
            </Link>
          ) : (
            <SignInButton />
          )}
        </div>
      )}
    </>
  );
};

export default page;
