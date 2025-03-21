import React, { useState, useEffect } from "react";  // Added useEffect
import { auth } from "../utils/firebaseConfig";
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,  // Added this
} from "firebase/auth";
import { getDocuments, addDocuments } from "../utils/firestore";
import { getUserDetails } from "@firebasegen/default-connector";
import { createUser } from "@firebasegen/default-connector";
import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const provider = new GoogleAuthProvider();

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    //  Restore session on page load
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            if (user) {
                setUser(user);
                console.log("🔄 User session restored:", user.uid);
                const userDetails = await getUserDetails({userId: user.uid});
                console.log(userDetails, "userDetails");
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();  // Cleanup listener on unmount
    }, []);

    const signUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            const res = await createUser({
              id: userCredential.user.uid,
              name: "test name",
              email: userCredential.user.email,
            });
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
            // console.log(res, "result");
            setError("");
            await addDocuments("testCollection", { message: "Now Firestore is working!", timestamp: new Date() });
            console.log("✅ User signed in & test document added!");
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
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <p>Welcome, {user.email}</p>
                    <Space>
                        <Button onClick={logOut}>Log Out</Button>
                        <Button 
                            type="primary"
                            icon={<UserOutlined />}
                            onClick={() => navigate('/profile')}
                        >
                            Go to Profile
                        </Button>
                    </Space>
                </Space>
            ) : (
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '8px', width: '100%' }}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '8px', width: '100%' }}
                    />
                    <Space>
                        <Button onClick={signIn}>Sign In</Button>
                        <Button onClick={signUp}>Sign Up</Button>
                        <Button onClick={signInWithGoogle}>Sign In with Google</Button>
                    </Space>
                </Space>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Auth;
