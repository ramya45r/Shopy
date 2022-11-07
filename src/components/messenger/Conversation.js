import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  fetchUserDetailsAction,
  fetchUsersAction,
} from "../../redux/slices/users/usersSlices";
import baseUrl from "../../utils/baseURL";

const Conversation = ({ conversation, setFriendId, currentUser }) => {
  // console.log(currentUser,'---------------');
  console.log(conversation, "conversation");
  const { id } = useParams();
  const dispatch = useDispatch();
  //User data from store
  const users = useSelector((state) => state.users);
const [user,setUser] =useState(null);

// console.log(user,'userListtttttttt');
  const { usersList, followed ,userAuth} = users;
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    setFriendId(friendId);
    console.log(currentUser._id);
   console.log(friendId, "friendId");
    const getUser = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/users/${friendId}`);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
// console.log(currentUser._id, "currentUser");
  return (
    <div>
      
      <div class="flex flex-row py-4 px-2 justify-center items-center border-b-2">
          <img
            src={user?.profilePhoto}
            class="object-cover h-12 w-12 rounded-full"
            alt=""
          />
        <div class="w-full">
            <span class="text-black">{user?.firstName} {user?.lastName}</span>
        
        </div>
      </div>
      
    </div>
  );
};

export default Conversation;
