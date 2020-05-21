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
            <div>
                <h3>Items Quantity: {items.length}</h3>
                <h3><Link className="btn-success" to="/">
                    Continue Shopping>></Link></h3>

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
            <body data-spy="scroll" data-target=".row" data-offset="10">
            <div className="row" >
                <div className="col-sm-1" >
                </div>
              <div className="col-sm-3" >
                  {items.length>0 ? displayItems(items):emptyItemMsg()}

              </div>
                <div className="col-sm-2" >
                </div>

                <div className="col-sm-4 ">
                    <h2>Cart Summary</h2>
                    <hr/>
                    <Checkout products={items}/>
                </div>
            </div>
            </body>
        </Layout>
    )
};
export default Cart;
