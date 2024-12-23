import {createContext, useEffect, useState} from "react";
import {apiLogin, apiLoginCompany} from "../api";
import {Link, useNavigate}   from "react-router-dom";
import axios from "./../axios";
export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser,setCurrentUser] =useState(JSON.parse(localStorage.getItem("user"))||null)
    const [currentCompany,setCurrentCompany] =useState(JSON.parse(localStorage.getItem("Company"))||null)

    const loginCompany= async(inputs)=>{
        const res=await apiLoginCompany(inputs);
        console.log(res)
        if(res.data.userData.role=="R0"){
            console.log("check data"+res.data.userData);
            return res;
        }else{
            setCurrentCompany(res.data.userData)
            return res;
        }
    }

    const loginGoogle= async(tokenID)=>{
        const response = await axios.post("/user/login-google",{tokenID})
        console.log(response);
        if(response.data.userData.role=="R0"){
            console.log("check data"+response.data.userData);
            return response;
        }else if(response.data.userData.role=="R2"){
            setCurrentUser(response.data.userData);
            return response;
        }else if(response.data.userData.role=="R3"){
            setCurrentCompany(response.data.userData);
            return response;
        }
        // return response;
    }

    const loginUSer= async(inputs)=>{
        const res = await apiLogin(inputs);
        if(res.data.userData.role=="R0"){
            console.log("check data"+res.data.userData);
            return res;
        }else{
            setCurrentUser(res.data.userData);
            return res;
        }
        console.log("check data"+res)
    }

    const logoutUSer= async(inputs)=>{
        await axios.post("/user/Logout");
        setCurrentUser(null)
        setCurrentCompany(null)
    }
    
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
        localStorage.setItem("Company",JSON.stringify(currentCompany))
    },[currentUser,currentCompany])


    return(
        <AuthContext.Provider value={{currentUser,loginUSer,logoutUSer,loginCompany,loginGoogle,currentCompany}}>{children}</AuthContext.Provider>
    )
}