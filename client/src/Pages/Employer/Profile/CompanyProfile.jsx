import React, { useContext, useEffect, useRef, useState } from 'react';
// import './DashBoard.css'
import './CompanyProfile.css'
import { apigetCurrent, apiUpdateUSer } from '../../../api/user';
import Swal from 'sweetalert2';
import { apiAllSpe } from '../../../api/Admin';
import { AuthContext } from '../../../context/AuthContext';
function CompanyProfile() {
    const {currentCompany} =useContext(AuthContext);
    const btnInfor= document.getElementById('btn-infor');
    const btnContact= document.getElementById('btn-contact');
    const divInfor = document.getElementById('Information');
    const divContact = document.getElementById('Contact')
    const closeModalRef = useRef(null);

    
    const[InforCompany,setInforCompany] = useState({});
    // const [Loading, setLoading] = useState(true);

    const [inputs,setInputs] = useState({
        nameCompany:currentCompany.Company.nameCompany,
        typeCompany:currentCompany.Company.typeCompany,
        numberEmployees:currentCompany.Company.numberEmployees,
        National:currentCompany.Company.National,
        Address:currentCompany.Company.Address,
        Company_description:currentCompany.Company.Company_description,
        contactPerson:currentCompany.Company.contactPerson,
        phoneContact:currentCompany.Company.phoneContact,
        image:currentCompany.Company.image,
    });
    
    
    // const Company = JSON.parse(localStorage.getItem('Company'))

    // console.log(Company.id)
    
    console.log(InforCompany)

    const fetchCompany = async() =>{
        try {
            const id = currentCompany.Company.id;
            const response = await apigetCurrent(id);
            
            setInforCompany(response.data);
        } catch (error) {
            console.log(error)
        }
    }    

    const handleChange = e =>{
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } 

    const handleSubmitUpdate = async (e) =>{
        e.preventDefault();
        try {
            const res = await apiUpdateUSer(currentCompany.id,inputs);
            console.log(res)
            Swal.fire("Cập nhật thành công!", "Cập nhật thành công thông tin công ty", "success");
            fetchCompany();
            closeModalRef.current.click();
            localStorage.setItem('Company', JSON.parse(res.response));
            setLoading(false)
        } catch (error) {
            console.log(error)
            // Swal.fire("Oops!", error.data.mes, "error");
            // setLoading(false)
            // setError(error.response.data)
        }
        
    }

    const showDiv = async(divToShow) =>{
        divInfor.style.display = 'none';
        divContact.style.display = 'none';
        divToShow.style.display = 'block';
    }

    const btninfor= async() =>{
        showDiv(divInfor);
        btnInfor.classList.add('activeProfile');
        btnContact.classList.remove('activeProfile');
    }

    const btncontact= async() =>{
        showDiv(divContact);
        btnContact.classList.add('activeProfile');
        btnInfor.classList.remove('activeProfile');
    }
    useEffect(()=>{
        
        fetchCompany()
        // console.log(`test nahs`+test)
        },[])

    
    return (
        <div className='container-fluid bg-profile p-4'>
            {InforCompany.response && (<>
                <div className='content-inner'>
                <div className='container-fluid'>
                    
                <div className=' g-3 my-2 p-3 bg-white rounded'>
                        <div className='row'>
                            <div className='col-3'>
                                <h3>Thông Tin Tài Khoản</h3>
                            </div>
                        </div>

                        <ul class="nav nav-tabs" role="tablist">
                            <li onClick={()=>btninfor()} class="nav-item" role="presentation">
                            <a class="nav-link active" data-bs-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">
                                <i class="bi bi-person"></i> Thông tin công ty
                            </a>
                            </li>
                            <li onClick={()=>btncontact()}  class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="false">
                                <i class="bi bi-file-earmark-person"></i> Thông tin liên hệ
                            </a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" href="#address" role="tab" aria-controls="address" aria-selected="false">
                                    <i class="bi bi-house"></i> Thông tin liên hệ
                                </a>
                            </li>
                        </ul>

                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            </div>
                            <div class="tab-pane fade" id="info" role="tabpanel" aria-labelledby="info-tab">
                            </div>
                        </div>
                        <div id='Information' className='content row border border-black m-0'>
                            <div className='p-2'>
                                <h6>Chỉnh sửa thông tin công ty</h6>
                            </div>
                            <div className='row'>
                                <div className='row p-2'>
                                    <div className='col-2'>
                                        <b>Tên công ty</b>
                                    </div>
                                    <div className='col-2'>
                                        <i>{InforCompany.response.Company.nameCompany}</i>
                                    </div>
                                    <div className='col-2'>
                                        <b>Loại công ty</b>
                                    </div>
                                    <div className='col-2'>
                                        <i>
                                            {InforCompany.response.Company.typeCompany}
                                            {/* Loại công ty */}
                                        </i>
                                    </div>
                                    <div className='col-2'>
                                        <i className='bi bi-pen text-primary-emphasis'><a href='' data-bs-toggle="modal" data-bs-target="#updateModalInfor" >Sửa thông tin</a></i>
                                    </div>
                                </div>
                                <div className='row p-2'>
                                    <div className='col-2'>
                                        <b>Số nhân viên</b>
                                    </div>
                                    <div className='col-2'>
                                        <i>
                                        {InforCompany.response.Company.numberEmployees}
                                        {/* Số nhân viên */}
                                        </i>
                                    </div>
                                    <div className='col-2'>
                                        <b>Quốc tịch</b>
                                    </div>
                                    <div className='col-2'>
                                        <i>
                                            {InforCompany.response.Company.National}
                                            {/* Quốc tịch */}
                                        </i>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div id='Contact' style={{display:'none'}} className='row border border-black m-0'>
                            <div className='p-2'>
                                <h6>Chỉnh sửa thông tin liên hệ</h6>
                            </div>
                            <div className='row'>
                                <div className='row p-2'>
                                    <div className='col-2'>
                                        <b>Tên Nhân viên liên hệ </b>
                                    </div>
                                    <div className='col-2'>
                                        <i>{InforCompany.response.Company.contactPerson}</i>
                                    </div>
                                    <div className='col-2'>
                                        <b>Số điện thoại </b>
                                    </div>
                                    <div className='col-2'>
                                        <i>{InforCompany.response.Company.phoneContact}</i>
                                    </div>
                                    <div className='col-2'>
                                        <i className='bi bi-pen text-primary-emphasis'><a href='' data-bs-toggle="modal" data-bs-target="#updateModalContact" >Sửa thông tin</a></i>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    {/* Model-Update */}
                    <div  class="modal fade" id="updateModalInfor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Chỉnh sửa thông tin công ty</h1>
                                <button  type="button" 
                                    ref={closeModalRef} 
                                    class="btn-close" 
                                    data-bs-dismiss="modal" 
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="nameCompany" class="form-label">Tên công ty</label>
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        defaultValue={InforCompany.response.Company.nameCompany}
                                        name='Specialized_name'
                                        class="form-control"
                                        id="Specialized_name"
                                    />
                                </div>
                                <div class="col-12">
                                    <label for="inputTypeCompany" class="form-label">loại hình công ty</label>
                                    <select  name='typeCompany' 
                                    defaultValue={InforCompany.response.Company.typeCompany} 

                                    onChange={handleChange} 
                                    id="inputTypeCompany" class="form-select">
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
                                    <label for="inputNumberEml" class="form-label"> Số nhân viên</label>
                                    <select id="inputNumberEml" class="form-select" 
                                    name='numberEmployees' 
                                    defaultValue={InforCompany.response.Company.numberEmployees} 
                                    onChange={handleChange}
                                    >
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
                                    <select id="inputNational" class="form-select" name='National' 
                                    defaultValue={InforCompany.response.Company.numberEmployees} 
                                    onChange={handleChange}
                                    >
                                        <option value="Việt Nam">Việt Nam</option>
                                        <option value="Nhật Bản">Nhật Bản</option>
                                        <option value="Trung Quốc">Trung Quốc</option>
                                        <option value="Lào">Lào</option>
                                        <option value="Đài Loan">Đài Loan</option>
                                    </select>
                                </div>
                                <div className='d-flex p-4'>
                                    <button type="submit" 
                                        onClick={handleSubmitUpdate} 
                                        class="btn btn-primary">Lưu</button>
                                </div>
                                    
                            </form>
                            </div>
                            </div>
                        </div>
                    </div>
                    {/* Close Model */}

                    {/* Model-Update */}
                    <div class="modal fade" id="updateModalContact" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Chỉnh sửa thông tin công ty</h1>
                                <button  type="button" 
                                    // ref={closeModalRef} 
                                    class="btn-close" 
                                    data-bs-dismiss="modal" 
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="Specialized_name" class="form-label">Nhân viên liên hê </label>
                                    <input
                                        type="contactPerson"
                                        onChange={handleChange}
                                        defaultValue={InforCompany.response.Company.contactPerson}
                                        name='Specialized_name'
                                        class="form-control"
                                        id="Specialized_name"
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Số điện thoại</label>
                                    <textarea type="text" 
                                    onChange={handleChange} 
                                    defaultValue={InforCompany.response.Company.phoneContact} 
                                    name='phoneContact' 
                                    class="form-control" 
                                    id="exampleInputPassword1" 
                                    aria-label="With textarea"/>
                                </div>
                                <div className='d-flex'>
                                    <button type="submit" 
                                        // onClick={handleSubmitUpdate} 
                                        class="btn btn-primary">Submit</button>
                                </div>
                                    
                            </form>
                            </div>
                            </div>
                        </div>
                    </div>
                    {/* Close Model */}
                </div>
            </div>
            </>)}
            
        </div>
    );
}

export default CompanyProfile;