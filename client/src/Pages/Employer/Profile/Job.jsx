import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { apiJobByCompany, apiJobSearchcompany } from '../../../api/job';
import { formatDate } from './../../../../Utils/dateUtils';
import './job.css'
import moment from 'moment';
import { apiAceptCv, apiAllCvByJob } from '../../../api/cv';
import Swal from 'sweetalert2';

function Job() {
    // const currentDate = new Date()
    const [Jobs,setJobs] = useState([])
    const {currentCompany,logoutUSer} =useContext(AuthContext);
    const [currentJob,setCurrentJob] = useState({})
    const [listCv,setListCv] = useState([])
    const [input,setinputs] =useState({
        q:'',
        dateCreate:'',
        dateStart:'',
        dateEnd:''
    })

    // const [decision,setdecision] = useState('')

    const handleDecision = async(decision,Cv_id) =>{
        try {
            if(decision==''){
                
                Swal.fire("Duyệt tuyển dụng!", "Đã có lỗi xảy ra trong quá trình duyệt ứng viên", "error");
                setLoading(false)
                
            }else if(decision=='2'){
                const result = await Swal.fire({
                    title: 'Xác nhận',
                    text: 'Bạn có chắc chắn muốn duyệt ứng viên này?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Hủy'
                });

                if (result.isConfirmed) {
                    // console.log(Cv_id)
                    const response = await apiAceptCv(decision,Cv_id)
                    if(response.data.err==0||response.data.err==2){
                        Swal.fire("Duyệt tuyển dụng!", "Bạn đã duyệt ứng viên có id là "+Cv_id, "success");
                        getListCv(currentJob.id)
                        setLoading(false)
                    }else{
                        Swal.fire("Duyệt tuyển dụng!", response.data.mes, "error");
                        setLoading(false)
                    
                    }
                }
            }else if (decision=='2'){
                const result = await Swal.fire({
                    title: 'Xác nhận',
                    text: 'Bạn có chắc chắn muốn loại ứng viên này?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Hủy'
                });

                if (result.isConfirmed) {
                    // console.log(decision)
                    const response = await apiAceptCv(decision,Cv_id)
                    if(response.data.err==0||response.data.err==2){
                        Swal.fire("Duyệt tuyển dụng!", "Bạn đã duyệt ứng viên có id là "+Cv_id, "success");
                        getListCv(currentJob.id)
                        setLoading(false)
                    }else{
                        Swal.fire("Duyệt tuyển dụng!", response.data.mes, "error");
                        setLoading(false)
                    }
                }
            }
        
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDataCvByJob = async(Jid)=>{
        try {
            const response=  await apiAllCvByJob(Jid);
            console.log(response.data);
            setListCv(response.data.Data)     
        } catch (error) {
            console.error
        }
    }

    const handleChange = e =>{
        setinputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } 

    const fetchDataJobByCompany = async() =>{
        try {
            const res = await apiJobByCompany(currentCompany.id);
            // console.log(res);
            setJobs(res.data.jobData.rows)
        } catch (error) {
            console.log(error)
        }
    }
    const divJob = document.getElementById('Job');
    const divdetail = document.getElementById('detail');
    const divCv = document.getElementById('list_cv');
    const showDiv = async(divToShow) =>{
        divJob.style.display = 'none';
        divdetail.style.display = 'none';
        divCv.style.display='none';
        divToShow.style.display = 'block';
    }

    const btnJob= async() =>{
        showDiv(divJob);
    }

    const getDetail = (job) =>{
        setCurrentJob(job)
        // console.log(currentJob);
        showDiv(divdetail);
    }

    const getListCv =(jid) =>{
        fetchDataCvByJob(jid)
        showDiv(divCv)
    }

    const getSearchJob = async (e)=>{
        e.preventDefault();
        try {
            const res = await apiJobSearchcompany(currentCompany.id,input);
            console.log(res)
            setJobs(res.data.jobData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchDataJobByCompany();
    },[])
    
    



    return (
        <div className='content-inner p-4'>
            <div className='container-fluid'>
                <div className=' g-3 my-2 p-3 bg-white rounded'>
                    <div className='row'>
                        <div className='col-3'>
                            <h3>Quản lý đăng tuyển </h3>
                        </div>
                        <div class="col-3 d-grid gap-2 d-md-flex justify-content-md-start">
                                <a href='/ProfileEml/CreateJob' class="btn btn-info" type="button"><i className='bi bi-pen'>Tạo mẫu tuyển dụng</i></a>
                        </div>
                    </div>
                    <div >
                    <form className='row'>
                        <div class="col-2 p-2">
                                <label for="exampleFormControlInput1" class="form-label">Từ khóa</label>
                                <input type="text" onChange={handleChange} name='q' class="form-control" id="exampleFormControlInput1" placeholder="nhập từ khóa"/>
                            </div>

                            <div class="col-2 p-2">
                                <label for="exampleFormControlInput1" class="form-label">Tìm theo ngày</label>
                                <input type="date" onChange={handleChange} name='dateCreate' class="form-control" id="exampleFormControlInput1" placeholder="Ngày đăng"/>
                            </div>

                            <div class="col-2 p-2">
                                <label for="exampleFormControlInput1" class="form-label">từ ngày</label>
                                <input type="date" onChange={handleChange} name='dateStart' class="form-control" id="exampleFormControlInput1" />
                            </div>

                            <div class="col-2 p-2">
                                <label for="exampleFormControlInput1" class="form-label">từ ngày</label>
                                <input type="date" onChange={handleChange} name='dateEnd' class="form-control" id="exampleFormControlInput1" />
                            </div>
                            <div class="col-2 p-2">
                                <div class=" justify-content-md-start">
                                        <a 
                                        onClick={getSearchJob}
                                        class="btn btn-info" type="button"><i className='bi bi-search'>Tìm</i></a>
                                </div>
                            </div>
                        </form>
                            
                    </div>
                    <div className='row'>
                        <div className='col-3 p-3 '>
                            <i type="button" onClick={()=>btnJob()} >Việc làm đã đăng</i>
                        </div>
                        <div className='col-3 p-3'>
                            <i type="button" >Việc làm đã hết hạn</i>
                        </div>
                    </div>
                    {/* Change */}
                    <div id='Job' className='content border border-1'>
                        <table class="table caption-top bg-white rounded  table-striped ">
                                    <thead className='table-light'>
                                        <tr>
                                            <th scope="col">Chức danh</th>
                                            <th scope="col">Ngày đăng</th>
                                            {/* <th scope="col">Lượt xem </th> */}
                                            <th scope="col">Lượt nộp</th>
                                            <th scope="col">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Jobs.map(job=>(
                                            <tr>
                                                <th scope="row">{job.Job_name}</th>
                                                <td>{formatDate(job.createdAt)}</td>
                                                <td>{job.numberCV}</td>
                                                <td><button className='border border-0'><i onClick={()=>getDetail(job)} class="bi bi-eye"></i></button></td>
                                            </tr>
                                        ))}
                                </tbody>
                        </table>
                    </div>

                    <div id='detail' className='content border border-1 p-4'>
                        <div>
                            <h2 className='fw-bolder text-primary-emphasis'>{currentJob.Job_name}</h2>
                        </div>
                        <div className='row'>
                            <div className='col-2'>
                                <b style={{paddingLeft:'20px'}}>Hết hạn</b>
                            </div>
                            <div className='col-2'>
                                <i>{formatDate(currentJob.date_expiration)}</i>
                            </div>
                            <div className='col-2'>
                                <b>Nộp trực tuyến </b>
                            </div>
                            <div className='col-2' onClick={()=>getListCv(currentJob.id)}>
                                <span><a>({currentJob.numberCV})Xem hồ sơ ứng viên</a></span>
                            </div>



                            <div className='col justify-content-md-start'>
                                <button className='border border-0'><i className='bi bi-pen'>Sửa</i></button>
                            </div>
                        </div>
                    </div>                    
                    
                    

                    <div id='list_cv' className='content border border-1 p-4'>
                        <table class="table caption-top bg-white rounded  table-striped ">
                                    <thead className='table-light'>
                                        <tr>
                                            <th scope="col">Tên ứng viên</th>
                                            <th scope="col">Ngày nộp</th>
                                            <th scope="col">Cập nhật</th>
                                            <th scope="col">Trạng thái</th>
                                            <th scope="col">Kinh nghiệm</th>
                                            <th scope="col">Mức lương</th>
                                            <th scope="col">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listCv && Object.keys(listCv) ? (
                                            listCv.map(cv=>(
                                            <tr>
                                                <th scope="row">{cv.CvApply.seeker.firstname} {cv.CvApply.seeker.lastname}</th>
                                                <td>{formatDate(cv.createdAt)}</td>
                                                <td>{formatDate(cv.updatedAt)}</td>
                                                <td>{cv.status}</td>
                                                <td>{cv.CvApply.exp.experience_name}:{cv.CvApply.exp.experience_year} năm</td>
                                                <td>Không có</td>
                                                <td><i onClick={()=>handleDecision("2",cv.id)} class="bi bi-check-lg"></i><i onClick={()=>handleDecision("1",cv.id)} class="bi bi-x"></i><i class="bi bi-eye"></i></td>
                                            </tr>
                                        ))
                                        ):(<></>)

                                        }
                                        
                                </tbody>
                        </table>
                    </div>              
                    

                    {/* Change */}
                    {Jobs ? <></>:<div style={{textAlign:"center"}}>
                            Không có dữ liệu
                        </div>}
                </div>
            </div>
        </div>
        
    );
}

export default Job;