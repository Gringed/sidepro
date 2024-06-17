import { currentUser } from "@/auth/current-user";
import { PageParams } from "@/lib/types/next";
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
  return <div></div>;
};

export default page;
