import React from 'react'
import Avatar from 'react-avatar';
import { TiArrowBackOutline } from "react-icons/ti";
import { Link, useParams } from "react-router-dom"
import useGetProfile from '../hooks/useGetProfile';
import { useSelector, useDispatch} from 'react-redux';//
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

const Profile = () => {

  const { user, profile } = useSelector(store => store.user)
  const { id } = useParams();
  const dispatch = useDispatch();
  useGetProfile(id)

  const followAndUnfollowHandler = async () => {
    //follow
    if (user.following.includes(id)) {
      //Unfollow
      try {
        const token = localStorage.getItem('token');
        axios.defaults.withCredentials=true;
        const res =await axios.post(`${USER_API_END_POINT}/unfollow/${id}`,{id:user?._id},{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log(res);
        dispatch(followingUpdate(id))
        dispatch(getRefresh())
        toast.success(res.data.message);

      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);

      }
    } else {
      try {
        const token = localStorage.getItem('token');
        axios.defaults.withCredentials=true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`,{id:user?._id},{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log(res);
        dispatch(followingUpdate(id))
        dispatch(getRefresh())
        toast.success(res.data.message);

      } catch (error) {
        toast.error(error.response.data.message);
        // console.log(error);

      }

    }

  }
  return (
    <div className='w-[60%] ml-4 border-l border-r border-gray-200'>
      <div className='m-3'>
        <div className='flex items-center py-2'>
          <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
            <TiArrowBackOutline size={"25px"} />
          </Link>
          <div className='ml-2'>
            <h1 className='text-lg font-bold'>{profile?.name}</h1>
            <p className='text-gray-600 text-sm'>10 Post</p>
          </div>
        </div>
        <img src="https://pbs.twimg.com/profile_banners/1762469058954289153/1711279563/1500x500" alt="banner" />
        <div className='absolute top-52 ml-2 border-4 border-black rounded-full'>
          <Avatar src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' size="120" round={true} />
        </div>
        <div className='text-right m-4'>

          {
            profile?._id === user?._id ? (<button className='px-4 py-1 font-bold rounded-full border border-gray-400 hover:bg-gray-200'>Edit Profile</button>) : (<button onClick={followAndUnfollowHandler} className='px-4 py-1 bg-black font-bold text-white rounded-full'> {user.following.includes(id) ? "Following" : "Follow"}</button>)
          }

        </div>
        <div className='p-6'>
          <h1 className='font-bold text-xl'>{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div className='text-sm ml-7'>
          <p>
            A Twitter bio is a short summary of yourself or your business that appears under your Twitter profile picture. A good Twitter bio can make a great first impression, help you stand out from the crowd, and attract more followers.
          </p>
        </div>
      </div>
    </div>
  )
}
export default Profile
