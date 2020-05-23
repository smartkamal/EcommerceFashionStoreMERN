import {API} from "../Config";

export const addCategory = (userId,token,productCategory) => {
    return fetch(`${API}/category/add/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productCategory)
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error);
        })
};

export const getManagers = () =>{
    return fetch(`${API}/list/storemanager`,{
        method: "GET"
    })
        .then(response =>{
            return response.json();
        })
        .catch(err=> console.log(err));
}

export const deleteManager = (managerId,userId ,token) =>{
    return fetch(`${API}/user/storemanager/delete/${managerId}/${userId}`,{
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

export const getCategories = () =>{
    return fetch(`${API}/categoryList`,{
        method: "GET"
    })
        .then(response =>{
            return response.json();
        })
        .catch(err=> console.log(err));
}
