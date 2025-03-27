import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./theme/forced-colors.css";
import App from "./App.jsx";
import { App as AntdApp } from "antd";
import { ConfigProvider } from "antd";
import { theme } from "./utils/theme.js";
import { antdConfig } from "./theme/antdConfig";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Theme setter for ant design library  */}
    <ConfigProvider theme={theme}>
      {/* Intialize Ant Design */}
      <AntdApp style={{ height: "100vh" }}>
        {/* Initialize react router */}
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  </StrictMode>
);
