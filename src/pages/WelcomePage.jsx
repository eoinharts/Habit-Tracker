import React from "react";
import { Card, Button, Typography } from "antd";
import { useNavigate } from "react-router";
import logo from "../assets/logo.png"; 

const { Title, Paragraph } = Typography;

const WelcomePage = () => {
    const navigate = useNavigate(); 

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, padding: "20px" }}>
            <Card style={{ width: "100%", maxWidth: 400, textAlign: "center", padding: 20 }}>
                <Title level={2}>Welcome to Momentum</Title>
                <img src={logo} alt="App Logo" style={{ width: "150px", marginBottom: "20px" }} />                
                <Paragraph>Start building habits and tracking your progress!</Paragraph>
                <Button type="primary" onClick={() => navigate("/auth")} style={{ marginTop: 20 }}>
                    Continue
                </Button>
            </Card>
        </div>
    );
};

export default WelcomePage;
