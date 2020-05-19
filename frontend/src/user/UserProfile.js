import React, {useState,useEffect} from "react";
import Layout from "../ui/Layout";
import {listUserData, updateUserData, userUpdate} from "./apiUser";
import {isValidated} from "../validators";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

const UserProfile = ({match}) => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: false,
        success: false
    })

    const {token} = isValidated()
    const {firstName,lastName,email,password,success} = values

    const init = (userId) => {
        listUserData(userId,token).then(content => {
            if (content.error){
                setValues({...values,error: true})
            }
            else{
                setValues({...values,firstName: content.firstName, lastName: content.lastName,email: content.email })
            }
        })
    }

    useEffect(() => {
        init(match.params.userId)
    },[])

    const handleChanges = firstName => e => {
        setValues({...values, error: false, [firstName]: e.target.value})
    }

    const submitForm = e => {
        e.preventDefault();
        updateUserData(match.params.userId,token, {firstName, lastName, email, password}).then(content => {
            if (content.error){
                console.log(content.error)
            }
            else {
                userUpdate(content, () => {
                    setValues({...content,firstName: content.firstName, lastName: content.lastName,email: content.email,success: true})
                })
            }
        })
    }

    const userRedirect = (success) => {
        if (success){
           return <Redirect to="/user/userdashboard"/>
        }
    }

    const updateUserProfile = (firstName,lastName,email,password) => (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="formBasicFName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control onChange={handleChanges('firstName')} type="text" value={firstName}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicLName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={handleChanges('lastName')} type="text" value={lastName}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled onChange={handleChanges('email')}  type="email" value={email} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={handleChanges('password')} type="password" value={password}/>
                        </Form.Group>
                        <Button variant="success" type="submit" onClick={submitForm}>
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    )

    return (
        <Layout title="My Profile" description="Update My Profile" className="container-fluid">

            <h2 className="mb-4 ">Update Profile</h2>
            {updateUserProfile(firstName,lastName,email,password)}
            {userRedirect(success)}

        </Layout>

    );
}

export default UserProfile;
