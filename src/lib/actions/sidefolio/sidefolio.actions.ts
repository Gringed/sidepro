"use server";
import { userAction } from "@/lib/safe.actions";
import { SidefolioSchema } from "./sidefolio.schema";
import { z } from "zod";
import { prisma } from "@/prisma";
import { stripe } from "@/stripe";
import { redirect } from "next/navigation";
import { UserSchema } from "../users/user.schema";
import { revalidatePath } from "next/cache";
import { del, put } from "@vercel/blob";

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
    image: z.string().optional(),
  }),
  async (input, context) => {
    if (input.image) {
      await del(input.image);
    }
    const updateSidefolio = await prisma.sidefolio.update({
      where: {
        id: input.id,
      },
      data: input.data,
    });
    revalidatePath("/dashboard");

    return updateSidefolio;
  }
);
export const uploadImageSidefolio = userAction(
  z.object({
    id: z.string(),
    file: z.any(),
  }),

  async (input, context) => {
    const file = input.file.get("file") as File;
    const fileName = file.name;

    const blob = await put(fileName, file, {
      access: "public",
    });

    let response;
    if (blob.url) {
      response = await prisma.sidefolio.update({
        where: {
          id: input.id,
        },
        data: {
          background: blob.url,
        },
      });
    }
    revalidatePath("/dashboard");
    return response;
  }
);
export const publishSidefolioAction = userAction(
  z.object({
    id: z.string(),
    data: UserSchema,
  }),
  async (input, context) => {
    const user = await prisma.user.findUnique({
      where: {
        id: context.user.id,
      },
    });
    let pusblishedSidefolio;
    if (user?.plan === "PREMIUM_LIFE" || user?.plan === "PREMIUM_ONE") {
      pusblishedSidefolio = await prisma.sidefolio.update({
        where: {
          id: input.id,
        },
        data: {
          publish: true,
        },
      });
    } else {
      throw new Error("Not authorized");
    }
    revalidatePath("/dashboard");
    return pusblishedSidefolio;
  }
);

export const buySidefolioAction = userAction(
  z.object({
    type: z.string(),
  }),
  async (input, context) => {
    const user = await prisma.user.findUnique({
      where: {
        id: context.user.id,
      },
      select: {
        stripeCustomerId: true,
        email: true,
      },
    });
    const stripeCustomerId = user?.stripeCustomerId ?? undefined;
    const session = await stripe.checkout.sessions.create({
      success_url: process.env.NEXT_PUBLIC_APP_URL + "/dashboard",
      cancel_url: process.env.NEXT_PUBLIC_APP_URL + "/dashboard",
      payment_method_types: ["card"],
      allow_promotion_codes: true,
      mode: "payment",
      billing_address_collection: "auto",
      customer: stripeCustomerId,
      customer_email: user?.email,
      line_items: [
        {
          price:
            input.type === "one"
              ? process.env.PRICE_ONE_YEAR
              : process.env.PRICE_LIFETIME,
          quantity: 1,
        },
      ],
    });
    if (!session.url) {
      throw new Error("Error");
    }
    redirect(session.url);
  }
);
