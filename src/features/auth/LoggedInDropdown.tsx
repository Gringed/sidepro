"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { CreditCard, Home, Loader2, LogOut, Square } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { toast } from "sonner";
import { signOutAction } from "./auth.action";

export type LoggedInDropdownProps = PropsWithChildren;

export const LoggedInDropdown = (props: LoggedInDropdownProps) => {
  const router = useRouter();

  /*  const stripeSettingsMutation = useMutation({
      mutationFn: () => setupCustomerPortal(""),
      onSuccess: ({ data, serverError }) => {
        if (serverError || !data) {
          toast.error(serverError);
          return;
        }
  
        router.push(data);
      },
    }); */

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{props.children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="focus:bg-tertiary focus:text-white cursor-pointer font-medium"
          onClick={() => {
            signOutAction();
          }}
        >
          <LogOut size={16} className="mr-2" />
          Logout
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
