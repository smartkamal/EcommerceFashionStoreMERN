import React from "react";
import {Route, Redirect} from 'react-router-dom';
import {isValidated} from "./index";

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
