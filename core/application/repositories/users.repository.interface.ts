import { UserProfile } from "@/core/entities/models/user";

export interface IUsersRepository {
  getUser(id: string): Promise<UserProfile | undefined>;
  getUserByUsername(username: string): Promise<UserProfile | undefined>;
  getUserByEmail(email: string): Promise<UserProfile | undefined>;
}
