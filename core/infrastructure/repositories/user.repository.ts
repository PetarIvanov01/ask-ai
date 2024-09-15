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
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE
    );
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("username", username)
      .single();

    if (!data || error !== null) {
      return undefined;
    }

    return { username: data.username };
  }

  async getUserByEmail(email: string): Promise<UserProfile | undefined> {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE
    );

    const { data, error } = await supabase
      .from("profiles")
      .select().single()
      
      const {} = await supabase.auth.getUserIdentities()
    if (!data || error !== null) {
      return undefined;
    }

    return { username: data.username };
  }
}
