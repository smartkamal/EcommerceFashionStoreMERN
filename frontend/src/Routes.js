import React from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";

import signIn from './user/SignIn'
import signUp from './user/signUp'
import Home from './ui/Home'
import NavBar from './ui/navBar'
import UserRoute from "./validators/UserRoute";
import userDashboard from "./user/UserDashboard";
import AdminRoute from "./validators/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import StoreManagerDashboard from "./user/StoreManagerDashboard";
import StoreManagerRoute from "./validators/StoreManagerRoute";
import AddCategory from "./admin/AddCategory";
import Product from "./ui/Product";
import AddProduct from "./storeManager/AddProduct"
import ProductManagement from './storeManager/productManagement'
import UpdateProduct from './storeManager/updateProduct'

const Routes = () =>{
    return(
        <BrowserRouter>
            <NavBar/>
        <Switch>
            <Route path="/signin" exact component={signIn}/>
            <Route path="/signup" exact component={signUp}/>
            <Route path="/" exact component={Home}/>
            <Route path="/product/:productid" exact component={Product}/>
            <UserRoute path="/user/userdashboard" exact component={userDashboard}/>
            <AdminRoute path="/admin/admindashboard" exact component={AdminDashboard}/>
            <StoreManagerRoute path="/manager/managerdashboard" exact component={StoreManagerDashboard}/>
            <AdminRoute path="/category/add" exact component={AddCategory}/>
            <StoreManagerRoute path="/products/add" exact component={AddProduct}/>
            <StoreManagerRoute path="/storemanager/manageproducts" exact component={ProductManagement}/>
            <StoreManagerRoute path="/storemanager/edit/product/:productID" exact component={UpdateProduct}/>
        </Switch>
    </BrowserRouter>)

}

export default Routes;
