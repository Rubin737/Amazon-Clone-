import { cart, resetCart } from "../cart.js";
import { getProduct } from "../data.js";
import { getDeliveryOption } from "../deliveryOption.js";
import { currencyCheck } from "../additionalFn.js";
import { addOrders} from "./addOerders.js";
import { RecursionUse } from "./order.js";

export function renderPayement(){
    
    let renderShippingSummary='';
    let itemsPrice=0;
    let shippingPrice=0;


    cart.forEach((cartItem)=>{

        const matchItem=getProduct(cartItem.productId);        
        itemsPrice+=matchItem.priceInCents * cartItem.quantity;
        

        const deliveryOption=getDeliveryOption(cartItem.deliveryId);
        shippingPrice+=deliveryOption.priceInCents;
       
    })
    const totalBeforeTax=itemsPrice+shippingPrice;
    // console.log(totalBeforeTax);
    const taxCon=totalBeforeTax*0.1;
    

    const totPrice=totalBeforeTax+taxCon;
    
    
    renderShippingSummary+=`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">$${currencyCheck(itemsPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${currencyCheck(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${currencyCheck(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${currencyCheck(taxCon)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${currencyCheck(totPrice)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`;

          const renderingPayment=document.querySelector('.payment-summary');
          renderingPayment.innerHTML=renderShippingSummary;
    
          const placeOrderBtn = document.querySelector('.js-place-order');

          placeOrderBtn.addEventListener('click', async function () {
              const formattedCart = cart.map(item => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  deliveryOptionId: item.deliveryId 
              }));
          
              try {
                  const response = await fetch('https://supersimplebackend.dev/orders', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          cart: formattedCart 
                      })
                  });
          
                  if (response.ok) {
                      const order = await response.json();
                      addOrders(order); 
                      resetCart();
                      RecursionUse()
                      window.location.href = 'orders.html';
                  } else {
                      console.error('Failed to place order:', await response.text());
                  }
              } catch (error) {
                  console.error('Error while placing order:', error);
              }
          });    
};
