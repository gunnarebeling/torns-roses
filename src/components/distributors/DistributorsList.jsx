import { useState, useEffect } from "react"
import { getAllDistributors } from "../../services/distributorServices/distributorServices"
import { DistributorsItem } from "./DistributorsItem"
import "./Distributor.css"

export const DistributorsList = () => {
    const [distributors, setDistributors] = useState([])

    useEffect(() => {
        getAllDistributors().then(array => {
            setDistributors(array)
        })
    }, [])

    return (
        <div className='distributors  mt-5 pt-5'>
            <h1 className="text-center mb-3 mt-5">- Distributors -</h1>
            {distributors.map(distributor => {
                return (
                    <DistributorsItem distributor={distributor} key={distributor.id} />
                )
            })}
        </div>
    )
}