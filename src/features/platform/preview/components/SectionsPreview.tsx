"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import { Input } from "@/components/ui/input";

import { Button, buttonVariants } from "@/components/ui/button";

import { Edit2, MapPin, Monitor, Smartphone } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface SectionsProps {
  user: any;
  sections: any;
  sidefolio: any;
  desktop: any;
  mobile: any;
}

const Sections = ({
  sections,
  sidefolio,
  user,
  desktop,
  mobile,
}: SectionsProps) => {
  const cols = { lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 };
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

  const onLayoutChange = useCallback(
    async (newLayout: any, allLayouts: any) => {
      setLayouts(allLayouts);
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
  const nameEditor = useEditor({
    content: sidefolio?.name?.replaceAll("\n\n", "<p>") || "",
    editable: false,

    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Your name",
      }),
      CharacterCount.configure({
        limit: 40,
      }),
    ],

    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl p-3 focus:outline-none",
      },
    },
  });
  const bioEditor = useEditor({
    content: sidefolio?.bio || "",
    editable: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Introduce yourself...",
        emptyNodeClass: "bio-is-empty",
      }),
      CharacterCount.configure({
        limit: 300,
      }),
    ],

    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base  no-underline lg:prose-lg xl:prose-2xl px-3 focus:outline-none",
      },
    },
  });

  const locationEditor = useEditor({
    content: sidefolio?.location || "",
    editable: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Your location",
        emptyNodeClass: "bio-is-empty",
      }),

      CharacterCount.configure({
        limit: 35,
      }),
    ],

    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base  no-underline lg:prose-lg xl:prose-2xl px-3 focus:outline-none",
      },
    },
  });
  return (
    <div
      style={{
        scrollbarWidth: "none",
        transition: "all .25s cubic-bezier(.427,.073,.105,.997) .1s",
        background: sidefolio?.background
          ? `url("${sidefolio.background}") center / cover no-repeat`
          : sidefolio?.color || "white",
      }}
      className={`flex  animate-fade  ${
        currentBreakpoint === "xs"
          ? "w-96 border-2 h-[800px] px-4 py-14 flex-col border-b-8 !opacity-100  mt-10 overflow-auto rounded-[60px] shadow-2xl"
          : `w-full h-full overflow-auto px-14 py-14 ${
              sidefolio?.sidebar === "left" ? "flex-row" : "flex-row-reverse"
            } !opacity-100`
      }  transition-all`}
    >
      <div
        className={` relative  h-full ${
          currentBreakpoint === "xs" ? "w-full h-full" : "top-[0rem] xl:sticky "
        } `}
        style={{ scrollbarWidth: "none" }}
      >
        <BlurFade inView>
          <div
            className={
              "flex flex-col  max-w  w-full rounded-md h-full items-start justify-start gap-4 px-3 py-8"
            }
            style={{
              scrollbarWidth: "none",
              minWidth: "min(500px,calc(100vw - 1000px))",
            }}
          >
            <div className="group/avatar rounded-full relative shadow-lg">
              <Avatar
                className={`${
                  currentBreakpoint === "xs" ? "size-28" : "lg:size-48 size-28"
                }  cursor-pointer `}
              >
                {sidefolio?.image ? (
                  <AvatarImage
                    src={sidefolio.image}
                    className=" object-cover"
                    alt={`${sidefolio.name ?? "-"}'s profile picture`}
                  />
                ) : (
                  <AvatarImage
                    src={"/noAvatar.png"}
                    draggable={false}
                    className=" object-cover select-none "
                  />
                )}
              </Avatar>
            </div>
            <div
              className={`w-full transition-all font-bold ${
                currentBreakpoint === "xs" ? "text-3xl" : "text-sm lg:text-5xl"
              } `}
            >
              <EditorContent spellCheck={false} editor={nameEditor} />
            </div>

            <div
              className={`w-full transition-all  ${
                currentBreakpoint === "xs" ? "text-base" : "text-sm lg:text-lg"
              } `}
            >
              <EditorContent spellCheck={false} editor={bioEditor} />
            </div>
            <div className="z-10 my-5 w-full text-sm flex items-center gap-1">
              <div className="rounded-full  ms-2 border bg-white backdrop-blur-sm shadow">
                <Image
                  src={
                    "https://www.svgrepo.com/show/235547/planet-earth-global.svg"
                  }
                  className=""
                  width={25}
                  height={25}
                  alt=""
                />
              </div>
              <EditorContent spellCheck={false} editor={locationEditor} />
            </div>
          </div>
        </BlurFade>
      </div>
      <div className="w-full pb-20">
        <div className=" fixed z-20  flex bottom-5 left-1/2 -translate-x-2/4 rounded-full shadow bg-white/85 backdrop-blur-md">
          <div className="mx-auto py-1 border flex w-full items-center rounded-full shadow-lg  justify-between px-1">
            <div className="flex origin-left  items-center gap-4 text-xl">
              <div className=" items-center flex gap-2">
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
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        className="rounded-full"
                        onClick={() =>
                          currentBreakpoint === "xs"
                            ? setCurrentBreakpoint("lg")
                            : setCurrentBreakpoint("xs")
                        }
                      >
                        {currentBreakpoint === "xs" ? (
                          <Smartphone size={17} />
                        ) : (
                          <Monitor size={17} />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Device</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
        <BlurFade inView delay={0.4} className="pb-20">
          <ResponsiveReactGridLayout
            layouts={layouts}
            measureBeforeMount={false}
            useCSSTransforms={mounted}
            compactType={compactType}
            cols={cols}
            isDraggable={false}
            isResizable={false}
            margin={[30, 30]}
            breakpoint={currentBreakpoint}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            preventCollision={!compactType}
            {...{ rowHeight: 90 }}
          >
            {sections.map((l: any, i: any) => (
              <div
                id={l.id}
                key={l.i}
                className={
                  "border border-gray-300/50 shadow react-grid-item-preview hover:shadow-md group/item rounded-md bg-white relative cursor-default  flex justify-start"
                }
              >
                {l?.type === "TEXT" ? (
                  <>
                    <div
                      className={
                        "flex  w-full rounded-md h-full items-start p-3"
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
                        className={`  z-10 bg-transparent border-none  resize-none min-h-0 focus-visible:bg-slate-300/20 focus-visible:ring-0 shadow-none h-full  w-full p-3`}
                        defaultValue={l.title}
                        placeholder="Add a new title"
                      />
                    </div>
                  </>
                ) : l?.type === "TITLE" ? (
                  <>
                    <div
                      className={
                        "flex  w-full rounded-md h-full items-start p-3"
                      }
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
                      className={
                        "flex  w-full rounded-md h-full items-start p-3"
                      }
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
                        <Avatar className="size-10 border shadow-md h-fit object-cover p-1.5">
                          <AvatarFallback>{l.link?.title[0]}</AvatarFallback>
                          {l.link?.favicons ? (
                            <object
                              data={
                                l?.link.url?.split("/")[2] === "read.cv"
                                  ? l.link?.favicons[1]?.href
                                  : l.link?.favicons[0]?.href
                              }
                              type="image/jpeg"
                              className=" object-cover w-full h-full"
                            >
                              <AvatarImage
                                src={
                                  "https://upload.wikimedia.org/wikipedia/commons/5/56/Chain_link_icon_slanted.png"
                                }
                                className=" object-cover "
                                alt={`${l?.link && l.link.title} picture`}
                              />
                            </object>
                          ) : null}
                        </Avatar>
                        <div
                          className={`${
                            !l?.showImage && !l?.showTitleUrl
                              ? "hidden"
                              : "flex"
                          }  flex-col h-full w-full relative  gap-3`}
                        >
                          {l?.showImage && (
                            <object
                              data={
                                l.link?.["og:image"] || l.link?.imgTags[0]?.src
                              }
                              type="image/jpeg"
                              className=" object-cover w-full h-full rounded-md"
                            >
                              <img
                                className=" object-cover w-full h-full rounded-md"
                                src="https://learning.knowbility.org/local/sitepages/upload/no-preview-available.png"
                                alt=""
                              />
                            </object>
                          )}
                          {l?.showTitleUrl && (
                            <span
                              className=" break-normal"
                              style={{
                                color: l?.color ? `${l.color}` : "black",
                              }}
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
                      className={
                        "absolute  rounded-md  top-0 left-0 h-full w-full"
                      }
                    >
                      <div
                        style={{
                          scrollbarWidth: "none",
                          clipPath: "inset(0px round 12px)",
                        }}
                        className={` h-full w-full`}
                      >
                        {l?.imageUrl && (
                          <>
                            <img
                              draggable="false"
                              className="absolute overflow-clip min-w-full min-h-full  rounded-md"
                              style={{
                                transform: `translate(${
                                  currentBreakpoint === "xs"
                                    ? `${l?.imageMobileX}px, ${l?.imageMobileY}px`
                                    : `${l?.imageX}px, ${l?.imageY}px`
                                })`,
                                maxWidth: "unset",
                                maxHeight: "unset",
                              }}
                              src={l.imageUrl}
                              alt=""
                            />
                          </>
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
        </BlurFade>
      </div>
    </div>
  );
};

export default Sections;
