import { User } from "firebase/auth";

export interface userContext {
  currentUser: User | null | undefined;
  handleSignInGoogle?: () => void;
  handleSignOutGoogle?: () => void;
}
