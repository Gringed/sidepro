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
    let createSection;
    try {
      createSection = await prisma.section.create({
        data: input,
      });
    } catch (error) {
      return {
        error: "Failed to create.",
      };
    }
    revalidatePath("/dashboard");
    return createSection;
  }
);
export const getPreview = userAction(SectionSchema, async (input, context) => {
  let createLink;
  try {
    createLink = await urlMetadata(input.title!);
    if (createLink) {
      await prisma.section.create({
        data: { ...input, link: createLink },
      });
    }
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/dashboard");
  return createLink;
});

export const updateOrderSectionB = userAction(
  z.object({
    id: z.string(),
    data: z.any(),
  }),
  async (input, context) => {
    let updateSections;
    try {
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

      updateSections = await prisma.$transaction(updatePromises);
    } catch (error) {
      return { error: error };
    }
    revalidatePath("/dashboard");
    return updateSections;
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
    let updateRequest;
    updateRequest = await prisma.section.update({
      where: {
        id: input.id,
      },
      data: input.data,
    });
    revalidatePath("/dashboard");

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
    let updateRequest;
    updateRequest = await prisma.section.update({
      where: {
        id: input.id,
      },
      data: input.data,
    });
    revalidatePath("/dashboard");
    return updateRequest;
  }
);
export const uploadImageSection = userAction(
  z.object({
    file: z.any(),
    data: SectionSchema,
  }),

  async (input, context) => {
    const file = input.file.get("file") as File;
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
          ...input.data,
          image: blob.url,
        },
      });
    }
    revalidatePath("/dashboard");
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
