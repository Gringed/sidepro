"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Montserrat_Alternates } from "next/font/google";
import Image from "next/image";
import { CheckCircle2Icon, Info } from "lucide-react";
import { useRouter } from "next/navigation";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    complete: boolean;
  }[];
}
const alternate = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["100", "200", "700", "800", "600"],
});
export function SidebarNav({ items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="hidden h-screen w-72 bg-secondary p-5 shadow-xl border-r-4 border-primary shadow-purple-200/50 lg:flex flex-col justify-between">
      <div className="font-bold text-2xl  ">
        <h1>
          Content{" "}
          <span className="text-white justify-center p-1 bg-primary">
            Creator
          </span>
        </h1>
      </div>
      <div className=" font-medium  flex flex-col items-center gap-5">
        <Info />
        <p className="text-justify text-sm">
          Please fill in all fields to continue with the application
        </p>

        <nav
          className={cn(
            "flex w-full space-x-2 lg:flex-col lg:space-x-0 gap-4  overflow-y-auto lg:space-y-1"
          )}
          {...props}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-noir hover:bg-noir text-white"
                  : "hover:bg-transparent hover:underline",
                item.complete &&
                  "bg-green-500 hover:bg-green-500 !justify-between",
                "justify-start"
              )}
            >
              {item.title}
              {item.complete && <CheckCircle2Icon size={15} />}
            </Link>
          ))}
        </nav>
      </div>
      <Button
        onClick={() => router.push("/onboarding")}
        variant={"link"}
        className="hover:scale-125 duration-200 transition"
      >
        <div
          className={cn(
            " items-center justify-center gap-2 flex",
            alternate.className
          )}
        >
          <Image src="/icon2.svg" width={35} height={30} alt="Linkers logo" />{" "}
          <h1 className="text-xl text-primary hidden  md:flex font-extrabold tracking-tighter ">
            Linkers
          </h1>
        </div>
      </Button>
    </aside>
  );
}
