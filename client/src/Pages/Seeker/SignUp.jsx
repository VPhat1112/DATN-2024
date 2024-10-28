import React, { useState } from 'react';
import googleLogo from '../../assets/images/google-logo.svg';
import Login from './../Employer/Login';
import {Link, useNavigate}   from "react-router-dom";
import axios from "../../axios";
import Swal from "sweetalert2";

function SignUp(props) {
    const[inputs,setInputs]=useState({
        email:"",
        Passwords:"",
        firstName:"",
        lastName:"",
        SDT:""
    })

    const navigate = useNavigate()

    // const [err,setError] = useState(null)
    // const [isShowPassword, setIsShowPassword] = useState(false);

    // console.log(inputs)

    const handleChange = e =>{
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } 
    // const handleKeyDown = (event) => {
    //     if (event.key === "Enter") {
    //         handleSignUpUSer();
    //     }
    // };

    const handleSubmitSignUp = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post("/user/register",inputs)
            navigate('/LoginSeeker')

        } catch (error) {
            Swal.fire("Oops!", error.response.data, "error");
            setLoading(false)
            // setError(error.response.data)
        }
        
    }
    // const handleShowHidePassword = () => {
    //     setIsShowPassword(!isShowPassword);
    // };

    // console.log(inputs);


    return (
        <div className='container-fluid'>
            <form class="mx-auto row g-3" id='form-user'>
                <h4 class="text-center">SIGNUP FOR SEEKER</h4>
                <div class="col-md-4">
                    <label for="firstName" class="form-label">Họ</label>
                    <input required 
                    type="text" 
                    class="form-control" 
                    placeholder="Enter your first name" 
                    name='firstName'
                    onChange={handleChange}/>
                </div>
                <div class="col-md-4">
                    <label for="lastName" class="form-label">Tên</label>
                    <input required 
                    type="text" 
                    class="form-control" 
                    placeholder="Enter your last name" 
                    name='lastName'
                    onChange={handleChange}/>
                </div>
                <div class="col-md-4">
                    <label for="SDT" class="form-label">Số điện thoại</label>
                    <input required  
                    type="tel" 
                    class="form-control" 
                    name='SDT' 
                    onChange={handleChange}
                    placeholder="Enter your phone number"/>
                </div>
                <div class="col-12">
                    <label for="email" class="form-label">Email</label>
                    <input required 
                    type="email" 
                    class="form-control" 
                    placeholder="...@gmail.com" 
                    name="email"
                    onChange={handleChange} />
                </div>
                <div class="col-12">
                    <label for="Passwords" class="form-label">Password</label>
                    <input required 
                    type="password"
                    class="form-control" 
                    placeholder="Enter your password"  
                    name='Passwords'
                    onChange={handleChange}/>
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
                <div class="col-12">
                    <div class="mb-3">
                        <span className='text-center'>
                            Do you have a account?   
                            <Link to={"/LoginSeeker"}>Login</Link>
                        </span>
                    </div>
                </div>
                <div class="col-12">
                    <button onClick={handleSubmitSignUp}  type="submit" class="btn btn-primary">Sign in</button>
                </div>
                {/* {err && <p className="text-center text-danger">{err}</p>} */}
                <hr/>
                <div class="col-12 d-grid">
                    <button  type="button" class="google-button ">
                        <img src={googleLogo} alt="Google Logo" class="google-logo"/>
                        <span class="google-text text-center">Google</span>
                    </button>   
                </div>
            </form>
        </div>
    );
}

export default SignUp;