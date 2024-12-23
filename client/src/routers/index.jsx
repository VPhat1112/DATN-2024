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
// import Home from "../Pages/Site/Home";
import DashBoardAdmin from "../Pages/Admin/DashBoardAdmin";
import HomeAdmin from "../Pages/Admin/Page/Home";
import ReportAdmin from "../Pages/Admin/Page/report"
import Company from "../Pages/Admin/Page/Company";
import Specialized from '../Pages/Admin/Page/specialized';
import Personal from '../Pages/Seeker/Personal';
import MyCv from './../Pages/Seeker/Profile/MyCv';
import Cv from './../Pages/Seeker/Profile/Cv';
import EditCv from './../Pages/Seeker/Profile/EditCv';
import CvApply from './../Pages/Seeker/Profile/CvApply';
import DeleteCv from './../Pages/Seeker/Profile/DeleteCv';
import Notification from './../Pages/Seeker/Profile/Notification';
import DashBoard from "../Pages/Employer/Profile/DashBoard";
import Job from "../Pages/Employer/Profile/Job";
import DataJob from "../Pages/Employer/Profile/DataJob";
import DetailJob from "../Pages/Employer/Profile/DetailJob";
import CompanyProfile from "../Pages/Employer/Profile/CompanyProfile";
import CreateJob from "../Pages/Employer/Profile/CreateJob";
import Forget from "../Pages/Site/Forget";
import JobDetail from "../Pages/Site/JobDetail";
import TEstPage from './../Pages/Employer/Profile/test';


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
        path:'/Forget-Password',
        element:<Forget/>
    },
    {
        path:'/',
        element:<AuthLayout/>,
        children:[
            {
                path:'',
                element:<HomeSeeker/>
            },
            {
                path:'/HomeSeeker',
                element:<HomeSeeker/>
            },
            {
                path:`/JobDetail/:jid`,
                element:<JobDetail/>
            },
            {
                element: <LoginSeeker/>,
                path:'/LoginSeeker'
            },
            {
                element: <SignUpSeeker/>,
                path:'/SignUpSeeker'
            },
            {
                element:<Personal/>,
                path:'Profile',
                children:[
                    {
                        path:"MyCv",
                        element:<MyCv/>
                    },
                    {
                        path:"Cv",
                        element:<Cv/>
                    },
                    {
                        path:"EditCv",
                        element:<EditCv/>
                    },
                    {
                        path:"CvApply",
                        element:<CvApply/>
                    },
                    {
                        path:"DeleteCv",
                        element:<DeleteCv/>
                    },
                    {
                        path:"Notification",
                        element:<Notification/>
                    }
                ]
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
                path:'/LoginEmployer',
                element:<LoginEmployer/>
            },
            {
                element:<SignUpEmployer/>,
                path:'/SignUpEmployer'
            },
            {
                element:<DashBoard/>,
                path:'ProfileEml',
                children:[
                    {
                        path:"Jobs",
                        element:<Job/>,
                    },
                    {
                        path:'CreateJob',
                        element:<CreateJob/>
                    },
                    {
                        path:'EmlProfile',
                        element:<CompanyProfile/>
                    },{
                        path:'test',
                        element:<TEstPage/>
                    }
                ]
            }
        ] 
    },
    {
        path:'/admin-DashBoard',
        element:<DashBoardAdmin />,
        children:[
            {
                path:"",
                element:<HomeAdmin/>
            },
            {
                path:"report",
                element:<ReportAdmin/>
            },
            {
                path:"Company",
                element:<Company/>
            },
            {
                path:"Speci",
                element:<Specialized/>
            }
        ]
    }
    
    
    

])