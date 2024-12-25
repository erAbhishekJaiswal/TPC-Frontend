import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { getOtherUsers } from "../redux/userSlice";
import { getOtherUsers } from "../redux/userSlice";


const useOtherUsers = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const token = localStorage.getItem('token');  // Replace 'token' with the actual name of your cookie
                console.log(token);
                
                const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`  // Add the token to the Authorization header
                    },
                    // withCredentials: true  // Ensure credentials (cookies) are included
                });
                // console.log(res);
                dispatch(getOtherUsers(res.data.otherUsers));
                // console.log(dispatch);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, []);

}
export default useOtherUsers;