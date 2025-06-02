import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  function HomePage() {
    navigate("/dashboard");
  }
  return (
    <div>
      <h2>404 Page Not Found</h2>
      <button onClick={HomePage}>Go to Home Page</button>
    </div>
  );
};

export default PageNotFound;
