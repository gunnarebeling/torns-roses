export const getAllDistributors = () => {
    return fetch(`http://localhost:8088/distributors`).then(res => res.json())
}

export const getDistributorFlowers = (distributorId) => {
    return fetch(`http://localhost:8088/flowers_retailers?distributorId=${distributorId}&_expand=flower`).then(res => res.json())
}