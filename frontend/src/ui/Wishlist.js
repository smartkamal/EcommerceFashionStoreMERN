import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getWishlist} from './WishlistHandler';
import Card from "./proCard";
import {Col, Row} from "react-bootstrap";


const Wishlist = () =>{
    const [items, setItems] = useState([]);

    const[run,setRun]=useState(false);

    useEffect(()=>{
        setItems(getWishlist());

    },[run]);
//display wishlist
    const displayItems=items=>{
        return(
            <div >
                <h3>Items Quantity: {items.length}</h3>
                <h3><Link className="btn-success" to="/">
                    Continue Shopping>></Link></h3>
                <Col className="mb-5 ml-5">
                {items.map((product, i)=>(<Card
                    key={i}
                    product={product}
                    addToCartBtn={true}
                    removeItemBtn={false}
                    removeWishItemBtn={true}
                    addToWishListBtn={false}
                    setRun={setRun}
                    run={run}

                />))}
                </Col>
            </div>
        )
    };

    const emptyItemMsg=()=>(
        <h3>Your Wish List is empty. <br/> <Link to="/">
            Continue Shopping</Link></h3>
    );
    return(
        <Layout
            title ="Wish List"
            description ="Manage Your Items">

            <div className="col ml-5 w-25">
                <div className="align-content-center">
                    {items.length>0 ? displayItems(items):emptyItemMsg()}
                </div>

            </div>

        </Layout>
    )
};
export default Wishlist;
