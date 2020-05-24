//add to wishlist with creating in local storage
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
//return the item count in the wishlist
export const itemWishTotal =() =>{
    if(typeof window!=='undefined') {
        if (localStorage.getItem('wishlist')) {
            return JSON.parse(localStorage.getItem('wishlist')).length;
        }
    }
    return 0;
};
//delete the wishlist from local storage
export const deleteWishlist=x=>{
    if (typeof window !== "undefined") {
        localStorage.removeItem("wishlist");
    }
};

//getting wishlist items
export const getWishlist =() =>{
    if(typeof window!=='undefined') {
        if (localStorage.getItem('wishlist')) {
            return JSON.parse(localStorage.getItem('wishlist'));
        }
    }
    return [];
};

//To delete the respective item in the wishlist
export  const removeWishlistItem =(productId)=>{
    let wishlist=[];
    if (typeof window !='undefined'){
        if (localStorage.getItem('wishlist')){
            wishlist =JSON.parse(localStorage.getItem('wishlist'))
        }
        // eslint-disable-next-line
        wishlist.map((product, i)=>{
            if (product._id===productId){
                wishlist.splice(i,1);
            }
        });
        localStorage.setItem('wishlist',JSON.stringify(wishlist));
    }
    return wishlist;
};
