import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckLoginInfo = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("userInfo");
    if (token) {
      setIsAuthenticated(true);
      console.log("Got authenticated");
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/dashboard");
      }
    }
  }, [setIsAuthenticated, location, navigate]);

  return null;
};

export default CheckLoginInfo;
