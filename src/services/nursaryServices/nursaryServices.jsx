export const getNurseryFlowers = () => {
    return fetch(`http://localhost:8088/flowers_nurseries`).then(res => res.json())
}