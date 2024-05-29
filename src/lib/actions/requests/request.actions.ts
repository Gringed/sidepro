"use server";

import { prisma } from "@/prisma";

import { User } from "@prisma/client";
import { z } from "zod";

import { ActionError, userAction } from "@/lib/safe.actions";
import { RequestSchema } from "./request.schema";

const verifySlugUniqueness = async (userId?: string) => {
  const slugExists = await prisma.user.count({
    where: {
      id: userId
        ? {
            not: userId,
          }
        : undefined,
    },
  });

  if (slugExists) {
    throw new ActionError("Slug already exists");
  }
};

const verifyUserPlan = async (user: User) => {
  if (user.plan === "PREMIUM") {
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

export const createRequestAction = userAction(
  RequestSchema,
  async (input, context) => {
    await verifySlugUniqueness(context.user.id);
    await verifyUserPlan(context.user);

    const request = await prisma.request.create({
      data: input,
    });

    return request;
  }
);

export const updateRequestAction = userAction(
  z.object({
    id: z.string(),
    data: RequestSchema,
  }),
  async (input, context) => {
    await verifySlugUniqueness(context.user.id);

    const updateRequest = await prisma.request.update({
      where: {
        id: input.id,
      },
      data: input.data,
    });

    return updateRequest;
  }
);

export const deleteRequestAction = userAction(
  z.string(),
  async (requestId, context) => {
    await prisma.request.delete({
      where: {
        id: requestId,
      },
    });
  }
);
