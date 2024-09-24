import { useEffect } from "react"
import { useState } from "react"
import { getAllRetailers } from "../../services/retailerServices/retailerServices"
import { useNavigate } from "react-router-dom"

export const RetailersList = () => {
    const [retailerList, setRetailerList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllRetailers().then(res => {
            setRetailerList(res)
        })
    }, [])
    const handleRetailerClick = (event) => {
        event.preventDefault()
        const retailer = event.target
        navigate(`${retailer.dataset.id}`)
    }
    return (
        <div>
            <div className="header p-3">
                <header className="display-6 text-center ">Retailers</header>
            </div>
            <ul className="retailer-container list-unstyled">
                {retailerList?.map(retailer => {
                    return (
                        
                            <li className="border m-3 rounded p-2 text-center"  key={retailer.id} >
                                <header data-id={`${retailer.id}`} onClick={handleRetailerClick}> {retailer.businessName}</header>
                                <p>{retailer.address}</p>
                            </li>   
                        
                    )
                })}
            </ul>
        </div>
    )
}