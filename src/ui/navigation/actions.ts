"use server";

import { getInjection } from "@/core/di/container";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
export async function deleteChatAction(chatId: string) {
  try {
    const chatRepository = getInjection("IChat");

    await chatRepository.deleteChatById(chatId);
  } catch (error) {}

  revalidatePath("/");
  redirect("/");
}

export async function restartChatAction(chatId: string) {
  try {
    const chatRepository = getInjection("IChat");

    await chatRepository.resetChatById(chatId);
  } catch (error) {}

  revalidatePath("/");
  redirect("/");
}

export async function renameChatAction(chatId: string, newName: string) {
  try {
    const chatRepository = getInjection("IChat");

    await chatRepository.renameChatById(chatId, newName);
  } catch (error) {}

  revalidatePath("/");
  redirect("/");
}
