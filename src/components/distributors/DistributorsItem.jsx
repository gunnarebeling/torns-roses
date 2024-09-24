import { useState, useEffect } from "react"
import { getDistributorFlowers } from "../../services/distributorServices/distributorServices"
import { getDistributorRetailers } from "../../services/distributorServices/distributorServices"
import { getAllNurseryFlowers } from "../../services/nurseryServices/nurseryServices"

export const DistributorsItem = ({ distributor }) => {
    const [distributorFlowers, setDistributorFlowers] = useState([])
    const [distributorRetailers, setDistributorRetailers] = useState([])
    const [nurseryFlowers, setNurseryFlowers] = useState([])

    useEffect(() => {
        getDistributorFlowers(distributor.id).then(distObject => {
            setDistributorFlowers(distObject)
        })
        getAllNurseryFlowers().then(res => {
            setNurseryFlowers(res)
        })
    }, [])

    useEffect(() => {
        getDistributorRetailers(distributor.id).then(distObject => {
            setDistributorRetailers(distObject)
            console.log(distObject)
        })
    }, [])
    const flowerPrice = (flower) => {
        const flowerPrice =  nurseryFlowers.find( nursFlower => nursFlower.nurseryId === flower.nurseryId && nursFlower.flowerId === flower.flowerId)
        const price =  flowerPrice?.price
        
        return price
    }

    return (
        <div className='distributors-item' key={distributor.id}>
            {distributor.name}
            <div className='flower-groups'>
            {distributorFlowers.map(flower => {
                return (
                    <div className='card' key={flower.id}>
                        <h5>{flower.flower.species}</h5>
                        <p>Color: {flower.flower.color}</p>
                        <p>Price: ${(flowerPrice(flower) * (1 + flower.distributor.markup)).toFixed(2)}</p>
                    </div>
                )
            })}
            </div>
            <div className='distributor-retailers'>
                <h6>These retailers buy from us:</h6>
                {distributorRetailers.map(retailer => {
                    return (
                        <div key={retailer.id}>
                            {retailer.businessName}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}