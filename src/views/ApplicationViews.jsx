import { Outlet, Route, Routes } from "react-router-dom"

import { Welcome } from "./Welcome"
import { RetailersList } from "../components/retailers/RetailersList"
import { FlowersList } from "../components/flowers/FlowersList"
import { NavBar } from "../components/navbar/Navbar"



export const ApplicationViews = () => {
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
                    <Route index element={<Welcome/>}/>
                    <Route path="retailers" element={<RetailersList/>}/>
                    <Route path="flowers" element={<FlowersList/>}/>
                

            </Route>
        </Routes>
    )
}