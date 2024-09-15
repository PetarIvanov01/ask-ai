import { getInjection } from "@/core/di/container";
import { AuthenticationError } from "@/core/entities/custom-errors/errors";

import { Session } from "@/core/entities/models/session";

export async function signUpUseCase(input: {
  email: string;
  username: string;
  password: string;
}): Promise<{ session: Session }> {
  const usersRepository = getInjection("IUsersRepository");
  const authenticationService = getInjection("IAuthenticationService");

  const userExist = await usersRepository.getUserByUsername(input.username);

  if (userExist) {
    throw new AuthenticationError("User with this username already exist");
  }

  const { session } = await authenticationService.createProfileOnSignUp(input);

  return { session };
}
