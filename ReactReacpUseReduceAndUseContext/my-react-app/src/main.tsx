import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppContextProvider } from "./context/AppContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
