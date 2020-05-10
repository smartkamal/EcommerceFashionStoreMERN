import React, {useEffect, useState} from "react";
import Layout from "../ui/Layout";
import {isValidated} from "../validators";
import {Alert, Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {getCategories,getAProduct,updateProduct} from "./storeManagerApi";
import Redirect from "react-router-dom/es/Redirect";
import bsCustomFileInput from 'bs-custom-file-input'

function UpdateProduct({match}) {

//intitialize the state
    const {user, token} = isValidated();

    const [values, setValues] = useState({
        productName: '',
        productDesc: '',
        productPrice: '',
        productDisc:'',
        totalDiscPrice:'',
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
        productDisc,
        productCat,
        shipping,
        totalDiscPrice,
        productQuantity,
        error,
        loading,
        productAdded,
        formData,
        redirectToProfile
    } = values;


    const handleChange = type => e =>{
        const data = type === 'productImage' ? e.target.files[0] : e.target.value
        formData.set(type,data)
        setValues({...values, [type]:data})
    }



    //load the categories and send it to the form
    const loadCategories = () =>{
        getCategories().then(response =>{
                if(response.error){
                    setValues({...values,error: response.error})
                }
                else{
                    setValues({categories: response , formData: new FormData()})
                }
            }
        )
    }

    //load the products first by populating the state and then retrieve all categories
    const loadProduct = (productID) =>{
        getAProduct(productID).then(res => {
                if(res.error){
                    setValues({...values, error: res.error});
                }else{
                    setValues({
                        ...values,
                        productName: res.productName,productDesc:res.productDesc,
                        productCat: res.productCat._id,
                        productPrice: res.productPrice,
                        productDisc: res.productDisc,
                        productQuantity: res.productQuantity,
                        totalDiscPrice: res.totalDiscPrice,
                        shipping: res.shipping,
                        formData: new FormData()
                    })

                    loadCategories();
                }
        }
        )
    }

    //when component mounts execute load method
    useEffect(() =>{
        loadProduct(match.params.productID);
        bsCustomFileInput.init();


    },[])


    const submitProduct = (e) =>{

        e.preventDefault()
        setValues({...values, error: "", loading: true});

        updateProduct(match.params.productID,user._id, token , formData)
            .then(formD =>{
                if(formD.error){
                    setValues({...values, error: formD.error})
                }else{
                    setValues({
                        ...values,
                        productName: '',
                        productDesc: '',
                        productPrice: '',
                        productDisc:'',
                        productQuantity: '',
                        productImage: '',
                        totalDiscPrice:'',
                        error: false,
                        loading: false,
                        productAdded: formD.productName


                    });

                    setTimeout(() => {
                        setValues({
                            ...values,
                            redirectToProfile: true,


                        })
                    }, 1000);

                }
            })
    }

    const productUpdateForm= () => (
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
            <Form.Group controlId="formBasicDiscount">
                <Form.Label>Product Discount</Form.Label>
                    <Form.Control onChange={handleChange('productDisc')} type="number" placeholder="Enter Product Discount" value={productDisc} />
            </Form.Group>
            <Form.Group controlId="formBasicTotDiscount">
                <Form.Label>Product Price After Discount</Form.Label>
                <Form.Control disabled type="number" step="0.01"  value={totalDiscPrice} />
            </Form.Group>
            <Form.Group  controlId="formBasicCategory">
                <Form.Label>Product Category</Form.Label>
                <Form.Control as="select" size="sm" custom  v
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
                Update Product
            </Button>
        </Form>


    )
    const Loading = () => (
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    );

    const userRedirect = () =>{
        if(redirectToProfile){
            if(!error){
                return ( <Redirect to="/"  />)
            }
        }

    }
    const successMessage = () => (
        <div className="alert alert-info" style={{display : productAdded ? '': 'none'}}>
            <h4>{`${productAdded}`} Successfully Updated</h4>
        </div>
    );

    const errorMessage = () => (
        <div className="alert alert-danger" style={{display : error ? '': 'none'}}>
            {error}
        </div>
    );


    return (
        <Layout title="Update a Product" description={`Hello ${user.firstName}, Let's Update a product`}
                className="container col-md-6 offset-md-3">

            <Container>
                <Row>
                    <Col xs={12}>
                        {Loading()}
                        {successMessage()}
                        {errorMessage()}
                        {productUpdateForm()}
                        {userRedirect()}

                        {/*{categoryForm()}*/}
                        {/*{backButton()}*/}
                    </Col>
                </Row>
            </Container>
        </Layout>




)


}

export default UpdateProduct;