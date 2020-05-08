import {API} from "../Config";

export const addProduct  = (userId,token,product) => {

    return fetch(`${API}/product/add/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error);
        })
}

export const getCategories = () =>{
    return fetch(`${API}/categoryList`,{
        method: "GET"
    })
        .then(response =>{
            return response.json();
        })
        .catch(err=> console.log(err));
}

//get all the products to be displayed to manage products
export const getProducts= () =>{
    return fetch(`${API}/products?limit=100`,{
        method: "GET"
    })
        .then(response =>{
            return response.json();
        })
        .catch(err=> console.log(err));
}

//get a particular product with a id
export const getAProduct= (productID) =>{
    return fetch(`${API}/product/${productID}`,{
        method: "GET"
    })
        .then(response =>{
            return response.json();
        })
        .catch(err=> console.log(err));
}

//update a particular product
export const updateProduct = (productId , userId , token,newProduct) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "PUT",
        headers :{
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: newProduct

    })
        .then(response =>{
            return response.json();
        })
        .catch(err => console.log(err));
};



//delete a particular product
export const deleteProduct = (productId , userId , token) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "DELETE",
        headers :{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },

    })
        .then(response =>{
            return response.json();
        })
        .catch(err => console.log(err));
};

