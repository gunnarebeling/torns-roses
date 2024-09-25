import { useState, useEffect } from "react"
import { getAllNurseries } from "../../services/nurseryServices/nurseryServices"
import { NurseryItem } from "./NurseryItem"
import "./Nursery.css"

export const NurseryList = () => {
    const [nurseries, setNurseries] = useState([])

    useEffect(() => {
        getAllNurseries().then(array => {
            setNurseries(array)
        })
    }, [])

    return (
        <div className="nurseries mt-5 pt-5">
            <h1 className="text-center mb-3 mt-5">- Nurseries -</h1>
            {nurseries.map(nursery => {
                return (
                    <NurseryItem nursery={nursery} key={nursery.id} />
                )
            })}
        </div>
    )
}