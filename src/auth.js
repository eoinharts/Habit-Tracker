import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setError(""); // Clear error message on success
      console.log("User signed up:", userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setError(""); // Clear error message on success
      console.log("User signed in:", userCredential.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User logged out");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Firebase Authentication</h2>

      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={logOut}>Log Out</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signUp}>Sign Up</button>
          <button onClick={signIn}>Sign In</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Auth;
