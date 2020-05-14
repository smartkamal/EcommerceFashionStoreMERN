import React, {useEffect, useState} from 'react';
import Layout from "../ui/Layout";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Alert, Badge, ListGroup} from "react-bootstrap";
import {signUp} from "../validators";
import {getManagers, deleteManager} from "./adminApi";
import {isValidated} from "../validators";
import {Link} from "react-router-dom";

const MangerSignUp=  () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName:'',
        email: '',
        password:'',
        userType:'manager',
        error:'',
        success:false
    })

    const {user, token} = isValidated();
    const [allManagers ,setManagers] = useState([]);

    const {firstName, lastName, email, password,userType, success, error} = values

    const getAllManagers = () =>{
        getManagers().then(res =>{
            if(res.error){
                console.log(res.error)
            }else{
                setManagers(res);
            }
        })
    }

    const removeManager = managerID =>{
        deleteManager(managerID,user._id,token).then(
            res =>{
                if(res.error){
                    console.log(res.error);
                }else{
                    getAllManagers();
                }
            }
        )
    }

    useEffect(() =>{
        getAllManagers()
    }, [])


    const handleChange = val => e =>{
        setValues({...values,error: false,[val]: e.target.value})
    }

    const submitForm = (e) => {
        e.preventDefault();
        setValues({...values,error: false});

        signUp({firstName,lastName,email,password,userType})
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
                        userType: 'manager',
                        error: '',
                        success: true
                    })
                }
                refreshPage()
            })
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const signUpForm = () =>(

        <Container>
            <Row>
                <Col style={{marginLeft:-300}}>
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
                        <Form.Group controlId="formBasicUserType">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control disabled   type="text" placeholder="User Type" value="manager"/>
                        </Form.Group>
                        <Button variant="success" type="submit" onClick={submitForm}>
                            SignUp
                        </Button>
                    </Form>
                </Col>

                <Col style={{marginTop:50,marginRight: -300}}>
                    <ListGroup variant="flush">
                        {allManagers.map((manager,index) =>(
                            <ListGroup.Item
                                key = {index}
                                className="d-flex justify-content-between"
                            >
                                <strong>{manager.firstName} &nbsp;</strong>
                                <strong>{manager.lastName}</strong>

                            <Link>
                                <span className="cursor-pointer" onClick={() => removeManager(manager._id)}>
                                <Badge variant="danger">Remove</Badge></span>
                            </Link>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
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
            Account created successfully.
        </Alert>
    );


    return (
        <Layout title="Store Manager Management" description=""
                className="container col-md-6 offset-md-3">

            {errorMessage()}
            {successMessage()}
            {signUpForm()}

        </Layout>
    );
}

export default MangerSignUp;
