import React,{useEffect,useState} from 'react';
import Layout from "./Layout";
import {getUniquePro} from './apiCore'
import {Col, Container, Row} from "react-bootstrap";
import  Card from './proCard'

const Product = (props) =>{

    //hold product state
    const [product,giveProduct] = useState({})
    const [err,setError] = useState(false)

    const loadUniqueProduct = productId =>{

        //method to get one product using API
        getUniquePro(productId).then(data =>{
            if(data.err){
                setError(data.errs)
            }else{
                giveProduct(data)
            }
        })

    }

    //grab the product id when the component mounts
    useEffect(() =>{
        //product id from url
        const productId = props.match.params.productid
        loadUniqueProduct(productId)
    },[])


    return (
        <Layout title="Product Details"
                description={null}
                className="container-fluid"
        >

            <h2 className="mb-1"> {product && product.productName}</h2>
           <Row>
               <div  style={{margin:'auto'}}>
                   {
                       product &&  product.productDesc && <Card product={product}
                       viewProductBtn={false}/>
                   }
               </div>


           </Row>

        </Layout>

    );
}

export default Product;