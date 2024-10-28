import React, { useContext, useState } from "react";
import {Link, useNavigate}   from "react-router-dom";
import googleLogo from "../../assets/images/google-logo.svg";
import axios from "../../axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
function Login(props) {

    const[inputs,setInputs]=useState({
        email:"",
        Passwords:"",
    })

    const navigate = useNavigate()

    const {loginCompany} =useContext(AuthContext);

    const handleChange = e =>{
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } 

    // const [err,setError] = useState(null)

    const handleSubmitLogin = async (e) =>{
        e.preventDefault();
        try {
            const res = await loginCompany(inputs)
            console.log(res)
            // dispatch(actions.userLoginSuccess(res.userData));
            navigate("/HomeEmployer")
        } catch (error) {
            Swal.fire("Oops!", error.response.data.mes, "error");
            setLoading(false)
        }
        
    }

    return (
        <div className="container-fluid">
        <form class="mx-auto" id="form-user">
            <h4 class="text-center">LOGIN FOR EMPLOYER</h4>
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

            {/* {err && <p className="text-center text-danger">{err}</p>} */}

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