import { products, loadFromBackend } from './data.js';
// import { currencyCheck } from './additionalFn.js';
import { addCart, checkMark, totalQuantity } from './cart.js';

// Load products when the page is initialized
loadFromBackend(mainPageGrid);

function mainPageGrid() {
    let generateHTML = '';
    const url = new URL(window.location.href);  // Ensure we get the current URL
    const search = url.searchParams.get('search');  // Get the 'search' query parameter
    let filterProducts = products;

    if (search) {
        filterProducts = products.filter(function (product) {
            let matchingKeyword = false;
            product.keywords.forEach(function (keyword) {
                if (keyword.toLowerCase().includes(search.toLowerCase())) {
                    matchingKeyword = true;
                }
            });

            return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
        });
    }

    const responseMessage = document.querySelector('.js-grid-grid');
    if (!filterProducts.length) {
        responseMessage.innerHTML = `
            <div class="message-wrapper">
                <h1 class="message-result">Oops! ☹ We couldn't find any products matching your search.</h1>
            </div>
        `;
        return;
    }

    // Generate the product list HTML
    filterProducts.forEach(productItems => {
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
            </div>
        `;
    });

    const generate = document.querySelector('.products-grid');
    generate.innerHTML = generateHTML;

    totalQuantity();

    document.querySelectorAll('.add-to-cart-button')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                addCart(productId);
                checkMark(productId);
                totalQuantity(productId);
            });
        });
}

// Function to handle the search action when triggered by Enter or the button click
function handleSearchItems() {
    const searchItem = document.querySelector('.js-search-bar').value;
   // console.log('Searching for:', searchItem);  // Log for debugging
    if (searchItem) {
        window.location.href = `amazon.html?search=${searchItem}`;  // Navigate to the search results page
    }
}

// Get the search input and search button elements
const searchBar = document.querySelector('.js-search-bar');
const searchButton = document.querySelector('.js-search-btn');

// Ensure the elements are present before adding event listeners
if (searchBar && searchButton) {
    // Trigger search when Enter is pressed
    searchBar.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            handleSearchItems();
        }
    });

    // Trigger search when search button is clicked
    searchButton.addEventListener('click', handleSearchItems);
}
