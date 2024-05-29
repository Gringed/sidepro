"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signInAction } from "./auth.action";

export const SignInButton = () => {
  return (
    <Button
      variant="cornerTl"
      onClick={() => {
        signInAction();
      }}
    >
      Enroll now
    </Button>
  );
};
