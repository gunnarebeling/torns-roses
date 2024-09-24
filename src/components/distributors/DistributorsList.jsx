import { useState, useEffect } from "react"
import { getAllDistributors } from "../../services/distributorServices/distributorServices"
import { DistributorsItem } from "./DistributorsItem"

export const DistributorsList = () => {
    const [distributors, setDistributors] = useState([])

    useEffect(() => {
        getAllDistributors().then(array => {
            setDistributors(array)
        })
    }, [])

    return (
        <div className='distributors-list'>
            <h2>Distributors</h2>
            {distributors.map(distributor => {
                return (
                    <DistributorsItem distributor={distributor} key={distributor.id} />
                )
            })}
        </div>
    )
}