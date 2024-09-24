import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getRetailerInfo } from "../../services/retailerServices/retailerServices"
import { getNurseryFlowers } from "../../services/nursaryServices/nursaryServices"
import { addToCart } from "../../services/shoppingCartServices/shoppingCartService"

export const RetailerDetails = ({currentUser}) => {
    const [retailerInfo, setRetailerInfo] = useState([])
    const [nurseryFlowers, setNurseryFlowers] = useState([])
    const [nurseries, setNurseries] = useState([])
    const [shoppingCart, setShoppingCart] = useState([])

    const {retailerId} = useParams()

    useEffect(() => {
        getRetailerInfo(retailerId).then( res => {
            setRetailerInfo(res)
        })
        getNurseryFlowers().then( res => {
            setNurseryFlowers(res)
        })
    }, [retailerId])
    useEffect(() => {
        const retailersFilter = retailerInfo?.reduce((nurseryList,cur) => {
            if (!nurseryList.some(item => item.nurseryId === cur.nurseryId)) {
            nurseryList.push({nurseryId: cur.nurseryId, businessName: cur.nursery.businessName})
            }
            return nurseryList
        }, [])
        setNurseries(retailersFilter)
    }, [retailerInfo])
    const flowerPrices = (targetflower) => {
        const specificFlower= nurseryFlowers.find( flower => flower.flowerId === targetflower.flowerId && flower.nurseryId === targetflower.nurseryId)
        const specificFlowerPrice = specificFlower?.price
        const distroMarkup = 1 + targetflower.distributor.markup
        const retailMarkup = 1 + targetflower.retailer.markup
        const priceInFloat = specificFlowerPrice * distroMarkup * retailMarkup
        const priceInDollars = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(priceInFloat)

        return (priceInDollars)
        

    }
    const handlePurchase = (event) => {
        const cartObj = {
            customerId: currentUser.Id,
            retailerId: parseInt(event.target.dataset.retailerid),
            flowerId: parseInt(event.target.dataset.flowerid)
            
        }
        addToCart(cartObj)

    }

    return (
        <div>
            <div className="text-center">       
                <header className="business-name display-6 m-3">{retailerInfo[0]?.retailer.businessName}</header>
                <h3 className="address">{retailerInfo[0]?.retailer.address}</h3>
            </div>
            <div className="flowerList">
            <ul className="text-center border mx-3 rounded list-unstyled">
                <h2>Flowers</h2>
                {retailerInfo.map(flower => {
                    return (
                    <li key={flower.id} data-retailerid={flower.retailerId} data-flowerid={flower.flowerId} className="border m-2">
                        <p>species: {flower.flower?.species}</p>
                        <p>color: {flower.flower?.color}</p>
                        <p>price: {flowerPrices(flower)} </p>
                        <button onClick={handlePurchase}>purchase</button>
                    </li>
                    )
                })}
            </ul>

            </div>
            <div className="distributorList">
                <ul className="text-center border mx-3 rounded list-unstyled">
                    <h2>Distributor</h2>
                    <li>
                        <p>{retailerInfo[0]?.distributor?.name}</p>
                    </li>
            
                </ul>
            </div>
            <div className="nurseryList">

                <ul className="text-center border mx-3 p-2 rounded list-unstyled">
                    <h2>nurseries</h2>
                    { nurseries && nurseries.map(nursery => {
                        return (
                            <li key={nursery.nurseryId}>{nursery?.businessName}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}