import { UserAuth } from "@/core/entities/models/user";
import { Session } from "@/core/entities/models/session";

// Only the interface that will be implemented inside the infrastructure part.
export interface IAuthenticationService {
  createSessionOnSignUp(user: UserAuth): Promise<{ session: Session }>;
  createSessionOnSignIn(user: UserAuth): Promise<{ session: Session }>;
  invalidateSession(): Promise<void>;
}
