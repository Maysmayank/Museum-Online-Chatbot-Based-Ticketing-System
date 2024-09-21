import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import Button from "../components/Button";
import Bottomwarning from "../components/Bottomwarning";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // For redirection

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/v1/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token); 

      navigate("/");
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

  return (
    <div className="flex justify-center h-screen w-full items-center">
      <div className="flex items-center h-full w-full ">
        <div className="flex flex-col items-center w-[40%]">
          <Heading label={"Sign In"}></Heading>
          <div className="w-[60%]">
            <p>
              Log in to your account to continue with membership purchase or manage your account and preferences.
            </p>
          </div>
        </div>
        <div className="w-[50%]">
          <Inputbox
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Enter your Email"}
            label={"Email*"}
          ></Inputbox>
          
          <Inputbox
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Enter your Password"}
            label={"Password*"}
            type="password" // Add type="password" for password field
          ></Inputbox>

          <div className="pt-4">
            <Button label={"Sign In"} onClick={handleSignIn}></Button>
            <Bottomwarning label={"Don't have an account?"} buttontext={"Sign Up"} to={"/signup"}></Bottomwarning>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
