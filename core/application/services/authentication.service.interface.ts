import { UserSignUp, UserSignIn } from "@/core/entities/models/user";
import { Session } from "@/core/entities/models/session";

// Only the interface that will be implemented inside the infrastructure part.
export interface IAuthenticationService {
  createProfileOnSignUp(user: UserSignUp): Promise<{ session: Session }>;
  createSessionOnSignIn(user: UserSignIn): Promise<{ session: Session }>;
  clearSessionOnLogout(): Promise<void>;
  invalidateSession(): Promise<void>;
  getSession(): Promise<Session | null>;
}
