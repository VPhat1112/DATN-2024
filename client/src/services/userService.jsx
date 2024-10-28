import axios from "../axois";


const handleLoginApi = (email, password) => {
    return axios.post("/user/loginUser", { email, password });
  };