import {API} from "../Config";

/*
    method:POST
    pass all the form data
 */
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

/*
    method:GET
    retrieve all the categories
 */
export const getCategories = () =>{
    return fetch(`${API}/categoryList`,{
        method: "GET"
    })
        .then(response =>{
            return response.json();
        })
        .catch(err=> console.log(err));
}

/*
    method:GET
    get all the products to be displayed to manage products
 */
export const getProducts= () =>{
    return fetch(`${API}/products?limit=100`,{
        method: "GET"
    })
        .then(response =>{
            return response.json();
        })
        .catch(err=> console.log(err));
}

/*
    method:GET
    get a particular product with a id
 */
export const getAProduct= (productID) =>{
    return fetch(`${API}/product/${productID}`,{
        method: "GET"
    })
        .then(response =>{
            return response.json();
        })
        .catch(err=> console.log(err));
}

/*
    method:PUT
    update a particular product
 */
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

/*
    method:DELETE
    delete a particular product
 */
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
//Get the order list
export const ordersList=(userId,token)=>{
    return fetch(`${API}/order/list/${userId}`,{
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response=>{
            return response.json();
        })
        .catch(err=>console.log(err));
};
