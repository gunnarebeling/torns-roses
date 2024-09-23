import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../navbar/Navbar"
import { Welcome } from "./Welcome"
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
                

            </Route>
        </Routes>
    )
}