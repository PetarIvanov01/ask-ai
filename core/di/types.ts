import { IAuthenticationService } from "@/core/application/services/authentication.service.interface";
import { IUsersRepository } from "@/core/application/repositories/users.repository.interface";
import { ICategoryRepository } from "../application/repositories/category.repository.interface";

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for("IAuthenticationService"),

  // Repositories
  ICategoryRepository: Symbol.for("ICategoryRepository"),
  IUsersRepository: Symbol.for("IUsersRepository"),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;

  // Repositories
  ICategoryRepository: ICategoryRepository;
  IUsersRepository: IUsersRepository;
}
