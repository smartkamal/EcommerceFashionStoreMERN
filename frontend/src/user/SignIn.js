import React, {useState} from 'react';
import Layout from "../core/Layout";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Alert} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {signIn, validate,isValidated} from "../validators";

const SignIn=  () => {
    const [values, setValues] = useState({
        email: 'ush@gmail.com',
        password:'ush1234',
        error:'',
        loading:false,
        redirectToRef: false,
    })

    const {email, password, error, loading, redirectToRef} = values
    const {user} = isValidated();

    const handleChange = val => e =>{
        setValues({...values,error: false,[val]: e.target.value})
    }

    const submitForm = e => {
        e.preventDefault();
        setValues({...values, error: false, loading: true});

        signIn({email,password})
            .then(content => {
                if (content.error){
                    setValues({...values,error: content.error, loading: false})
                }
                else{
                    validate(content, () => {
                        setValues({
                            ...values,
                            redirectToRef: true
                        });
                    } );
                }
            });
    }

    const signInForm = () =>(

        <Container >
            <Row>
                <Col >
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={handleChange('email')}  type="email" placeholder="Enter email" value={email}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={handleChange('password')}  type="password" placeholder="Password" value={password}/>
                        </Form.Group>
                        <Button variant="success" type="submit" onClick={submitForm}>
                            SignIn
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

    const loadingMessage = () => (
        loading && (
            <Alert variant="info">
                 <h2>Loading....</h2>
             </Alert>
        )
    );

    const userRedirect = () => {
        if (redirectToRef){
            if (user && user.userType === "admin"){
                return <Redirect to ="/admin/admindashboard"></Redirect>
            }
            else if (user && user.userType === "manager"){
                return <Redirect to ="/manager/managerdashboard"></Redirect>
            }
            else {
                return <Redirect to ="/user/userdashboard"></Redirect>
            }
        }
        if (isValidated()) {
            return <Redirect to ="/"></Redirect>
        }
    }


    return (
        <Layout title="Sign In" description="E commerce store"
                className="container col-md-6 offset-md-3">

            {errorMessage()}
            {loadingMessage()}
            {userRedirect()}
            {signInForm()}


        </Layout>
    );
}

export default SignIn;
