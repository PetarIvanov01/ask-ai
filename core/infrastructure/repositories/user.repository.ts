import { injectable } from "inversify";

import type { IUsersRepository } from "@/core/application/repositories/users.repository.interface";
import { type UserProfile } from "@/core/entities/models/user";
import { createClient } from "../utils/supabase/server";

@injectable()
export class UsersRepository implements IUsersRepository {
  async getUser(id: string): Promise<UserProfile | undefined> {
    return;
  }
  async getUserByUsername(username: string): Promise<UserProfile | undefined> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single();

    if (!data) {
      return undefined;
    }
    return { email: data.email, username: data.username };
  }

  async createUserProfile({
    username,
    email,
  }: {
    username: string;
    email: string;
  }): Promise<UserProfile> {
    const supabase = createClient();

    const { error } = await supabase.from("users").insert({
      email,
      username,
    });

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }

    return { email, username };
  }
  async getUserByEmail(email: string): Promise<UserProfile | undefined> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .single();

    if (!data) {
      return undefined;
    }
    return { email: data.email, username: data.username };
  }
}
