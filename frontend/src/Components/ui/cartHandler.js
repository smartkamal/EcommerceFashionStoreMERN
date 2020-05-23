//add to cart with creating in local storage
export const addItem = (item,next) =>{

    let cart =[];
    if(typeof window!=='undefined'){
        if(localStorage.getItem('cart')){
            cart=JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        });

        cart = Array.from(new Set(cart.map((p)=>(p._id)))).map(id=>{
            return cart.find(p =>p._id===id)
        });

        localStorage.setItem("cart",JSON.stringify(cart))
        next();
    }
};
//To return the number of items in the cart
export const itemTotal =() =>{
    if(typeof window!=='undefined') {
        if (localStorage.getItem('cart')) {
           return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
return 0;
};
//to refresh the page
function refreshPage() {
    window.location.reload(false);
}

//empty the cart
export const emptyCart = next => {
    if (typeof window !== "undefined"){
        localStorage.removeItem("cart");
        refreshPage();
        next();
    }
};
//delete the cart
export const deleteCart=x=>{
    if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
    }
};
//get the items of the cart
export const getCart =() =>{
    if(typeof window!=='undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};
//Configure the quantity of each item in the cart
export  const updateCartItem =(productId, count)=>{
  let cart=[];
    if (typeof window !='undefined'){
        if (localStorage.getItem('cart')){
            cart =JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i)=>{
           if (product._id===productId){
               cart[i].count=count;
           }
        });
        localStorage.setItem('cart',JSON.stringify(cart));
    }

};
//To delete the respective item in the cart
export  const removeCartItem =(productId)=>{
    let cart=[];
    if (typeof window !='undefined'){
        if (localStorage.getItem('cart')){
            cart =JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i)=>{
            if (product._id===productId){
                cart.splice(i,1);
            }
        });
        localStorage.setItem('cart',JSON.stringify(cart));
    }
    return cart;
};
