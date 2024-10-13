/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const [state, setState] = useState(false);
  const [emailState, setEmailState] = useState(false);
  const [passState, setPassState] = useState(false);

  const [labelName, setlabelName] = useState("Username");
  const [labelEmail, setlabelEmail] = useState("Email");
  const [labelPassword, setlabelPassword] = useState("Password");

  const[error,setError] = useState("");
  const navigate = useNavigate("/");

  const handelStat = () => {
    setState(false);
    setlabelName("UserName");

    setEmailState(false);
    setlabelEmail("Email");

    setPassState(false);
    setlabelPassword("Password");
  };
  const handleForm = (e) => {
    e.preventDefault();
    const userData = { name:userName, email, password };

    let check = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

    if (userName.length < 3 || !isNaN(parseInt(userName))) {
      setState(true);
      setlabelName("incorrect name , Username should be more than 2 letters");
    } else if (
      !check.test(email)
    ) {
      handelStat();
      setEmailState(true);
      setlabelEmail("incorrect email , please enter valid email");
    } else if (password.length < 6) {
      handelStat();
      setPassState(true);
      setlabelPassword("Password should be more than 6 letters");
    } else {
      handelStat();
      axios({
        method: "post",
        url: "http://localhost:8000/api/users/register",
        data: userData,
      }).then(()=> {
        navigate('/login');
      }).catch((res)=>{
        console.log("Error: ",res)
        setError(res.response.data.message);
      })
      
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen pt-10">
      <div>
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
          <form
            onSubmit={handleForm}
            className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className=" flex flex-col gap-6">
              <Input
                label={labelName}
                error={state}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                label={labelEmail}
                error={emailState}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label={labelPassword}
                type="password"
                error={passState}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error &&<p className="text-red-700 italic">{error}</p>}

            <Button className="mt-6" fullWidth type="submit">
              sign up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;