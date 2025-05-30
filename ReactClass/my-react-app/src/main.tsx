// Wrap it

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppContextProvider } from "./context/AppContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AppContextProvider>
);
