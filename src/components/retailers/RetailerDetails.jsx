import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getRetailerInfo } from "../../services/retailerServices/retailerServices"
import { getNurseryFlowers } from "../../services/nursaryServices/nursaryServices"

export const RetailerDetails = () => {
    const [retailerInfo, setRetailerInfo] = useState([])
    const [nurseryFlowers, setNurseryFlowers] = useState([])

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
                    <li key={flower.id} className="border m-2">
                        <p>species: {flower.flower?.species}</p>
                        <p>color: {flower.flower?.color}</p>
                        <p>price: {flowerPrices(flower)} </p>
                    </li>
                    )
                })}
            </ul>

            </div>
        </div>
    )
}