import React, {useEffect, useState} from "react";
import Layout from "../ui/Layout";
import {isValidated} from "../validators";
import ListGroup from "react-bootstrap/ListGroup";
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getUserHistory} from "./apiUser"
import moment from "moment";

const UserDashboard = () => {

    const [history,setHistory]=useState([]);

    const {user: {_id,firstName,lastName,email,userType}} = isValidated();

    const token=isValidated().token;

    const init=(userId,token)=>{
        getUserHistory(userId,token)
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    setHistory(data)
                }
            })
    }

    useEffect(()=>{
        init(_id,token);
    },[])

    const userLinks = () => {
        return(
            <div>
                <Card>
                    <Card.Header className="text-center">User Links</Card.Header>
                    <ListGroup>
                        <ListGroup.Item>
                            <Link className="nav-link" to="/cart">My Cart</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link className="nav-link" to={`/userProfile/${_id}`}>Update Profile</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                <br/>
            </div>
        )
    }

    const userInformation = () => {
        return (
            <div>
                <Card>
                    <Card.Header className="text-center">User Information</Card.Header>
                    <ListGroup>
                        <ListGroup.Item>{firstName}</ListGroup.Item>
                        <ListGroup.Item>{lastName}</ListGroup.Item>
                        <ListGroup.Item>{email}</ListGroup.Item>
                        <ListGroup.Item>{userType}</ListGroup.Item>
                    </ListGroup>
                </Card>
                <br/>
            </div>
        )
    }

    const userHistory = (history) => {
        return (
            <div>
                <Card>
                    <Card.Header className="text-center">Purchase History</Card.Header>
                    <ListGroup>
                        <ListGroup.Item>
                            {history.map((h, i) => {
                                return (
                                    <div>
                                        <hr />
                                        {h.products.map((p, i) => {
                                            return (
                                                <div key={i}>
                                                    <h6>Product name: {p.productName}</h6>
                                                    <h6>Product price: ${p.productPrice}</h6>
                                                    <h6>
                                                        Purchased date:{" "}
                                                        {moment(p.createdAt).fromNow()}
                                                    </h6>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        )
    }

    return (
        <Layout title="Dashboard" description={`Hello ${firstName}`} className="container">
            <Container>
                <Row>
                    <Col sm={3}>{userLinks()} </Col>
                    <Col sm={9}> {userInformation()} {userHistory(history)}</Col>
                </Row>
            </Container>

        </Layout>
    )
}

export default UserDashboard;
