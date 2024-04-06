import React, { useState } from "react";
import InputBox from "../ui/InputBox";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import Loader from "../ui/Loader";
import {toast, Slide, Bounce} from "react-toastify"


export default function Sigin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  // const [errorMessage, setErrorMessage] = useState('')
  //@ts-ignore

  const navigate = useNavigate();

  function notify(msg:string) {
    toast.warn(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce
      
      });
   
  }

  const handleSubmit = async () => {
    setLoading(true)
    await axios({
      method: "post",
      url: `${BACKEND_URL}/api/v1/user/signin`,
      headers: {},
      data: {
        email,
        password
      }
    })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token.toString());
          console.log("hello");
          navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false)
        notify(error.response.data.error.toString());
      });
  };


 

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="bg-gray-700 max-h-full w-96 pt-14 pb-8 rounded-md ">
        <div className="mb-10 flex text-center">
          <Heading text="Sign in" />
        </div>
        <div  className="pl-5 pr-2">
          <InputBox
            type="text"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            label="E-MAIL"
            placeholder="username@email.com"
          />
          <InputBox
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            label="PASSWORD"
            placeholder="Enter your password here"
          />
          {loading ? <div className="flex justify-center mt-3"><Loader /></div> : <div className="mt-3"><Button buttonText="Signin"  onClick={handleSubmit} /></div>}
          <div className="text-white text-center text-md mt-3 mb-5">
            New to Todoosh?{" "}
            <span
              className="cursor-pointer underline hover:text-teal-400"
              onClick={() => navigate("/signup")}>
              Sign up.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
