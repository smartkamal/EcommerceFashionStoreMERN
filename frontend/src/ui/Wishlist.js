import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getWishlist} from './WishlistHandler';
import Card from "./proCard";


const Wishlist = () =>{
    const [items, setItems] = useState([]);

    const[run,setRun]=useState(false);

    useEffect(()=>{
        setItems(getWishlist());

    },[run]);
//display wishlist
    const displayItems=items=>{
        return(
            <div>
                <h3>Items Quantity: {items.length}</h3>
                <h3><Link className="btn-success" to="/">
                    Continue Shopping>></Link></h3>
                <hr/>
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
            description ="Manage Your Items"
        >
            <div className="row">
                <div className="col-6">
                    {items.length>0 ? displayItems(items):emptyItemMsg()}
                </div>

            </div>

        </Layout>
    )
};
export default Wishlist;
