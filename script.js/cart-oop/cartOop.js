// // personalCart.loadFromStorage();
// let personalCart={

//     cart:undefined,
//      loadFromStorage(){


//        this. cart=JSON.parse(localStorage.getItem('bbb'))
//         if(!this.cart){
//            this.cart=[{ productId: "2", quantity: 3, deliveryId: "3" } ];
//        }
   
// },



// saveStorage(){
//    localStorage.setItem('bbb',JSON.stringify(this.cart));
// },
// addCart(productId){
//    let matchingItem;
//   this. cart.forEach((cartItem)=>{
//        if(productId===cartItem.productId){
//            matchingItem=cartItem;
//        }
//    })

//    const selector=document.querySelector(`.selector1-${productId}`)
//    const selectorVal=Number(selector.value);
//    console.log(typeof selectorVal)

//    if(matchingItem){
//        matchingItem.quantity+=selectorVal;

//    }
//    else{
//        this.cart.push({
//            productId:productId,
//            quantity:quantity,
//            deliveryId:'1'
//        })
       
//    }
//    this.saveStorage();
//  },
//  totalQuantity(){
  
//    let cartQuantity=0;
//    this.cart.forEach((cartItem)=>{
//        cartQuantity+=cartItem.quantity;
//    })
//    document.querySelector('.cart-quantity')
//    .innerHTML=cartQuantity;


//  },
//  checkMark(productId){
//    const addMsg=document.querySelector(`.added-to-cart-js-${productId}`);
//    addMsg.classList.add('js-add');
//    setTimeout(()=>{
//     addMsg.classList.remove('js-add');

//    },1500)   

//  },
// eremoveCart(deleteId){
//    let newCart=[];
//   this .cart.forEach((cartItem)=>{
//        if(deleteId!==cartItem.productId){
//            newCart.push(cartItem);
//        }
//    })
//    this.cart=newCart;

// this.saveStorage();
// },
// checkoutCartQuantity(saveId,inputValue){
//    let matchQuan;
//    this.cart.forEach((cartItem)=>{
//        if(cartItem.productId===saveId){
//            matchQuan=cartItem;
           
//        }        
//    })
   
//    matchQuan.quantity=inputValue;
//    this.saveStorage();
  
// },
//  updateDeliveryOption(productId, deliveryId) {
//    this.cart.forEach((cartItem) => {
//        if (cartItem.productId === productId) {
//            cartItem.deliveryId = deliveryId;  // Update deliveryId for the matched productId
//        }
//    });
   
//    this.saveStorage();  
// }
// };
// personalCart.loadFromStorage();
// console.log(personalCart);
// console.log(personalCart.addCart('3'));


 