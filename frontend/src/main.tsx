import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { UserProvider } from "./contexts/UserContext.tsx";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
