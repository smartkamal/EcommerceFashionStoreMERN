import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from './Layout';
import {getCart,removeCartItem} from './cartHandler';
import Card from "./proCard";
//import Checkout from "./Checkout";

const Cart = () =>{
    const [items, setItems] = useState([]);

    const[run,setRun]=useState(false);

    useEffect(()=>{
        setItems(getCart());

    },[run]);

    const displayItems=items=>{
        return(
            <div>
                <h3>Items Quantity: {items.length}</h3>
                <hr/>
                {items.map((product, i)=>(<Card
                    key={i}
                    product={product}
                    addToCartBtn={false}
                    updateCartOpt={true}
                    removeItemBtn={true}
                    setRun={setRun}
                    run={run}

                />))}
            </div>
        )
    };

    const emptyItemMsg=()=>(
        <h3>Your cart is empty. <br/> <Link to="/
        ">Continue Shopping</Link></h3>
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

                <div>
                  <h3>Your Cart Summery</h3>
                <hr/>
                    {/*<Checkout products={items}/>*/}
                </div>
            </div>

        </Layout>
    )
};
export default Cart;
