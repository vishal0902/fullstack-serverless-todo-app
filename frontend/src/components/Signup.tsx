import React, { useState } from "react";
import InputBox from "../ui/InputBox";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import Loader from "../ui/Loader";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  // const [errorMessage, setErrorMessage] = useState('')

  

  const navigate = useNavigate();
  const handleSubmit = async () => {
    setLoading(true)
    await axios({
      method: "post",
      url: `${BACKEND_URL}/api/v1/user/signup`,
      headers: {},
      data: {
        email,
        password,
        firstName,
        lastName,
      },
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
        // setErrorMessage(error)
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
      <div className="bg-gray-700 max-h-full w-96 pt-14 pb-8 rounded-md ">
        <div className="mb-10 flex text-center">
          <Heading text="Sign up" />
        </div>
        <div className="pl-5 pr-2">
          <InputBox
            type="text"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            label="E-MAIL"
            placeholder="username@email.com"
          />
          <InputBox
            type="text"
            value={firstName}
            onChange={(e: any) => setFirstName(e.target.value)}
            label="FIRST NAME"
            placeholder="Enter first name here"
          />
          <InputBox
            type="text"
            value={lastName}
            onChange={(e: any) => setLastName(e.target.value)}
            label="LAST NAME"
            placeholder="Last name here"
          />
          <InputBox
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            label="PASSWORD"
            placeholder="Password here"
          />
          <Button buttonText="Signup" onClick={handleSubmit} />
          <div className="text-white text-center text-md mt-3 mb-5">
            Already a user?{" "}
            <span
              className="cursor-pointer underline hover:text-teal-400"
              onClick={() => navigate("/signin")}>
              Sign in.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
