import { RecursionUse } from "./checkout/order.js";
import { renderPayement } from "./checkout/payment.js";
import { products,loadFromBackend } from "./data.js";
// import './cart-oop/cartClass.js';

const promise = new Promise(function(resolve,reject){
        
        loadFromBackend(function(){
                resolve();
        })
})

promise.then(function(){

        RecursionUse();
        renderPayement();
});


// loadFromBackend(()=>{
    
//         RecursionUse();
//         renderPayement();
// })










