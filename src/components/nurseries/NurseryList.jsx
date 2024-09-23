import { useState, useEffect } from "react"
import { getAllNurseries } from "../../services/nurseryServices/nurseryServices"
import { NurseryItem } from "./NurseryItem"

export const NurseryList = () => {
    const [nurseries, setNurseries] = useState([])

    useEffect(() => {
        getAllNurseries().then(array => {
            setNurseries(array)
        })
    }, [])

    return (
        <>
            <h1>Nurseries</h1>
            {nurseries.map(nursery => {
                return (
                    <NurseryItem nursery={nursery} key={nursery.id} />
                )
            })}
        </>
    )
}