import { Container } from "inversify";

import { AuthenticationModule } from "./modules/authentication.module";
import { CategoryModule } from "./modules/category.module";
import { UsersModule } from "./modules/users.model";
import { ChatModule } from "./modules/chat.module";
import { AIModule } from "./modules/ai.module";

import { DI_SYMBOLS, DI_RETURN_TYPES } from "./types";

const ApplicationContainer = new Container({
  defaultScope: "Singleton",
});

export const initializeContainer = () => {
  ApplicationContainer.load(AuthenticationModule);
  ApplicationContainer.load(AIModule);
  ApplicationContainer.load(UsersModule);
  ApplicationContainer.load(CategoryModule);
  ApplicationContainer.load(ChatModule);
};

initializeContainer();

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export { ApplicationContainer };
