import React from 'react'
import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';
const LeftSidebar = () => {
  const { user} = useSelector(store => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logoutHandler= async () =>{
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`)
      dispatch(getUser(null))
      dispatch(getOtherUsers(null))
      dispatch(getMyProfile(null));
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      localStorage.removeItem("persist:root")
      navigate('/login')
      toast.success(res.data.message)

    } catch (error) {
      console.log(error);
    }
    
  }
  return (
    <div className='w-[20%]'>
      <div>
        <div>
          <img className='ml-5' width={"24px"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/300px-X_logo_2023.svg.png?20230819000805" alt="twitter-logo" />
        </div>
        <div className='my-4'>
          <Link to="/" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
              <IoMdHome size={"25px"} />
            </div>
            <h1 className='font-bold text-lg ml-2'>Home</h1>
          </Link>
          <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
              <IoSearch size={"25px"} />
            </div>
            <h1 className='font-bold text-lg ml-2'>Explore</h1>
          </div>
          <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
              < IoNotificationsOutline size={"25px"} />
            </div>
            <h1 className='font-bold text-lg ml-2'>Notification</h1>
          </div>
          <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
              < FaRegUser size={"25px"} />
            </div>
            <h1 className='font-bold text-lg ml-2'>Profile</h1>
          </Link>
          <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
              < FaRegBookmark size={"25px"} />
            </div>
            <h1 className='font-bold text-lg ml-2'>Bookmark</h1>
          </div>
          <div onClick={logoutHandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div>
              < IoMdLogOut size={"25px"} />
            </div>
            <h1 className='font-bold text-lg ml-2'>Logout</h1>
          </div>
          <button className='px-4 py-2 border-none text-md bg-[#109bf0] w-full rounded-full text-white font-bold'>Post</button>
        </div>
      </div>
    </div>
  )
}
export default LeftSidebar
