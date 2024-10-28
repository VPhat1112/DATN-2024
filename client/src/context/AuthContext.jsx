import {createContext, useEffect, useState} from "react";
import {apiLogin, apiLoginCompany, apiLogout} from "../api";
import {Link, useNavigate}   from "react-router-dom";
import axios from "./../axios";
export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser,setCurrentUser] =useState(JSON.parse(localStorage.getItem("user"))||null)
    const [currentCompany,setCurrentCompany] =useState(JSON.parse(localStorage.getItem("Company"))||null)

    const loginCompany= async(inputs)=>{
        const res=await apiLoginCompany(inputs);
        setCurrentCompany(res.data.userData)
    }

    const loginUSer= async(inputs)=>{
        const res = await apiLogin(inputs);
        // console.log("check data"+res.data.userData)
        setCurrentUser(res.data.userData)
    }

    const logoutUSer= async(inputs)=>{
        await axios.post("/user/Logout");
        setCurrentUser(null)
    }
    
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
        localStorage.setItem("Company",JSON.stringify(currentCompany))
    },[currentUser,currentCompany])


    return(
        <AuthContext.Provider value={{currentUser,loginUSer,logoutUSer,loginCompany,currentCompany}}>{children}</AuthContext.Provider>
    )
}