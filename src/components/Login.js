import React, { useState } from 'react'
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { getUser } from '../redux/userSlice';
// import Cookies from 'js-cookie';
// import Cookies from 'universal-cookie';

const Login = () => {
  const [isLogin, setisLogin] = useState(true);
  const [name, setName] = useState("")
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate =useNavigate();
  const dispatch =useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(name,username,email,password);
    if (isLogin) {
      //login
      try {
        const res = await axios.post(`https://tpc-backend.vercel.app/api/v1/user/login`, { email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        }
      );
        // console.log(res);
        dispatch(getUser(res?.data?.user))
        if(res.data.success){
          navigate("/")
          toast.success(res.data.message)
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);
          // const cookies = new Cookies();
          // const token = cookies.get('token');
          // console.log("Token:", token);
        }
      } catch (error) {
        toast.success(error.response.data.message)
        console.log(error);
      }

      // const axiosInstance = axios.create({
      //   baseURL: USER_API_END_POINT,
      //   timeout: 10000, // 10 seconds timeout
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   withCredentials: true,
      // });
      
      // try {
      //   const res = await axiosInstance.post('/login', { email, password });
      //   dispatch(getUser(res?.data?.user));
      //   if (res.data.success) {
      //     navigate("/");
      //     toast.success(res.data.message);
      //   }
      // } catch (error) {
      //   toast.error(error.response?.data?.message || "An error occurred");
      //   console.error(error);
      // }
      

    } else {
      //signup
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, { name, username, email, password }, {
          headers: {
            'Content-Type': "application/json"
          },
          withCredentials: true
        });
        console.log(res);
        if(res.data.success){
          toast.success(res.data.message)
        }
      } catch (error) {
        toast.success(error.response.data.message)
        console.log(error);
      }
    }
  }

  const loginSignupHandler = () => {
    setisLogin(!isLogin)
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-around w-[60%]'>
        <div>
          <img className='ml-5' width={"60%"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/300px-X_logo_2023.svg.png?20230819000805" alt="twitter-logo" />
        </div>
        <div>
          <div>
            <h1 className='font-bold text-6xl'>Happning Now</h1>
          </div>
          <h1 className='mt-4 mb-2 font-bold text-2xl'> {isLogin ? "Login" : "Signup"}</h1>
          <form onSubmit={submitHandler} className='flex flex-col w-[50%]'>
            {
              !isLogin && (
                <>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='outline-blue-500 border border-gray-800 px-4 py-2 rounded-full my-1 font-semibold' />
                  <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder='UserName' className='outline-blue-500 border border-gray-800 px-4 py-2 rounded-full my-1 font-semibold' />
                </>
              )
            }


            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='outline-blue-500 border border-gray-800 px-4 py-2 rounded-full my-1 font-semibold' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='outline-blue-500 border border-gray-800 px-4 py-2 rounded-full my-1 font-semibold' />
            <button className='bg-[#109BF0] border-none py-2 my-4 rounded-full text-white text-lg'>{isLogin ? "Login" : "Create Account"}</button>
            <h1 className='text-sm'>{isLogin ? "You have not account" : "Already have an account?"} <span onClick={loginSignupHandler} className='text-blue-600 font-bold cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
