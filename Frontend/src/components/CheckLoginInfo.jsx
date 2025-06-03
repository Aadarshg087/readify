import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckLoginInfo = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    const token = JSON.parse(data)?.token;
    if (token) {
      setIsAuthenticated(true);
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/dashboard");
      }
    }
  }, [setIsAuthenticated, location, navigate]);

  return null;
};

export default CheckLoginInfo;
