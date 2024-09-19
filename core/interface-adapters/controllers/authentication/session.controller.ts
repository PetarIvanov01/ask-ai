import { getInjection } from "@/core/di/container";
import { AuthenticationError } from "@/core/entities/custom-errors/errors";

export async function getSession() {
  const authService = getInjection("IAuthenticationService");

  const session = await authService.getSession();

  if (!session) {
    throw new AuthenticationError("Session doesn't exist");
  }

  return session;
}
