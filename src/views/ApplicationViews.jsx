import { Outlet, Route, Routes } from "react-router-dom"

import { Welcome } from "./Welcome"
import { RetailersList } from "../components/retailers/RetailersList"
import { NavBar } from "../components/navbar/Navbar"
import { NursaryList } from "../components/nursaries/NursaryList"
import { Distributors } from "../components/distributors/Distributors"



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
                <Route path='/nursaries' element={<NursaryList />} />
                <Route path='/distributors' element={<Distributors />} />
                  
            </Route>
        </Routes>
    )
}