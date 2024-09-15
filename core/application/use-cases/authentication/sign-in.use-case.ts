import { getInjection } from "@/core/di/container";

import { Session } from "@/core/entities/models/session";

export async function signInUseCase(input: {
  email: string;
  password: string;
}): Promise<{ session: Session }> {
  const authenticationService = getInjection("IAuthenticationService");

  return await authenticationService.createSessionOnSignIn({
    email: input.email,
    password: input.password,
  });
}
