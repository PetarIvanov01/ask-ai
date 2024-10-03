import { getInjection } from "@/core/di/container";
import { AuthenticationError } from "@/core/entities/custom-errors/errors";

export async function getChatsUseCase() {
  const chatRepository = getInjection("IChat");
  const authRepository = getInjection("IAuthenticationService");

  const session = await authRepository.getSession();

  if (!session) {
    throw new AuthenticationError("Not Authenticated");
  }

  return await chatRepository.getChats(session.userId);
}
