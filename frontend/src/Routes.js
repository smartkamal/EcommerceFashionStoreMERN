import React from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";

import signIn from './user/SignIn'
import signUp from './user/signUp'
import Home from './core/Home'
import NavBar from './core/navBar'
import UserRoute from "./validators/UserRoute";
import userDashboard from "./user/UserDashboard";
import AdminRoute from "./validators/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import StoreManagerDashboard from "./user/StoreManagerDashboard";
import StoreManagerRoute from "./validators/StoreManagerRoute";
import AddCategory from "./admin/AddCategory";

const Routes = () =>{
    return(
        <BrowserRouter>
            <NavBar/>
        <Switch>
            <Route path="/signin" exact component={signIn}/>
            <Route path="/signup" exact component={signUp}/>
            <Route path="/" exact component={Home}/>
            <UserRoute path="/user/userdashboard" exact component={userDashboard}/>
            <AdminRoute path="/admin/admindashboard" exact component={AdminDashboard}/>
            <StoreManagerRoute path="/manager/managerdashboard" exact component={StoreManagerDashboard}/>
            <AdminRoute path="/create/category" exact component={AddCategory}/>
        </Switch>
    </BrowserRouter>)

}

export default Routes;
