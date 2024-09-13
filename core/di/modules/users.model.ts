import { ContainerModule, interfaces } from "inversify";

import { IUsersRepository } from "@/core/application/repositories/users.repository.interface";
import { UsersRepository } from "@/core/infrastructure/repositories/user.repository";

import { DI_SYMBOLS } from "../types";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IUsersRepository>(DI_SYMBOLS.IUsersRepository).to(UsersRepository);
};

export const UsersModule = new ContainerModule(initializeModule);
