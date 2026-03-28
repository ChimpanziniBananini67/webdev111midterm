let cart = {};

function addItem(item) {
    if (!cart[item]) cart[item] = 0;
    cart[item]++;
    alert(item + " added!");
}

function removeItem(item) {
    if (cart[item]) {
        cart[item]--;
        alert(item + " removed!");
    }
}

function goToCart() {
    alert(JSON.stringify(cart, null, 2));
}
