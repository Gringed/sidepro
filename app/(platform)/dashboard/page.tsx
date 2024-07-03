import { currentUser } from "@/auth/current-user";

import { redirect } from "next/navigation";

import React from "react";

import { PageParams } from "@/lib/types/next";

import { prisma } from "@/prisma";
import Sections from "@/features/platform/dashboard/components/Sections";

const Home = async (props: PageParams<{}>) => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const date = new Date();
  const expire = new Date(user?.expiresAt!!);

  const sidefolio = await prisma.sidefolio.findFirst({
    where: {
      authorId: user.id,
    },
  });
  const sections = await prisma.section.findMany({
    where: {
      sideId: sidefolio?.id,
    },
  });
  if (user?.expiresAt) {
    if (expire < date) {
      await prisma.sidefolio.update({
        where: {
          id: sidefolio?.id,
        },
        data: {
          publish: false,
          publicImage: null,
          publicName: null,
        },
      });
      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          plan: "FREEMIUM",
          expiresAt: null,
        },
      });
    }
  }
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
      {!sections ? (
        <div>Nothing</div>
      ) : (
        <Sections
          sidefolio={sidefolio}
          desktop={desktop}
          mobile={mobile}
          sections={sections}
          user={user}
        />
      )}
    </div>
  );
};

export default Home;
