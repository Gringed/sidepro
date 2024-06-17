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
const page = async (props: PageParams<{ slug: string }>) => {
  const user = await currentUser();
  if (!props.params.slug) {
    redirect("/dashboard");
  }

  const sidefolio = await prisma.sidefolio.findFirst({
    where: {
      slug: props.params?.slug,
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
          <PublishedSections sections={sections} sidefolio={sidefolio} />
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center flex-col gap-4">
          <div>
            The{" "}
            <span className="font-bold text-primary">{props.params.slug}</span>{" "}
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
