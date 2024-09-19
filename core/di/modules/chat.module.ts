import { ContainerModule, interfaces } from "inversify";

import { IChat } from "@/core/application/repositories/chat.repository.interface";
import { Chat } from "@/core/infrastructure/repositories/chat.repository";

import { DI_SYMBOLS } from "../types";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IChat>(DI_SYMBOLS.IChat).to(Chat);
};

export const ChatModule = new ContainerModule(initializeModule);
