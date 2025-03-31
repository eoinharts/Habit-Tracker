import React from "react";
import { Card, Button, Typography } from "antd";
import { useNavigate } from "react-router";
import logo from "../assets/logo.png"; 

const { Title, Paragraph } = Typography;

const WelcomePage = () => {
    const navigate = useNavigate(); 

    return (
      <div
        className="fade-in"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          padding: "20px",
        }}
      >
        <Card
          className="shadow-none"
          style={{
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
            padding: 20,
            border: "none",
          }}
        >
          <Title level={2}>Welcome to Momentum</Title>
          <img
            src={logo}
            alt="App Logo"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <Paragraph>
            Start building habits and tracking your progress!
          </Paragraph>
          <Button
            type="primary"
            onClick={() => navigate("/auth")}
            className="w-100 py-4"
            style={{ marginTop: 20 }}
          >
            Get Started
          </Button>
        </Card>
      </div>
    );
};

export default WelcomePage;
