import React from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";

import signIn from './user/SignIn'
import signUp from './user/signUp'
import Home from './core/Home'
import NavBar from './core/navBar'

const Routes = () =>{
    return(
        <BrowserRouter>
            <NavBar/>
        <Switch>
            <Route path="/signin" exact component={signIn}/>
            <Route path="/signup" exact component={signUp}/>
            <Route path="/" exact component={Home}/>


        </Switch>
    </BrowserRouter>)

}

export default Routes;
