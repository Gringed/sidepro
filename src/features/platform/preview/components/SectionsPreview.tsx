"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { NextPage } from "next";

import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import { Input } from "@/components/ui/input";
import {
  getPreview,
  removeSectionAction,
  updateOrderSectionB,
  updateSectionAction,
  updateSectionImageAction,
} from "@/lib/actions/sections/section.actions";
import { Button, buttonVariants } from "@/components/ui/button";

import { LoggedInButton } from "@/features/auth/LoggedInButton";
import {
  Captions,
  CaptionsOff,
  Edit2,
  Heart,
  ImageIcon,
  ImageOff,
  Loader2,
  LoaderIcon,
  Locate,
  MapPin,
  MessageCircleHeart,
  MessageCircleWarning,
  PaintBucket,
  Share2,
  Trash,
  Trash2,
  Type,
  X,
} from "lucide-react";

import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  sendReviewAction,
  updateSidefolioAction,
} from "@/lib/actions/sidefolio/sidefolio.actions";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface SectionsProps {
  user: any;
  sections: any;
  sidefolio: any;
  className?: string;
  rowHeight?: number;
}

const Sections = ({ sections, sidefolio, user }: SectionsProps) => {
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");

  const [compactType, setCompactType] = useState(sidefolio?.compactType);

  const [mounted, setMounted] = useState(false);
  const [layouts, setLayouts] = useState<Layouts>({
    lg: sections,
    md: sections,
    sm: sections,
    xs: sections,
    xxs: sections,
  });

  const textInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onLayoutChange = useCallback(
    async (newLayout: any, allLayouts: any) => {
      console.log(newLayout);
    },

    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBreakpointChange = useCallback((breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  }, []);

  const handleLayoutChange = useCallback(
    (layout: Layout[], allLayouts: Layouts) => {
      onLayoutChange(layout, allLayouts);
    },
    [onLayoutChange]
  );

  return (
    <div className="w-full">
      <div className=" fixed z-20  flex bottom-5 left-1/2 -translate-x-2/4 rounded-full shadow bg-white/85 backdrop-blur-md">
        <div className="mx-auto py-1 border flex w-full items-center rounded-full shadow-lg  justify-between px-1">
          <div className="flex origin-left  items-center gap-4 text-xl">
            <div className=" items-center flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={"/dashboard"}
                      className={cn(
                        buttonVariants({
                          variant: "default",
                          size: "icon",
                          className: "rounded-full",
                        })
                      )}
                    >
                      <Edit2 size={17} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Back to edition</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
      <ResponsiveReactGridLayout
        layouts={layouts}
        onBreakpointChange={handleBreakpointChange}
        onLayoutChange={handleLayoutChange}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType={compactType}
        cols={cols}
        margin={[30, 30]}
        preventCollision={!compactType}
        {...{ rowHeight: 70 }}
      >
        {sections.map((l: any, i: any) => (
          <div
            id={l.id}
            key={l.i}
            className={
              "border border-gray-300/50 shadow react-grid-item-preview hover:shadow-md group/item rounded-md bg-white relative  flex justify-start cursor-grab"
            }
            data-grid={{ x: l.x, y: l.y, h: l.h, w: l.w, static: true }}
          >
            {l?.type === "TEXT" ? (
              <>
                <div
                  className={"flex  w-full rounded-md h-full items-start p-3"}
                  style={{
                    background: l?.background ? `${l.background}` : "white",
                  }}
                >
                  <Textarea
                    key={i}
                    ref={textAreaRef}
                    readOnly
                    name="title"
                    style={{ color: l?.color ? `${l.color}` : "black" }}
                    className={`  z-10 bg-transparent border-none  resize-none min-h-0 focus-visible:bg-slate-300/20 focus-visible:ring-0 shadow-none h-full  w-full p-3`}
                    defaultValue={l.title}
                    placeholder="Add a new title"
                  />
                </div>
              </>
            ) : l?.type === "TITLE" ? (
              <>
                <div
                  className={"flex  w-full rounded-md h-full items-start p-3"}
                  style={{
                    background: l?.background ? `${l.background}` : "white",
                  }}
                >
                  <Input
                    key={i}
                    ref={textInputRef}
                    name="title"
                    readOnly
                    style={{ color: l?.color ? `${l.color}` : "black" }}
                    className={`  z-10 bg-transparent border-none text-center font-bold text-sm  lg:text-3xl break-words  resize-none min-h-0 focus-visible:bg-slate-300/20 focus-visible:ring-0 shadow-none h-full  w-full p-3`}
                    defaultValue={l.title}
                    placeholder="Add a new title"
                  />
                </div>
              </>
            ) : l?.type === "ME" ? (
              <>
                <div
                  key={i}
                  className={
                    "flex flex-col overflow-auto  w-full rounded-md h-full items-start justify-start gap-6 p-3"
                  }
                  style={{
                    background: l?.background ? `${l.background}` : "white",
                    scrollbarWidth: "none",
                  }}
                >
                  <Avatar className="size-32 cursor-pointer ">
                    <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                    {user.image ? (
                      <AvatarImage
                        src={user.image}
                        className=" object-cover"
                        alt={`${user.name ?? "-"}'s profile picture`}
                      />
                    ) : null}
                  </Avatar>

                  <Input
                    ref={textInputRef}
                    name="name"
                    readOnly
                    style={{ color: l?.color ? `${l.color}` : "black" }}
                    className={`  z-10 bg-transparent border-none text-left font-bold text-sm h-fit  lg:text-3xl break-words  resize-none min-h-0 focus-visible:bg-slate-300/20 focus-visible:ring-0 shadow-none  w-full p-3`}
                    defaultValue={l.name}
                    placeholder="Add a new name"
                  />

                  <Textarea
                    ref={textAreaRef}
                    name="bio"
                    readOnly
                    style={{
                      color: l?.color ? `${l.color}` : "black",
                      scrollbarWidth: "none",
                    }}
                    className={`  z-10 bg-transparent border-none text-base   resize-none min-h-20 focus-visible:bg-slate-300/20 focus-visible:ring-0 shadow-none h-full  w-full p-3`}
                    defaultValue={l.bio}
                    placeholder="Add a new bio"
                  />
                  <div className="z-10 w-full flex items-center gap-1">
                    <span>
                      <MapPin size={20} className="ms-2 text-primary" />
                    </span>
                    <Input
                      ref={textInputRef}
                      name="location"
                      readOnly
                      style={{ color: l?.color ? `${l.color}` : "black" }}
                      className={`   z-10 bg-transparent border-none text-left font-bold text-sm h-fit break-words  resize-none min-h-0 focus-visible:bg-slate-300/20 focus-visible:ring-0 shadow-none  w-full p-3`}
                      defaultValue={l.location}
                      placeholder="Add a new location"
                    />
                  </div>
                </div>
              </>
            ) : l?.type === "LINK" ? (
              <>
                <div
                  className={"flex  w-full rounded-md h-full items-start p-3"}
                  style={{
                    background: l?.background ? `${l.background}` : "white",
                  }}
                >
                  <Link
                    target="_blank"
                    href={l?.link.url}
                    style={{ scrollbarWidth: "none" }}
                    className="z-10 h-full overflow-auto w-full flex gap-2 items-start cursor-pointer break-all justify-center"
                  >
                    <Avatar className="size-10 border shadow-md h-fit object-cover p-0.5">
                      <AvatarFallback>{l.link?.title[0]}</AvatarFallback>
                      {l.link?.favicons ? (
                        <AvatarImage
                          src={
                            l?.link.url?.split("/")[2] === "read.cv"
                              ? l.link?.favicons[1]?.href
                              : l.link?.favicons[0]?.href
                          }
                          className=" object-cover rounded-full"
                          alt={`${l?.link && l.link.title} picture`}
                        />
                      ) : null}
                    </Avatar>
                    <div
                      className={`${
                        !l?.showImage && !l?.showTitleUrl ? "hidden" : "flex"
                      }  flex-col h-full w-full relative  gap-3`}
                    >
                      {l?.showImage && (
                        <img
                          className=" object-cover w-fit rounded-md"
                          src={l.link?.["og:image"]}
                          alt=""
                        />
                      )}
                      {l?.showTitleUrl && (
                        <span
                          className=" break-normal"
                          style={{ color: l?.color ? `${l.color}` : "black" }}
                        >
                          {l.link?.title}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div
                  className={"flex  w-full rounded-md h-full items-start p-3"}
                  style={{
                    background: l?.background ? `${l.background}` : "white",
                  }}
                >
                  <div
                    style={{ scrollbarWidth: "none" }}
                    className=" overflow-hidden h-full w-full flex gap-2 items-center  break-all justify-center"
                  >
                    {l?.image && (
                      <img
                        className=" object-cover w-fit rounded-md"
                        src={l.image}
                        alt=""
                      />
                    )}
                    {l?.showTitleUrl && (
                      <span
                        style={{ color: l?.color ? `${l.color}` : "black" }}
                      >
                        {l.link?.title}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Sections;
