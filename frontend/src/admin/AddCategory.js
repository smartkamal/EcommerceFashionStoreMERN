import React, {useState} from "react";
import Layout from "../core/Layout";
import {isValidated} from "../validators";
import {Alert, Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {addCategory} from "./adminApi";
import {Link} from "react-router-dom";

const AddCategory = () => {
    const [categoryName, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const {user, token} = isValidated();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    }

    const submitForm = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        //request api to create category
        addCategory(user._id,token,{categoryName})
            .then(content => {
                if (content.error){
                    setError(true);
                }
                else {
                    setError('');
                    setSuccess(true);
                }
            })
    }

    const categoryForm = () => (
        <Container>
            <Row>
                <Col >
                    <Form onSubmit={submitForm}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={handleChange}  type="text" placeholder="Enter Name" value={categoryName} required/>
                        </Form.Group>
                        <Button variant="outline-success" type="submit">
                            Create Category
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>


    );

    const errorMessage = () => {
        if(error){
            return(
                <Alert variant="danger">
                    This category already exists
                </Alert>
        )
        }
};

    const successMessage = () => {
        if(success){
            return(
                <Alert variant="success">
                    {categoryName} is created
                </Alert>
            )
        }
    }

    const backButton = () => (
        <div style={{marginTop:50,marginLeft:20}}>
            <Container>
                <Row>
                        <Link to="/admin/admindashboard">
                            Back to Dashboard
                        </Link>
                </Row>
            </Container>
        </div>

    )


    return (
        <Layout title="Create Category" description={`Hello ${user.firstName}, Let's add a new category`}
                className="container col-md-6 offset-md-3">

            <Container>
                <Row>
                    <Col xs={12} >

                        {successMessage()}
                        {errorMessage()}
                        {categoryForm()}
                        {backButton()}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default AddCategory;
