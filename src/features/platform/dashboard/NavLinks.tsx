"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <nav className={cn("hidden sm:flex items-center space-x-4 lg:space-x-6")}>
      <Link
        href="/dashboard"
        className={`${
          pathname === "/dashboard"
            ? "font-extrabold text-tertiary  transition-all"
            : "font-medium"
        } text-base hover:text-primary`}
      >
        Overview
      </Link>
      <Link
        href="/dashboard/creatives"
        className={`${
          pathname === "/dashboard/creatives"
            ? "font-extrabold text-tertiary  transition-all"
            : "font-medium"
        } text-base hover:text-primary`}
      >
        Customers
      </Link>
      <Link
        href="/dashboard/settings"
        className={`${
          pathname === "/dashboard/settings"
            ? "font-extrabold text-tertiary  transition-all"
            : "font-medium"
        } text-base hover:text-primary`}
      >
        Settings
      </Link>
    </nav>
  );
};

export default NavLinks;
