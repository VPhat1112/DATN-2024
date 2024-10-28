import React, { useState } from 'react';
import axios from "../../axios";
import {Link, useNavigate}   from "react-router-dom";
import Swal from "sweetalert2";
function SignUp(props) {
    const[inputs,setInputs]=useState({
        email:"",
        Passwords:"",
        CheckPasword:"",
        nameCompany:"",
        typeCompany:"",
        numberEmployees:"",
        National:"",
        Address:"",
        Company_description:"",
        contactPerson:"",
        phoneContact:"",
    })
    const [err,setError] = useState(null)

    const handleChange = e =>{
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } 

    console.log(inputs)

    const handleSubmitSignUpEml = async (e) =>{
        e.preventDefault();
        try {
            if(inputs.Passwords!=inputs.CheckPasword){
                Swal.fire("Oops!", "Xác nhận mật khẩu không trùng khớp", "error");
                setLoading(false)
            }else{
                const res = await axios.post("/user/registerCompany",inputs)
                navigate('/HomeEmployer')
                
            }
            

        } catch (error) {
            Swal.fire("Oops!", error.response.data, "error");
            setLoading(false)
        }
        
        
    }


    return (
        <form class="row g-2 mx-auto" id="form-company">
            <h4 class="text-center mb-3 title_company">Đăng Ký Tài Khoản Nhà Tuyển Dụng</h4>
            <h6 class="mb-3">1. THÔNG TIN ĐĂNG NHẬP</h6>
            <hr/>
            <div class="col-md "> 
                <label for="validationServer01" class="form-label">Email</label>
                <input name='email' onChange={handleChange} type="text" class="form-control "  required/>
                
            </div>
            <div class="col-md">
                <label for="validationServer02" class="form-label">Mật khẩu</label>
                <input  name='Passwords'  type="password" onChange={handleChange} class="form-control "  required/>
                
            </div>
            <div class="col-md-4 mb-3">
                <label for="validationServer02" class="form-label">Nhập lại mật khẩu</label>
                <input  name='CheckPasword'  type="password" onChange={handleChange} class="form-control "  required/>
                
            </div>

            <h6 class="mb-3">2. THÔNG TIN CÔNG TY</h6>
            <hr/>
            <div class="col-12">
                <label for="validationServer02" class="form-label">Tên công ty</label>
                <input   type="text" class="form-control "  name='nameCompany' onChange={handleChange} required/>
                
            </div>
            <div class="col-12">
                <label for="inputTypeCompany" class="form-label">loại hình công ty</label>
                <select  name='typeCompany' defaultValue={"100% vốn nước ngoài"} onChange={handleChange} id="inputTypeCompany" class="form-select">
                    <option selected>Vui lòng chọn</option>
                    <option value="100% vốn nước ngoài">100% vốn nước ngoài</option>
                    <option value="Cá nhân">Cá nhân</option>
                    <option value="Công ty đa quốc gia">Công ty đa quốc gia</option>
                    <option value="Cổ phần">Cổ phần</option>
                    <option value="Liên doanh">Liên doanh</option>
                    <option value="Nước ngoài">Nước ngoài </option>
                    <option value="Trách nhiệm hữu hạn">Trách nhiệm hữu hạn </option>
                </select>
            </div>
            <div class="col-12">
                <label for="inputNumberEml" class="form-label">Chọn số nhân viên</label>
                <select id="inputNumberEml" class="form-select" name='numberEmployees' defaultValue={"Ít hơn 10"} onChange={handleChange}>
                    <option selected>Chọn số nhân viên</option>
                    <option value="Ít hơn 10">Ít hơn 10</option>
                    <option value="10-20">10-20</option>
                    <option value="25-99">25-99</option>
                    <option value="100-499">100-499</option>
                    <option value="500-999">500-999</option>
                    <option value="1000-4999">1000-4999 </option>
                    <option value="5000-9999">5000-9999 </option>
                </select>
            </div>
            <div class="col-12">
                <label for="inputNational" class="form-label">Chọn Quốc gia</label>
                <select id="inputNational" class="form-select" name='National' defaultValue={"Việt Nam"} onChange={handleChange}>
                    <option selected>Vui lòng chọn quốc gia</option>
                    <option value="Việt Nam">Việt Nam</option>
                    <option value="Nhật Bản">Nhật Bản</option>
                    <option value="Trung Quốc">Trung Quốc</option>
                    <option value="Lào">Lào</option>
                    <option value="Đài Loan">Đài Loan</option>
                </select>
            </div>
            <div class="col-12">
                <label for="validationServer02" class="form-label">Địa chỉ công ty</label>
                <input name='Address' onChange={handleChange} type="text" class="form-control "  required/>
            </div>
            <div class="col-12">
                <label for="validationServer02" class="form-label">Sơ lược công ty </label>
                <input name='Company_description' onChange={handleChange} type="text" class="form-control "  required/>
            </div>
            <div class="col-12">
                <label for="validationServer02" class="form-label">Tên người liên hệ</label>
                <input name='contactPerson' onChange={handleChange} type="text" class="form-control "  required/>
            </div>
            <div class="col-12">
                <label for="validationServer02" class="form-label">Số điện thoại người liên hệ</label>
                <input name='phoneContact' onChange={handleChange} type="text" class="form-control "  required/>
            </div>
            <div class="col-12">
                <div class="form-check">
                <input class="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" aria-describedby="invalidCheck3Feedback" required/>
                <label class="form-check-label" for="invalidCheck3">
                    Agree to terms and conditions
                </label>
                <div id="invalidCheck3Feedback" class="invalid-feedback">
                    You must agree before submitting.
                </div>
                </div>
                {err && <p className="text-center text-danger">{err}</p>}
            </div>
            <div class="col-12">
                <button onClick={handleSubmitSignUpEml} class="btn btn-primary" type="submit">Submit form</button>
            </div>
        </form>
    );
}

export default SignUp;