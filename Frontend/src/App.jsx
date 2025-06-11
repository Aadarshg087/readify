import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import GoogleLogin from "./components/googleLogin";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";

import CheckLoginInfo from "./components/CheckLoginInfo";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // function GoogleAuthWrapperLogin() {
  //   return (
  //     <GoogleOAuthProvider clientId="216687967253-4d2jposo3g3meofj2mucvpf5dl0nqd2v.apps.googleusercontent.com"></GoogleOAuthProvider>
  //   );
  // }

  // function GoogleAuthWrapperRegister() {
  //   return (
  //     <GoogleOAuthProvider clientId="216687967253-4d2jposo3g3meofj2mucvpf5dl0nqd2v.apps.googleusercontent.com">
  //       <Register />
  //     </GoogleOAuthProvider>
  //   );
  // }

  const PrivateRouteLogin = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <CheckLoginInfo setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
