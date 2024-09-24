import { useState, useEffect } from "react"
import { getNurseryFlowers } from "../../services/nurseryServices/nurseryServices"
import { getNurseryDistributors } from "../../services/nurseryServices/nurseryServices"
import { getDistributorFlowers } from "../../services/distributorServices/distributorServices"


export const NurseryItem = ({ nursery }) => {
    const [flower, setFlower] = useState([])
    const [distributors, setDistributors] = useState([])
    useEffect(() => {
        getDistributorFlowers(nursery.id).then(flowers => {
            setFlower(flowers)
            console.log(nursery)
        })
    }, [])

    useEffect(() => {
        getNurseryDistributors(nursery.id).then(distributors => {
            setDistributors(distributors)
        })
    }, [])

    return (
        <div className='nursery-list'>
            <h2>Nursery: {nursery.businessName}</h2>
            {flower.map(item => {
                return (
                    <div key={item.id} className='card flower-item'>
                        <div>
                            <h5>{item.flower.species}</h5>
                            <p>Color: {item.flower.color}</p>
                            <p>Price: ${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                )
            })}
            {distributors.map(item => {
                return (
                    <div key={item.id} className='distributor-item'>
                        Distributors who buy from us
                        <h5>{item.distributor.name}</h5>
                    </div>
                )
            })}
        </div>
    )
}