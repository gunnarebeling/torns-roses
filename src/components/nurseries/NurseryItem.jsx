import { useState, useEffect } from "react"
import { getNurseryFlowers } from "../../services/nurseryServices/nurseryServices"
import { getNurseryDistributors } from "../../services/nurseryServices/nurseryServices"
import "./Nursery.css"

export const NurseryItem = ({ nursery }) => {
    const [flower, setFlower] = useState([])
    const [distributors, setDistributors] = useState([])

    useEffect(() => {
        getNurseryFlowers(nursery.id).then(flowers => {
            setFlower(flowers)
            console.log(nursery)
        })
    }, [nursery.id])

    useEffect(() => {
        getNurseryDistributors(nursery.id).then(distributors => {
            setDistributors(distributors)
        })
    }, [nursery.id])

    return (
        <div className='nursery-list mx-auto my-5'>
            <h3 className="text-center mt-3">{nursery.businessName}</h3>
            <div className="d-flex flex-wrap justify-content-center">
                {flower.map(item => {
                    return (
                        <div key={item.id} className='flower-item m-2 p-3'>
                            <h5>{item.flower.species}</h5>
                            <p>Color: {item.flower.color}</p>
                            <p className="price fw-bold">${item.price.toFixed(2)}</p>
                        </div>
                    )
                })}
            </div>
            {distributors.map(item => {
                return (
                    <div key={item.id} className='distributor-item mb-3'>
                        <p className="text-center">Distributors:</p>
                        <h6 className="text-center mb-4">{item.distributor.name}</h6>
                    </div>
                )
            })}
        </div>
    )
}