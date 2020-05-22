import React, {useState, useEffect} from "react";
import Layout from "../ui/Layout";
import {isValidated} from "../validators";
import {Alert, Col, Container, ListGroup, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {addCategory, getCategories} from "./adminApi";

const CategoryManagement = () => {
    const [categoryName, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [allCategories, setCategories] = useState([]);

    //destructure user amd token from localstorage
    const {user, token} = isValidated();

    const getAllCategories = () =>{
        getCategories().then(res =>{
            if(res.error){
                console.log(res.error)
            }else{
                setCategories(res);
            }
        })
    }

    //Grab the category id when the component mounts
    useEffect(() =>{
        getAllCategories()
    }, [])

    //Grab form values and set the state
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
                    setName('');
                }
                refreshPage();
            })
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const categoryForm = () => (
            <Container>
                <Row>
                    <Col style={{marginTop:50,marginLeft:-300}}>
                        <Form onSubmit={submitForm}>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={handleChange} type="text" placeholder="Enter Name" value={categoryName} required/>
                            </Form.Group>
                            <Button variant="outline-success" type="submit">
                                Create Category
                            </Button>
                        </Form>
                    </Col>

                    <Col style={{marginTop:50,marginRight: -300}}>
                        <ListGroup variant="flush">
                            {allCategories.map((category,index) =>(
                                <ListGroup.Item key = {index}>
                                    {category.categoryName}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
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
                    Category created successfully
                </Alert>
            )
        }
    }

    return (
        <Layout title="Category Dashboard" description={`Hello ${user.firstName}`} className="container col-md-6 offset-md-3">
            <Container>
                <Row>
                    <Col xs={12}>
                        {successMessage()}
                        {errorMessage()}
                        {categoryForm()}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default CategoryManagement;
