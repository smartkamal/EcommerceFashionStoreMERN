import React from "react";
import Layout from "../ui/Layout";
import {isValidated} from "../validators";
import ListGroup from "react-bootstrap/ListGroup";
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const userDashboard = () => {

    const {user: {_id,firstName,lastName,email,userType}} = isValidated()

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

    const userHistory = () => {
        return (
            <div>
                <Card>
                    <Card.Header className="text-center">Purchase History</Card.Header>
                    <ListGroup>
                        <ListGroup.Item>history</ListGroup.Item>
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
                    <Col sm={9}> {userInformation()} {userHistory()}</Col>
                </Row>
            </Container>

        </Layout>
    )
}

export default userDashboard;
