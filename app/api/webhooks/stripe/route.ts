import { currentUser } from "@/auth/current-user";
import { prisma } from "@/prisma";
import { stripe } from "@/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;
  const body = await req.text();
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse("Webhook error", { status: 400 });
  }

  const auth = await currentUser();
  const getOneYearLaterDate = (): Date => {
    const currentDate = new Date();
    const nextYearDate = new Date();
    nextYearDate.setFullYear(currentDate.getFullYear() + 1);
    return nextYearDate;
  };
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const stripeCustomerId = session.customer;
      console.log(session);
      const user = await findUser(stripeCustomerId || auth?.id);
      await prisma.user.update({
        where: { id: user?.id },
        data: {
          plan: "PREMIUM_ONE",
          expiresAt: getOneYearLaterDate(),
        },
      });
      break;
    }
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const stripeCustomerId = invoice.customer;
      const user = await findUser(stripeCustomerId || auth?.id);
      await prisma.user.update({
        where: { id: user?.id },
        data: {
          plan: "PREMIUM_ONE",
          expiresAt: getOneYearLaterDate(),
        },
      });
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const stripeCustomerId = invoice.customer;
      const user = await findUser(stripeCustomerId || auth?.id);
      await prisma.user.update({
        where: { id: user?.id },
        data: {
          plan: "FREEMIUM",
          expiresAt: undefined,
        },
      });
      break;
    }
    default:
    // Unhandled event type
  }
  return NextResponse.json({ ok: true });
};

export const findUser = async (stripeCustomerId: any) => {
  return prisma.user.findFirst({
    where: {
      stripeCustomerId,
    },
  });
};
