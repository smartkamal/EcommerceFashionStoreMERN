import React,{useEffect,useState} from 'react';
import Layout from "./Layout";
import {getProducts} from './apiCore'
import {Col, Container, Row} from "react-bootstrap";
import SearchComp from "./Search";
import  Card from './proCard'



const Home=  () => {

    //create state to hold the following values
    const [productsArrival, accessProductsArrival] = useState([])
    const [soldProducts, accessSoldProducts] = useState([])
    const [error, accessError] = useState(false)


    //function to load products according to Arrival
    const productsLoadByArrival = () =>{
        getProducts('createdAt').then(data =>{
            if(data.error){
                accessError(data.error)
            }
            else{
                accessProductsArrival(data)
            }
        })
    }

    //function to load products according to sold quantity
    const productsLoadBySold = () =>{
        getProducts('soldQuantity').then(data=>{
            if(data.errors){
                accessError(data.error)
            }
            else{
                accessSoldProducts(data)
            }
        })
    }



    //run the above 2 methods when the component mounts
    useEffect(() =>{
        productsLoadBySold()
        productsLoadByArrival()
    },[]);


    return (
        <Layout title="Home Page" description="E commerce store" className="container-fluid">

            <SearchComp/>

            <h2 className="mb-4 ">Best Sellers</h2>

                <Row   >
                    {soldProducts.map((product,index) =>(
                        <Card key={index} product={product}/>
                    ))}

                </Row>

<br/><br/><br/>

            <h2 className="mb-4">New Arrivals</h2>
            <Row>
                {productsArrival.map((product,index) =>(
                    <Card  key={index} product={product}/>
                ))}
            </Row>


        </Layout>

    );
}

export default Home;