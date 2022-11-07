import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import baseUrl from "../../utils/baseURL";
import { useDispatch } from "react-redux";
import Conversation from "./Conversation";
import Message from "./Message";
import { io } from "socket.io-client";
import InputEmoji from "react-input-emoji";
import ChatOnline from "./ChatOnline";
// import {

//   useToast,
// } from "@chakra-ui/react";
import { fetchUserDetailsAction } from "../../redux/slices/users/usersSlices";
const Messenger = () => {
  const { id } = useParams();
  console.log(id, "iddddddddddddddddddd");
  const [showPicker, setShowPicker] = useState(false);
  const [inputStr, setInputStr] = useState("");
  const [conversations, setConversations] = useState([]);
  
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [socket,setSocket] =useState(null);
  const [friendId, setFriendId] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const socket = useRef(io("ws://localhost:8900"));
  const socket = useRef();
  const scrollRef = useRef();

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  //User data from store
  const users = useSelector((state) => state.users);
  const { userAuth, userDetails } = users;
  // console.log(userDetails,'fggggggggggggggggggg');
  // console.log(userAuth?._id, "user......");

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    // socket.current = io(" https://lemon-cygnet-hat.cyclic.app");

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userAuth?._id);
    socket.current.on("getUsers", (users) => {
      //console.log(users, "socket");
    });
  }, [userAuth]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/conversation/${userAuth?._id}`
        );
        setConversations(data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userAuth?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/message/${currentChat?._id}`
        );
        console.log(data, "message");
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      console.log("not found");
      return;
    }

    try {
     
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/users/chatUser/search?search=${search}`, config);

     
      setSearchResult(data);
    } catch (err) {
    console.log(err);
    }
  };


  // console.log(messages, "message222222222222");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userAuth?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== userAuth?._id
    );
    socket.current.emit("sendMessege", {
      senderId: userAuth?._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(`${baseUrl}/api/message`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div class="container mx-auto shadow-lg rounded-lg overflow-hidden ">
      <div class="px-5 py-5 flex justify-between items-center bg-white border-b-2">
        <div class="font-semibold text-2xl">GoingChat</div>
      </div>

      <div class="flex flex-row justify-between bg-white">
        <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto ">
          <div class="border-b-2 py-4 px-2 flex">
            <input
              type="text"
              placeholder="search chatting"
             
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
            />
              <button onClick={handleSearch}>Go</button>
          </div>
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversation
                conversation={c}
                currentUser={userAuth}
                setFriendId={setFriendId}
              />
            </div>
          ))}
        </div>

        {/* {currentChat?(
  <>
  {messages.map((m)=>(
     <Message message={m} own={m.sender===userAuth?._id}/>
  ))}
  
  </>
  
)

   
:<span className='text-gray-400 font-black mt-10'>Open a conversation to start a chat</span>} */}

        <div className="over">

          {currentChat ? <div class="flex flex-col mt-5 "  style={{ overflowY: "scroll", height: "70vh", width:"500px" }}>
            {currentChat ? (
              <>
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender === userAuth?._id} />
                  </div>
                ))}
              </>
            ) : (
              <span className="text-gray-400 font-black mt-10">
                Open a conversation to start a chat
              </span>
            )}
          </div>:""}

          {/* <div class="w-full px-5 flex flex-col justify-between">
            <div class="py-5 flex">
              <input
                class="w-full bg-gray-300 py-5 px-3 rounded-xl"
                type="text"
                placeholder="type your message here..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              />
             
 <button class="bg-black hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={handleSubmit}>
  Button
</button>

            </div>
          </div> */}
          {/* <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"> */}
            {currentChat ? <div class="flex ">
              <div class="flex-grow ml-4">
                <div class="relative w-full flex">
                  <input
                    type="text"
                    class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  {/* <button
                 class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                     >
          
                     </button> */}
                </div>
              </div>
              <div class="ml-4">
                <button class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                  <span onClick={handleSubmit}> Send</span>
                  <span onClick={handleSubmit} class="ml-2">
                    <svg
                      class="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>:""}
            
          {/* </div> */}
        </div>

        {/* 
          <div class="flex flex-col w-2/5 ">
       
       <div class=" mr-10 py-4 px-2">
        
       </div>
     
       <div >
          <ChatOnline/>
          </div>
     

      
   </div> */}
        <div class="w-1/5 border-l-2 px-5 invisible sm:visible">
          <div class="flex flex-col">
            <div class="font-semibold text-xl py-4">Online Friends</div>
            <ChatOnline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
