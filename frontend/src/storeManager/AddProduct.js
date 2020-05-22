import React, {useEffect, useState} from "react";
import Layout from "../ui/Layout";
import {isValidated} from "../validators";
import { Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {addProduct,getCategories} from "./storeManagerApi";
import bsCustomFileInput from "bs-custom-file-input";


function AddProduct() {

    //initialize state
    const {user, token} = isValidated();
    const [values, setValues] = useState({
        productName: '',
        productDesc: '',
        productPrice: '',
        categories: [],
        productCat: '',
        shipping: '',
        productQuantity: '',
        productImage: '',
        error: '',
        loading: false,
        productAdded: '',
        formData: '',
        redirectToProfile: false

    })

    const {
        productName,
        productDesc,
        productPrice,
        categories,
        productCat,
        shipping,
        productQuantity,
        error,
        loading,
        productAdded,
        formData,
        redirectToProfile
        } = values;

    //on change set the values
    const handleChange = type => e =>{
        const data = type === 'productImage' ? e.target.files[0] : e.target.value
        formData.set(type,data)
        setValues({...values, [type]:data})
    }

    //load the categories and send it to the form
    const load = () =>{
        getCategories().then(response =>{
                if(response.error){
                    setValues({...values,error: response.error})
                }
                else{
                    setValues({...values,categories: response , formData: new FormData()})
                }
            }
        )
    }

    //execute on component did mount
    useEffect(() =>{
        load();
        bsCustomFileInput.init();
    },[])

    //method to deal with form submission
    const submitProduct = (e) =>{
        e.preventDefault()
        setValues({...values, error: "", loading: true});

        addProduct(user._id, token , formData)
            .then(formD =>{
                if(formD.error){
                    setValues({...values, error: formD.error})
                }else{
                    setValues({
                        ...values,
                        productName: '',
                        productDesc: '',
                        productPrice: '',
                        productQuantity: '',
                        productImage: '',
                        productCat: '',
                        shipping: '',
                        loading: false,
                        productAdded: formD.productName

                    })
                }
            })
    }

    //product add form
    const productAddForm= () => (
        <Form  className="mb-3" onSubmit={submitProduct}>
            <Form.Group controlId="formBasicProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control onChange={handleChange('productName')}  type="text" placeholder="Enter Product Name" value={productName} />
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
                <Form.Label>Product Description</Form.Label>
                <Form.Control onChange={handleChange('productDesc')}  as="textarea" rows="3" placeholder="Enter Product Description" value={productDesc} />
            </Form.Group>
            <Form.Group controlId="formBasicPrice">
                <Form.Label>Product Price</Form.Label>
                <Form.Control onChange={handleChange('productPrice')} type="number" placeholder="Enter Product price" value={productPrice} />
            </Form.Group>
            <Form.Group  controlId="formBasicCategory">
                <Form.Label>Product Category</Form.Label>
                <Form.Control as="select" size="sm" custom
                    onChange={handleChange('productCat')} >
                    <option >Please Select Product Category</option>
                    {categories && categories.map((cat,index)=>
                        (<option key = {index} value={cat._id}>{cat.categoryName}</option>)
                     )}

                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicQuantity">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control onChange={handleChange('productQuantity')} type="number" placeholder="Select Product quantity" value={productQuantity} />
            </Form.Group>
            <Form.Group controlId="formBasicShipping">
                <Form.Label>Product Shipping</Form.Label>
                <Form.Control as="select" size="sm" custom
                              onChange={handleChange('shipping')}   >
                    <option >Please Select Shipping Details</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
                </Form.Control>
            </Form.Group>
            <Form.File
                id="custom-file"
                name="productImage"
                accept="image/*"
                label="Upload Image"
                custom
                onChange={handleChange('productImage')}
            />
            <br/><br/>
            <Button variant="outline-success" type="submit">
                Add Product
            </Button>
        </Form>

    )

    /*
    methods to execute depending on different conditions
     */
    const Loading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    );

    const successMessage = () => (
        <div className="alert alert-info" style={{display : productAdded ? '': 'none'}}>
            <h4>{`${productAdded}`} Successfully Added</h4>
        </div>
    );

    const errorMessage = () => (
        <div className="alert alert-danger" style={{display : error ? '': 'none'}}>
            {error}
        </div>
    );

    return (
        <Layout title="Add a Product" description={`Hello ${user.firstName}, Let's add a new Product`}
                className="container col-md-6 offset-md-3">

            <Container>
                <Row>
                    <Col xs={12}>
                        {Loading()}
                        {successMessage()}
                        {errorMessage()}
                        {productAddForm()}

                    </Col>
                </Row>
            </Container>
        </Layout>
    )


}

export default AddProduct