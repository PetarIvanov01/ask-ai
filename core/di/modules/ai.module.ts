import { ContainerModule, interfaces } from "inversify";

import { IAiService } from "@/core/application/services/ai.service.interface";
import { AiService } from "@/core/infrastructure/services/ai.service";

import { DI_SYMBOLS } from "../types";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IAiService>(DI_SYMBOLS.IAiService).to(AiService);
};

export const AIModule = new ContainerModule(initializeModule);
