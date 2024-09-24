export const addToCart = (cartObj) => {
    return fetch('http://localhost:8088/shopping_cart', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(cartObj)
    })
}