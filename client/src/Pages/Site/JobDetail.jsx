import React,{ useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './JobDetail.css'
import { apiDetailJob, apiJobByCompany, apiSpeByJob } from '../../api/job';
import { formatDate } from './../../../Utils/dateUtils';
import { getAllCv } from '../../api/user';
import Swal from 'sweetalert2';
import { apiApplyCv } from '../../api/cv';

function JobDetail() {
    const { jid } = useParams();
    const [JobDetail,setJobDetails] = useState([])
    const [SpeJob,setSpeJob] = useState([]);
    const [JobList,setJobList] = useState([]);
    const [YourCV,setYourCv] = useState([]);
    // console.log(jid)
    const DetailJob = document.getElementById('DetailJob');
    const DetailComany = document.getElementById('DetailComany');

    const DetailJ = document.getElementById('DetailJ');
    const DetailCom = document.getElementById('DetailCom');
    const user = JSON.parse(localStorage.getItem('user'))


    const getOwnCv = async(Uid) =>{
        try {
            const response = await getAllCv(Uid)
            console.log(Uid)
            setYourCv(response.data.CvData)
        } catch (error) {
            console.log(error)
        }
    }
    const showDiv = async(divToShow) =>{
        DetailJ.style.display = 'none';
        DetailCom.style.display = 'none';
        divToShow.style.display = 'block';
    }
    const handleDetailJob = () => {
        DetailJob.classList.toggle('active');
        DetailComany.classList.remove('active');
        showDiv(DetailJ);
    };
    const handleDetailCompany =() => {
        DetailComany.classList.toggle('active');
        DetailJob.classList.remove('active');
        showDiv(DetailCom);
    };
    const fetchDataSpeJob = async(jid) =>{
        try {
            const res = await apiSpeByJob(jid);
            // const Spe = res.data.SpeData
            
            setSpeJob(res.data.SpeData)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchDataDetail = async(jid) =>{
        try {
            const res = await apiDetailJob(jid);
            // console.log(res.data.JobData)
            setJobDetails(res.data.JobData)
            try {
                const joblist = await apiJobByCompany(res.data.JobData.Company.id);
                // console.log(joblist)
                setJobList(joblist.data.jobData)
            } catch (error) {
                console.log(error)
            }
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const ApplyCv = async() =>{
        try {
            const response = await apiApplyCv(jid,YourCV[0].id)
            console.log(response)
            if(response.data.err==0){
                Swal.fire("Nộp Cv!", "Bạn đã nộp cv thành công, Vui lòng đợi thông báo từ Nhà tuyển dụng đến bạnbạn", "success");
                setLoading(true);
            }else{
                Swal.fire("Nộp Cv", response.data.mes, "error");
                setLoading(false);
            }
        } catch (error) {
            // Swal.fire("Nộp Cv", error, "error");
            // setLoading(false);
            console.log(error)
        }
    }

    // console.log(YourCV)
    
    

    useEffect(()=>{
        fetchDataDetail(jid).then(data=>setJobDetails(data.JobData));
        fetchDataSpeJob(jid);
        getOwnCv(user.seeker.id);
    },[jid])
    // console.log(JobList)
    return (
        <div>
        {JobDetail && Object.keys(JobDetail).length > 0 ? (
            <div>
                <div style={{backgroundImage: `url(${JobDetail.Company.image})`}} className="container-image">
                        <h1>{JobDetail.Job_name}</h1>
                        <div className='row'>
                            <a href='' className='col-10'>{JobDetail.Company.nameCompany}</a>
                            <button onClick={ApplyCv} style={{width:"auto"}} className='col-2' type="button" >NỘP ĐƠN ỨNG TUYỂN</button>
                        </div>
                    </div>

                    
                    <div>
                        <div
                            onClick={handleDetailJob}
                            className="detail"
                            id='DetailJob'
                        >
                            <h5 >Chi tiết</h5>
                            <hr style={{ width: '70px' }} />
                        </div>
                        <div
                            onClick={handleDetailCompany}
                            className="detail"
                            id='DetailComany'
                        >
                            <h5 
                            >Thông tin công ty</h5>
                            <hr style={{ width: '150px' }} />
                        </div>
                    </div>
                    {/* Thông tin công việc */}
                    <div id='DetailJ'>
                        <div>
                            <div className='bg-info p-4 row'>
                                <div className='col-3 infor-div'>
                                    <strong><p>Địa chỉ</p></strong>
                                    <a>{JobDetail.Company.Address}</a>
                                    {/* <hr></hr> */}
                                </div>
                                <div className='col-3 infor-div'>
                                    <strong><p>Ngày cập nhật</p></strong>
                                    <a>{formatDate(JobDetail.NewDetail.updatedAt)}</a>
                                    {/* <hr></hr> */}
                                </div>
                                <div className='col-3 infor-div'>
                                    <strong><p>Lương</p></strong>
                                    <a>{JobDetail.NewDetail.Salary+" "}VND<br></br> Bettween : 
                                    {JobDetail.NewDetail.Min_Salary}
                                    {/* JobDetail.NewDetail.updatedAt  */}
                                    </a>
                                    {/* <hr></hr> */}
                                </div>
                                <div className='col-3 infor-div'>
                                    <strong><p>Ngành nghề</p></strong>
                                    {SpeJob.map(spe=>{
                                        <a>{spe.specialized.Specialized_name} </a>
                                    })}
                                    
                                    {/* <hr></hr> */}
                                </div>
                            </div>
                            <div className='bg-info p-4 row'>
                                <div className='col-3'>
                                    <strong><p>Kinh nghiệm</p></strong>
                                    <a>{JobDetail.NewDetail.experience}</a>
                                    {/* <hr></hr> */}
                                </div>
                                <div className='col-3'>
                                    <strong><p>Hình thức</p></strong>
                                    <a>{JobDetail.NewDetail.typeJob}</a>
                                    {/* <hr></hr> */}
                                </div>
                                <div className='col-3'>
                                    <strong><p>Cấp bậc</p></strong>
                                    <a>{JobDetail.NewDetail.Education}</a>
                                    {/* <hr></hr> */}
                                </div>
                                <div className='col-3'>
                                    <strong><p>Hết hạn nộp</p></strong>
                                    <a>{formatDate(JobDetail.date_expiration)}</a>
                                    {/* <hr></hr> */}
                                </div>
                            </div>
                        </div>

                        <div className='p-4'>
                            <strong><h3>Phúc lợi</h3></strong>
                            <p>{JobDetail.NewDetail.Welfare}</p>
                        </div>

                        <div className='p-4'>
                            <strong><h3>Mô tả công việc</h3></strong>
                            <p>{JobDetail.NewDetail.job_description}</p>
                            <img src={JobDetail.NewDetail.image_decscription}></img>
                        </div>

                        <div className='p-4'>
                            <strong><h3>Yêu cầu công việc</h3></strong>
                            <p>{JobDetail.NewDetail.job_requirements}</p>
                        </div>

                        <div className='p-4'>
                            <strong><h3>Địa điểm làm việc</h3></strong>
                            <p>{JobDetail.NewDetail.Address}</p>
                        </div>

                        <div className='p-4'>
                            <strong><h3>Thông tin khác</h3></strong>
                            <p>{JobDetail.NewDetail.another_information}</p>
                        </div>
                    </div>
                    {/* Thông tin công ty */}
                    <div id='DetailCom' className='content'>
                        <div >
                            <div className='bg-info p-4'>
                                <h3>Tên công ty</h3>
                                <div className='d-flex'>
                                    <img src={JobDetail.Company.image} className='imgCompany'/>
                                    <div>
                                        <div className='infor-company'>
                                            <h2 style={{paddingLeft:'20px'}}>Địa điểm:</h2>
                                            <p >{JobDetail.Company.Address}</p>
                                        </div>
                                        <hr style={{marginLeft:'20px',width:'100%'}}></hr>
                                        <div className='p-4'>
                                        <h4>Thông tin công ty</h4>
                                            <div className='item-infor-company'>
                                                <div>
                                                    <i className='bi bi-people'></i>
                                                    <span>Người liên hệ: {JobDetail.Company.contactPerson}</span>
                                                </div>
                                                <div>
                                                    <i className='bi bi-person'></i>
                                                    <span>Qui mô công ty: {JobDetail.Company.numberEmployees}</span>
                                                </div>
                                                <div>
                                                    <i className='bi bi-people'></i>
                                                    <span>Loại hình hoạt động: {JobDetail.Company.typeCompany}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                            </div>
                            <div>
                                <h2>Giới thiệu về công ty</h2>
                                <p> {JobDetail.Company.Company_description}</p>
                            </div>
                        </div>
                        <div className='company-jobs-opening'>
                        <div class="box-title">
                            <h3 class="company-heading-title">Việc làm đang tuyển({JobList.count})</h3>
                        </div>
                        <input type="hidden" value="35A991C1" name="emp_id" id="emp_id"></input>
                        <input type="hidden" value="cty-tnhh-thuong-mai-dich-vu-du-lich-ngoi-sao-viet" name="emp_name" id="emp_name"></input>
                        

                        

                        </div>
                    </div>
                </div>
        ):(
            <p>Loading job detail...</p>
        )}
        </div>
    );
}

export default JobDetail;