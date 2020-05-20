import {API} from "../Config";
import queryString from 'query-string'

//retrieve all the products based on the order by condition
export const getProducts = (orderBy) =>{
    return fetch(`${API}/products?sortBy=${orderBy}&order=desc&limit=6`,{
        method: "GET"
    })
        .then(response =>{
            return response.json();
        })
        .catch(err=> console.log(err));
}

export const getUniquePro = (productID) =>{
    return fetch(`${API}/product/${productID}`,{
        method: "GET"
    })
        .then(response =>{
            return response.json();
        })
        .catch(err=> console.log(err));
}


 export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
         method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`}     })
        .then(response => {
            return response.json();
       })
        .catch(err => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
       method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
         body: JSON.stringify(paymentData)
    })
         .then(response => {
             return response.json();
        })
         .catch(err => console.log(err));
};

//create order
export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order:createOrderData})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// retrieve item list depending on the condition passed from the search bar
export const itemList = queryParams =>{
    const searchQuery = queryString.stringify(queryParams)
    console.log('searchQuery',searchQuery)
    return fetch(`${API}/retrieveproduct/search?${searchQuery}`,{
        method: "GET"
    })
        .then(response =>{
            return response.json();

        })
        .catch(err=> console.log(err));

}

export const getCheckedResults = (skip,limit,filters={}) => {

    const bodyData = {
       skip,limit,filters
    }


    return fetch(`${API}/products/search`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",

        },
        body: JSON.stringify(bodyData)

    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error);
        })

};
