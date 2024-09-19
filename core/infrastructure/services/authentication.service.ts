import { injectable } from "inversify";

import { IAuthenticationService } from "@/core/application/services/authentication.service.interface";

import { Session, sessionSchema } from "@/core/entities/models/session";
import { UserSignUp, UserSignIn } from "@/core/entities/models/user";

import { createClient } from "../utils/supabase/server";
import { AuthenticationError } from "@/core/entities/custom-errors/errors";

// Here is the actual implementation of the Authentication service which is depends on a interface
@injectable()
export class AuthenticationService implements IAuthenticationService {
  async getSession(): Promise<Session | null> {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const result = sessionSchema.safeParse({
      token: session?.access_token,
      userId: user?.id,
      username: user?.user_metadata.username,
      expiresIn: session?.expires_in,
    });

    if (result.success) {
      const { data } = result;

      return data;
    }
    return null;
  }
  async clearSessionOnLogout(): Promise<void> {
    const supabase = createClient();

    await supabase.auth.signOut();
  }
  async createSessionOnSignIn(user: UserSignIn): Promise<{ session: Session }> {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword(user);

    if (error) {
      throw new AuthenticationError(error.message);
    }

    const session = sessionSchema.parse({
      token: data.session?.access_token,
      userId: data.user?.id,
      expiresIn: data.session?.expires_in,
    });

    return {
      session,
    };
  }

  async createProfileOnSignUp(user: UserSignUp): Promise<{ session: Session }> {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          username: user.username,
        },
      },
    });

    if (error) {
      if (error.status) {
        throw new AuthenticationError("User with this email already exist.");
      }

      throw new AuthenticationError(error.message);
    }

    const session = sessionSchema.parse({
      token: data.session?.access_token,
      userId: data.user?.id,
      expiresIn: data.session?.expires_in,
    });

    return {
      session,
    };
  }
  async invalidateSession(): Promise<void> {
    const supabase = createClient();
  }
}
