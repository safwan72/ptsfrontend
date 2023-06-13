import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// import PreAuth from '../../pages/PreAuth'
import Login from "./pages/Login";
import { PrivateRoute } from "./utils/PrivateRoute";
import Home from "./pages/Home";
// import Product from './pages/Product';
import { PublicRoute } from "./utils/PublicRoute";
// import Orders from './pages/Orders';
// import Category from './pages/Category';
// import ProductDetail from '../Products/ProductDetail';
// import Checkout from '../Orders/Checkout';
import { AdminRoutes } from "./utils/AdminRoutes";
// import AllUsers from '../Admin/AllUsers';
// import AdminProductList from '../Admin/AdminProductList';
// import CategoryProducts from './pages/CategoryProducts';
import Logout from "./components/Logout";
import Menu from "./pages/Menu";
import AdminMenu from "./pages/adminPanel/Menu";
import AdminOrders from "./pages/adminPanel/Orders";
import AdminUsers from "./pages/adminPanel/Users";
import AdminCategory from "./pages/adminPanel/Category";
import Adminfeedback from "./pages/adminPanel/Feedback";
import SingleMenu from "./pages/SingleMenu";
import SingleCategory from "./pages/SingleCategory";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Dashboard from "./components/adminPanel/Dashboard";

const RouteElement = ({ isAdmin }) => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        {/* <Route path="app" exact element={<PreAuth />} /> */}
        <Route path="login" exact element={<Login />} />
      </Route>
      <Route element={<AdminRoutes isAdmin={isAdmin}/>}>
      <Route path="dashboard" exact element={<Dashboard />} />
      <Route path="adminmenu" exact element={<AdminMenu />} />
      <Route path="adminorders" exact element={<AdminOrders />} />
      <Route path="adminusers" exact element={<AdminUsers />} />
      <Route path="admincategory" exact element={<AdminCategory />} />
      <Route path="adminfeedback" exact element={<Adminfeedback />} />
    {/* <Route path="allusers"  element={<AllUsers />} />
    <Route path="adminProducts"  element={<AdminProductList />} /> */}
    </Route>
      <Route element={<PrivateRoute />}>
        <Route path="home" exact element={<Home />} />
        <Route path="profile" exact element={<Profile />} />
        <Route path="logout" exact element={<Logout />} />
        <Route path="menu" exact element={<Menu />} />
        <Route path="menu/:id/" exact element={<SingleMenu />} />
        <Route path="category/:id/" exact element={<SingleCategory />} />
        <Route path="checkout" exact element={<Checkout />} />
        {/* 
    <Route path="order" exact element={<Orders/>}
/>
    <Route path="checkout" exact element={<Checkout/>}
/>
    <Route path="categories" exact element={<Category/>}
/>
    <Route path="category/:id/" exact element={<CategoryProducts/>}
/> */}
      </Route>
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default RouteElement;
