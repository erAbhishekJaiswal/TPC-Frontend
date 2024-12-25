import { TWEET_API_END_POINT } from "../utils/constant"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";
import axios from "axios";
// import Cookies from 'universal-cookie';  // Import js-cookie


const useGetMyTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh, isActive } = useSelector(store => store.tweet);

    const fetchMyTweets = async () => {
        try {
            const token = localStorage.getItem('token');  // Replace 'token' with the actual name of your cookie
            console.log(token);
            const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`,  {
                headers: {
                    Authorization: `Bearer ${token}`  // Add the token to the Authorization header
                },
                // withCredentials: true  // Ensure credentials (cookies) are included
            });
            // console.log(res);
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.log(error);
        }
    }

    const followingTweetHandler = async () => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`)
            console.log(res);
            dispatch(getAllTweets(res.data.tweets))
            // dispatch(getRefresh())
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isActive) {
            fetchMyTweets();
        } else {
            followingTweetHandler();
        }
    }, [isActive,refresh]);
}
export default useGetMyTweets;