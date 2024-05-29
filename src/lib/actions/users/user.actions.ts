"use server";

import { prisma } from "@/prisma";

import { User } from "@prisma/client";
import { z } from "zod";
import { UserSchema, UserSearchSchema } from "./user.schema";
import { ActionError, userAction } from "@/lib/safe.actions";

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

export const createUserAction = userAction(
  UserSchema,
  async (input, context) => {
    await verifySlugUniqueness(context.user.id);
    await verifyUserPlan(context.user);

    const user = await prisma.user.create({
      data: {
        ...input,
        id: context.user.id,
      },
    });

    return user;
  }
);

export const updateUserAction = userAction(
  z.object({
    id: z.string(),
    data: UserSchema,
  }),
  async (input, context) => {
    await verifySlugUniqueness(input.id);

    const updatedUser = await prisma.user.update({
      where: {
        id: input.id,
      },
      data: input.data,
    });

    return updatedUser;
  }
);
export const updateUserSearchAction = userAction(
  z.object({
    id: z.string(),
    data: UserSearchSchema,
  }),
  async (input, context) => {
    await verifySlugUniqueness(input.id);

    const updatedUser = await prisma.user.update({
      where: {
        id: input.id,
      },
      data: input.data,
    });

    return updatedUser;
  }
);

export const deleteUserAction = userAction(
  z.string(),
  async (userId, context) => {
    await prisma.user.delete({
      where: {
        id: context.user.id,
      },
    });
  }
);
