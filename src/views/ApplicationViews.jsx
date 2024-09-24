import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "./Welcome"
import { RetailersList } from "../components/retailers/RetailersList"
import { NavBar } from "../components/navbar/NavBar.jsx"
import { Footer } from "../components/footer/Footer" 
import { NurseryList } from "../components/nurseries/NurseryList"
import { DistributorsList } from "../components/distributors/DistributorsList"
import { RetailerDetails } from "../components/retailers/RetailerDetails"



export const ApplicationViews = () => {
    return(
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar/>
                        <Outlet/>
                        <Footer />
                    </>
                }>
      
                <Route index element={<Welcome/>} />
                <Route path='/nurseries' element={<NurseryList />} />
                <Route path='/distributors' element={<DistributorsList />} />
                <Route path="/retailers">
                    <Route index element={<RetailersList/>} />
                    <Route path=":retailerId" element={<RetailerDetails/>}/>
                </Route>
                
            </Route>
        </Routes>
    )
}