"use server";
import { userAction } from "@/lib/safe.actions";
import { SidefolioSchema } from "./sidefolio.schema";
import { z } from "zod";
import { prisma } from "@/prisma";
import { stripe } from "@/stripe";
import { redirect } from "next/navigation";

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

export const publishSidefolioAction = userAction(
  z.object({
    id: z.string(),
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

    return pusblishedSidefolio;
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

export const buySidefolioAction = userAction(
  z.object({
    type: z.string(),
  }),
  async (input, context) => {
    console.log(input);
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
