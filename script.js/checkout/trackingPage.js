import { addOrders } from "./addOerders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, loadUsingFetch } from "../data.js";
import { getOrder } from "./addOerders.js";
import { totalQuantity } from "../cart.js";
import { setupSearchBarGlobally } from "../seachLogic.js";

window.onload = () => {
  totalQuantity();
   setupSearchBarGlobally()
}


async function trackingPage() {
  await loadUsingFetch();
  
  const url = new URL(window.location.href);
  const productId = url.searchParams.get('productId');
  const orderId = url.searchParams.get('orderId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  let productDetails;

  order.products.forEach(function (details) {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

 const currentTime = dayjs();
 //console.log(currentTime);
 const orderTime = dayjs(order.orderTime);
 //console.log(orderTime);
 const deveryTime = dayjs(productDetails.estimatedDeliveryTime)
 //console.log(deveryTime);
 const progressBar = ((currentTime-orderTime) / (deveryTime-orderTime))*100;
 console.log(progressBar)

 const deliveredMessage = currentTime < deveryTime ? 'Arriving on' : 'Delivered on';

  if (productDetails) {

    const pageHTML = `
    
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>
      
      <div class="delivery-date">
         ${deliveredMessage} ${dayjs(productDetails.estimatedDeliveryTime).format('D MMMM YYYY')}
      </div>
      <div class="product-info">
        Quantity: ${productDetails.quantity}
      </div>
      <img class="product-image" src="${product.img}">
      <div class="progress-labels-container">
        <div class="progress-label ${progressBar < 50 ? "current-status" : ''}">
          Preparing
        </div>
        <div class="progress-label ${progressBar >=50 && progressBar <100 ? "current-status" : ''}">
          Shipped
        </div>
        <div class="progress-label ${progressBar >= 100 ? "current-status" : ''}">
          Delivered
        </div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width:${progressBar}%"></div>
      </div>`;

    document.querySelector('.js-order-tracking').innerHTML = pageHTML;

  }
 
}

trackingPage();
