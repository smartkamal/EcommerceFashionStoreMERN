import React from "react";
import {Route, Redirect} from 'react-router-dom';
import {isValidated} from "./index";

//Checks if user is a manager and authenticated and redirect them to the desired component.
// If not authenticated redirect to sign in page
const StoreManagerRoute = ({component: Component,...rest}) => (
    <Route
        {...rest}
        render={props =>
            isValidated() && isValidated().user.userType === "manager" ? (
                <Component {...props}></Component>
            ) : (
                <Redirect to={{pathname: "/signin", state: {from : props.location} }}>
                </Redirect>
            )}>
    </Route>
)

export default StoreManagerRoute;
