export const addToCart = (cartObj) => {
    return fetch('http://localhost:8088/shopping_cart', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(cartObj)
    })
}

export const getShoppingCartInfo = () => {
    return fetch(`http://localhost:8088/shopping_cart?_expand=flower`).then(res => res.json())
}

export const getUserCartCount = (userId) => {
    return fetch(`http://localhost:8088/shopping_cart?customerId=${userId}`)
        .then(res => res.json())
        .then(cartItems => cartItems.length);
};