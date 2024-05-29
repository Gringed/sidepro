"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Montserrat_Alternates } from "next/font/google";

import { signOut } from "next-auth/react";
import { buttonVariants } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}
const alternate = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["100", "200", "700", "800", "600"],
});
export const MobileNav = ({ className, items, ...props }: SidebarNavProps) => {
  const pathname = usePathname();

  return (
    <header className=" flex justify-between fixed  w-full border-b-4 border-primary/5 bg-background p-5 lg:hidden">
      <Link
        href={"/dashboard"}
        className="hover:scale-125 duration-200 transition"
      >
        <div
          className={cn(
            " items-center justify-center flex",
            alternate.className
          )}
        >
          <Image src="/icon.svg" width={50} height={30} alt="Linkers logo" />{" "}
          <h1 className="text-2xl hidden  md:flex font-extrabold tracking-tighter ">
            Linkers
          </h1>
        </div>
      </Link>

      <nav className="flex items-center gap-4" {...props}>
        <Link
          className=" rounded-full transition-all  hover:shadow"
          href={"/profile"}
        ></Link>
        <Sheet>
          <SheetTrigger>
            <Menu className="text-noir" />
          </SheetTrigger>
          <SheetContent className="sheet-content sm:w-72 overflow-y-scroll">
            <>
              <div
                className={cn(
                  " items-center justify-center flex",
                  alternate.className
                )}
              >
                <Image
                  src="/icon.svg"
                  width={50}
                  height={30}
                  alt="Linkers logo"
                />{" "}
                <h1 className="text-2xl hidden  md:flex font-extrabold tracking-tighter ">
                  Linkers
                </h1>
              </div>
              <ul className="mt-8 flex w-full flex-col items-start gap-5">
                {items?.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      pathname === item.href
                        ? "bg-noir hover:bg-noir text-white"
                        : "hover:bg-transparent hover:underline",
                      "w-full justify-start"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </ul>
              <hr />
              <ul className="mt-8 flex w-full flex-col items-start gap-5">
                <li className={`p-18 flex w-full  text-dark-700`}>
                  <button
                    className="sidebar-link cursor-pointer"
                    onClick={async () => {
                      await signOut();
                    }}
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </li>
              </ul>
            </>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
