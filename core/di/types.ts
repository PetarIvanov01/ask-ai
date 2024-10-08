import { IAuthenticationService } from "@/core/application/services/authentication.service.interface";
import { IAiService } from "../application/services/ai.service.interface";

import { IUsersRepository } from "@/core/application/repositories/users.repository.interface";
import { ICategoryRepository } from "../application/repositories/category.repository.interface";
import { IChat } from "../application/repositories/chat.repository.interface";

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for("IAuthenticationService"),
  IAiService: Symbol.for("IAiService"),

  // Repositories
  IChat: Symbol.for("IChat"),
  ICategoryRepository: Symbol.for("ICategoryRepository"),
  IUsersRepository: Symbol.for("IUsersRepository"),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;
  IAiService: IAiService;

  // Repositories
  IChat: IChat;
  ICategoryRepository: ICategoryRepository;
  IUsersRepository: IUsersRepository;
}
