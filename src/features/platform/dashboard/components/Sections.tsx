"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { NextPage } from "next";

import { Responsive, WidthProvider, Layout, Layouts } from "react-grid-layout";
import { Input } from "@/components/ui/input";
import {
  getPreview,
  removeSectionAction,
  updateOrderDesktopSection,
  updateOrderMobileSection,
  updateSectionAction,
  updateSectionImageAction,
} from "@/lib/actions/sections/section.actions";
import { Button } from "@/components/ui/button";
import NavLinks from "../NavLinks";
import { LoggedInButton } from "@/features/auth/LoggedInButton";
import {
  Captions,
  CaptionsOff,
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

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface SectionsProps {
  user: any;
  sections: any;
  desktop: any;
  mobile: any;
  sidefolio: any;
  className?: string;
  rowHeight?: number;
}

const Sections = ({
  sections,
  sidefolio,
  user,
  desktop,
  mobile,
}: SectionsProps) => {
  const cols = { lg: 8, md: 4, sm: 2, xs: 1, xxs: 1 };
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [isFocus, setIsFocus] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [compactType, setCompactType] = useState(sidefolio?.compactType);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  const [layouts, setLayouts] = useState<Layouts>({
    lg: desktop,
    md: mobile,
    sm: mobile,
    xs: mobile,
    xxs: mobile,
  });

  // PASSER EN ARRAY dans schema et pas juste en JSON mais en JSON[]

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<string | null>(null);

  const textInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const onLayoutChange = useCallback(
    async (newLayout: any, allLayouts: any) => {
      if (currentBreakpoint === "xs") {
        setLayouts(allLayouts);
        setIsSaving(true);

        const res = await updateOrderMobileSection({
          id: sidefolio.id,
          data: newLayout,
        });
        if (res) {
          setIsSaving(false);
        }
      } else {
        setLayouts(allLayouts);
        setIsSaving(true);

        const res = await updateOrderDesktopSection({
          id: sidefolio.id,
          data: newLayout,
        });
        if (res) {
          setIsSaving(false);
        }
      }
    },

    [currentBreakpoint]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBreakpointChange = useCallback((breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  }, []);

  const handleCompactTypeChange = useCallback((prev: any) => {
    setCompactType(prev);

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
    setImgLoading(l?.id);
    const data = {
      showImage: img ? !l?.showImage : l?.showImage,
      showTitleUrl: url ? !l?.showTitleUrl : l?.showTitleUrl,
      sideId: sidefolio.id,
    };
    const res = await updateSectionImageAction({ id: l.id, data: data });
    if (res) {
      setImgLoading(null);
    }
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
  const onRemoveItem = async (i: string, image?: string) => {
    setIsSaving(true);
    try {
      await removeSectionAction({ i: i, id: sidefolio.id, image });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
      router.refresh();
    }
  };
  const handleSendReview = async () => {
    setIsLoading(true);
    try {
      await sendReviewAction(review);
      toast.success("Message sended, thanks you");
      setOpenReview(false);
    } catch (error) {
      console.log(error);
    }
    router.refresh();
    setIsLoading(false);
  };
  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className={`flex ${
        currentBreakpoint === "xs"
          ? "w-96 border-2 h-[800px] mt-10 overflow-scroll rounded-[60px] shadow-2xl"
          : "w-full h-max"
      }   mb-20`}
    >
      <div className="w-full">
        <div className=" fixed z-[9999] flex bottom-5 left-1/2 -translate-x-2/4 rounded-md shadow bg-white/85 backdrop-blur-md">
          <div className="mx-auto p-2 border flex w-full items-center rounded-md shadow-lg  justify-between px-4">
            <div className="flex origin-left  items-center gap-2 text-xl">
              {/* <Image src="/icon.svg" width={30} height={30} alt="SidePro Logo" />{" "} */}
              <NavLinks
                currentBreakpoint={currentBreakpoint}
                setCurrentBreakpoint={setCurrentBreakpoint}
                sidefolio={sidefolio}
                isSaving={isSaving}
                handleCompactTypeChange={handleCompactTypeChange}
                compactType={compactType}
                sections={sections}
                user={user}
              />
              <div className=" items-center gap-2 flex">
                <LoggedInButton user={user} sidefolio={sidefolio} />
                <Dialog open={openReview} onOpenChange={setOpenReview}>
                  <DialogTrigger asChild>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      <MessageCircleHeart size={17} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        Leave a review and support{" "}
                        <HeartFilledIcon className="text-red-500" />
                      </DialogTitle>
                      <DialogDescription>
                        If you like it and have any idea to improve this app,
                        please leave me a review
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                      <div className="h-full w-full">
                        <Textarea
                          placeholder="Leave anything can help us, thanks"
                          className=" text-base   h-full border-0  w-full"
                          required
                          onChange={(e) => setReview(e.target.value)}
                        />
                        <div className="absolute right-2">
                          {isLoading && (
                            <Loader2 size={20} className=" animate-spin" />
                          )}
                        </div>
                      </div>
                    </div>
                    <DialogFooter className="flex !justify-between items-center">
                      <Button
                        type="button"
                        disabled={isLoading}
                        onClick={handleSendReview}
                      >
                        {isLoading && (
                          <Loader2 size={20} className=" animate-spin" />
                        )}
                        Send
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
          breakpoint={currentBreakpoint}
          cols={cols}
          margin={[30, 30]}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          preventCollision={!compactType}
          {...{ rowHeight: 70 }}
        >
          {sections.map((l: any, i: any) => (
            <div
              id={l.id}
              key={l.i}
              className={
                "border border-gray-300/50 shadow hover:shadow-md group/item hover:z-50 rounded-md bg-white relative  flex justify-start cursor-grab"
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
                      className="z-0 h-full overflow-auto w-full flex gap-2 items-start cursor-pointer break-all justify-center"
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
                          !l?.showImage && !l?.showTitleUrl ? "hidden" : "flex"
                        } ${
                          imgLoading === l.id && "opacity-30"
                        } flex-col h-full w-full relative  gap-3`}
                      >
                        {imgLoading === l.id && (
                          <Loader2 className=" absolute top-1/2 left-[45%]  animate-spin" />
                        )}
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
                            style={{ color: l?.color ? `${l.color}` : "black" }}
                          >
                            {l.link?.title}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                  <span
                    className="absolute group/span opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 transition-all hover:bg-gray-50 hover:shadow-md -right-2 p-2 shadow -m-1 bg-white rounded-full z-50 -top-2 cursor-pointer"
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
                          onClick={() =>
                            handleChangeImageOptions(l, true, false)
                          }
                          className="p-1 text-primary cursor-pointer bg-white border  rounded-full"
                          size={25}
                        />
                      ) : (
                        <ImageOff
                          onClick={() =>
                            handleChangeImageOptions(l, true, false)
                          }
                          className="p-1 text-primary cursor-pointer bg-white border  rounded-full"
                          size={25}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {l?.showTitleUrl ? (
                        <Captions
                          onClick={() =>
                            handleChangeImageOptions(l, false, true)
                          }
                          className="p-1 text-primary cursor-pointer bg-white border  rounded-full"
                          size={25}
                        />
                      ) : (
                        <CaptionsOff
                          onClick={() =>
                            handleChangeImageOptions(l, false, true)
                          }
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
                    style={{
                      background: l?.background ? `${l.background}` : "white",
                    }}
                  >
                    <div
                      className={"absolute dragMe top-0 left-0 h-full w-full"}
                    />
                    <div
                      style={{ scrollbarWidth: "none" }}
                      className=" overflow-hidden h-full w-full flex  items-center  break-all justify-center"
                    >
                      {l?.image && (
                        <img
                          className=" object-cover w-full h-full rounded-md"
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
                  <span
                    className="absolute group/span opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 transition-all hover:bg-gray-50 hover:shadow-md -right-2 p-2 shadow -m-1 bg-white rounded-full z-20 -top-2 cursor-pointer"
                    onClick={() => onRemoveItem(l.i, l.image)}
                  >
                    <Trash className="text-primary" size={15} />
                  </span>
                  <div className="bg-primary flex rounded-full gap-3 cursor-auto px-2 py-1 opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 absolute z-50 left-1/2 -translate-x-2/4 -bottom-7 transition-all items-center justify-center">
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
    </div>
  );
};

export default Sections;
