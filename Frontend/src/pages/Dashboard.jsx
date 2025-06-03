import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const details = localStorage.getItem("userInfo");
    const userData = JSON.parse(details);
    setUserInfo(userData);
  }, []);

  function handleLogout() {
    localStorage.removeItem("userInfo");
    navigate("/login");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <p>Welcome {userInfo?.name}</p>
        <p>Your email is {userInfo?.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
