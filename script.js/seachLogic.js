// import { products } from "./data.js";
import { totalQuantity } from "./cart.js";

export function setupSearchBarGlobally(){

    function handleSeachItems(){

        const searchItem = document.querySelector('.js-search-bar').value          
        window.location.href = `amazon.html?search=${encodeURIComponent(searchItem)}`;
    }
    
     const usingEnter = document.querySelector('.js-search-bar');
     const btn = document.querySelector('.js-search-btn');
     
        totalQuantity()
        
         usingEnter.addEventListener('keydown',function(event){
           if(event.key==='Enter'){
               handleSeachItems();
           }
         });
    
    
         btn.addEventListener('click',handleSeachItems);
     

}
