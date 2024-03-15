import React, { useState } from "react";
import InputBox from "../ui/InputBox";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import Loader from "../ui/Loader";

export default function Sigin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  // const [errorMessage, setErrorMessage] = useState('')
  //@ts-ignore

  const navigate = useNavigate();

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
        console.log(error);
        // setErrorMessage(error.response.data.message)
      });
  };


 if(loading){
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Loader />
    </div>
  )
 }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="bg-gray-700 min-h-[65vh] w-96 pt-5 rounded-md ">
        <div className="mb-10 flex text-center">
          <Heading text="Sign in" />
        </div>
        <div  className="pl-5 pr-2">
          <InputBox
            type="text"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            label="E-MAIL"
            placeholder="Your email here"
          />
          <InputBox
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            label="PASSWORD"
            placeholder="Your password here"
          />
          <Button buttonText="Sigin" onClick={handleSubmit} />
          <div className="text-white text-center text-sm mt-3">
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
