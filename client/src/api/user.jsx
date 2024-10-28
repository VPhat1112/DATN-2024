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
        url: "/user/loginCompany",
        method: "post",
        data: data,
        withCredentials: true,
});
