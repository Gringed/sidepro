"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signInAction } from "./auth.action";

export const SignInButton = () => {
  return (
    <Button
      variant="default"
      onClick={() => {
        signInAction();
      }}
    >
      Enroll now
    </Button>
  );
};
