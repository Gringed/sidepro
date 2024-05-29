"use client";
import { Button } from "@/components/ui/button";
import { signOutAction } from "./auth.action";
import { LogOut } from "lucide-react";

export const LogOutButton = () => {
  return (
    <Button
      variant="ghost"
      className="flex gap-2 font-semibold"
      onClick={() => {
        signOutAction();
      }}
    >
      <LogOut size={15} /> Logout
    </Button>
  );
};
