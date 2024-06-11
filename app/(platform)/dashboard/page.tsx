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

  return (
    <div className="flex   h-max">
      <div className="flex w-full h-max mb-20 mt-10 mx-10">
        <Sections sidefolio={sidefolio} sections={sections} user={user} />
      </div>
    </div>
  );
};

export default Home;
