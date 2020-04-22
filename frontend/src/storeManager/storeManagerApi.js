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
