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
}
