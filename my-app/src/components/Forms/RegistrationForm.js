import React, { useEffect, useState } from "react";
import "./RegistrationForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    voter_ID: "",
    aadhar: "",
    area: "",
    age: 0,
    uniqueKey: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (formData.age < 0) {
      alert(`Age can not be negative`);
      setFormData(function (prevFormData) {
        return {
          ...prevFormData,
          age: 0,
        };
      });
    }
  }, [formData.age]);

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
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        formData
      );
      if(res) toast.warning(res.data.message);
      if (res && res.data.success === true) {
        toast.success("Registered Successfully");
        const voterData = {
          voter_ID: formData.voter_ID,
          member_ID: "empty",
          name: "empty",
          party: "empty",
          constituency: "empty",
          state: "empty",
          value: 0,
        };
        await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/voter`,
          voterData
        );
          navigate('/login');
          
      }
      
      
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <Layout title={"Register to Voting Portal"}>
      <div className="parent-conatiner">
        <h1 className="text-3xl m-10">Registration Form</h1>

        <form className="w-full max-w-sm" onSubmit={submitHandler}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                defaultValue="Jane Doe"
                name="name"
                value={formData.name}
                onChange={changeHandler}
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-email"
              >
                Email
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

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-email"
              >
                Voter ID
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-email"
                type="text"
                defaultValue=""
                name="voter_ID"
                value={formData.voter_ID}
                onChange={changeHandler}
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-email"
              >
                Aadhar Card No.
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-email"
                type="text"
                defaultValue=""
                name="aadhar"
                value={formData.aadhar}
                onChange={changeHandler}
              />
            </div>
          </div>
          {/* here end */}

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-email"
              >
                Your Area
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-email"
                type="text"
                defaultValue=""
                name="area"
                value={formData.area}
                onChange={changeHandler}
              />
            </div>
          </div>

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
                placeholder="******"
                name="password"
                value={formData.password}
                onChange={changeHandler}
              />
            </div>
          </div>
          {/* here */}
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-age"
              >
                Your Age
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-age"
                type="number"
                name="age"
                value={formData.age}
                onChange={changeHandler}
              />
            </div>
          </div>
          {/* here end */}

          {/* here */}
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-firend"
              >
                Your Sport
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-friend"
                type="text"
                defaultValue="Criket"
                name="uniqueKey"
                value={formData.uniqueKey}
                onChange={changeHandler}
              />
            </div>
          </div>
          {/* here end */}

          <div className="md:flex md:items-center">
            <div className="md:w-1/3" />
            <div className="md:w-2/3">
              <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>

    </Layout>
  );
};

export default RegistrationForm;
