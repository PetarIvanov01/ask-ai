import { getInjection } from "@/core/di/container";
import { AuthenticationError } from "@/core/entities/custom-errors/errors";

export async function getConversationUseCase(chatTopic: string) {
  const chatRepository = getInjection("IChat");
  const authService = getInjection("IAuthenticationService");

  const session = await authService.getSession();

  if (session === null) {
    throw new AuthenticationError("Not Authorized");
  }
  const history = await chatRepository.getChatByTopic(
    chatTopic,
    session.userId
  );

  return history;
}
