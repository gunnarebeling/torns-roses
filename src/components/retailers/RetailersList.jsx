import { useEffect } from "react"
import { useState } from "react"
import { getAllRetailers } from "../../services/retailerServices/retailerServices"
import { useNavigate } from "react-router-dom"
import "./Retailer.css";

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
        <div className="mt-5 pt-5">
            <div className="header p-3">
                <header className="display-6 text-center ">- Retailers -</header>
            </div>
            <ul className="retailer-container list-unstyled mx-auto w-50">
                {retailerList?.map(retailer => {
                    return (
                        
                            <li className="border m-3 rounded p-2 text-center retailer-card mx-auto w-50"  key={retailer.id} >
                                <h3 className="singleRetailer mb-0 mt-3" data-id={`${retailer.id}`} onClick={handleRetailerClick}> {retailer.businessName}</h3>
                                <p>{retailer.address}</p>
                            </li>   
                        
                    )
                })}
            </ul>
        </div>
    )
}