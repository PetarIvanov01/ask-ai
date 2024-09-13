import { UserProfile } from "@/core/entities/models/user";

export interface IUsersRepository {
  getUser(id: string): Promise<UserProfile | undefined>;
  createUserProfile({
    username,
    email,
  }: {
    username: string;
    email: string;
  }): Promise<{ username: string; email: string }>;

  getUserByUsername(username: string): Promise<UserProfile | undefined>;
  getUserByEmail(email: string): Promise<UserProfile | undefined>;
}
