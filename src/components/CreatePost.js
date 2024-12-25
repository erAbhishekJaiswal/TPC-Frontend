import React, { useState } from 'react'
import Avatar from 'react-avatar';
import { CiImageOn } from "react-icons/ci";
import axios from "axios"
import { TWEET_API_END_POINT } from "../utils/constant"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
// import store from '../redux/store';   getAllTweets,
import {  getIsActive, getRefresh } from '../redux/tweetSlice';

const CreatePost = () => {
  const [discription, setdescription] = useState("");
  const { user } = useSelector(store => store.user);
  const { isActive } = useSelector(store => store.tweet)
  const dispatch = useDispatch();
  const submitHandler = async () => {
    try {
      const res = await axios.post(`${TWEET_API_END_POINT}/create`, { discription, id: user?._id }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      // console.log(res);
      dispatch(getRefresh())
      if (res.data.success) {
        toast.apply.success(res.data.message);
      }
    } catch (error) {
      // toast.error(error.response.data.message)
      console.log(error);
    }
    setdescription("")

  }
  // const followingTweetHandler = async ()=>{
  //   try {
  //     const id = user?._id;
  //     const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`)
  //     dispatch(getAllTweets(res.data.tweets))
  //     // dispatch(getRefresh())
  //   } catch (error) {
  //     console.log(error);
  //   }
  // onClick={followingTweetHandler}
  // }
  const forYouHandler = () => {
    dispatch(getIsActive(true))
  }

  const followingHandler = () => {
    dispatch(getIsActive(false))
  }

  return (
    <div className='w-[100%]'>
      <div className='m-3'>
        <div className='flex items-center justify-between border-b border-gray-200'>
          <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600" : null} cursor-pointer hover:bg-gray-200 w-full text-center`}>
            <h1 className='font-bold text-gray-600 text-lg'>For You</h1>
          </div>
          <div onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-600" : null} cursor-pointer hover:bg-gray-200 w-full text-center`}>
            <h1 className='font-bold text-gray-600 text-lg'>Follwoing</h1>
          </div>
        </div>
      </div>

      <div className='m-3'>
        <div className='flex items-center'>
          <div>
            <Avatar src='https://pbs.twimg.com/profile_images/1762469282867277825/uJizXop2_400x400.jpg' size="50" round={true} />
          </div>
          <input value={discription} onChange={(e) => setdescription(e.target.value)} className='w-full outline-none border-none text-lg ml-4' type="text" placeholder='What is happning ?!' />
        </div>
        <div className='flex items-center justify-between p-4 border-b border-gray-300'>
          <div>
            <CiImageOn size={"20px"} />
          </div>
          <button onClick={submitHandler} className='bg-[#109bf0] px-4 py-2 border-none text-md rounded-full text-white font-bold'>Post</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
