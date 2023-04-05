import { createContext, useState, useEffect, PropsWithChildren } from "react";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "../FirebaseConfig";
import { userContext } from "../interfaces/user";

export const UserContext = createContext<userContext>({
  currentUser: null,
});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const handleSignInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOutGoogle = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  const [loadingData, setLoadingData] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{ handleSignInGoogle, currentUser, handleSignOutGoogle }}
    >
      {!loadingData && children}
    </UserContext.Provider>
  );
};
