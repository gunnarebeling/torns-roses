import { useState, useEffect } from "react"
import { getDistributorFlowers } from "../../services/distributorServices/distributorServices"
import { getDistributorRetailers } from "../../services/distributorServices/distributorServices"

export const DistributorsItem = ({ distributor }) => {
    const [distributorFlowers, setDistributorFlowers] = useState([])
    const [distributorRetailers, setDistributorRetailers] = useState([])

    useEffect(() => {
        getDistributorFlowers(distributor.id).then(distObject => {
            setDistributorFlowers(distObject)
        })
    }, [])

    useEffect(() => {
        getDistributorRetailers(distributor.id).then(distObject => {
            setDistributorRetailers(distObject)
            console.log(distObject)
        })
    }, [])

    return (
        <div className='distributors-item' key={distributor.id}>
            {distributor.name}
            <div className='flower-groups'>
            {distributorFlowers.map(flower => {
                return (
                    <div className='card'>
                        <h5>{flower.flower.species}</h5>
                        <p>Color: {flower.flower.color}</p>
                        <p>Price: ${(flower.price + (flower.price * flower.distributor.markup)).toFixed(2)}</p>
                    </div>
                )
            })}
            </div>
            <div className='distributor-retailers'>
                <h6>These retailers buy from us:</h6>
                {distributorRetailers.map(retailer => {
                    return (
                        <div>
                            {retailer.businessName}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}