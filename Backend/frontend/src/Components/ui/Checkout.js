import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {
    getProducts,
    getBraintreeClientToken,
    processPayment,
    createOrder
} from '../../FrontEndAPIs/apiCore';
import {emptyCart} from "./cartHandler";
import Card from "./proCard";
import {isValidated} from '../../validators';
import {Link} from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({products}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: false,
        instance: {},
        address: ''
    })

    const userId = isValidated() && isValidated().user._id
    const token = isValidated() && isValidated().token

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error){
                setData({...data,error: data.error});
            }else {
                setData({clientToken: data.clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.totalDiscPrice;
        }, 0);
    };

    const showCheckout = () => {
        return isValidated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    const delAddress=data.address;

    const buy = () => {
        setData({loading: true});
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then
        (data => {
                //console.log(data)
                nonce = data.nonce
                // once you have nonce (card type, card number) send nonce as 'paymentMehtodNonce'
                // and also total to be charged
                //console.log('send nonce and total to process : ', nonce, getTotal(products));
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                }
                processPayment(userId, token, paymentData)
                    .then(response => {
                        //console.log(response);
                        //empty cart
                        //create order
                        const createOrderData={
                            products:products,
                            transaction_id:response.transaction.id,
                            amount:response.transaction.amount,
                            address:delAddress
                        }

                        createOrder(userId,token,createOrderData)
                            .then(response=>{
                                emptyCart(() => {
                                    console.log('payment success and empty cart');
                                    setData({loading: false,success: true});
                            })


                        })
                    })
                    .catch(error => {
                        console.log(error)
                        setData({loading: false});
                    });
            })
            .catch(error => {
                //console.log('dropin error: ', error)
                setData({...data, error: error.message});
            })
    }

    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ""})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="form-group mb-3">
                        <label className="text-muted">Delivery Address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Enter your delivery address here...."
                        />
                    </div>
                    <DropIn options={{
                        authorization: data.clientToken,
                    }}onInstance={instance => data.instance = instance}/>
                    <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                </div>
            ) : null}
        </div>
    )

    const showError = error => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = success => {
        return(<div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            Thanks! Your payment was successful!
        </div>)
    }

        const refreshPage = success =>{
            if(success){

                    window.location.reload(false);

            }
        }



    const showLoading = (loading) => loading && <h2>Loading...</h2>

    return(
        <div>
            <h2>Total: Rs:{getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {refreshPage(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;
