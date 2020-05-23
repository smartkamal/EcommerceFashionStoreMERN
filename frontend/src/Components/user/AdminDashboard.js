import React from "react";
import Layout from "../ui/Layout";
import {isValidated} from "../../validators";
import ListGroup from "react-bootstrap/ListGroup";
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const AdminDashboard = () => {

    const {user: {_id,firstName,lastName,email,userType}} = isValidated()

    const adminLinks = () => {
        return(
            <div>
                <Card>
                    <Card.Header className="text-center">Admin Links</Card.Header>
                    <ListGroup>
                        <ListGroup.Item>
                            <Link className="nav-link" to="/category/add"> Add Categories</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link className="nav-link" to="/create/storemanager">Store Manager Management</Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link className="nav-link" to={`/admin/update/${_id}`}>Update Profile</Link>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
                <br/>
            </div>
        )
    }

    const adminInfo = () => {
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
                    <Col sm={3}>{adminLinks()} </Col>
                    <Col sm={9}> {adminInfo()}</Col>
                </Row>
            </Container>

        </Layout>
    )
}

export default AdminDashboard;
