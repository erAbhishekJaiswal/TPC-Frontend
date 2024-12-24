import React from 'react'
import Avatar from 'react-avatar';
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
// import store from '../redux/store';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetSlice';
import { MdDeleteOutline } from "react-icons/md";

const Tweet = ({ tweet }) => {

    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch();
    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            // console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.success(error.response.data.message)
            console.log(error);
        }
    }

    const deleteTweetHandler = async (id)=>{
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
            // console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.success(error.response.data.message);
            console.log(error);
        }

    }
    return (
        <div className='border-b border-gray-200'>
            <div>
                <div className='flex p-4'>
                    <Avatar src='https://pbs.twimg.com/profile_images/1762469282867277825/uJizXop2_400x400.jpg' size="50" round={true} />
                    <div className='ml-2 w-full'>
                        <div className='flex items-center'>
                            <h1 className='font-bold'>{tweet?.userDetails[0].name}</h1>
                            <p className='text-gray-500 text-sm ml-1'>{`@${tweet?.userDetails[0].username}.1m`} </p>
                        </div>
                        <div>
                            <p>
                                {tweet?.discription}
                            </p>
                        </div>
                        <div className='flex justify-between my-3'>
                            <div className='flex items-center '>
                                <div className='cursor-pointer hover:bg-gray-200 rounded-full p-2'>
                                    <FaRegComment size={"20px"} />
                                </div>
                                <p className='ml-1'>0</p>
                            </div>
                            <div className='flex items-center'>
                                <div onClick={() => likeOrDislikeHandler(tweet?._id)} className='cursor-pointer hover:bg-gray-200 rounded-full p-2'>
                                    <FaRegHeart size={"20px"} />
                                </div>
                                <p className='ml-1'>{tweet?.like?.length}</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='cursor-pointer hover:bg-gray-200 rounded-full p-2'>
                                    <FaRegBookmark size={"20px"} />
                                </div>
                                <p className='ml-1'>0</p>
                            </div>

                            {
                                user?._id === tweet?.userId && (
                                    <div onClick={()=>deleteTweetHandler(tweet?._id)} className='flex items-center'>
                                        <div className='cursor-pointer hover:bg-gray-200 rounded-full p-2'>
                                            <MdDeleteOutline size={"25px"} />
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Tweet
