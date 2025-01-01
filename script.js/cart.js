 export let cart;
 loadFromStorage();
 
  export function loadFromStorage(){


         cart=JSON.parse(localStorage.getItem('carrrt'))
         if(!cart){
            cart=[ ];
        }
    
 }
  function saveStorage(){
    localStorage.setItem('carrrt',JSON.stringify(cart));
 }
 export function addCart(productId) {
    const selector = document.querySelector(`.selector[data-product-id="${productId}"]`);
    const selectorVal = selector ? Number(selector.value) : 1; // Fallback to 1 if selector is null
    console.log(`Selected value: ${selectorVal}`);
  
    let matchingItem;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += selectorVal;
    } else {
      cart.push({
        productId: productId,
        quantity: selectorVal,
        deliveryId: '1',
      });
    }
    saveStorage();
  }
  
  export function totalQuantity(){
   
    let cartQuantity=0;
    cart.forEach((cartItem)=>{
        cartQuantity+=cartItem.quantity;
    })
    document.querySelector('.cart-quantity')
    .innerHTML=cartQuantity;
    // document.querySelector('.js-order-quantity')
    // .innerHTML=cartQuantity;
    // document.querySelector('.js-tracking-quantity')
    // .innerHTML=cartQuantity;


  }
  export function checkMark(productId){
    const addMsg=document.querySelector(`.added-to-cart-js-${productId}`);
    addMsg.classList.add('js-add');
    setTimeout(()=>{
     addMsg.classList.remove('js-add');

    },1500)
    

  }
export function removeCart(deleteId){
    let newCart=[];
    cart.forEach((cartItem)=>{
        if(deleteId!==cartItem.productId){
            newCart.push(cartItem);
        }
    })
    cart=newCart;

saveStorage();
}
export function checkoutCartQuantity(saveId,inputValue){
    let matchQuan;
    cart.forEach((cartItem)=>{
        if(cartItem.productId===saveId){
            matchQuan=cartItem;
            
        }        
    })
    
    matchQuan.quantity=inputValue;
    saveStorage();
   
}
export function updateDeliveryOption(productId, deliveryId) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.deliveryId = deliveryId;  // Update deliveryId for the matched productId
        }
    });
    
    saveStorage();  
}

// console.log(cart);

export function resetCart(){
   cart=[];
   saveStorage()
}
export function handleResetButton(resetBtn){
  if(cart.length===0){
      resetBtn.style.display = 'none'; 
  }
  else{
      resetBtn.style.display = 'block'; 
  }

}
