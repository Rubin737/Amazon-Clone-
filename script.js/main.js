import { products,loadFromBackend} from'./data.js'
// import { currencyCheck } from './additionalFn.js';
import {addCart,checkMark,totalQuantity} from './cart.js';
import { setupSearchBarGlobally } from './seachLogic.js';

loadFromBackend(mainPageGrid)
setupSearchBarGlobally();
function mainPageGrid(){


let generateHTML = '';
//products.forEach((productItems) => {
    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');

    let filterProducts=products;
    
    if(search){

        filterProducts=products.filter(function(products){

            // return products.name.includes(search);
            let matchingKeyword = false;
            products.keywords.filter(function(keyword){
                if(keyword.toLowerCase().includes(search.toLowerCase())){
                    matchingKeyword = true;
                }
            })

            return matchingKeyword || products.name.toLowerCase().includes(search.toLowerCase());
        })
        
    }
    const responseMessage = document.querySelector('.js-grid-grid');
    if(!filterProducts.length){
        
        responseMessage.innerHTML = `
        <div class="message-wrapper">
            <h1 class="message-result">Oops! ☹ We couldn't find any products matching your search.</h1>
        </div>
    `;
        return ;
    }
   


    filterProducts.forEach(productItems=>{

    generateHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${productItems.img}">
            </div>
            <div class="product-name limit-text-to-2-lines">${productItems.name}</div>
            <div class="product-rating-container">
                <img class="product-rating-stars" src="${productItems.getStars()}">
                <div class="product-rating-count link-primary">56</div>
            </div>
            <div class="product-price">${productItems.getPriceInCents()}</div>
            <div class="product-quantity-container">
                <select class="selector" data-product-id="${productItems.id}">

                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            ${productItems.extraInfoHtml()}
            <div class="product-spacer"></div>
            <div class="added-to-cart added-to-cart-js-${productItems.id}">
                <img src="images/icons/checkmark.png"> Added
            </div>
            <button class="add-to-cart-button button-primary" data-product-id="${productItems.id}">
                Add to Cart
            </button>
        </div>`;
//});
});
const generate=document.querySelector('.products-grid');
generate.innerHTML=generateHTML;

totalQuantity();

document.querySelectorAll('.add-to-cart-button')
.forEach((button)=>{
    button.addEventListener('click',()=>{
        const productId=button.dataset.productId;
        let matchingItem;
        addCart(productId);
        checkMark(productId);
        totalQuantity(productId);
       
    })
    
})


}

 
totalQuantity()