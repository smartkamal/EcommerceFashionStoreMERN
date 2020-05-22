import React,{Component} from "react";
import {Route, Redirect} from 'react-router-dom';
import {isValidated} from "./index";

//Checks if user is authenticated and redirect them to the desired component.
// If not authenticated redirect to sign in page
const UserRoute = ({component: Component,...rest}) => (
    <Route {...rest} render={props => isValidated() ? (
        <Component {...props}></Component>
    ) : (
        <Redirect to={{pathname: "/signin", state: {from : props.location} }}>
        </Redirect>
    )}>
    </Route>
)

export default UserRoute;
