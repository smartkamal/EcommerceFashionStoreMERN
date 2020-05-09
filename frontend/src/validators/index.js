import {API} from "../Config";

export const signUp = (user) => {
    //console.log(firstName,lastName,email,password)

    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error);
        })
}

export const signIn = user => {
    //console.log(firstName,lastName,email,password)

    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error);
        })
}

export const signOut = (next) => {
    if (typeof window !== 'undefined'){
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: "GET",
        })
            .then(response => {
                console.log('signout',response);
            })
            .catch(error => console.log(error));
    }
}

export const validate = (content, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(content));
        next();
    }
}

export const isValidated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else {
        return false;
    }
}
