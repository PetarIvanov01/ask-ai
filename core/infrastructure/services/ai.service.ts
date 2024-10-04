import { injectable } from "inversify";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { IAiService } from "@/core/application/services/ai.service.interface";
import { BotMessageShema } from "@/core/entities/models/chat";

const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

@injectable()
export class AiService implements IAiService {
  private model = "gemini-1.5-flash";

  async createBotResponse(message: string): Promise<BotMessageShema> {
    const { response } = await model
      .getGenerativeModel({
        model: this.model,
      })
      .generateContent(message);
    return response.text();
  }
}
