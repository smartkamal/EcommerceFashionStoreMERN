import {API} from "../Config";

export const addWishItem = (item,next) =>{

    let wishlist =[];
    if(typeof window!=='undefined'){
        if(localStorage.getItem('wishlist')){
            wishlist=JSON.parse(localStorage.getItem('wishlist'))
        }
        wishlist.push({
            ...item,
            count: 1
        });

        wishlist = Array.from(new Set(wishlist.map((p)=>(p._id)))).map(id=>{
            return wishlist.find(p =>p._id===id)
        });

        localStorage.setItem("wishlist",JSON.stringify(wishlist))
        next();
    }
};

export const itemWishTotal =() =>{
    if(typeof window!=='undefined') {
        if (localStorage.getItem('wishlist')) {
            return JSON.parse(localStorage.getItem('wishlist')).length;
        }
    }
    return 0;
};

export const emptyWishlist = next => {
    if (typeof window !== "undefined"){
        localStorage.removeItem("wishlist");
        next();
    }
};

export const deleteWishlist=x=>{
    if (typeof window !== "undefined") {
        localStorage.removeItem("wishlist");
    }
};

export const getWishlist =() =>{
    if(typeof window!=='undefined') {
        if (localStorage.getItem('wishlist')) {
            return JSON.parse(localStorage.getItem('wishlist'));
        }
    }
    return [];
};


export  const removeWishlistItem =(productId)=>{
    let wishlist=[];
    if (typeof window !='undefined'){
        if (localStorage.getItem('wishlist')){
            wishlist =JSON.parse(localStorage.getItem('wishlist'))
        }
        wishlist.map((product, i)=>{
            if (product._id===productId){
                wishlist.splice(i,1);
            }
        });
        localStorage.setItem('wishlist',JSON.stringify(wishlist));
    }
    return wishlist;
};


// export const addUserWishList = (productID,userId,token) => {
//
//     console.log(JSON.stringify(productID))
//     console.log(JSON.stringify(userId))
//     return fetch(`${API}/user/wishlist/add/${userId}`, {
//         method: "POST",
//         headers: {
//             Accept: 'application/json',
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(productID)
//
//
//     })
//         .then(response => {
//             console.log('res',response)
//             return response.json()
//
//         })
//         .catch(error => {
//             console.log(error);
//         })
//
//
// }
