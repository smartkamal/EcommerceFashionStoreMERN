import React,{Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {signOut, isValidated} from "../validators";
import {itemTotal,deleteCart} from "./cartHandler";
import {itemWishTotal} from "./WishlistHandler";

const isActive = (history,path) => {
    if(history.location.pathname === path){
        return {color:'#ff6d00', textDecoration: 'none'}
    }else{
        return {color:'#fafafa' , textDecoration: 'none'}
    }
}


function Menus({history}) {

    return (
        <Navbar bg="dark" variant="dark" className=" py-3">
            <Navbar.Brand href="#home">Home</Navbar.Brand>
            <Nav className="mr-auto  py-0">
                    <Nav.Link >
                        <Link style={isActive(history,"/")} to="/">Home  </Link>
                     </Nav.Link>

                <Nav.Link >
                    <Link style={isActive(history,"/cart")} to="/cart">Cart <sup><small>{itemTotal()}</small></sup> </Link>
                </Nav.Link>

                {isValidated() && isValidated().user.userType === "user" && (
                    <Nav.Link >
                        <Link style={isActive(history,"/user/userdashboard")} to="/user/userdashboard">Dashboard  </Link>
                        <Link style={isActive(history,"/wishlist")} to="/wishlist">Wishlist <sup><small>{itemWishTotal()}</small></sup> </Link>
                    </Nav.Link>
                )}

                {isValidated() && isValidated().user.userType === "manager" && (
                    <Nav.Link >
                        <Link style={isActive(history,"/manager/managerdashboard")} to="/manager/managerdashboard">Dashboard  </Link>
                        <Link style={isActive(history,"/wishlist")} to="/wishlist">Wishlist <sup><small>{itemWishTotal()}</small></sup> </Link>
                    </Nav.Link>
                )}

                {isValidated() && isValidated().user.userType === "admin" && (
                    <Nav.Link >
                        <Link style={isActive(history,"/admin/admindashboard")} to="/admin/admindashboard">Dashboard  </Link>
                    </Nav.Link>
                )}

                {!isValidated() && (
                    <Fragment>
                        <Nav.Link  >
                            <Link to="/signin" style={isActive(history,"/signin")}>Sign In </Link>
                        </Nav.Link>

                        <Nav.Link >
                            <Link to="/signup" style={isActive(history,"/signup")}>Sign Up </Link>
                        </Nav.Link>
                    </Fragment>
                )}

                {isValidated() && (
                    <Nav.Link >
                        <Link style={{cursor: 'pointer', color: '#ffffff'}} onClick={() => signOut(() => {
                            history.push('/')
                        ;deleteCart()})}>Sign Out </Link>
                    </Nav.Link>
                )}
            </Nav>
        </Navbar>
    );
}

export default withRouter(Menus);
