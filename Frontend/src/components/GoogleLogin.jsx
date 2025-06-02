import React from "react";
import "../App.css";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleLogin = () => {
  async function responseGoogle(authResult) {
    try {
        if(authResult.code){
            
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
