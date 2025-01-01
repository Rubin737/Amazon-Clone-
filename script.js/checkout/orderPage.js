import { getProduct,loadUsingFetch } from "../data.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { currencyCheck } from "../additionalFn.js";
import { totalQuantity,loadFromStorage,addCart } from "../cart.js";
import { cancelOrder,calculateTotal,orderArray,removeOrder,totalOrderQuantity} from "./addOerders.js";
import { setupSearchBarGlobally } from "../seachLogic.js";
// window.onload = () => {
  
//   totalQuantity(); // Update the cart quantity when the page loads
// }
async function loadOrderPage(){
    setupSearchBarGlobally()
    await loadUsingFetch();
//  await loadUsingFetch()
  loadFromStorage();
  totalQuantity();



  totalOrderQuantity()


  

  let pageHTML='';
  orderArray.forEach(function(order){

    const dateString = dayjs(order.orderTime).format('MMMM D')

    pageHTML+=` <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div class="payment-info">${currencyCheck(order.totalCostCents)}$</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
           
          ${eachProductDetails(order)}
            
          </div>
        </div>`
    
  })
  function eachProductDetails(order){
    let productsHTML='';
    order.products.forEach(function(eachProduct){
     // console.log(eachProduct)
      const product = getProduct(eachProduct.productId);
     // console.log(product)
      productsHTML+=`<div class="product-image-container">
              <img src="${product.img}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(eachProduct.estimatedDeliveryTime).format('MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity:${eachProduct.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy" data-product-id="${product.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
                
              </a>
              <button class="cancel-each-order js-cancel-order" data-order-id="${order.id}" data-product-id="${product.id}">Cancel Order</button>
            </div>`
    })
    return productsHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML=pageHTML;

 const buyBtn = document.querySelectorAll(`.js-buy`);
 buyBtn.forEach(function(button){
  button.addEventListener('click',function(){
      console.log(button.dataset.productId)
      addCart(button.dataset.productId);

      button.innerText='Added!';

      totalQuantity();
      
      button.classList.add('js-buy-btn');
      setTimeout(function(){
        button.innerHTML=

        `<img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>`

      },1000)
    
  })
 })
 
 
 const cancelOrderBtn = document.querySelector('.cancel-order');
 cancelOrderBtn.addEventListener('click',function(){
 
  cancelOrder();
  totalOrderQuantity()
  loadOrderPage()
 
 })


 
const eachCancelBtn = document.querySelectorAll('.js-cancel-order');
eachCancelBtn.forEach(function(button){
  button.addEventListener('click',function(){
    
    const productId = button.dataset.productId;
    const orderId = button.dataset.orderId;
    
    button.innerHTML='Cancelled!!';
    button.style.color ='blue';
    
    // console.log(productId);
    // console.log(orderId)
    
    removeOrder(productId,orderId);
    calculateTotal(productId,orderId);
    totalOrderQuantity()
    loadOrderPage()
    
    
  })
})

  
}
loadOrderPage()