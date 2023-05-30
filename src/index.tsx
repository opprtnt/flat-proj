import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";
import { isDesktop } from "react-device-detect";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
          fontSize: isDesktop ? 14 : 12,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
