import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetProfile = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const token = localStorage.getItem('token');  // Replace 'token' with the actual name of your cookie
                // console.log(token);
                
                const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`  // Add the token to the Authorization header
                    },
                    // withCredentials: true  // Ensure credentials (cookies) are included
                });
                // console.log(res);
                dispatch(getMyProfile(res.data.user));
            } catch (error) {
                console.log(error);
            }
        }
        fetchMyProfile();
    }, [id]);

}
export default useGetProfile;