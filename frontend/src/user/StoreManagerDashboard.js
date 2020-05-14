import React from "react";
import Layout from "../ui/Layout";
import {isValidated} from "../validators";
import ListGroup from "react-bootstrap/ListGroup";
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const StoreManagerDashboard = () => {

    const {user: {_id,firstName,lastName,email,userType}} = isValidated()

    const managerLinks = () => {
        return(
            <div>
                <Card>
                    <Card.Header className="text-center">Manager Links</Card.Header>
                    <ListGroup>
                        <ListGroup.Item>
                            <Link className="nav-link" to="/products/add">Add Products</Link>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item>
                            <Link className="nav-link" to="/storemanager/manageproducts">Edit Products</Link>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                        <ListGroup.Item>
                            <Link className="nav-link" to={`/storemanager/updatepass/${_id}`}>Edit Profile</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                <br/>
            </div>
        )
    }

    const managerInfo = () => {
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


    return (
        <Layout title="Dashboard" description={`Hello ${firstName}`} className="container">
            <Container>
                <Row>
                    <Col sm={3}>{managerLinks()} </Col>
                    <Col sm={9}> {managerInfo()}</Col>
                </Row>
            </Container>

        </Layout>
    )
}

export default StoreManagerDashboard;
