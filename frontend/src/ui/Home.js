import React,{useEffect,useState} from 'react';
import {getProducts} from './apiCore'
import { Row} from "react-bootstrap";
import SearchComp from "./Search";
import  Card from './proCard'
import SlideShow from '../slideshow/SlideShow'


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

<div >
            <div className="img-fluid mb-5">
            <SlideShow/>
            </div>
            <SearchComp/>

            <h2 className="mb-4 ml-4">Best Sellers</h2>

                <Row className="mb-5 ml-5">
                    {soldProducts.map((product,index) =>(
                        <Card key={index} product={product}/>
                    ))}

                </Row>

<br/><br/><br/>

            <h2 className="mb-4  ml-4">New Arrivals</h2>
            <Row className="mb-5 ml-5">
                {productsArrival.map((product,index) =>(
                    <Card  key={index} product={product}/>
                ))}
            </Row>
</div>



    );
}

export default Home;
