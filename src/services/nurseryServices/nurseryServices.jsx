export const getAllNurseries = () => {
    return fetch(`http://localhost:8088/nurseries/`).then(res => res.json())
}

export const getNurseryFlowers = (nurseryId) => {
    return fetch(`http://localhost:8088/flowers_nurseries?nurseryId=${nurseryId}&_expand=flower`).then(res => res.json())
}

export const getNurseryDistributors = (nurseryId) => {
    return fetch(`http://localhost:8088/nurseries_distributors?nurseryId=${nurseryId}&_expand=distributor`).then(res => res.json())
}