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