import {API} from "../Config";

export const listUserData = (id, token) =>{
    return fetch(`${API}/user/${id}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response =>{
            return response.json();
        })
        .catch(err=> console.log(err));
};


export const updateUserData = (id, token, user) =>{
    return fetch(`${API}/user/${id}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response =>{
            return response.json();
        })
        .catch(err=> console.log(err));
};

export const userUpdate = (user, next) => {
    if (typeof window !== 'undefined'){
        if (localStorage.getItem('jwt')){
            let validate = JSON.parse(localStorage.getItem('jwt'))
            validate.user = user
            localStorage.setItem('jwt', JSON.stringify(validate))
            next()
        }
    }
};

export const getUserHistory = (id, token) =>{
    return fetch(`${API}/orders/by/user/${id}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response =>{
            return response.json();
        })
        .catch(err=> console.log(err));
}
