
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  BellIcon,
  MenuIcon,
  XIcon,
 
  LogoutIcon,
} from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import {  logoutAction,uploadProfilePhotoAction } from "../../../redux/slices/users/usersSlices";
import { loginUserAction } from "../../../redux/slices/users/usersSlices";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Add product", href: "/create-post", current: false },
  { name: "Products", href: "/posts", current: false },
  { name: "Users", href: "/users", current: false },
  { name: "Add Category", href: "/add-category", current: false },
  { name: "Category List", href: "/category-list", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },

];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminNavbar = ({ isLogin}) => {
  console.log( isLogin,"is/login");
  const store = useSelector(state => state?.users);
  const { userAuth, loading, serverErr, appErr,profile } = store;

  //logout
  const dispatch = useDispatch();

  

  return (
    <Disclosure as="nav" className="bg-gray-500 fixed w-full  ">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  {/* Logo */}
                 
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map(item => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* New post */}
                  <Link
                    to="/create-post"
                    type="button"
                    className="relative mr-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>New Product</span>
                  </Link>
                  {/* Logout */}
                  <Link to='/'><button
                  onClick={()=>dispatch(logoutAction())}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <LogoutIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span>Logout</span>
                  </button></Link>
                </div>
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative z-10">
                    {({ open }) => (
                      <>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >

                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map(item => (
                <Link
                  to={`${item.href}`}
                  key={item.name}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                  {/* Image */}
                  <img className="h-10 w-10 rounded-full" src={isLogin?.profilePhoto} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {/* {user.name} */}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {/* {user.email} */}
                  </div>
                </div>
                <button className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default AdminNavbar;