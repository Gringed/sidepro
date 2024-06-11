import React from "react";

import { redirect } from "next/navigation";
import { currentUser } from "@/auth/current-user";

const PlatformLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="root">
      <div className="root-container bg-background">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default PlatformLayout;
