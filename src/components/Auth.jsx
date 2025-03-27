import React, { useState, useEffect } from "react";
import { auth } from "../utils/firebaseConfig";
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { getUserDetails } from "@firebasegen/default-connector";
import { createUser } from "@firebasegen/default-connector";
import { useNavigate } from 'react-router-dom';
import { Button, Space, Input, Typography, Card } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const provider = new GoogleAuthProvider();

const contentData = [
    {
        image: "image1.jpg",
        heading: "Create Good Habits",
        text: "Change your life by slowly adding new healthy habits and sticking to them"
    },
    {
        image: "image2.jpg",
        heading: "Track Your Progress",
        text: "Monitor your habits and see your growth over time"
    },
    {
        image: "image3.jpg",
        heading: "Stay Together and Strong",
        text: "Find friends to discuss common topics. Complete challenges together."
    }
];

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                console.log("🔄 User session restored:", user.uid);
                await getUserDetails({ userId: user.uid });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % contentData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const signUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            await createUser({
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
          const signedInUser = userCredential.user;
          setUser(signedInUser);
          setError("");
      
          try {
            // Try get user from Data Connect
            const result = await getUserDetails({ userId: signedInUser.uid });
            if (!result?.data?.users?.length) {
              // If user not found, create them
              await createUser({
                id: signedInUser.uid,
                name: signedInUser.displayName || "Anonymous",
                email: signedInUser.email,
              });
              console.log("✨ User created in Data Connect after sign in");
            }
          } catch (fetchErr) {
            console.warn("⚠️ User not found in Data Connect. Creating...");
            await createUser({
              id: signedInUser.uid,
              name: signedInUser.displayName || "Anonymous",
              email: signedInUser.email,
            });
          }
      
          console.log("✅ User signed in!");
        } catch (err) {
          console.error("❌ Sign in error:", err);
          setError(err.message);
        }
      };
    
      const signInWithGoogle = async () => {
        try {
          const userCredential = await signInWithPopup(auth, provider);
          const googleUser = userCredential.user;
          setUser(googleUser);
          setError("");
      
          // ✅ Check if user exists in Data Connect
          const result = await getUserDetails({ userId: googleUser.uid });
      
          if (!result?.data?.users?.length) {
            await createUser({
              id: googleUser.uid,
              name: googleUser.displayName || "No Name",
              email: googleUser.email,
            });
            console.log("✨ Google user created in Data Connect");
          } else {
            console.log("✅ Google user already exists in Data Connect");
          }
      
          console.log("✅ Google Sign-In successful");
        } catch (err) {
          console.error("❌ Google Sign In Error:", err);
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
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundImage: 'url("background.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Card
                style={{ width: 400, padding: '30px', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img src={contentData[currentIndex].image} alt="Feature" style={{ width: '100%', borderRadius: '10px' }} />
                    <Title level={4}>{contentData[currentIndex].heading}</Title>
                    <Text>{contentData[currentIndex].text}</Text>
                    <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        {contentData.map((_, index) => (
                            <span
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: currentIndex === index ? '#1890ff' : '#ccc',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                }}
                            />
                        ))}
                    </div>
                </div>
                <Title level={3} style={{ textAlign: 'center' }}>Welcome 👋</Title>
                {user ? (
                    <Space direction="vertical" style={{ width: '100%' }} size="middle">
                        <Text strong>Signed in as: {user.email}</Text>
                        <Button block onClick={logOut}>Log Out</Button>
                        <Button
                            type="primary"
                            icon={<UserOutlined />}
                            block
                            onClick={() => navigate('/profile')}
                        >
                            Go to Profile
                        </Button>
                    </Space>
                ) : (
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Input
                            size="large"
                            placeholder="Email"
                            prefix={<MailOutlined />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input.Password
                            size="large"
                            placeholder="Password"
                            prefix={<LockOutlined />}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="primary" block onClick={signIn}>Sign In</Button>
                        <Button block onClick={signUp}>Sign Up</Button>
                        <Button
                            icon={<GoogleOutlined />}
                            block
                            onClick={signInWithGoogle}
                        >
                            Sign In with Google
                        </Button>
                    </Space>
                )}
                {error && <Text type="danger" style={{ display: 'block', marginTop: '15px' }}>{error}</Text>}
            </Card>
        </div>
    );
};

export default Auth;
