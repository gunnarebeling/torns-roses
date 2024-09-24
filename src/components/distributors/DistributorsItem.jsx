import { useState, useEffect } from "react"
import { getDistributorFlowers, getDistributorRetailers } from "../../services/distributorServices/distributorServices"
import "./Distributor.css"

export const DistributorsItem = ({ distributor }) => {
    const [distributorFlowers, setDistributorFlowers] = useState([])
    const [distributorRetailers, setDistributorRetailers] = useState([])

    useEffect(() => {
        getDistributorFlowers(distributor.id).then(flowers => {
            setDistributorFlowers(flowers)
        })
    }, [distributor.id])

    useEffect(() => {
        getDistributorRetailers(distributor.id).then(retailers => {
            setDistributorRetailers(retailers)
        })
    }, [distributor.id])

    return (
        <div className='distributor-list mx-auto my-5'>
            <h3 className="text-center mt-3">{distributor.name}</h3>
            <div className="d-flex flex-wrap justify-content-center">
                {distributorFlowers.map(item => {
                    return (
                        <div key={item.id} className='flower-item m-2 p-3'>
                            <h5>{item.flower.species}</h5>
                            <p>Color: {item.flower.color}</p>
                            <p className="price fw-bold">${(item.price + (item.price * item.distributor.markup)).toFixed(2)}</p>
                        </div>
                    )
                })}
            </div>
            <div className="retailer-item mb-3">
                <p className="text-center">These retailers buy from us:</p>
                <div className="d-flex justify-content-center align-items-center">
                    {distributorRetailers.map((item, index) => (
                        <span key={item.id} className="mx-2">
                            {item.businessName}
                            {index < distributorRetailers.length - 1 && <span className="mx-1">-</span>}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
