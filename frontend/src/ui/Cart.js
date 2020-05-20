import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getCart} from './cartHandler';
import Card from "./proCard";
import Checkout from "./Checkout";

const Cart = () =>{
    const [items, setItems] = useState([]);

    const[run,setRun]=useState(false);

    useEffect(()=>{
        setItems(getCart());
    },[run]);
//display cart
    const displayItems=items=>{
        return(
            <div className="ml-5 w-50">
                <div className="ml-5 w-auto">
                <h3>Items Quantity: {items.length}</h3>
                <h3><Link className="btn-success" to="/">
                    Continue Shopping>></Link></h3>
               </div>

            <div>

                {items.map((product, i)=>(<Card
                    key={i}
                    product={product}
                    addToCartBtn={false}
                    addToWishListBtn={false}
                    updateCartOpt={true}
                    removeItemBtn={true}
                    removeWishItemBtn={false}
                    setRun={setRun}
                    run={run}

                />))}
            </div>
            </div>
        )
    };

    const emptyItemMsg=()=>(
        <h3>Your cart is empty. <br/> <Link to="/">
            Continue Shopping</Link></h3>
    );
    return(
        <Layout
            title ="Shopping Cart"
            description ="Manage Your Shopping Cart Items"
        >
            <div className="row">
              <div className="col-6">
                  {items.length>0 ? displayItems(items):emptyItemMsg()}
              </div>
                <vr/>
                <div className="col-5">
                    <h2>Cart Summary</h2>

                    <Checkout products={items}/>
                </div>
            </div>

        </Layout>
    )
};
export default Cart;
