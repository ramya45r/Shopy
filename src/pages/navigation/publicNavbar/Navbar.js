import React from 'react'
import { useSelector } from 'react-redux'

import AdminNavbar from '../Admin/AdminNavbar'
import PrivateNavbar from '../private/PrivateNavbar'
import PublicNavbar from './PublicNavbar'

const Navbar = () => {
    //Get user from store
    const state =useSelector(state =>state.users);
    const {userAuth,profile} =state;
    const isAdmin =userAuth?.isAdmin;
   console.log(isAdmin,'isAdmin');
  return (
    <div>
     {isAdmin? <AdminNavbar isLogin={userAuth}/>: userAuth ? <PrivateNavbar isLogin={userAuth}/>: <PublicNavbar/> }
    </div>
  )
}

export default Navbar
