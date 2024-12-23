import axios from "../axios";

export const apiLogin = (data) =>
    axios({
        url: "/user/loginUser",
        method: "post",
        data: data,
        withCredentials: true,
});

export const apiLogout = () =>{
    axios({
        url: "/user/logout",
        method: "post",
        withCredentials: true
    })
}

export const apiLoginCompany = (data) =>
    axios({
        url: "http://localhost:8080/api/v1/user/loginCompany",
        method: "post",
        data: data,
        withCredentials: true,
});

export const apiForgetPass = (data)=>
    axios({
        url:"/user/forgotpassword",
        method:"post",
        data:data
    })

export const apiResetPassword = (data)=>
    axios({
        url:"/user/resetpassword",
        method:"put",
        data:data
    })

export const apiGetCvByUser = (id) =>
    axios({
        url:`/get-cv-by-id/${id}`,
        method:"get",
        data:Response
    })
export const apigetCurrent = (id) =>
    axios({
        url:`/user/get-current-user/${id}`,
        method:"get",
        data:Response
    })

export const apiUpdateUSer = (uid,data)=>
    axios({
        url:`/user/update-user/${uid}`,
        method:"put",
        data:data
    })

export const getAllCv = (seekerid) =>
    axios({
        url:`/cv/${seekerid}`,
        method:"get",
        data:Response
    })

export const getNotification = (account_id)=>
    axios({
        url:`/notifi/${account_id}`,
        method:"get",
        data:Response
    })

export const apiUpdateSeeker = (Uid,data) =>
    axios({
        url:`/user/update-seeker/${Uid}`,
        method:"put",
        data:data
    })
