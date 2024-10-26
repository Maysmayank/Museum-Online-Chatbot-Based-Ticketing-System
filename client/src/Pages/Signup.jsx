import React, { useState } from 'react';
import { Heading } from '../components/Heading';
import { Inputbox } from '../components/Inputbox';
import Button from '../components/Button';
import Bottomwarning from '../components/Bottomwarning';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../hooks/use-toast';

const Signup = () => {
  let navigate = useNavigate();
  const { toast } = useToast()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [otp,setOtp]=useState(null);
  
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/auth/signup', {
        username,
        email,
        password,
        otp
      });
      if(response.data.success){
        navigate('/signin')
      }
      console.log("here",response.data); // Handle success response
      navigate('/signin')
    } catch (error) {
      console.error("Error signing up:", error); // Handle error
    }
  };

  const HandleGetOtp=async()=>{
    try {
      const response = await axios.post('http://localhost:4000/api/v1/auth/sendotp', {
        email,
      });
      if(response.data.success){
        console.log(response.data); // Handle success response]\
        toast({
          title:response.data.otp
        })
      }
    } catch (error) {
      console.error("Error signing up:", error); // Handle error
    }
  }
  return (
    <div className='flex justify-center h-screen w-full items-center'>
      <div className='flex items-center h-full w-full'>
        <div className='flex flex-col items-center w-[40%]'>
          <Heading label={"Sign Up"}></Heading>
          <div className=' w-[60%]'>
            <p>Sign up through you account to continue with membership purchase or manage your account and preferences.</p>
          </div>
        </div>
        <div className='flex flex-col gap-1 w-[50%]'>
          <Inputbox
            onChange={(e) => setUsername(e.target.value)}
            placeholder={"Enter your Name"}
            label={"Name*"}
          ></Inputbox>
          <div className='relative '>
          <Inputbox
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Enter your Email"}
            label={"Email*"}
          ></Inputbox>
          <button className='absolute right-0 top-[42px] rounded-sm bg-black text-white p-2' onClick={HandleGetOtp}>Get Otp</button>
          </div>
        

          <Inputbox
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Enter your Password"}
            label={"Password*"}
          ></Inputbox>

          <Inputbox
            onChange={(e) => setOtp(e.target.value)}
            placeholder={"Enter your Otp"}
            label={"Otp*"}
          ></Inputbox>


          <div className='pt-4'>
            <Button 
            onClick={handleSignup}
            label={"Sign Up"}></Button>
            <Button  label={"Sign in With Google"}></Button>
            <Bottomwarning label={"Already have an account?"} buttontext={"Sign In"} to={"/signin"}></Bottomwarning>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
