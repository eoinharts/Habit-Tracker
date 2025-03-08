import React from "react";
import { Card, Button, Typography, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; 

const { Title, Paragraph } = Typography;

const WelcomePage = () => {
    const navigate = useNavigate(); // Hook to handle navigation

    return (
        <Layout style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f5f5f5" }}>
            <Card style={{ width: 400, textAlign: "center", padding: 20 }}>
                <Title level={2}>Welcome to Momentum</Title>
                <img src={logo} alt="App Logo" style={{ width: "150px", marginBottom: "20px" }} />                <Paragraph>Start building habits and tracking your progress!</Paragraph>
                {/* Button to navigate to the sign-up page */}
                <Button type="primary" onClick={() => navigate("/signup")} style={{ marginTop: 20 }}>
                    Continue to Sign Up
                </Button>
            </Card>
        </Layout>
    );
};

export default WelcomePage;
