import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="216687967253-4d2jposo3g3meofj2mucvpf5dl0nqd2v.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
