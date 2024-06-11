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
import { Button } from "@/components/ui/button";
import NavLinks from "../NavLinks";
import { LoggedInButton } from "@/features/auth/LoggedInButton";
import {
  Captions,
  CaptionsOff,
  ImageIcon,
  ImageOff,
  Loader2,
  LoaderIcon,
  Locate,
  MapPin,
  PaintBucket,
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
import { updateSidefolioAction } from "@/lib/actions/sidefolio/sidefolio.actions";
import Link from "next/link";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface SectionsProps {
  user: any;
  sections: any;
  sidefolio: any;
  className?: string;
  rowHeight?: number;
}

const Sections = ({ sections, sidefolio, user }: SectionsProps) => {
  const generateLayout = (): Layout[] => {
    return sections.map((item: any, i: number) => {
      const y = Math.ceil(Math.random() * 4) + 1;
      return {
        x: (Math.floor(Math.random() * 6) * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
        static: 0,
      };
    });
  };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [isFocus, setIsFocus] = useState(false);
  const [compactType, setCompactType] = useState(sidefolio?.compactType);
  const [mounted, setMounted] = useState(false);
  const [layouts, setLayouts] = useState<Layouts>({
    lg: sections,
    md: sections,
    sm: sections,
    xs: sections,
    xxs: sections,
  });
  const [layout, setLayout] = useState([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<string | null>(null);

  const textInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const onLayoutChange = useCallback(
    async (newLayout: any, allLayouts: any) => {
      setLayout(newLayout);
      console.log(newLayout);
      setLayouts(allLayouts);
      setIsSaving(true);
      try {
        await updateOrderSectionB({
          id: sidefolio.id,
          data: newLayout,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsSaving(false);
      }
    },

    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBreakpointChange = useCallback((breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  }, []);

  const handleCompactTypeChange = useCallback((prev: any) => {
    setCompactType(prev);
    console.log(compactType);
    updateSidefolioAction({
      id: sidefolio.id,
      data: { compactType: prev },
    });
  }, []);

  const handleLayoutChange = useCallback(
    (layout: Layout[], allLayouts: Layouts) => {
      onLayoutChange(layout, allLayouts);
    },
    [onLayoutChange]
  );

  const saveChanges = useCallback(
    async (name: any, newValue: any, l: any) => {
      const formData = { sideId: sidefolio.id, [name]: newValue };

      setIsSaving(true);

      try {
        await updateSectionAction({ id: l.id, data: formData });
        router.refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsSaving(false);
      }
    },
    [sidefolio]
  );
  const handleChangeImageOptions = async (
    l: any,
    img: boolean,
    url: boolean
  ) => {
    console.log(l);
    setImgLoading(l?.id);
    const data = {
      showImage: img ? !l?.showImage : l?.showImage,
      showTitleUrl: url ? !l?.showTitleUrl : l?.showTitleUrl,
      sideId: sidefolio.id,
    };
    await updateSectionImageAction({ id: l.id, data: data });
    router.refresh();
    setImgLoading(null);
  };
  const handleChange = async (e: React.ChangeEvent<any>, l: any) => {
    e.preventDefault();
    const newValue = e.target.value;
    const name = e.target.name;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      saveChanges(name, newValue, l);
    }, 3000);
  };
  const handleTextColorChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    l: any
  ) => {
    e.preventDefault();
    const newValue = e.target.value;
    const name = e.target.name;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      saveChanges(name, newValue, l);
    }, 100);
  };
  const handleBackgroundColorChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    l: any
  ) => {
    e.preventDefault();
    const newValue = e.target.value;
    const name = e.target.name;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      saveChanges(name, newValue, l);
    }, 100);
  };
  const onRemoveItem = async (i: string) => {
    setIsSaving(true);
    try {
      await removeSectionAction({ i: i, id: sidefolio.id });
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full">
      <div className=" fixed z-20  flex bottom-5 left-1/2 -translate-x-2/4 rounded-md shadow bg-white/85 backdrop-blur-md">
        <div className="mx-auto py-1 border flex w-full items-center rounded-md shadow-lg  justify-between px-6">
          <div className="flex origin-left  items-center gap-4 text-xl">
            {/* <Image src="/icon.svg" width={30} height={30} alt="SidePro Logo" />{" "} */}
            <NavLinks
              sidefolio={sidefolio}
              isSaving={isSaving}
              handleCompactTypeChange={handleCompactTypeChange}
              compactType={compactType}
              sections={sections}
            />
            <div className=" items-center flex">
              <LoggedInButton user={user} sidefolio={sidefolio} />
            </div>
          </div>
        </div>
      </div>

      <ResponsiveReactGridLayout
        draggableHandle=".dragMe"
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
              "border border-gray-300/50 shadow hover:shadow-md group/item rounded-md bg-white relative  flex justify-start cursor-grab"
            }
          >
            {l?.type === "TEXT" ? (
              <>
                <div
                  className={"flex  w-full rounded-md h-full items-start p-3"}
                  style={{
                    background: l?.background ? `${l.background}` : "white",
                  }}
                >
                  <div
                    className={"absolute dragMe top-0 left-0 h-full w-full"}
                  />

                  <Textarea
                    key={i}
                    ref={textAreaRef}
                    onChange={(e) => handleChange(e, l)}
                    name="title"
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    style={{ color: l?.color ? `${l.color}` : "black" }}
                    className={` ${
                      !isFocus ? "dragMe select-none " : "select-text"
                    }  z-10 bg-transparent border-none hover:bg-slate-300/20 resize-none min-h-0 focus-visible:bg-slate-300/20 focus-visible:ring-0 shadow-none h-full  w-full p-3`}
                    defaultValue={l.title}
                    placeholder="Add a new title"
                  />
                </div>
                <span
                  className="absolute group/span opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 transition-all hover:bg-gray-50 hover:shadow-md -right-2 p-2 shadow -m-1 bg-white rounded-full z-20 -top-2 cursor-pointer"
                  onClick={() => onRemoveItem(l.i)}
                >
                  <Trash className="text-primary" size={15} />
                </span>
                <div className="bg-primary flex rounded-full gap-3 cursor-auto px-2 py-1 opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 absolute z-20 left-1/2 -translate-x-2/4 -bottom-5 transition-all items-center justify-center">
                  <div className="flex items-center gap-1">
                    <Type className="text-white" size={15} />
                    <Input
                      name="color"
                      type="color"
                      defaultValue={l?.color}
                      onChange={(e) => handleTextColorChange(e, l)}
                      className="w-6 h-6 p-0 border-none"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <PaintBucket className="text-white" size={15} />
                    <Input
                      name="background"
                      type="color"
                      defaultValue={l?.background || "#FFFFFF"}
                      onChange={(e) => handleBackgroundColorChange(e, l)}
                      className="w-6 h-6 p-0 border-none"
                    />
                  </div>
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
                  <div
                    className={"absolute dragMe top-0 left-0 h-full w-full"}
                  />

                  <Input
                    key={i}
                    ref={textInputRef}
                    onChange={(e) => handleChange(e, l)}
                    name="title"
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    style={{ color: l?.color ? `${l.color}` : "black" }}
                    className={` ${
                      !isFocus ? "dragMe select-none " : "select-text"
                    }  z-10 bg-transparent border-none text-center font-bold text-sm  lg:text-3xl break-words hover:bg-slate-300/20 resize-none min-h-0 focus-visible:bg-slate-300/20 focus-visible:ring-0 shadow-none h-full  w-full p-3`}
                    defaultValue={l.title}
                    placeholder="Add a new title"
                  />
                </div>
                <span
                  className="absolute group/span opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 transition-all hover:bg-gray-50 hover:shadow-md -right-2 p-2 shadow -m-1 bg-white rounded-full z-20 -top-2 cursor-pointer"
                  onClick={() => onRemoveItem(l.i)}
                >
                  <Trash className="text-primary" size={15} />
                </span>
                <div className="bg-primary flex rounded-full gap-3 cursor-auto px-2 py-1 opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 absolute z-50 left-1/2 -translate-x-2/4 -bottom-7 transition-all items-center justify-center">
                  <div className="flex items-center gap-1">
                    <Type className="text-white" size={15} />
                    <Input
                      name="color"
                      type="color"
                      defaultValue={l?.color}
                      onChange={(e) => handleTextColorChange(e, l)}
                      className="w-6 h-6 p-0 border-none"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <PaintBucket className="text-white" size={15} />
                    <Input
                      name="background"
                      type="color"
                      defaultValue={l?.background || "#FFFFFF"}
                      onChange={(e) => handleBackgroundColorChange(e, l)}
                      className="w-6 h-6 p-0 border-none"
                    />
                  </div>
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
                  <div
                    className={"absolute dragMe top-0 left-0 h-full w-full"}
                  />
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
                    onChange={(e) => handleChange(e, l)}
                    name="name"
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    style={{ color: l?.color ? `${l.color}` : "black" }}
                    className={` ${
                      !isFocus ? "dragMe select-none " : "select-text"
                    }  z-10 bg-transparent border-none text-left font-bold text-sm h-fit  lg:text-3xl break-words hover:bg-slate-300/20 resize-none min-h-0 focus-visible:bg-slate-300/20 focus-visible:ring-0 shadow-none  w-full p-3`}
                    defaultValue={l.name}
                    placeholder="Add a new name"
                  />

                  <Textarea
                    ref={textAreaRef}
                    onChange={(e) => handleChange(e, l)}
                    name="bio"
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    style={{
                      color: l?.color ? `${l.color}` : "black",
                      scrollbarWidth: "none",
                    }}
                    className={` ${
                      !isFocus ? "dragMe select-none " : "select-text"
                    }  z-10 bg-transparent border-none text-base  hover:bg-slate-300/20 resize-none min-h-20 focus-visible:bg-slate-300/20 focus-visible:ring-0 shadow-none h-full  w-full p-3`}
                    defaultValue={l.bio}
                    placeholder="Add a new bio"
                  />
                  <div className="z-10 w-full flex items-center gap-1">
                    <span>
                      <MapPin size={20} className="ms-2 text-primary" />
                    </span>
                    <Input
                      ref={textInputRef}
                      onChange={(e) => handleChange(e, l)}
                      name="location"
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      style={{ color: l?.color ? `${l.color}` : "black" }}
                      className={` ${
                        !isFocus ? "dragMe select-none " : "select-text"
                      }  z-10 bg-transparent border-none text-left font-bold text-sm h-fit break-words hover:bg-slate-300/20 resize-none min-h-0 focus-visible:bg-slate-300/20 focus-visible:ring-0 shadow-none  w-full p-3`}
                      defaultValue={l.location}
                      placeholder="Add a new location"
                    />
                  </div>
                </div>
                <span
                  className="absolute group/span opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 transition-all hover:bg-gray-50 hover:shadow-md -right-2 p-2 shadow -m-1 bg-white rounded-full z-20 -top-2 cursor-pointer"
                  onClick={() => onRemoveItem(l.i)}
                >
                  <Trash className="text-primary" size={15} />
                </span>
                <div className="bg-primary flex rounded-full gap-3 cursor-auto px-2 py-1 opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 absolute z-50 left-1/2 -translate-x-2/4 -bottom-7 transition-all items-center justify-center">
                  <div className="flex items-center gap-1">
                    <Type className="text-white" size={15} />
                    <Input
                      name="color"
                      type="color"
                      defaultValue={l?.color}
                      onChange={(e) => handleTextColorChange(e, l)}
                      className="w-6 h-6 p-0 border-none"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <PaintBucket className="text-white" size={15} />
                    <Input
                      name="background"
                      type="color"
                      defaultValue={l?.background || "#FFFFFF"}
                      onChange={(e) => handleBackgroundColorChange(e, l)}
                      className="w-6 h-6 p-0 border-none"
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
                  <div
                    className={"absolute dragMe top-0 left-0 h-full w-full"}
                  />
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
                      } ${
                        imgLoading === l.id && "opacity-30"
                      } flex-col h-full w-full relative  gap-3`}
                    >
                      {imgLoading === l.id && (
                        <Loader2 className=" absolute top-1/2 left-[45%]  animate-spin" />
                      )}
                      {l?.showImage && (
                        <img
                          className=" object-cover w-fit rounded-md"
                          src={l.link?.["og:image"]}
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
                  </Link>
                </div>
                <span
                  className="absolute group/span opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 transition-all hover:bg-gray-50 hover:shadow-md -right-2 p-2 shadow -m-1 bg-white rounded-full z-20 -top-2 cursor-pointer"
                  onClick={() => onRemoveItem(l.i)}
                >
                  <Trash className="text-primary" size={15} />
                </span>
                <div className="bg-primary flex rounded-full gap-3 cursor-auto px-2 py-1 opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 absolute z-50 left-1/2 -translate-x-2/4 -bottom-7 transition-all items-center justify-center">
                  <div className="flex items-center gap-1">
                    <Type className="text-white" size={15} />
                    <Input
                      name="color"
                      type="color"
                      defaultValue={l?.color}
                      onChange={(e) => handleTextColorChange(e, l)}
                      className="w-6 h-6 p-0 border-none"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    {l?.showImage ? (
                      <ImageIcon
                        onClick={() => handleChangeImageOptions(l, true, false)}
                        className="p-1 text-primary cursor-pointer bg-white border  rounded-full"
                        size={25}
                      />
                    ) : (
                      <ImageOff
                        onClick={() => handleChangeImageOptions(l, true, false)}
                        className="p-1 text-primary cursor-pointer bg-white border  rounded-full"
                        size={25}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {l?.showTitleUrl ? (
                      <Captions
                        onClick={() => handleChangeImageOptions(l, false, true)}
                        className="p-1 text-primary cursor-pointer bg-white border  rounded-full"
                        size={25}
                      />
                    ) : (
                      <CaptionsOff
                        onClick={() => handleChangeImageOptions(l, false, true)}
                        className="p-1 text-primary cursor-pointer bg-white border  rounded-full"
                        size={25}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <PaintBucket className="text-white" size={15} />
                    <Input
                      name="background"
                      type="color"
                      defaultValue={l?.background || "#FFFFFF"}
                      onChange={(e) => handleBackgroundColorChange(e, l)}
                      className="w-6 h-6 p-0 border-none"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className={"flex  w-full rounded-md h-full items-start p-3"}
                >
                  <div
                    className={"absolute dragMe top-0 left-0 h-full w-full"}
                  />
                  <div
                    style={{ scrollbarWidth: "none" }}
                    className="z-10 h-full overflow-auto w-full flex gap-2 items-start cursor-pointer break-all justify-center"
                  >
                    {l?.image && (
                      <img
                        className=" object-cover w-fit rounded-md"
                        src={l.link?.["og:image"]}
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
                <span
                  className="absolute group/span opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 transition-all hover:bg-gray-50 hover:shadow-md -right-2 p-2 shadow -m-1 bg-white rounded-full z-20 -top-2 cursor-pointer"
                  onClick={() => onRemoveItem(l.i)}
                >
                  <Trash className="text-primary" size={15} />
                </span>
                <div className="bg-primary flex rounded-full gap-3 cursor-auto px-2 py-1 opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 absolute z-50 left-1/2 -translate-x-2/4 -bottom-7 transition-all items-center justify-center">
                  <div className="flex items-center gap-1">
                    <Type className="text-white" size={15} />
                    <Input
                      name="color"
                      type="color"
                      defaultValue={l?.color}
                      onChange={(e) => handleTextColorChange(e, l)}
                      className="w-6 h-6 p-0 border-none"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    {l?.showImage ? (
                      <ImageIcon
                        onClick={() => handleChangeImageOptions(l, true, false)}
                        className="p-1 text-primary cursor-pointer bg-white border  rounded-full"
                        size={25}
                      />
                    ) : (
                      <ImageOff
                        onClick={() => handleChangeImageOptions(l, true, false)}
                        className="p-1 text-primary cursor-pointer bg-white border  rounded-full"
                        size={25}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {l?.showTitleUrl ? (
                      <Captions
                        onClick={() => handleChangeImageOptions(l, false, true)}
                        className="p-1 text-primary cursor-pointer bg-white border  rounded-full"
                        size={25}
                      />
                    ) : (
                      <CaptionsOff
                        onClick={() => handleChangeImageOptions(l, false, true)}
                        className="p-1 text-primary cursor-pointer bg-white border  rounded-full"
                        size={25}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <PaintBucket className="text-white" size={15} />
                    <Input
                      name="background"
                      type="color"
                      defaultValue={l?.background || "#FFFFFF"}
                      onChange={(e) => handleBackgroundColorChange(e, l)}
                      className="w-6 h-6 p-0 border-none"
                    />
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
