import { createBrowserRouter, Outlet } from "react-router-dom";
import LoginSeeker from "../Pages/Seeker/Login";
import SignUpSeeker from "../Pages/Seeker/SignUp";
import HomeSeeker from "../Pages/Seeker/Home";
import NavBar from "../Component/Header/Seeker/NavBar";
import Footer from "../Component/Header/Seeker/Footer"
import NavBarEml from "../Component/Header/Employer/NavBar";
import FooterEml from "../Component/Header/Employer/Footer"
import HomeEmployer from "../Pages/Employer/Home";
import LoginEmployer from "../Pages/Employer/Login";
import SignUpEmployer from "../Pages/Employer/SignUp";
import Home from "../Pages/Site/Home";


const AuthLayout = () =>{
   return (
    <>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </>
   )
};
const AuthLayoutCompany = () =>{
    return (
     <>
         <NavBarEml/>
         <Outlet/>
         <FooterEml/>
     </>
    )
 };
 

export default createBrowserRouter([
    {
        path:'/',
        element:<AuthLayout/>,
        children:[
            {
                path:'/',
                element:<HomeSeeker/>
            },
            {
                path:'/HomeSeeker',
                element:<HomeSeeker/>
            },
            {
                element: <LoginSeeker/>,
                path:'/LoginSeeker'
            },
            {
                element: <SignUpSeeker/>,
                path:'/SignUpSeeker'
            },
        ] 
    },
    {
        path:'/',
        element:<AuthLayoutCompany/>,
        children:[
            {
                path:'/HomeEmployer',
                element:<HomeEmployer/>
            },
            {
                element:<LoginEmployer/>,
                path:'/LoginEmployer'
            },
            {
                element:<SignUpEmployer/>,
                path:'/SignUpEmployer'
            },
        ] 
    },
    
    

])