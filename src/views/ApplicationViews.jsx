import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../navbar/Navbar"

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
                

            </Route>
        </Routes>
    )
}