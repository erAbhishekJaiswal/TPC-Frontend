import React from 'react'
import {Link} from 'react-router-dom';
import Avatar from 'react-avatar';
import { IoSearch } from "react-icons/io5";
const RightSidebar = ({ otherUsers }) => {
  return (
    <div className='ml-2 w-[30%]'>
      <div>
        <div className='flex items-center p-2 bg-gray-300 rounded-full outline-none'>
          <IoSearch />
          <input type="text" className='bg-transparent outline-none px-2' placeholder='Search' />
        </div>
        <div className='p-4 bg-gray-300 rounded-2xl my-4'>
          <h1 className='font-bold text-lg '>Who to follow</h1>
          {
            otherUsers?.map((user)=>{
              // console.log(user);
              return(
                <div key={user?._id} className='flex items-center justify-between my-3'>
            <div className='flex'>
              <div>
                <Avatar src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' size="50" round={true} />
              </div>
              <div className='ml-2'>
                <h1 className='font-bold'>{user?.name}</h1>
                <p className='text-sm'>{`@${user?.username}`}</p>
              </div>
              </div>
              <div className=''>
                <Link to={`/profile/${user?._id}`}>
                <button className='px-3 py-1 bg-black text-white rounded-full'>Profile</button>
                </Link>
                
              </div>
          </div>
              )
            })
          }

          

          {/* <div className='flex items-center justify-between my-3'>
            <div className='flex'>
              <div>
                <Avatar src='https://pbs.twimg.com/profile_images/1762469282867277825/uJizXop2_400x400.jpg' size="50" round={true} />
              </div>
              <div className='ml-2'>
                <h1 className='font-bold'>Patel</h1>
                <p className='text-sm'>@patel</p>
              </div>
              </div>
              <div className=''>
                <button className='px-3 py-1 bg-black text-white rounded-full'>Profile</button>
              </div>
          </div> */}

          {/* <div className='flex items-center justify-between my-3'>
            <div className='flex'>
              <div>
                <Avatar src='https://pbs.twimg.com/profile_images/1762469282867277825/uJizXop2_400x400.jpg' size="50" round={true} />
              </div>
              <div className='ml-2'>
                <h1 className='font-bold'>Patel</h1>
                <p className='text-sm'>@patel</p>
              </div>
              </div>
              <div className=''>
                <button className='px-3 py-1 bg-black text-white rounded-full'>Profile</button>
              </div>
          </div> */}

        </div>
      </div>
    </div>
  )
}
export default RightSidebar
