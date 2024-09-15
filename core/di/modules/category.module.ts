import { ContainerModule, interfaces } from "inversify";

import { ICategoryRepository } from "@/core/application/repositories/category.repository.interface";
import { CategoryRepository } from "@/core/infrastructure/repositories/category.repository";

import { DI_SYMBOLS } from "../types";

const initializeModule = (bind: interfaces.Bind) => {
  bind<ICategoryRepository>(DI_SYMBOLS.ICategoryRepository).to(
    CategoryRepository
  );
};

export const CategoryModule = new ContainerModule(initializeModule);
