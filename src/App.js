import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNewCategory from "./components/Categories/AddNewCategory";

import Navbar from "./pages/navigation/publicNavbar/Navbar";
import Login from "./components/Users/Login/Login";
import Profile from "./components/Users/Profile/Profile";
import Register from "./components/Users/Register/Register";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import AddProduct from "./components/Posts/CreatePost/AddProduct";
import PostsList from "./components/Posts/CreatePost/Productlist";
import PostDetails from "./components/Posts/CreatePost/productDetails";
import Home from "./components/home/Home";
import UpdatePost from "./components/Posts/CreatePost/UpdatePost";
import UsersList from "./components/Users/usersList/UsersList";
import Allpost from "./components/Posts/CreatePost/Allposts";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/users" element={<UsersList />} />
     
          <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/add-category" element={<AddNewCategory />} />
          <Route path="/category-list" element={<CategoryList />} />
          <Route path="/create-post" element={<AddProduct/>} />
       
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/login" element={<Login />} />
        
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/update-post/:id" element={<UpdatePost />} />
          <Route exact path="/products" element={<Allpost />} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/contact" element={<Contact/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
