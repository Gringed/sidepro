import React from "react";

import { redirect } from "next/navigation";
import { currentUser } from "@/auth/current-user";
import { prisma } from "@/prisma";

const PlatformLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  const sidefolio = await prisma.sidefolio.findFirst({
    where: {
      authorId: user?.id,
    },
  });
  return (
    <main className="root h-full">
      <div className="root-container bg-background h-full">
        <div
          className={`wrapper h-full`}
          style={{
            background: sidefolio?.background
              ? `url("${sidefolio.background}") center / cover no-repeat`
              : sidefolio?.color || "white",
          }}
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default PlatformLayout;
