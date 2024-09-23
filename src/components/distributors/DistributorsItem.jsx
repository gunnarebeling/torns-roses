import { useState, useEffect } from "react"
import { getDistributorFlowers } from "../../services/distributorServices/distributorServices"

export const DistributorsItem = ({ distributor }) => {
    const [distributorFlowers, setDistributorFlowers] = useState([])

    useEffect(() => {
        getDistributorFlowers(distributor.id).then(distObject => {
            setDistributorFlowers(distObject)
        })
    }, [])

    return (
        <>
        {distributor.name}
        {distributorFlowers.map(flower => {
            console.log(flower)
            return (
                <div>
                    {flower.flower.species}
                </div>
            )
        })}
        </>
    )
}