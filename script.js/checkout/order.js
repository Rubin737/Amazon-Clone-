import { products } from "../data.js";
import { cart,removeCart,totalQuantity  } from "../cart.js";
import { currencyCheck} from "../additionalFn.js";
import { checkoutCartQuantity } from "../cart.js";
import { deliveryOption, getDeliveryOption,calculateDeliveryDate } from "../deliveryOption.js";
// import dayJs from'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateDeliveryOption } from "../cart.js";
import { getProduct } from "../data.js";
import { renderPayement } from "./payment.js";
import { resetCart } from "../cart.js";


export function RecursionUse(){


let checkoutHTML = ''; 


cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    
    let matchItem=getProduct(productId)
    let storeItem=getDeliveryOption(cartItem.deliveryId);
    const format=calculateDeliveryDate(storeItem)


    checkoutHTML += `
    <div class="cart-item-container cart-item-container1-${matchItem.id}">
        <div class="delivery-date">
            Delivery date:${format}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image" src="${matchItem.img}">

            <div class="cart-item-details">
                <div class="product-name">
                    ${matchItem.name}
                </div>
                <div class="product-price">
                    $${matchItem.getPriceInCents()}
                </div>
                <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchItem.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary" data-update-id="${matchItem.id}">
                        Update
                    </span>
                    <input class="update-input js-update-input-${matchItem.id}">
                    <span class="save-in link-primary" data-save-id="${matchItem.id}">Save</span>
                    <span class="delete-quantity-link link-primary" data-delete-id="${matchItem.id}">Delete</span>
                </div>
                <div class="alert-msg">** Quantity must be at least 0 and less than 1000</div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${renderShipping(matchItem,cartItem)}

            </div>
        </div>
    </div>`;

});


function renderShipping(matchItem,cartItem){
    let shippingHTML='';
    deliveryOption.forEach((eachOption)=>{

        //add date

        // const date=dayJs();
        // const deliveryDate=date.add(eachOption.deliveryDays,'days');
        
        // const format=deliveryDate.format('dddd, MMMM D ');
        
        const format=calculateDeliveryDate(eachOption);

        
        const priceIn = eachOption.priceInCents===0 ? 'FREE'  : 
        `${currencyCheck(eachOption.priceInCents)} - `

        const isChecked=eachOption.deliveryId===cartItem.deliveryId;
        
        shippingHTML+=`
        
        <div class="delivery-option" data-product-id="${cartItem.productId}"data-delivery-id="${eachOption.deliveryId}">
                    <input type="radio" ${isChecked?'checked' :""} class="delivery-option-input" name="delivery-option-${matchItem.id}" >
                    <div>
                        <div class="delivery-option-date">${format}</div>
                        <div class="delivery-option-price">$${priceIn} Shipping</div>
                    </div>
                </div>
                
        `    
    })
  return shippingHTML;

}

const generateCheckout = document.querySelector('.order-summary');
generateCheckout.innerHTML = checkoutHTML;

const deleteBtn=document.querySelectorAll('.delete-quantity-link');
deleteBtn.forEach((button)=>{
    button.addEventListener('click',()=>{
        const deleteId=button.dataset.deleteId;
        // console.log(deleteId);
        removeCart(deleteId);
        // console.log(cart);
        renderPayement();

        const con=document.querySelector(`.cart-item-container1-${deleteId}`);
        con.remove();
        checkOutItem();
        
    })
})
function checkOutItem(){
    let Quan=0;
    const returnPage= document.querySelector('.return-to-home-link')

    cart.forEach((cartItem)=>{
        Quan=cartItem.quantity+Quan;
    })
    if(cart.length===0){

         returnPage.innerHTML=`Return to Home Page`;

    }else{
        returnPage.innerHTML=`${Quan} Items`;
    }
  

}
checkOutItem();



const allUpdateBtn=document.querySelectorAll(`.update-quantity-link`);
allUpdateBtn.forEach((button)=>{
    button.addEventListener('click',()=>{
        const updateId=button.dataset.updateId;
        const container=document.querySelector(`.cart-item-container1-${updateId}`);
        container.classList.add('new-display');

        

    })
})

const allSaveBtn=document.querySelectorAll('.save-in');
allSaveBtn.forEach((button)=>{
    const saveId=button.dataset.saveId;
    const container=document.querySelector(`.cart-item-container1-${saveId}`);

    button.addEventListener('click',()=>{
        container.classList.remove('new-display');
        copyOfCopy(saveId);
        
    });

    const inputFeild=document.querySelector(`.js-update-input-${saveId}`);
    inputFeild.addEventListener('keydown',(event)=>{
        if(event.key==='Enter'){
            container.classList.remove('new-display');
            copyOfCopy(saveId);
        }
        
       
    })
   

});
function copyOfCopy(saveId){
   
        
        const inputVal=document.querySelector(`.js-update-input-${saveId}`);
        const valueStore=Number(inputVal.value);
        

        if(valueStore<1 || valueStore>99){
            const alertMsg=document.querySelector('.alert-msg');
          
                alertMsg.classList.add('js-alert-msg');
            
            const setTime1=setTimeout(()=>{
                alertMsg.classList.remove('js-alert-msg');
            },4000)
          
            return
            
        }

        checkoutCartQuantity(saveId,valueStore);  
        checkOutItem();
        document.querySelector(`.js-quantity-label-${saveId}`)
        .innerHTML=valueStore; 
        renderPayement(); 
}

const option=document.querySelectorAll('.delivery-option');
option.forEach((eachOption)=>{
    eachOption.addEventListener('click',()=>{

        const deliveryId=eachOption.dataset.deliveryId;
        const productId=eachOption.dataset.productId;
        
        updateDeliveryOption(productId,deliveryId);
        RecursionUse();
        renderPayement();
    })

})

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click',function(){
    
    
    resetCart();
    console.log(cart)
    RecursionUse()
    renderPayement()

    if(cart.length===0){
        resetBtn.style.display = 'none'; 
    }
    else{
        resetBtn.style.display = 'block'; 
    }
})

function handleResetButton(){
    if(cart.length===0){
        resetBtn.style.display = 'none'; 
        const suggestionMsg = document.querySelector('.container-msg');
        setTimeout(function(){
            suggestionMsg.innerHTML = `
            <div class="msg1">
                  Can't place order,Cart is Empty
            </div>
        `;
        },3000)
        
    //Your cart is empty. You can't place an order until you add items to your cart.
    }
    else{
        resetBtn.style.display = 'block'; 
    }

}handleResetButton();



}

