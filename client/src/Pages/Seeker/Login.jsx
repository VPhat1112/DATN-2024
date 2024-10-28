import React, { useContext, useState } from "react";
import googleLogo from "../../assets/images/google-logo.svg";
import {Link, useNavigate}   from "react-router-dom";
import axios from "../../axios";
import * as actions from "../../store"
import {apiLogin} from "../../api";
import { useGoogleAuth } from "../../containers/Auth/resources/googleAuth";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

function Login(props) {
    // const [email, setEmail] = useState("");
    // const [Passwords, setPasswords] = useState("");
    // const [isShowPassword, setIsShowPassword] = useState(false);

    const[inputs,setInputs]=useState({
        email:"",
        Passwords:"",
    })
    // const [isForgotPassword, setIsForgotPassword] = useState(false);

    const  signIn  = useGoogleAuth();


    const navigate = useNavigate()

    const {loginUSer} =useContext(AuthContext);
    // console.log("Current User"+currentUser)

    // const { isLoggedIn} = useSelector((state) => ({
    //     isLoggedIn: state.user.isLoggedIn,
    // }));

    // const dispatch=useDispatch()

    // useEffect(() => { 
    //     if(isLoggedIn){
    //         navigate("/HomeSeeker")
    //     }
    // }, [isLoggedIn]);

    const refreshTokenSetup = (res)=>{
        let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    
        const refreshToken = async ()=>{
            const newAuthRes = await res.reloadAuthResponse();
            refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    
            setTimeout(refreshToken,refreshTiming);
        }
    }



    const handleChange = e =>{
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } 


    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
        handleLogin();
        }
    };

    // console.log(inputs);

    // const handleShowHidePassword = () => {
    //     setIsShowPassword(!isShowPassword);
    // };

    const handleSubmitLogin = async (e) =>{
        e.preventDefault();
        try {
            const res = await loginUSer(inputs)
            // const res = await apiLogin(inputs)
            // console.log(res.data.userData)
            navigate("/HomeSeeker")
        } catch (error) {
            Swal.fire("Oops!", error.response.data.mes, "error");
            setLoading(false)
        }
        
    }

    // const handleSignInGoogle = async () => {
    //     // setErrMessage("")
    //     try {
    //         const googleUser = await signIn() // if you need immediate access to `googleUser`, get it from signIn() directly
    //         if(googleUser) refreshTokenSetup(googleUser)
    //         if(googleUser) {
    //             let data = await axios.post("/user/login-google",googleUser) 
    
    //             if (data && data.errCode === 0) {
    //                 navigate(`/HomeSeeker`);
    //                 dispatch(actions.userLoginSuccess(data.user));
    //         }
    
    //         }
    //     } catch (error) {
    //         if (error.response) {
    //             if (error.response.data) {
    //                 setErrMessage(error.response.data.message)
    //             }
    //         }
    //     }
    // }

    return (
        <div className="container-fluid">
        <form class="mx-auto" id="form-user">
            <h4 class="text-center">LOGIN FOR SEEKER</h4>
            <div class="mb-3">
            <label for="email" class="form-label tx-color">
                Email
            </label>
            <input
                required
                type="email"
                class="form-control"
                name="email"
                onChange={handleChange}
                aria-describedby="emailHelp"
            />
            </div>
            <div class="mb-3">
            <label for="Passwords" class="form-label tx-color">
                Password
            </label>
            <input
                required
                type="password"
                class="form-control"
                name="Passwords"
                onChange={handleChange}
            />
            </div>

            {/* <div class="mb-3 form-check">
                    <input
                        type="checkbox"
                        onClick={
                        handleShowHidePassword()
                        }
                        onKeyDown={handleKeyDown}
                        class="form-check-input"
                        id="exampleCheck1"
                    />
                    <label class="form-check-label" for="exampleCheck1">
                        Show Password
                    </label>
                </div> */}

            <div class="mb-3">
                <a href="" id="emailHelp" class=" tx-color">
                    forget Password?
                </a>
            </div>
            <button
            type="submit"
            onClick={handleSubmitLogin}
            class="btn btn-primary mt-4"
            >
                Submit
            </button>


            <hr />
            <div class="mb-3">
            <span className="text-center">
                Do you have a account? <Link to={"/SignUpSeeker"}> SignUp </Link>
            </span>
            </div>

            <div class="mb-3 d-grid">
            <button  type="button" class="google-button ">
                <img src={googleLogo} alt="Google Logo" class="google-logo" />
                <span class="google-text text-center">Google</span>
            </button>
            </div>
        </form>
        </div>
    );
    }

export default Login;
