import React from "react";
import {Link, withRouter} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";




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

                <Nav.Link  >
                    <Link to="/signin" style={isActive(history,"/signin")}>Sign In </Link>
                </Nav.Link>

                <Nav.Link >
                    <Link to="/signup" style={isActive(history,"/signup")}>Sign Up </Link>
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default withRouter(Menus);