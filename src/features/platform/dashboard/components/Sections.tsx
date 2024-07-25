"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { NextPage } from "next";
import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
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
  Crop,
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
  Upload,
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
import interact from "interactjs";
import BlurFade from "@/components/magicui/blur-fade";
import {
  updateUserAction,
  uplodadProfileImageAction,
} from "@/lib/actions/users/user.actions";
import CharacterCount from "@tiptap/extension-character-count";
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
  const [isCrop, setIsCrop] = useState("");

  const cols = { lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 };
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");
  const [isFocus, setIsFocus] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [compactType, setCompactType] = useState(sidefolio?.compactType);
  const [side, setSide] = useState(sidefolio?.sidebar);
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
  const nameEditor = useEditor({
    content:
      sidefolio?.name?.replaceAll("\n\n", "<p>") ||
      user.name?.replaceAll("\n\n", "<p>") ||
      "",
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Your name",
      }),
      CharacterCount.configure({
        limit: 40,
      }),
    ],
    async onUpdate({ editor }) {
      const text = editor.getText();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        saveSidefolioChanges("name", text);
      }, 3000);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl p-3 focus:outline-none",
      },
    },
  });
  const bioEditor = useEditor({
    content: sidefolio?.bio || "",
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Introduce yourself...",
        emptyNodeClass: `bio-is-empty`,
      }),
      CharacterCount.configure({
        limit: 300,
      }),
    ],
    async onUpdate({ editor }) {
      const text = editor.getHTML();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        saveSidefolioChanges("bio", text);
      }, 3000);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base  no-underline lg:prose-lg xl:prose-2xl px-3 focus:outline-none",
      },
    },
  });
  const DisabledEnter = Extension.create({
    addKeyboardShortcuts() {
      return {
        Enter: () => true,
      };
    },
  });
  const locationEditor = useEditor({
    content: sidefolio?.location || "",
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Your location",
        emptyNodeClass: "bio-is-empty",
      }),
      DisabledEnter,
      CharacterCount.configure({
        limit: 35,
      }),
    ],
    async onUpdate({ editor }) {
      const text = editor.getText();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        saveSidefolioChanges("location", text);
      }, 3000);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base  no-underline lg:prose-lg xl:prose-2xl px-3 focus:outline-none",
      },
    },
  });

  const handleDragImage = (l: any) => {
    const position =
      currentBreakpoint === "xs"
        ? { x: l?.imageMobileX || 0, y: l?.imageMobileY || 0 }
        : { x: l?.imageX || 0, y: l?.imageY || 0 };
    interact(".draggable").draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
        }),
      ],
      inertia: { resistance: 30, minSpeed: 200, endSpeed: 100 },
      listeners: {
        start(event) {},
        move(event) {
          position.x += event.dx;
          position.y += event.dy;

          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
            if (currentBreakpoint === "xs") {
              saveChanges("imageMobileX", position.x, l);
              saveChanges("imageMobileY", position.y, l);
            } else {
              saveChanges("imageX", position.x, l);
              saveChanges("imageY", position.y, l);
            }
          }, 1500);
        },
      },
    });
  };

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<string | null>(null);
  const [profileImageLoading, setProfileImageLoading] =
    useState<boolean>(false);

  const textInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const profileImageRef = useRef<HTMLInputElement>(null);
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
  const handleSideChange = useCallback((prev: any) => {
    setSide(prev);

    updateSidefolioAction({
      id: sidefolio.id,
      data: { sidebar: prev },
    });
  }, []);
  const handleUpdateProfileImage = async (file: any) => {
    const res = await uplodadProfileImageAction({
      sidefolio: sidefolio,
      file,
    });
    if (res) {
      setProfileImageLoading(false);
    }
  };
  const handleDeleteImageSidefolio = async () => {
    setProfileImageLoading(true);
    const res = await uplodadProfileImageAction({
      sidefolio: sidefolio,
      file: "",
      del: true,
    });
    if (res) {
      setProfileImageLoading(false);
    }
  };
  const handleLayoutChange = useCallback(
    (layout: Layout[], allLayouts: Layouts) => {
      onLayoutChange(layout, allLayouts);
    },
    [onLayoutChange]
  );
  const saveSidefolioChanges = useCallback(
    async (name: any, newValue: any) => {
      const formData = { [name]: newValue };

      setIsSaving(true);

      try {
        await updateSidefolioAction({ id: sidefolio.id, data: formData });
      } catch (error) {
        console.log(error);
      } finally {
        setIsSaving(false);
      }
    },
    [sidefolio]
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

  let newPer = nameEditor?.storage.characterCount.characters() - 40;

  const percentage = nameEditor
    ? Math.fround(
        ((nameEditor?.storage.characterCount.characters() - 29) / 10) * 1
      )
    : 0;
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
        className={`fixed ${
          side === "left" ? "left-16" : "right-16"
        }  bottom-[52px] -m-1 hidden items-center space-x-1 rounded-[12px] p-1 transition-colors xl:flex 2xl:space-x-2 duration-400 bg-white delay-500`}
      >
        Coming soon section
      </div>

      <div
        className={` relative  h-full ${
          currentBreakpoint === "xs" ? "w-full h-full" : "top-[0rem] xl:sticky "
        } `}
        style={{ scrollbarWidth: "none" }}
      >
        <BlurFade inView>
          <div
            className={
              "flex flex-col  w-full rounded-md h-full items-start justify-start gap-4 px-3 py-8"
            }
            style={{
              scrollbarWidth: "none",
              maxWidth: "min(500px,calc(100vw - 1000px))",
              width: "min(500px,calc(100vw - 1000px))",
            }}
          >
            <div className="group/avatar rounded-full relative shadow-lg">
              <Avatar
                className={`${
                  currentBreakpoint === "xs" ? "size-28" : "lg:size-48 size-28"
                }  cursor-pointer `}
              >
                {profileImageLoading ? (
                  <AvatarImage
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                    className=" object-cover"
                  />
                ) : sidefolio?.image ? (
                  <AvatarImage
                    src={sidefolio.image}
                    className=" object-cover"
                    alt={`${sidefolio.name ?? "-"}'s profile picture`}
                    onClick={() => {
                      profileImageRef.current?.click();
                    }}
                  />
                ) : (
                  <AvatarImage
                    src={"/noAvatar.png"}
                    draggable={false}
                    className=" object-cover select-none "
                    onClick={() => {
                      profileImageRef.current?.click();
                    }}
                  />
                )}
              </Avatar>

              <span
                className="absolute  opacity-0 invisible group-focus-visible/avatar:opacity-100 group-focus-visible/avatar:visible group-hover/avatar:opacity-100 group-hover/avatar:visible transition-all hover:bg-gray-50 hover:shadow-md border left-3 bottom-0 p-2 shadow  bg-white rounded-full z-20  cursor-pointer"
                onClick={() => {
                  profileImageRef.current?.click();
                }}
              >
                <Upload className="text-noir" size={17} />
              </span>
              <Input
                className=" w-full hidden"
                type="file"
                name="file"
                hidden
                ref={profileImageRef}
                onChangeCapture={async (event) => {
                  event.preventDefault();
                  setProfileImageLoading(true);
                  if (!profileImageRef.current?.files) {
                    throw new Error("No file selected");
                  }

                  const file = profileImageRef.current.files[0];
                  const formData = new FormData();
                  formData.append("file", file);
                  handleUpdateProfileImage(formData);

                  /*  */
                }}
              />
              <span
                className="absolute  opacity-0 invisible group-focus-visible/avatar:opacity-100 group-focus-visible/avatar:visible group-hover/avatar:opacity-100 group-hover/avatar:visible transition-all hover:bg-gray-50 hover:shadow-md border right-3 bottom-0 p-2 shadow  bg-white rounded-full z-20  cursor-pointer"
                onClick={handleDeleteImageSidefolio}
              >
                <Trash className="text-noir" size={17} />
              </span>
            </div>
            <div
              className={`w-full transition-all font-bold ${
                currentBreakpoint === "xs" ? "text-3xl" : "text-sm lg:text-5xl"
              } `}
            >
              <EditorContent spellCheck={false} editor={nameEditor} />
              {nameEditor?.storage.characterCount.characters() >= 30 && (
                <div
                  className={`text-xs font-extrabold text-gray-500 text-start px-3`}
                  style={{ opacity: percentage }}
                >
                  {nameEditor?.storage.characterCount.characters()} / {40}{" "}
                  characters
                </div>
              )}
            </div>

            <div
              className={`w-full transition-all  ${
                currentBreakpoint === "xs" ? "text-base" : "text-sm lg:text-lg"
              } `}
            >
              <EditorContent editor={bioEditor} spellCheck={false} />
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
              <EditorContent
                editor={locationEditor}
                max={10}
                maxLength={10}
                spellCheck={false}
              />
            </div>
          </div>
        </BlurFade>
      </div>

      <div className="w-full  pb-20">
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
                handleSideChange={handleSideChange}
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
                        disabled={isLoading || !review}
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
        <BlurFade inView delay={0.4} className="pb-20">
          <div
            className={`fixed backdrop-blur-md transition-all opacity-0 bg-black/0 h-full ${
              isCrop && "!w-full !bg-white/50 !opacity-100 z-10"
            }  top-0 left-0`}
          ></div>
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
            {...{ rowHeight: 90 }}
          >
            {sections.map((l: any, i: any) => (
              <div
                id={l.id}
                key={l.i}
                className={`border border-gray-300/50 shadow hover:shadow-md group/item hover:z-50 ${
                  l?.i == isCrop && l?.type === "IMAGE" && "z-50"
                } rounded-md bg-white relative  flex justify-start cursor-grab`}
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
                      className="absolute group/span opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 transition-all hover:bg-gray-50 hover:shadow-md -right-2 p-2 shadow -m-1 bg-white border rounded-full z-20 -top-2 cursor-pointer"
                      onClick={() => onRemoveItem(l.i)}
                    >
                      <Trash className="text-noir" size={15} />
                    </span>
                    <div className="bg-white border shadow flex rounded-md gap-3 cursor-auto px-2 py-1 opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 absolute z-50 left-1/2 -translate-x-2/4 -bottom-7 transition-all items-center justify-center">
                      <div className="flex items-center gap-1">
                        <Type className="text-noir" size={20} />
                        <Input
                          name="color"
                          type="color"
                          defaultValue={l?.color}
                          onChange={(e) => handleTextColorChange(e, l)}
                          className="w-6 h-6 p-0 border-none"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <PaintBucket className="text-noir" size={20} />
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
                      className={
                        "flex  w-full rounded-md h-full items-start p-3"
                      }
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
                      className="absolute group/span opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 transition-all hover:bg-gray-50 hover:shadow-md -right-2 p-2 shadow -m-1 bg-white border rounded-full z-20 -top-2 cursor-pointer"
                      onClick={() => onRemoveItem(l.i)}
                    >
                      <Trash className="text-noir" size={15} />
                    </span>
                    <div className="bg-white border shadow flex rounded-md gap-3 cursor-auto px-2 py-1 opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 absolute z-50 left-1/2 -translate-x-2/4 -bottom-7 transition-all items-center justify-center">
                      <div className="flex items-center gap-1">
                        <Type className="text-noir" size={20} />
                        <Input
                          name="color"
                          type="color"
                          defaultValue={l?.color}
                          onChange={(e) => handleTextColorChange(e, l)}
                          className="w-6 h-6 p-0 border-none"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <PaintBucket className="text-noir" size={20} />
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
                      className={
                        "flex  w-full rounded-md h-full items-start p-3"
                      }
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
                            !l?.showImage && !l?.showTitleUrl
                              ? "hidden"
                              : "flex"
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
                    <span
                      className="absolute group/span opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 transition-all hover:bg-gray-50 hover:shadow-md -right-2 p-2 shadow -m-1 bg-white border rounded-full z-20 -top-2 cursor-pointer"
                      onClick={() => onRemoveItem(l.i, l.image)}
                    >
                      <Trash className="text-noir" size={15} />
                    </span>
                    <div className="bg-white border shadow flex rounded-md gap-3 cursor-auto px-2 py-1 opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 absolute z-50 left-1/2 -translate-x-2/4 -bottom-7 transition-all items-center justify-center">
                      <div className="flex items-center gap-1">
                        <Type className="text-noir" size={20} />
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
                            className="p-1 text-noir cursor-pointer bg-white border  rounded-full"
                            size={30}
                          />
                        ) : (
                          <ImageOff
                            onClick={() =>
                              handleChangeImageOptions(l, true, false)
                            }
                            className="p-1 text-noir cursor-pointer bg-white border  rounded-full"
                            size={30}
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {l?.showTitleUrl ? (
                          <Captions
                            onClick={() =>
                              handleChangeImageOptions(l, false, true)
                            }
                            className="p-1 text-noir cursor-pointer bg-white border  rounded-full"
                            size={30}
                          />
                        ) : (
                          <CaptionsOff
                            onClick={() =>
                              handleChangeImageOptions(l, false, true)
                            }
                            className="p-1 text-noir cursor-pointer bg-white border  rounded-full"
                            size={30}
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <PaintBucket className="text-noir" size={20} />
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
                      className={`
                      ${!isCrop && "dragMe"}
                        absolute  rounded-md  top-0 left-0 h-full w-full
                      
                    `}
                    >
                      <div
                        className={
                          "absolute dragMe  top-0 left-0 h-full w-full"
                        }
                      />
                      <div
                        style={{
                          scrollbarWidth: "none",
                          clipPath:
                            isCrop !== l?.i ? "inset(0px round 12px)" : "",
                        }}
                        className={` h-full w-full`}
                      >
                        {l?.imageUrl && (
                          <>
                            {isCrop === l?.i ? (
                              <div
                                className="relative  rounded-md shadow-2xl w-full h-full "
                                style={{ filter: "opacity(0.9)" }}
                              >
                                <img
                                  onMouseEnter={() => {
                                    handleDragImage(l);
                                  }}
                                  className="absolute touch-none  !select-none pointer-events-auto draggable max-w-max !cursor-move min-w-full min-h-full   rounded-md"
                                  src={l.imageUrl}
                                  style={{
                                    transform: `translate(${
                                      currentBreakpoint === "xs"
                                        ? `${l?.imageMobileX}px, ${l?.imageMobileY}px`
                                        : `${l?.imageX}px, ${l?.imageY}px`
                                    })`,
                                    filter: "inherit",
                                    maxWidth: "unset",
                                    maxHeight: "unset",
                                  }}
                                  alt=""
                                />
                              </div>
                            ) : (
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
                            )}
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
                    <span
                      className="absolute group/span opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 transition-all hover:bg-gray-50 hover:shadow-md -right-2 p-2 shadow -m-1 bg-white border rounded-full z-20 -top-2 cursor-pointer"
                      onClick={() => onRemoveItem(l.i, l.image)}
                    >
                      <Trash className="text-noir" size={15} />
                    </span>
                    <div className="bg-white flex border rounded-full gap-3 cursor-auto px-1 py-1 opacity-0 group-focus-visible/item:opacity-100 group-hover/item:opacity-100 absolute z-50 left-1/2 -translate-x-2/4 -bottom-7 shadow transition-all items-center justify-center">
                      <div className="flex items-center ">
                        <Crop
                          onClick={() =>
                            isCrop === "" ? setIsCrop(l?.i) : setIsCrop("")
                          }
                          className={`p-1  cursor-pointer  ${
                            isCrop
                              ? "bg-foreground text-white"
                              : "text-noirbg-white"
                          }  transition-all border  rounded-full`}
                          size={30}
                          strokeWidth={2}
                        />
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
