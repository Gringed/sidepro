"use server";

import { prisma } from "@/prisma";

import { User } from "@prisma/client";
import { z } from "zod";

import { ActionError, userAction } from "@/lib/safe.actions";
import { SectionSchema } from "./section.schema";
import { revalidatePath } from "next/cache";
import urlMetadata from "url-metadata";
import { put } from "@vercel/blob";

const verifyUserPlan = async (user: User) => {
  if (user.plan === "PREMIUM_ONE") {
    return;
  }

  const userProductsCount = await prisma.user.count({
    where: {
      id: user.id,
    },
  });

  if (userProductsCount > 0) {
    throw new ActionError(
      "You need to upgrade to premium to create more products"
    );
  }
};

export const createSectionAction = userAction(
  SectionSchema,
  async (input, context) => {
    /*  await verifySlugUniqueness(context.user.id);
    await verifyUserPlan(context.user); */

    await prisma.section.create({
      data: input,
    });
  }
);
export const getPreview = userAction(SectionSchema, async (input, context) => {
  try {
    const metadata = await urlMetadata(input.title!);
    if (metadata) {
      await prisma.section.create({
        data: { ...input, link: metadata },
      });
    }
  } catch (err) {
    console.log(err);
  }
});

export const updateOrderSectionB = userAction(
  z.object({
    id: z.string(),
    data: z.any(),
  }),
  async (input, context) => {
    const updatePromises = input.data.map((section: any) =>
      prisma.section.update({
        where: { sideId: input.id, i: section.i },
        data: {
          w: section.w,
          h: section.h,
          x: section.x,
          y: section.y,
        },
      })
    );
    await prisma.$transaction(updatePromises);
  }
);

export const verifySlug = userAction(
  z.object({
    value: z.string(),
  }),
  async (input, context) => {
    const slugExists = await prisma.sidefolio.count({
      where: {
        slug: input.value,
      },
    });
    console.log(slugExists);
    return slugExists === 0;
  }
);
export const updateSectionAction = userAction(
  z.object({
    id: z.string(),
    data: SectionSchema,
  }),
  async (input, context) => {
    const updateRequest = await prisma.section.update({
      where: {
        id: input.id,
      },
      data: input.data,
    });

    return updateRequest;
  }
);

export const updateSectionImageAction = userAction(
  z.object({
    id: z.string(),
    data: z.object({
      showImage: z.boolean(),
      showTitleUrl: z.boolean(),
      sideId: z.string(),
    }),
  }),
  async (input, context) => {
    const updateRequest = await prisma.section.update({
      where: {
        id: input.id,
      },
      data: input.data,
    });

    return updateRequest;
  }
);
export const uploadImageSection = userAction(
  z.object({
    id: z.string(),
    sidefolio: z.any(),
    data: z.any(),
  }),

  async (input, context) => {
    const file = input.data.get("file") as File;
    const fileName = file.name;
    console.log(file);
    const blob = await put(fileName, file, {
      access: "public",
    });
    console.log(blob);
    let response;
    if (blob.url) {
      response = await prisma.section.create({
        data: {
          sideId: input.id,
          image: blob.url,
          type: "IMAGE",
          h: 2,
          w: 2,
          y: 0,
          x: 0,
          i: `n${input.sidefolio.counter}`,
        },
      });
    }
    return response;
  }
);
export const removeSectionAction = userAction(
  z.object({ id: z.string(), i: z.string() }),
  async (input, context) => {
    await prisma.section.delete({
      where: {
        sideId: input.id,
        i: input.i,
      },
    });
  }
);
