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

import Link from "next/link";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface SectionsProps {
  sections: any;
  sidefolio: any;
  className?: string;
  rowHeight?: number;
}

const PublishedSections = ({ sections, sidefolio }: SectionsProps) => {
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBreakpointChange = useCallback((breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  }, []);

  return (
    <div className="w-full">
      <ResponsiveReactGridLayout
        layouts={layouts}
        onBreakpointChange={handleBreakpointChange}
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
              "border border-gray-300/50 shadow react-grid-item-publish hover:shadow-md group/item rounded-md bg-white relative  flex justify-start cursor-default"
            }
            data-grid={{ x: l.x, y: l.y, h: l.h, w: l.w, static: true }}
          >
            {l?.type === "TEXT" ? (
              <>
                <div
                  className={"flex  w-full rounded-md h-full items-start  p-3"}
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
                    className={`cursor-default  z-10 bg-transparent border-none  resize-none min-h-0 focus-visible:bg-slate-300/20 focus-visible:ring-0 shadow-none h-full  w-full p-3`}
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
                    className={`cursor-default  z-10 bg-transparent border-none text-center font-bold text-sm  lg:text-3xl break-words  resize-none min-h-0 focus-visible:bg-slate-300/20 focus-visible:ring-0 shadow-none h-full  w-full p-3`}
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
                    <AvatarFallback>
                      {sidefolio?.publicName?.[0]}
                    </AvatarFallback>
                    {sidefolio.publicImage ? (
                      <AvatarImage
                        src={sidefolio.publicImage}
                        className=" object-cover"
                        alt={`${sidefolio.publicName ?? "-"}'s profile picture`}
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
                    <Avatar className="size-10 border shadow-md h-fit object-cover p-1">
                      <AvatarFallback>{l.link?.title[0]}</AvatarFallback>
                      {l.link?.favicons[0]?.href ? (
                        <AvatarImage
                          src={l.link?.favicons[0]?.href}
                          className=" object-cover"
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
                    className=" overflow-hidden h-full w-full flex  pointer-events-none items-center  break-all justify-center"
                  >
                    {l?.image && (
                      <img
                        className=" object-cover w-fit  rounded-md"
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

export default PublishedSections;
