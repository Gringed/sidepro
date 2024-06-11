"use client";
import { Button } from "@/components/ui/button";

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
} from "@/lib/actions/sections/section.actions";
import { cn } from "@/lib/utils";
import {
  GalleryHorizontal,
  GalleryVertical,
  Loader,
  LoaderCircle,
  Plus,
  Share,
  Share2,
  SquareSplitHorizontal,
} from "lucide-react";

import React, { useState } from "react";
import { updateCounter } from "../../../lib/actions/sidefolio/sidefolio.actions";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavLinks = ({
  sidefolio,
  isSaving,
  handleCompactTypeChange,
  compactType,
  sections,
}: any) => {
  const [url, setURL] = useState("");
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
  const regex = ``;
  return (
    <nav className={cn("flex items-center gap-5 ")}>
      <Button size={"icon"} disabled={isSaving} className="rounded-full">
        {isSaving ? (
          <LoaderCircle className=" animate-spin" size={17} />
        ) : (
          <Share2 size={17} />
        )}
      </Button>
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
                <Button
                  className=" flex-1"
                  size={"icon"}
                  onClick={() => {
                    createSectionAction({
                      name: "New image",

                      description: "Add a new description",
                      sideId: sidefolio.id,
                      type: "IMAGE",
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
