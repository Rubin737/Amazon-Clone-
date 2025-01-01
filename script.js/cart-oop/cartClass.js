class Cart {
    cart;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey;
        this.loadFromStorage();

    }
    
    loadFromStorage() {
        this.cart = JSON.parse(localStorage.getItem(this.#localStorageKey));
        if (!this.cart) {
            this.cart = [ { productId: "1", quantity: 3, deliveryId: "3" },
                { productId: "2", quantity: 3, deliveryId: "3" },
                { productId: "3", quantity: 3, deliveryId: "3" }];
        }
    }

    saveStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cart));
    }

    addCart(productId) {
        let matchingItem;
        this.cart.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        let selector = document.querySelector(`.selector1-${productId}`);
        const selectorVal = Number(selector.value);
        console.log(typeof selectorVal);

        if (matchingItem) {
            matchingItem.quantity += selectorVal;
        } else {
            this.cart.push({
                productId: productId,
                quantity: selectorVal,
                deliveryId: '1'
            });
        }
        this.saveStorage();
    }

    totalQuantity() {
        let cartQuantity = 0;
        this.cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        document.querySelector('.cart-quantity').innerHTML = cartQuantity;
    }

    checkMark(productId) {
        const addMsg = document.querySelector(`.added-to-cart-js-${productId}`);
        addMsg.classList.add('js-add');
        setTimeout(() => {
            addMsg.classList.remove('js-add');
        }, 1500);
    }

    removeCart(deleteId) {
        let newCart = [];
        this.cart.forEach((cartItem) => {
            if (deleteId !== cartItem.productId) {
                newCart.push(cartItem);
            }
        });
        this.cart = newCart;
        this.saveStorage();
    }

    checkoutCartQuantity(saveId, inputValue) {
        let matchQuan;
        this.cart.forEach((cartItem) => {
            if (cartItem.productId === saveId) {
                matchQuan = cartItem;
            }
        });

        matchQuan.quantity = inputValue;
        this.saveStorage();
    }

    updateDeliveryOption(productId, deliveryId) {
        this.cart.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.deliveryId = deliveryId;  
            }
        });
        this.saveStorage();  
    }
}

const personalCart = new Cart('cart-mart');
const businessCart=new Cart('cart-business');

console.log(personalCart);
console.log(businessCart);

console.log(businessCart instanceof Cart)
console.log(personalCart instanceof Cart)


