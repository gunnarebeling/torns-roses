import { useEffect, useState } from "react"
import { getShoppingCartInfo } from "../../services/shoppingCartServices/shoppingCartService"

export const ShoppingCart = ({currentUser}) => {
    const [flowersInfo, setFlowersInfo] = useState([])
    const [shoppingCart, setShoppingCart] = useState([])

    useEffect(() => {
        getShoppingCartInfo().then( res => {
            setShoppingCart(res)
        })
    }, [])
    useEffect(() => {
        
        const customerShoppingCart = shoppingCart.filter(item => currentUser === item.customerId)
        const flowerObj = customerShoppingCart.reduce((flowerDataList ,cartitem) => {
            const existingFlower = flowerDataList.find(item => item.flowerId === cartitem.flowerId)
            if (!existingFlower) {
                let obj = {
                    price: cartitem.price,
                    species: cartitem.flower.species,
                    quantity: 1,
                    flowerId: cartitem.flowerId

                }
                flowerDataList.push(obj)
            } else{
                existingFlower.quantity++
                existingFlower.price += cartitem.price
            }
            return flowerDataList
                }, []);
        setFlowersInfo(flowerObj)
    }, [shoppingCart])
    return (
        <div>
            <div className="text-center">
                <header className="display-6">Cart</header>
            </div>
            <div className="row">
                <div>
                    <h3>Flowers</h3>
                    <ul className="flowersList">
                        
                        {flowersInfo.map(flower => {
                            return(
                            <li key={flower.flowerId}>
                                <section>species: {flower?.species}</section>
                                <section>quantity: {flower?.quantity}</section>
                                <section>price: ${flower?.price}</section>
                            </li>
                            )
                        })}
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}