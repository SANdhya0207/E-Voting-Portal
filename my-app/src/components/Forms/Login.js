import React, { useState } from "react";
import "./RegistrationForm.css";
import { useAuth } from "../../context/Auth.js";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import Layout from "../Layout";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    voter_ID: "",
  });
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData(function (prevFormData) {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        formData
      );
      if (res && res.data.success) {
        toast.success("Login successfully!!");

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.warning(res.data.message);
        toast.warning(" or Wrong voter ID field");
      }
    } catch (error) {
      toast.error("Someting went wrong");
    }
  }
  return (
    <Layout title={"Login to Voting Portal"}>
      <div className="parent-conatiner">
        <h1 className="text-3xl m-10">Login Form</h1>

        <form className="w-full max-w-sm login" onSubmit={submitHandler}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-email"
              >
                Enter Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-email"
                type="email"
                defaultValue="JaneDoe@gmail.com"
                name="email"
                value={formData.email}
                onChange={changeHandler}
              />
            </div>
          </div>
          {/* here end */}

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-voter_ID"
              >
                Enter voter-ID
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-voter_ID"
                type="text"
                name="voter_ID"
                value={formData.voter_ID}
                onChange={changeHandler}
              />
            </div>
          </div>
          {/* here end */}

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="password"
                placeholder="******************"
                name="password"
                value={formData.password}
                onChange={changeHandler}
              />
            </div>
          </div>
          {/* here */}
          <div className="flex flex-col md:items-center">
          <div className="md:w-1/3" />
            <div className="md:w-2/3">
              <NavLink
                to="/register"
                className="m-4 text-xl text-purple-600 hover:underline"
              >
                New User? Register Here 
              </NavLink>
            </div>
            <br />
            <div className="md:w-2/3">
              <NavLink
                to="/forgot-pass"
                className="m-4 text-xl text-purple-600 hover:underline"
              >
                Forget Password?
              </NavLink>
            </div>
            </div>
<br />
          <div className="md:flex md:items-center">
            <div className="md:w-1/3" />
            <div className="md:w-1/3">
              <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Login
              </button>
              
            </div>
          
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
