import React,{Component} from "react";
import {Route, Redirect} from 'react-router-dom';
import {isValidated} from "./index";

//Checks if user is authenticated and an admin and redirect them to the desired component.
// If not authenticated redirect to sign in page
const AdminRoute = ({component: Component,...rest}) => (
    <Route
        {...rest}
        render={props =>
            isValidated() && isValidated().user.userType === "admin" ? (
        <Component {...props}></Component>
    ) : (
        <Redirect to={{pathname: "/signin", state: {from : props.location} }}>
        </Redirect>
    )}>
    </Route>
)

export default AdminRoute;
