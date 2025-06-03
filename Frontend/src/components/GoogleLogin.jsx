import React from "react";
import "../App.css";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();
  async function responseGoogle(authResult) {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        console.log(result.data);
        const details = {
          name: result.data.user.fullName,
          email: result.data.user.email,
          token: result.data.token,
        };

        localStorage.setItem("userInfo", JSON.stringify(details));

        navigate("/dashboard");
      }
      console.log(authResult);
    } catch (error) {
      console.log(`Error whilte requesting google code ${error}`);
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="App">
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
};

export default GoogleLogin;
