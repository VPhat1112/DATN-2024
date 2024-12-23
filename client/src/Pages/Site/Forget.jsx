import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Forget.css'
import { apiForgetPass, apiResetPassword } from '../../api/user';
import Swal from 'sweetalert2';

function Forget() {

    const [datareset,setdatareset] = useState({
        token:'',
        email:'',
        newPassword:''
    });
    const [isShow,setisShow] = useState(false);

    const handleChange = (e) =>{
        setdatareset((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // console.log(datareset)

    

    const handleForgetPass = async(e)=>{
        e.preventDefault();
        try {
            const res = await apiForgetPass(datareset);
            console.log(res);
            if(res.data.err=='0'){
                setisShow(!isShow);
                Swal.fire("Đã gửi otp về mail!", res.data.mes, "success");
                setLoading(false)
            }else{
                Swal.fire("Lỗi!", res.data.mes, "error");
                setLoading(false)
            }
        } catch (error) {
            Swal.fire("Lỗi!", error.response.data.mes, "error");
            setLoading(false)
            // console.log(error)
        }
    }

    const handleSubmitResetPass =async(e) =>{
        e.preventDefault();
        try {
            const res = await apiResetPassword(datareset);
            console.log(res);
            if(res.data.err=='0'){
                Swal.fire("Đã thay đổi mật khẩu!", "Bạn đã thay đổi mật khẩu của email bạn thành công", "success");
                navigate('/LoginSeeker')
                setLoading(false)
            }else{
                Swal.fire("Thay đổi mật khẩu!", res.data.mes, "error");
                setLoading(false)
            }
        } catch (error) {
            Swal.fire("Lỗi!", error.response.data, "error");
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div className="container-fluid">
            <form class="mx-auto" id="form-user">
                <h4 class="text-center">Quên mật khẩu</h4>
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

                <div style={{display:isShow?'block':'none'}}>
                    <div class="input-group flex-nowrap" style={{width:"100%"}}>
                        <span class="input-group-text" id="addon-wrapping">OTP</span>
                        <input type="text" name='token' onChange={handleChange} class="form-control" aria-label="Username" aria-describedby="addon-wrapping"/>
                    </div>

                    <div class="input-group flex-nowrap" style={{width:"100%",paddingTop:'20px'}}>
                        <span class="input-group-text" id="addon-wrapping">Mật khẩu mới</span>
                        <input type="password" onChange={handleChange} name='newPassword' class="form-control" aria-label="Username" aria-describedby="addon-wrapping"/>
                    </div>
                    
                    <button
                    type="submit"
                    onClick={handleSubmitResetPass}
                    class="btn btn-primary mt-4"
                    >
                        Submit
                    </button>
                </div>
                


                <button style={{display:isShow?'none':'block'}}
                type="submit"
                onClick={handleForgetPass}
                class="btn btn-primary mt-4"
                >
                    Submit
                </button>


                <hr />
                <div class="mb-3">
                <span className="text-center">
                    Do you have a account? <Link to={"/LoginSeeker"}> SignUp </Link>
                </span>
                </div>

                <div class="d-grid">
                    <button onClick={()=>handleSignInGoogle()}  type="button" class="google-button">
                        {/* <img src={googleLogo} alt="Google Logo" class="google-logo" /> */}
                        {/* <GoogleLogin onSuccess={handleSignInGoogle} onError={handleError}></GoogleLogin> */}
                        {/* <span class="google-text text-center">Google</span> */}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Forget;