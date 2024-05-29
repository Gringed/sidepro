"use server";

import { signIn, signOut } from "@/auth/auth";

import { stripe } from "@/stripe";
import { z } from "zod";

export const signOutAction = async () => {
  await signOut();
};

export const signInAction = async () => {
  await signIn();
};
