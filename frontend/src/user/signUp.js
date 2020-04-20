import React, {useState} from 'react';
import Layout from "../core/Layout";
import {API} from "../Config";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SignUp=  () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName:'',
        password:'',
        error:'',
        success:false
    })

    const handleChange = val => e =>{
         setValues({...values,error: false,[val] :e.target.value})
    }

    const signUpForm = () =>(

        <Container >
            <Row>
            <Col >
                <Form>
                <Form.Group controlId="formBasicFName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control onChange={handleChange('firstName')} type="text" placeholder="Enter First Name"  />
                </Form.Group>
                <Form.Group controlId="formBasicLName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control onChange={handleChange('lastName')}  type="text" placeholder="Enter Last Name" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handleChange('email')}  type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChange('password')}  type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form>
            </Col>

        </Row>

        </Container>

    )


    return (
        <Layout title="Sign Up" description="E commerce store"
        className="container col-md-6 offset-md-3">


            {signUpForm()}
            {JSON.stringify(values)}

        </Layout>
    );
}

export default SignUp;