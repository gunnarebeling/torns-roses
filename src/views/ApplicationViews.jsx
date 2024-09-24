import { Outlet, Route, Routes } from "react-router-dom"

import { Welcome } from "./Welcome"
import { RetailersList } from "../components/retailers/RetailersList"
import { NavBar } from "../components/navbar/Navbar"
import { NurseryList } from "../components/nurseries/NurseryList"
import { DistributorsList } from "../components/distributors/DistributorsList"
import { RetailerDetails } from "../components/retailers/RetailerDetails"
import { ShoppingCart } from "../components/shoppingCart/ShoppingCart"
import { useEffect, useState } from "react"



export const ApplicationViews = () => {
   const [currentUser, setCurrentUser] = useState(0)
   useEffect(() => {
    const currentUserObj = localStorage.getItem('thorns_roses_user')
    const parsedCurrentUser = JSON.parse(currentUserObj)
    const currentUserId = parseInt(parsedCurrentUser.id)
    setCurrentUser(currentUserId)
    }, [])
   useEffect
    return(
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar/>
                        <Outlet/>
                    </>
                }>
      
                <Route index element={<Welcome/>} />
                <Route path='/nursaries' element={<NurseryList />} />
                <Route path='/distributors' element={<DistributorsList />} />
                <Route path="/retailers">
                    <Route index element={<RetailersList/>} />
                    <Route path=":retailerId" element={<RetailerDetails currentUser={currentUser}/>}/>
                </Route>
                <Route path="shoppingcart" element={<ShoppingCart currentUser={currentUser}/>}/>
                
            </Route>
        </Routes>
    )
}