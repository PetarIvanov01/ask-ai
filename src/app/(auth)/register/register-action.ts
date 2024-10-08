"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { signUpController } from "@/core/interface-adapters/controllers/authentication/sign-up.controller";
import { InputParseError } from "@/core/entities/custom-errors/errors";

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

type PrevState = {
  email?: string;
  username?: string;
  password?: string;
  form?: string;
};

export async function register(
  prevState: PrevState,
  formData: FormData
): Promise<PrevState> {
  const data = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  await wait(2000);

  try {
    await signUpController(data);
  } catch (error) {
    if (error instanceof InputParseError) {
      return { ...error.fields };
    } else if (error instanceof Error) {
      return { form: error.message };
    }
    return { form: "Sorry, but we can't handle the request." };
  }
  revalidatePath("/", "layout");
  redirect("/");
}
