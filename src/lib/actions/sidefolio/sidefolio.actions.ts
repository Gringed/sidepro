"use server";
import { userAction } from "@/lib/safe.actions";
import { SidefolioSchema } from "./sidefolio.schema";
import { z } from "zod";
import { prisma } from "@/prisma";

export const sendReviewAction = userAction(
  z.string(),
  async (input, context) => {
    const sendReview = await prisma.review.create({
      data: { authorId: context.user.id, message: input },
    });
    return sendReview;
  }
);

export const updateSidefolioAction = userAction(
  z.object({
    id: z.string(),
    data: SidefolioSchema,
  }),
  async (input, context) => {
    const updateSidefolio = await prisma.sidefolio.update({
      where: {
        id: input.id,
      },
      data: input.data,
    });

    return updateSidefolio;
  }
);

export const updateCounter = userAction(
  z.object({
    id: z.string(),
    data: z.number(),
  }),
  async (input, context) => {
    const updateSidefolio = await prisma.sidefolio.update({
      where: {
        id: input.id,
      },
      data: {
        counter: input.data + 1,
      },
    });

    return updateSidefolio;
  }
);
