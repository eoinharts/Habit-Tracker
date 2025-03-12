import React, { useState } from "react";
import { auth } from "../utils/firebaseConfig";
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { getDocuments,addDocuments } from "../utils/firestore";
import { useCreateUser, useGetUserDetails } from "@firebasegen/default-connector/react";
import { getUserDetails } from "@firebasegen/default-connector";

const provider = new GoogleAuthProvider();
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const { isLoading, data1, error1 } = useGetUserDetails();
    console.log(data1)

    const signUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            console.log("✅ User signed up:", userCredential.user);
            setError("");
        } catch (err) {
            console.error("❌ Signup error:", err);
            setError(err.message);
        }
    };

    const signIn = async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          setUser(userCredential.user);
          console.log(userCredential.user)
                                  const res = await getUserDetails();
                                  console.log(res);
          setError("");
          await addDocuments("testCollection", { message: "Now Firestore is working!", timestamp: new Date() });
        //   const { isLoading, data1, error } = useCreateUser({username: "Test User",
        //     email: userCredential.user.email,
        //   });
          console.log("User signed in & test document added!");
        } catch (err) {
          setError(err.message);
        }
      };
      

    const signInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            setUser(userCredential.user);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
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
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={signUp}>Sign Up</button>
                    <button onClick={signIn}>Sign In</button>
                    <button onClick={signInWithGoogle}>Sign In with Google</button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
            )}
        </div>
    );
};

export default Auth;
