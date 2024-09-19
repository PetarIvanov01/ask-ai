import { UserProfile } from "@/core/entities/models/user";

export interface IUsersRepository {
  getUserByUsername(username: string): Promise<UserProfile | undefined>;
  getUserByEmail(email: string): Promise<UserProfile | undefined>;
}
