import React from "react";
import ReactDOM from "react-dom/client";
import { UserContextProvider } from "./context/userContext";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <CssBaseline />
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
