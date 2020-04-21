import React, {useState} from 'react';
import Layout from "../core/Layout";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import {signUp} from "../validators";

const SignUp=  () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName:'',
        email: '',
        password:'',
        error:'',
        success:false
    })

    const {firstName, lastName, email, password, success, error} = values

    const handleChange = val => e =>{
         setValues({...values,error: false,[val]: e.target.value})
    }

    const submitForm = (e) => {
        e.preventDefault();
        setValues({...values,error: false});

        signUp({firstName,lastName,email,password})
            .then(content => {
                if (content.error){
                    setValues({...values,error: content.error, success: false})
                }
                else{
                    setValues({
                        ...values,
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
    }

    const signUpForm = () =>(

        <Container >
            <Row>
            <Col >
                <Form>
                <Form.Group controlId="formBasicFName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control onChange={handleChange('firstName')} type="text" placeholder="Enter First Name" value={firstName}  />
                </Form.Group>
                <Form.Group controlId="formBasicLName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control onChange={handleChange('lastName')}  type="text" placeholder="Enter Last Name" value={lastName}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handleChange('email')}  type="email" placeholder="Enter email" value={email}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChange('password')}  type="password" placeholder="Password" value={password}/>
                </Form.Group>
                <Button variant="success" type="submit" onClick={submitForm}>
                    SignUp
                </Button>
            </Form>
            </Col>

        </Row>

        </Container>

    );

    const errorMessage = () => (
            <Alert variant="danger" style={{display: error ? '' : 'none'}}>
                {error}
            </Alert>
    );

    const successMessage = () => (
        <Alert variant="info" style={{display: success ? '' : 'none'}}>
            Account created successfully. Please <Link to="/signIn">Signin</Link>
        </Alert>
    );


    return (
        <Layout title="Sign Up" description="E commerce store"
        className="container col-md-6 offset-md-3">

            {errorMessage()}
            {successMessage()}
            {signUpForm()}

        </Layout>
    );
}

export default SignUp;
