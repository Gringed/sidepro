"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import { Input } from "@/components/ui/input";

import { MapPin } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface SectionsProps {
  sections: any;
  sidefolio: any;
  desktop: any;
  mobile: any;
}

const PublishedSections = ({
  sections,
  sidefolio,
  desktop,
  mobile,
}: SectionsProps) => {
  const cols = { lg: 8, md: 1, sm: 1, xs: 1, xxs: 1 };
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");

  const [compactType, setCompactType] = useState(sidefolio?.compactType);

  const [mounted, setMounted] = useState(false);
  const [layouts, setLayouts] = useState<Layouts>({
    lg: desktop,
    md: mobile,
    sm: mobile,
    xs: mobile,
    xxs: mobile,
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
    <div
      style={{ scrollbarWidth: "none" }}
      className={`flex ${
        currentBreakpoint === "xs"
          ? "w-96 border-2 h-[800px] overflow-scroll rounded-[60px] shadow-2xl"
          : " max-lg:max-w-xs max-xl:max-w-md w-full h-max"
      }   mb-20  mx-10`}
    >
      <div className="w-full">
        <ResponsiveReactGridLayout
          layouts={layouts}
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
            >
              {l?.type === "TEXT" ? (
                <>
                  <div
                    className={
                      "flex  w-full rounded-md h-full items-start  p-3"
                    }
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
                          alt={`${
                            sidefolio.publicName ?? "-"
                          }'s profile picture`}
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
    </div>
  );
};

export default PublishedSections;
