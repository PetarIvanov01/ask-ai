"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { signInController } from "@/core/interface-adapters/controllers/authentication/sign-in.controller";
import { signUpController } from "@/core/interface-adapters/controllers/authentication/sign-up.controller";

export async function login(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const result = await signInController(data);

    revalidatePath("/", "layout");
    redirect("/");
  } catch (error) {
    // handle error
  }
}

export async function signup(formData: FormData) {
  const data = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const result = await signUpController(data);

    revalidatePath("/", "layout");
    redirect("/");
  } catch (error) {
    console.log(error);

    // handle error
  }
}
