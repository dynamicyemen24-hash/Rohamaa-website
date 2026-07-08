import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.css";
import { AuthProvider } from "@/features/auth/contexts/AuthContext";

import App from "./app/App";
import { ToastProvider } from "./app/components/Toast";
import { initializeCoreServices } from "@/features/core";

// Initialize enterprise core services
initializeCoreServices().catch(() => {});

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToastProvider>
  </StrictMode>
);
