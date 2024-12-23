import axios from "../axois";


const handleLoginApi = (email, password) => {
    return axios.post("/user/loginUser", { email, password });
  };

const loginGoogle= async(token)=>{
  const response = await axios.post("/user/login-google",{token})
  
  return response;
}