export const getAllDistributors = () => {
    return fetch(`http://localhost:8088/distributors`).then(res => res.json())
}

export const getDistributorFlowers = (distributorId) => {
    return fetch(`http://localhost:8088/flowers_retailers?distributorId=${distributorId}&_expand=flower&_expand=distributor&_expand=retailer`).then(res => res.json())
}

export const getDistributorRetailers = (distributorId) => {
    return fetch(`http://localhost:8088/retailers?distributorId=${distributorId}&_expand=distributor`).then(res => res.json())

}