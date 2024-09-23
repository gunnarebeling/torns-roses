import { useEffect } from "react"
import { useState } from "react"
import { getAllRetailers } from "../../services/retailerServices/retailerServices"

export const RetailersList = () => {
    const [retailerList, setRetailerList] = useState([])

    useEffect(() => {
        getAllRetailers().then(res => {
            setRetailerList(res)
        })
    }, [])
    return (
        <div>
            <div className="header p-3">
                <header className="display-6 text-center ">Retailers</header>
            </div>
            <ul className="retailer-container list-unstyled">
                {retailerList?.map(retailer => {
                    return (
                        
                            <li className="border m-3 rounded p-2 text-center" key={retailer.id}>
                                <header> {retailer.businessName}</header>
                                <p>{retailer.address}</p>
                            </li>   
                        
                    )
                })}
            </ul>
        </div>
    )
}