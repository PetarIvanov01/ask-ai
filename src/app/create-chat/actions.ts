"use server";

import { customChatSchema } from "@/core/entities/models/chat";

import { initialState } from "@/src/utils/createChatOptions";
import { redirect } from "next/navigation";

type CreatePrevState =
  | {
      status: "success";
    }
  | { status: "error"; errors: Record<keyof typeof initialState, string[]> };

export async function createChat(
  prevState: CreatePrevState,
  formData: FormData
): Promise<CreatePrevState> {
  const fields = {
    topic: formData.get("topic"),
    title: formData.get("title"),
    proficiency: formData.get("proficiency"),
    personality: formData.get("personality"),
    language: formData.get("language"),
    responseLength: formData.get("responseLength"),
    background: formData.get("background"),
    tag: formData.get("tag"),
  };

  const response = customChatSchema.safeParse(fields);
  console.log(response);

  if (response.error) {
    const errors = response.error?.flatten().fieldErrors as any;

    return {
      status: "error",
      errors,
    };
  }

  try {
    // Call the controller
  } catch (error) {
    return {
      status: "error",
      errors: {} as any,
    };
  }

  redirect("/");
}
