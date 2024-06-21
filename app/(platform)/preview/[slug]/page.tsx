import { currentUser } from "@/auth/current-user";
import { Button, buttonVariants } from "@/components/ui/button";
import { SignInButton } from "@/features/auth/SignInButton";
import Sections from "@/features/platform/dashboard/components/Sections";
import SectionsPreview from "@/features/platform/preview/components/SectionsPreview";
import { PageParams } from "@/lib/types/next";
import { cn } from "@/lib/utils";
import { prisma } from "@/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async (props: PageParams<{ slug: string }>) => {
  const user = await currentUser();
  if (!props.params.slug) {
    redirect("/dashboard");
  }
  if (!user) {
    redirect("/");
  }
  const sidefolio = await prisma.sidefolio.findFirst({
    where: {
      authorId: user.id,
      slug: props.params?.slug,
    },
  });
  const sections = await prisma.section.findMany({
    where: {
      sideId: sidefolio?.id,
    },
  });
  const sectionIds = sections?.map((section) => section.id);
  const desktop = await prisma.desktop.findMany({
    where: {
      desktopSectionId: { in: sectionIds },
    },
    select: {
      x: true,
      y: true,
      i: true,
      w: true,
      h: true,
    },
  });
  const mobile = await prisma.mobile.findMany({
    where: {
      desktopSectionId: { in: sectionIds },
    },
    select: {
      x: true,
      y: true,
      i: true,
      w: true,
      h: true,
    },
  });

  return (
    <div className="flex justify-center h-max">
      {sidefolio ? (
        <SectionsPreview
          desktop={desktop}
          mobile={mobile}
          sections={sections}
          user={user}
          sidefolio={sidefolio}
        />
      ) : (
        <div className="h-screen w-full flex justify-center items-center flex-col gap-4">
          You are not the owner of this sidefolio or you are not logged in. If
          this is the case, please log in.
          {user ? (
            <Link
              className={cn(buttonVariants({ variant: "default" }))}
              href={"/dashboard"}
            >
              Back to my dashboard
            </Link>
          ) : (
            <SignInButton />
          )}
        </div>
      )}
    </div>
  );
};

export default page;
