"use client";
import { Button, buttonVariants } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  createSectionAction,
  getPreview,
  uploadImageSection,
} from "@/lib/actions/sections/section.actions";
import { cn } from "@/lib/utils";
import {
  Contact,
  Eye,
  GalleryHorizontal,
  GalleryVertical,
  Heading,
  Image,
  ImageOff,
  ImagePlus,
  Link2,
  Loader,
  Loader2,
  LoaderCircle,
  Monitor,
  MonitorCheck,
  PaintBucket,
  Plus,
  Send,
  Share,
  Share2,
  Smartphone,
  SquareSplitHorizontal,
  Type,
} from "lucide-react";
import confetti from "canvas-confetti";
import React, { useCallback, useRef, useState } from "react";
import {
  buySidefolioAction,
  publishSidefolioAction,
  updateSidefolioAction,
  uploadImageSidefolio,
} from "../../../lib/actions/sidefolio/sidefolio.actions";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { del } from "@vercel/blob";
const NavLinks = ({
  currentBreakpoint,
  setCurrentBreakpoint,
  sidefolio,
  isSaving,
  handleCompactTypeChange,
  compactType,
  sections,
  user,
}: any) => {
  const [url, setURL] = useState("");
  const [openLink, setOpenLink] = useState(false);
  const [open, setOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageSideLoading, setImageSideLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPublish, setIsPublish] = useState<boolean>(false);
  const [isSavingC, setIsSavingC] = useState<boolean>(false);
  function makeid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const handleCreateSection = (title: string, type: any) => {
    createSectionAction({
      title,
      slug: "",
      type: type,
      description: "Add a new description",
      sideId: sidefolio.id,
      i: `n${makeid(40)}`,
    });
  };
  const handleUploadImage = async (file: any) => {
    const res = await uploadImageSection({
      file,
      data: {
        title: "New image bloc",
        slug: "",
        type: "IMAGE",
        description: "Add a new description",
        sideId: sidefolio.id,
        i: `n${makeid(40)}`,
      },
    });
    if (res) {
      setImageLoading(false);
    }
  };
  const handleUploadImageSidefolio = async (file: any) => {
    const res = await uploadImageSidefolio({
      id: sidefolio.id,
      file,
    });
    if (res) {
      setImageSideLoading(false);
    }
  };
  const handlePay = (type: string) => {
    buySidefolioAction({ type });
  };
  const handlePublish = async () => {
    setIsPublish(true);
    const res = await publishSidefolioAction({ id: sidefolio.id, data: user });

    if (res.data) {
      setIsPublish(false);
      toast.success("Sidefolio published");
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  };
  const handleCreateLink = async () => {
    setIsLoading(true);
    let urlFull = url.includes("https://");
    let newUrl;
    if (urlFull) {
      newUrl = url;
    } else {
      newUrl = "https://" + url;
    }
    console.log(newUrl);
    const res = await getPreview({
      title: newUrl,
      description: "Add a new description",
      sideId: sidefolio.id,
      type: "LINK",
      i: `n${makeid(40)}`,
    });
    if (res.data?.error) {
      toast.error("Please fill a valid url");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setOpenLink(false);
    }
  };
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputFileSideRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const saveChanges = useCallback(
    async (name: any, newValue: any, image?: string) => {
      const formData = { [name]: newValue };

      setIsSavingC(true);

      try {
        await updateSidefolioAction({
          id: sidefolio.id,
          data: formData,
          image,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsSavingC(false);
      }
    },
    [sidefolio]
  );
  const handleDeleteImageSidefolio = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      saveChanges("background", "", sidefolio.background);
    }, 100);
  };
  const handleBackgroundColorChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const newValue = e.target.value;
    const name = e.target.name;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      saveChanges(name, newValue);
    }, 100);
  };
  return (
    <nav className={cn("flex items-center gap-2 ")}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} disabled={isSaving} className="rounded-full">
              {isSaving ? (
                <LoaderCircle className=" animate-spin" size={17} />
              ) : (
                <Share2 size={17} />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent className="w-72 mb-2">
              <DropdownMenuLabel>Share it</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="hover:bg-gray-200/10 focus:bg-gray-200/10 hover:text-primary focus:text-primary cursor-pointer font-medium">
                <Link
                  href={"/preview/" + sidefolio.slug}
                  className="flex  items-center"
                >
                  <Eye size={16} className="mr-2" />
                  View my sidefolio
                </Link>
              </DropdownMenuItem>
              {user?.plan === "FREEMIUM" ? (
                <DialogTrigger asChild>
                  <DropdownMenuItem className="hover:bg-gray-200/10 focus:bg-gray-200/10 hover:text-primary focus:text-primary cursor-pointer font-medium">
                    <Send size={16} className="mr-2" />
                    Publish my sidefolio
                  </DropdownMenuItem>
                </DialogTrigger>
              ) : (
                <DropdownMenuItem className="hover:bg-gray-200/10 focus:bg-gray-200/10 hover:text-primary focus:text-primary cursor-pointer font-medium">
                  {sidefolio.publish ? (
                    <Link
                      href={`/${sidefolio.slug}`}
                      className="font-bold flex items-center"
                    >
                      <MonitorCheck size={16} className="mr-2" />
                      See my online sidefolio
                    </Link>
                  ) : (
                    <div
                      onClick={handlePublish}
                      className="flex gap-0.5 items-center"
                    >
                      {isPublish ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Publish in progress
                        </>
                      ) : (
                        <>
                          <Send size={16} className="mr-2" />
                          Publish my sidefolio
                        </>
                      )}
                    </div>
                  )}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
        <DialogPortal>
          <DialogContent className="sm:max-w-[750px] h-fit">
            <DialogHeader>
              <DialogTitle>Plan to publish your sidefolio</DialogTitle>
            </DialogHeader>
            <div className="">
              <div className="h-full w-full">
                <div className="flex flex-col lg:flex-row justify-between ">
                  <div className="border border-foreground/30 bg-zinc-200 rounded-2xl lg:rounded-3xl text-center p-12   ">
                    <div className="flex flex-col gap-6 lg:gap-8 justify-center h-full">
                      <p className="text-xl font-semibold">1-Year Pass</p>
                      <div className="flex items-baseline justify-center gap-x-2">
                        <span className="text-lg tracking-tight text-base-content-secondary/80 line-through decoration-[1.5px]">
                          50
                        </span>
                        <div className="text-5xl font-bold tracking-tight">
                          20
                        </div>
                        <span className="text-sm font-base leading-6 tracking-wide text-base-content-secondary/80">
                          €
                        </span>
                      </div>
                      <p className="text-sm text-base-content-secondary">
                        One-time payment. No subscription
                      </p>
                      <div className="w-full">
                        <Button onClick={() => handlePay("one")}>Buy it</Button>
                      </div>
                    </div>
                  </div>
                  <div className="border-2  border-primary relative   z-10 bg-zinc-100 rounded-2xl lg:rounded-3xl text-center p-12   ">
                    <Badge className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 badge badge-accent badge-sm uppercase font-semibold">
                      Popular
                    </Badge>
                    <div className="flex flex-col gap-6 lg:gap-8 justify-center h-full">
                      <p className="text-xl font-semibold">Lifetime Deal</p>
                      <div className="flex items-baseline justify-center gap-x-2">
                        <span className="text-lg tracking-tight text-base-content-secondary/80 line-through decoration-[1.5px]">
                          80
                        </span>
                        <div className="text-5xl font-bold tracking-tight">
                          45
                        </div>
                        <span className="text-sm font-base leading-6 tracking-wide text-base-content-secondary/80">
                          €
                        </span>
                      </div>
                      <p className="text-sm text-base-content-secondary">
                        One-time payment. No subscription
                      </p>
                      <div className="w-full">
                        <Button onClick={() => handlePay("life")}>
                          Buy it
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
      <Popover>
        <PopoverTrigger asChild>
          <Button size={"icon"} variant={"outline"} className="rounded-full">
            <Plus size={17} />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-full mb-2">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Add anything</h4>
            </div>
            <div className="grid gap-2">
              <div className="flex w-full justify-between gap-3 flex-wrap items-center">
                <div className="group/tooltip relative">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-sm "
                    disabled={isSaving || isLoading}
                    onClick={() =>
                      handleCreateSection("New title bloc", "TITLE")
                    }
                  >
                    <Heading strokeWidth={3} size={17} />
                  </Button>
                  <span className="group-hover/tooltip:visible transition-all p-1 px-2 font-medium group-hover/tooltip:opacity-100 z-50 text-xs text-white rounded-full bg-primary opacity-0 absolute -top-7 -translate-x-2/4 left-1/2 invisible">
                    Title
                  </span>
                </div>
                <div className="group/tooltip relative  ">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-sm"
                    disabled={isSaving || isLoading}
                    onClick={() => {
                      handleCreateSection("New text bloc", "TEXT");
                    }}
                  >
                    <Type strokeWidth={3} size={17} />
                  </Button>
                  <span className="group-hover/tooltip:visible transition-all p-1 px-2 font-medium group-hover/tooltip:opacity-100 z-50 text-xs text-white rounded-full bg-primary opacity-0 absolute -top-7 -translate-x-2/4 left-1/2 invisible">
                    Text
                  </span>
                </div>
                <div className="group/tooltip relative  ">
                  <Input
                    className=" flex-1 hidden"
                    type="file"
                    name="file"
                    hidden
                    ref={inputFileRef}
                    onChangeCapture={async (event) => {
                      event.preventDefault();
                      setImageLoading(true);
                      if (!inputFileRef.current?.files) {
                        throw new Error("No file selected");
                      }

                      const file = inputFileRef.current.files[0];
                      const formData = new FormData();
                      formData.append("file", file);
                      handleUploadImage(formData);

                      /*  */
                    }}
                  />

                  <Button
                    onClick={() => {
                      inputFileRef.current?.click();
                    }}
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-sm"
                    disabled={imageLoading || isSaving}
                  >
                    {imageLoading ? (
                      <Loader2 className=" animate-spin" size={16} />
                    ) : (
                      <ImagePlus strokeWidth={2.5} size={17} />
                    )}
                  </Button>
                  <span className="group-hover/tooltip:visible transition-all p-1 px-2 font-medium group-hover/tooltip:opacity-100 z-50 text-xs text-white rounded-full bg-primary opacity-0 absolute -top-7 -translate-x-2/4 left-1/2 invisible">
                    Image
                  </span>
                </div>
                <div className="group/tooltip relative  ">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-sm"
                    disabled={
                      sections?.filter((x: any) => x.type === "ME")?.length >=
                        1 ||
                      isSaving ||
                      isLoading
                    }
                    onClick={() => {
                      handleCreateSection("New Infos bloc", "ME");
                    }}
                  >
                    <Contact strokeWidth={2.5} size={17} />
                  </Button>
                  <span className="group-hover/tooltip:visible transition-all p-1 px-2 font-medium group-hover/tooltip:opacity-100 z-50 text-xs text-white rounded-full bg-primary opacity-0 absolute -top-7 -translate-x-2/4 left-1/2 invisible">
                    Infos
                  </span>
                </div>
                <div className="group/tooltip relative  ">
                  <Dialog open={openLink} onOpenChange={setOpenLink}>
                    <DialogTrigger asChild>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        className="rounded-sm"
                        disabled={isLoading || isSaving}
                      >
                        <Link2 strokeWidth={2.5} size={17} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add link</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Input
                          type="text"
                          className="flex-[2]"
                          placeholder="Paste your link here"
                          onChange={(e) => setURL(e.target.value)}
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          className=" flex-1"
                          size={"icon"}
                          disabled={
                            url.match(
                              /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
                            ) === null ||
                            isSaving ||
                            isLoading
                          }
                          onClick={handleCreateLink}
                        >
                          Add link
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <span className="group-hover/tooltip:visible transition-all p-1 px-2 font-medium group-hover/tooltip:opacity-100 z-50 text-xs text-white rounded-full bg-primary opacity-0 absolute -top-7 -translate-x-2/4 left-1/2 invisible">
                    Link
                  </span>
                </div>
                {/*  */}
              </div>
              <div className="flex w-full h-full justify-between items-center">
                <div className="w-full h-full flex items-center">
                  Background
                </div>
                <div className="w-full flex justify-between gap-3 h-full">
                  <Input
                    type="color"
                    name="color"
                    disabled={sidefolio?.background}
                    defaultValue={sidefolio?.color || "#ffffff"}
                    onChange={(e) => handleBackgroundColorChange(e)}
                    className={cn(
                      buttonVariants({ size: "default", variant: "outline" }),
                      "rounded-sm flex-1 p-1"
                    )}
                  />
                  <Input
                    className=" w-full hidden"
                    type="file"
                    name="file"
                    hidden
                    ref={inputFileSideRef}
                    onChangeCapture={async (event) => {
                      event.preventDefault();
                      setImageSideLoading(true);
                      if (!inputFileSideRef.current?.files) {
                        throw new Error("No file selected");
                      }

                      const file = inputFileSideRef.current.files[0];
                      const formData = new FormData();
                      formData.append("file", file);
                      handleUploadImageSidefolio(formData);

                      /*  */
                    }}
                  />

                  <Button
                    onClick={() => {
                      sidefolio?.background
                        ? handleDeleteImageSidefolio()
                        : inputFileSideRef.current?.click();
                    }}
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-sm"
                    disabled={imageSideLoading || isSavingC}
                  >
                    {imageSideLoading ? (
                      <Loader2 className=" animate-spin" size={16} />
                    ) : sidefolio?.background ? (
                      <ImageOff strokeWidth={2.5} size={17} />
                    ) : (
                      <Image strokeWidth={2.5} size={17} />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size={"icon"}
              variant={"outline"}
              className="rounded-full"
              onClick={() =>
                handleCompactTypeChange(
                  compactType === "horizontal"
                    ? "vertical"
                    : compactType === "vertical"
                    ? null
                    : "horizontal"
                )
              }
            >
              {compactType === "horizontal" ? (
                <GalleryHorizontal size={17} />
              ) : compactType === "vertical" ? (
                <GalleryVertical size={17} />
              ) : (
                <SquareSplitHorizontal size={17} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {compactType
              ? compactType[0].toUpperCase() + compactType.slice(1)
              : "No Compaction"}
          </TooltipContent>
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
    </nav>
  );
};

export default NavLinks;
