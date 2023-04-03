import { useState } from "react";

import { auth, googleProvider } from "./FirebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";

function App() {
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

  console.log("user: ", auth.currentUser);

  return (
    <div>
      <h1>Job board</h1>
      <button onClick={handleSignInGoogle}>signin with google</button>
      <button onClick={handleSignOutGoogle}>signout</button>
    </div>
  );
}

export default App;
