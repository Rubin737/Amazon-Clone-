import { loadUsingFetch } from "../data.js";
import { currencyCheck } from "../additionalFn.js";
export let orderArray = JSON.parse(localStorage.getItem('order'))|| [];
//console.log(orderArray)

export function addOrders(order) {
    orderArray.unshift(order);
    saveOrders();
    return orderArray; // Return the updated array
 }
 

function saveOrders(){

    localStorage.setItem('order',JSON.stringify(orderArray));

}

export function getOrder(orderId){

    let matchingItem;
    orderArray.forEach(function(order){
        if(order.id===orderId){
            matchingItem=order;
        }
    })
    //console.log(matchingItem)
    return matchingItem;
}

export function cancelOrder(){
    orderArray=[];
    totalOrderQuantity();
    saveOrders();
}

export function removeOrder(productId,orderId){
    orderArray=orderArray.filter(function(order){
        if(order.id === orderId){
            order.products = order.products.filter(function(product){
                return product.productId !== productId;
            })

            return order.products.length>0; //to prevent empty order to be stored
        }
      return true;//optional
    })

    saveOrders();
   
}


export function calculateTotal(productId,orderId) {
    

    let total = orderArray.reduce((sum, order) => sum + order.totalCostCents, 0);
    console.log('Total Price (in cents):', total);
   
    dynamicFn(total,productId,orderId)
    
  }
  
 export async function dynamicFn(total,productId,orderId) {
    
    const productData = await loadUsingFetch();
   // console.log(productId)
    
    let matchingItem;

    productData.forEach(function(product){
        if(product.id === productId){
           matchingItem=product
        }
    })
  // console.log(matchingItem);

    const actualPrice = Math.max(0,total - matchingItem.priceInCents);
    const finalPrice = currencyCheck(actualPrice);
    console.log(finalPrice);
   
    const targetOrder = orderArray.find(order => order.id === orderId);
   
    if (targetOrder) {
        targetOrder.totalCostCents = actualPrice;
    }

 
    
    const dynamicPayment = document.querySelector('.payment-info');

    if (dynamicPayment) {      

         dynamicPayment.innerHTML = `${finalPrice}$`;
    }

    totalOrderQuantity();
    
    saveOrders()
    
  } 
  
  
export function handleCancelOrder(){

    if(orderArray.length===0){ 
        //const cancelOrderBtn = document.querySelector('.cancel-order');
        //cancelOrderBtn.innerHTML='No Orders';
      //  cancelOrderBtn.style.background='none'
        
    }    
    

}

export function totalOrderQuantity(){
    const orderQuantity = document.querySelector('.order-count');
    orderQuantity.classList.add('js-order-count')
    let quantity = orderArray.length

    const cancelOrderBtn = document.querySelector('.cancel-order');

    const yourOrder = document.querySelector('.page-title');
    yourOrder.classList.add('js-page-title');

    if(quantity>0){

      
        cancelOrderBtn.innerHTML='Cancel Orders';
        yourOrder.innerHTML='Your Order'
        
        if(quantity===1){
            orderQuantity.innerHTML = `( ${quantity} Order )`;
        }
        else{
            orderQuantity.innerHTML = `( ${quantity} Orders )`;
        }

    }
    else{

        // orderQuantity.innerHTML='';
        // cancelOrderBtn.innerHTML='';
        // yourOrder.innerHTML ='';


        const totalDiv = document.querySelector('.cancel-order-container');
        totalDiv.style.display='none';

        const totalGrid = document.querySelector('.js-orders-grid');
        totalGrid.innerHTML=''
       
        const noOrder = document.querySelector('.no-order');
        if(noOrder){
            noOrder.innerHTML='No orders Available . Add the Orders from Main Page';
        }
       
        const linkElem = document.querySelector('.h3-link');
        linkElem.style.display='block'
        
        
    }
  
    saveOrders();

}
