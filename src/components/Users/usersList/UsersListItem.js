import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MailIcon } from "@heroicons/react/solid";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import alert css
import {
  blockUserAction,
  fetchUsersAction,
  unBlockUserAction,
} from "../../../redux/slices/users/usersSlices";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";

const UsersListItem = (user) => {
  const { id } = useParams();
  const users = useSelector((state) => state?.users);
  const { usersList } = users;
  console.log(user?.user?._id, "2222222222222");
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchUsersAction());
  // }, [dispatch]);
  // React-conform-alert to delete a post
  function confirmDelete(id) {
    console.log(id, "ghfkjlmid");
    confirmAlert({
      title: "Confirm to unblock this user.",
      message: "Are you sure, You want to unblock this user?",
      buttons: [
        {
          label: "YES",
          onClick: () => dispatch(unBlockUserAction(user?.user?._id)),
        },
        {
          label: "NO  ",
          onClick: () => console.log("NO! I don't want to delete this post!"),
        },
      ],
    });
  }
  function confirmDelete2(id) {
    console.log(id, "ghfkjlmid");
    confirmAlert({
      title: "Confirm to block this user.",
      message: "Are you sure, You want to block this user?",
      buttons: [
        {
          label: "YES",
          onClick: () => dispatch(blockUserAction(user?.user?._id)),
        },
        {
          label: "NO  ",
          onClick: () => console.log("NO! I don't want to delete this post!"),
        },
      ],
    });
  }
  return (
    <>
      <div className="container mx-auto">
        <div className="mt-10">
          <div className="p-8 mb-4 bg-white shadow rounded ">
            <div className="flex flex-wrap items-center -mx-4 ">
              <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
                <div>
                  <p className="text-sm font-medium">
                    {user?.user?.firstName} {user?.user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.user?.email}</p>
                </div>
              </div>

              <div className="w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0">
                {user?.user?.isBlocked ? (
                  <button
                    onClick={() => confirmDelete(id)}
                    className="inline-block py-1 px-2 text-center bg-green-900 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
                  >
                    unblock
                  </button>
                ) : (
                  <button
                   
                    onClick={() => confirmDelete2(id)}
                    className="inline-block py-1 px-2 text-center bg-red-600 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
                  >
                    Block
                  </button>
                )}

                {/* <button

              to={`/send-mail?email`}
              className="inline-flex  justify-center bg-green-700 px-2   border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <MailIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                aria-hidden="true"
              />
              <span className="text-base mr-2  text-bold text-yellow-500">
                Message
              </span>
            </button> */}
              </div>
              <div className="w-full lg:w-1/12 px-4">
                <div className="flex items-center">
                  {/* Send Mail */}
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersListItem;
