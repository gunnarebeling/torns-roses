export const getAllRetailers = () => {
    return fetch('http://localhost:8088/retailers').then(res => res.json())
}

export const getRetailerInfo = (retailerId) => {
    return fetch(`http://localhost:8088/flowers_retailers?retailerId=${retailerId}&_expand=retailer&_expand=flower&_expand=distributor&_expand=nursery`).then(res => res.json())
}