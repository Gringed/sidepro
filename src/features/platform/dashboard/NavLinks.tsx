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
  Eye,
  GalleryHorizontal,
  GalleryVertical,
  Loader,
  LoaderCircle,
  Plus,
  Send,
  Share,
  Share2,
  SquareSplitHorizontal,
} from "lucide-react";

import React, { useRef, useState } from "react";
import { updateCounter } from "../../../lib/actions/sidefolio/sidefolio.actions";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PutBlobResult } from "@vercel/blob";
import { Separator } from "@/components/ui/separator";
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
const NavLinks = ({
  sidefolio,
  isSaving,
  handleCompactTypeChange,
  compactType,
  sections,
  user,
}: any) => {
  const [url, setURL] = useState("");
  const [open, setOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const handleCreateSection = async (type: any) => {
    await createSectionAction({
      title: "New title bloc",
      slug: "",
      type: "TITLE",
      description: "Add a new description",
      sideId: sidefolio.id,
      y: 0,
      x: 0,
      w: 2,
      h: 2,
      i: `n${sidefolio.counter}`,
    });
    await updateCounter({
      id: sidefolio.id,
      data: sidefolio.counter,
    });
    window.location.reload();
  };
  const inputFileRef = useRef<HTMLInputElement>(null);
  return (
    <nav className={cn("flex items-center gap-5 ")}>
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
            <DropdownMenuContent className="w-72">
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
                  <Link
                    href={"/preview/" + sidefolio.slug}
                    className="flex gap-0.5 items-center"
                  >
                    <Send size={16} className="mr-2" />
                    Publish my sidefolio
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
        <DialogPortal>
          <DialogContent className="sm:max-w-[425px] lg:max-w-[50%]">
            <DialogHeader>
              <DialogTitle>Plan to publish your sidefolio</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="h-full w-full">
                <div className="flex w-full justify-center items-center flex-col gap-10">
                  <div className="mx-auto mb-16 md:mb-16 p-8 lg:p-12 bg-secondary/30 rounded-3xl flex flex-col lg:flex-row gap-8 lg:gap-12 lg:justify-between ">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
                      <div className="border border-foreground/30 bg-zinc-200 rounded-2xl lg:rounded-3xl text-center p-8 lg:p-12 -mx-4 -mb-4 lg:-my-8">
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
                            <Link
                              className={cn(
                                buttonVariants({ variant: "default" })
                              )}
                              href="/#signup"
                            >
                              Start for free
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="border-2  border-primary relative lg:!py-16 lg:!-my-16 lg:!px-16 lg:!-mx-16 z-10 bg-zinc-100 rounded-2xl lg:rounded-3xl text-center p-8 lg:p-12 -mx-4 -mb-4 ">
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
                            <Link
                              className={cn(
                                buttonVariants({ variant: "default" })
                              )}
                              href="/#signup"
                            >
                              Start for free
                            </Link>
                          </div>
                        </div>
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
        <PopoverContent side="top" className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Add anything</h4>
            </div>
            <div className="grid gap-2">
              <div className="flex w-full flex-wrap justify-between items-center gap-4">
                <Button
                  className=" flex-1"
                  size={"icon"}
                  disabled={isSaving}
                  onClick={() => handleCreateSection("TITLE")}
                >
                  Title
                </Button>
                <Button
                  className=" flex-1"
                  size={"icon"}
                  onClick={() => {
                    createSectionAction({
                      title: "New text bloc",
                      description: "Add a new description",
                      sideId: sidefolio.id,
                      type: "TEXT",
                      h: 2,
                      w: 2,
                      y: 0,
                      x: 0,
                      i: `n${sidefolio.counter}`,
                    });
                    updateCounter({
                      id: sidefolio.id,
                      data: sidefolio.counter,
                    });
                    window.location.reload();
                  }}
                >
                  Text
                </Button>
              </div>
              <div className="flex w-full flex-wrap justify-between items-center gap-4">
                <Input
                  className=" flex-1 hidden"
                  type="file"
                  name="file"
                  hidden
                  ref={inputFileRef}
                  onChangeCapture={async (event) => {
                    event.preventDefault();
                    if (!inputFileRef.current?.files) {
                      throw new Error("No file selected");
                    }
                    const file = inputFileRef.current.files[0];
                    const formData = new FormData();
                    formData.append("file", file);
                    setImageLoading(true);
                    try {
                      await uploadImageSection({
                        id: sidefolio.id,
                        sidefolio: sidefolio,
                        data: formData,
                      });
                      await updateCounter({
                        id: sidefolio.id,
                        data: sidefolio.counter,
                      });
                      console.log(formData);
                      setImageLoading(false);
                    } catch (error) {
                      console.log(error);
                    }
                    /*  */
                  }}
                />
                <Button
                  onClick={() => inputFileRef.current?.click()}
                  className=" flex-1"
                  size={"icon"}
                  disabled={imageLoading}
                >
                  Image
                </Button>
                <Button
                  className=" flex-1"
                  size={"icon"}
                  disabled={
                    sections?.filter((x: any) => x.type === "ME")?.length >= 1
                  }
                  onClick={() => {
                    createSectionAction({
                      name: "Jean Clenche",
                      bio: "",
                      location: "",
                      description: "Add a new description",
                      sideId: sidefolio.id,
                      type: "ME",
                      h: 4,
                      w: 2,
                      y: 0,
                      x: 0,
                      i: `n${sidefolio.counter}`,
                    });
                    updateCounter({
                      id: sidefolio.id,
                      data: sidefolio.counter,
                    });
                    window.location.reload();
                  }}
                >
                  Infos
                </Button>
              </div>
              <div className="flex  items-center gap-4">
                <Input
                  type="text"
                  className="flex-[2]"
                  placeholder="Paste your link here"
                  onChange={(e) => setURL(e.target.value)}
                />
                <Button
                  className=" flex-1"
                  size={"icon"}
                  disabled={
                    url.match(
                      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
                    ) === null
                  }
                  onClick={() => {
                    getPreview({
                      title: url,
                      description: "Add a new description",
                      sideId: sidefolio.id,
                      type: "LINK",
                      h: 2,
                      w: 2,
                      y: 0,
                      x: 0,
                      i: `n${sidefolio.counter}`,
                    });
                    updateCounter({
                      id: sidefolio.id,
                      data: sidefolio.counter,
                    });
                    window.location.reload();
                  }}
                >
                  Add link
                </Button>
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
      </TooltipProvider>
    </nav>
  );
};

export default NavLinks;
