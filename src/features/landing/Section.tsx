import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export type SectionProps = PropsWithChildren<{
  className?: string;
  sectionClassName?: string;
  id?: string;
}>;

export const Section = (props: SectionProps) => {
  return (
    <section>
      <div
        className={cn(
          "flex max-w-screen-2xl sm:px-[100px] justify-between items-center px-8 mx-auto gap-24",
          props.className
        )}
      >
        {props.children}
      </div>
    </section>
  );
};
