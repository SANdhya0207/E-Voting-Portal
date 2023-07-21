import React, { useState } from 'react'
import "./RegistrationForm.css"
import axios from 'axios';
import Layout from '../Layout';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ForgotPass = () => {
    const[formData, setFormData] = useState({
        email:"",
        uniqueKey:"",
        newPassword:""
    })
    const navigate = useNavigate();
    
    function changeHandler(event)
    {
        setFormData(function(prevFormData){
            return({
                ...prevFormData,
                [event.target.name]:event.target.value
            })
        })
    }

    async function submitHandler(event)
    {
        event.preventDefault();
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot`,formData)
            res.data.success === true ? toast.success("Password Reset Successfully") : toast.error("res.data.message");
            if(res.data.success === true)
            {
              navigate('/login');
            }
        } catch (error) {
            toast.error(error)
        }
    }
  return (
    <Layout title={"Forgot Password"}>
    <div className="parent-conatiner">
        <h1 className="text-3xl m-10" >Reset Password Form</h1>

      <form className="w-full max-w-sm" onSubmit={submitHandler}>
      

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
              htmlFor="inline-email"
            >
            Your Sport
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-email"
              type="name"
              defaultValue="Cricket"
              name="uniqueKey"
              value={formData.uniqueKey}
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
              Enter New Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="password"
              placeholder="******"
              name="newPassword"
              value={formData.newPassword}
              onChange={changeHandler}
            />
          </div>
        </div>
        {/* here */}
        
        <div className="md:flex md:items-center">
          <div className="md:w-1/3" />
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
    </Layout>
  )
}
export default ForgotPass
