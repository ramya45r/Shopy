import React from 'react'
import { useSelector } from 'react-redux'
import {format} from "timeago.js"
import "./style.css"

const Message = ({message,own}) => {
    // console.log(own,"looooooooooo")
    // console.log(message?.message?.text,"dfffffffffffffffff");
    const users = useSelector((state) => state.users);
    const { userAuth ,userList} = users;
    // console.log(userList,'5555555555555555555');
  return (
   
//    <div>
//  {own ? ( <div>
//  <div class=" justify-end mb-4 flex">
//             <div
//               class="mr-2 py-3 px-4 bg-green-800 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
//             >
//              {message?.text}
//             </div>
//             <img
//               src={userAuth.
//                 profilePhoto}
//               class="object-cover h-8 w-8 rounded-full"
//               alt=""
//             />
//            <span>  { format(message?.createdAt)}</span>
//           </div>
          

//           </div>
//           ):(<div class="flex justify-start mb-4">
//               <span>  { format(message?.createdAt)}</span>
//             {/* <img
//               src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
//               class="object-cover h-8 w-8 rounded-full"
//               alt=""
//             />
          
//             <div
//               class="ml-2 py-3 px-4 rounded-br-3xl bg-gray-600 rounded-tr-3xl rounded-tl-xl text-white"
//             >
//                {message?.text}
             
//             </div> */}
        
            
//           </div> )}
//    </div>
   

<div>
  <div class="flex flex-col h-full overflow-x-auto mb-4">
    <div class="flex flex-col h-full">
      <div class="grid grid-cols-12 gap-y-2">
       
       
       
      {own ? (  
       
        


        <div class="col-start-6 col-end-13 p-3 rounded-lg">
        <div class="flex items-center justify-start flex-row-reverse">
          <img src={userAuth.
               profilePhoto}
            class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
          />
          
          <div
            class=" mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
          >
            <div className='font-semibold'>{message?.text}</div>
            <span>{ format(message?.createdAt)}</span>
          </div>
        </div>
      </div>
        ):(
          <div class="col-start-1 col-end-8 p-3 rounded-lg">
          <div class="flex flex-row items-center">
            <div
              class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
            >
              A
            </div>
            <div
              class="  ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl flex-shrink-0"
            >
              <div class='font-semibold'>{message?.text}</div> 
              <span>{ format(message?.createdAt)}</span>    
            </div>

          </div>
          
        </div>
      
      )}
       
        
       
      </div>
    </div>
  </div>

  </div> 

          
           
         
       


     
  
  )
}

export default Message
