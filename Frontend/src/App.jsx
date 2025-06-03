import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import GoogleLogin from "./components/googleLogin";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";

import { GoogleOAuthProvider } from "@react-oauth/google";
import CheckLoginInfo from "./components/CheckLoginInfo";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  function GoogleAuthWrapper() {
    return (
      <GoogleOAuthProvider clientId="216687967253-4d2jposo3g3meofj2mucvpf5dl0nqd2v.apps.googleusercontent.com">
        <GoogleLogin />
      </GoogleOAuthProvider>
    );
  }

  const PrivateRouteLogin = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <CheckLoginInfo setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={<PrivateRouteLogin element={<Dashboard />} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
