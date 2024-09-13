import { getInjection } from "@/core/di/container";

import { Session } from "@/core/entities/models/session";

export async function signInUseCase(input: {
  email: string;
  password: string;
}): Promise<{ session: Session }> {
  const usersRepository = getInjection("IUsersRepository");
  const authenticationService = getInjection("IAuthenticationService");

  const existingUser = await usersRepository.getUserByEmail(input.email);

  if (!existingUser) {
    throw new Error("User does not exist");
  }

  return await authenticationService.createSessionOnSignIn({
    email: input.email,
    password: input.password,
    username: existingUser.username,
  });
}
