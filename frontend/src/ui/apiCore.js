import {API} from "../Config";

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
