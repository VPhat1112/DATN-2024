import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiJob, apiJobBySpe } from '../../api/job';
import { formatDate } from '../../../Utils/dateUtils';
import { apiAllSpe } from '../../api/Admin';

function Home() {
    const [Jobs,setJobs] = useState([]);
    const [Specia,setSpecia] = useState([]);
    const[InforCompany,setInforCompany] = useState([]);

    const navigate = useNavigate()

    // const [Sid,setSid] = useState('');

    const [input,setinput] =useState({
        nameCompany:''
    });

    const fetchDataSpe = async() =>{
        try {
            const res = await apiAllSpe();
            setSpecia(res.data.response);
        } catch (error) {
            console.log(error)
        }
    }


    const handelChange = async(e) =>{
        // e.preventDefault();
        // console.log(e)
        try {
            const res = await apiJobBySpe(e);
            setJobs(res.data.jobData);
        } catch (error) {
            console.log(error)
        }

    }

    const handelChangeFilter = e =>{
        e.preventDefault();
        setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }  


    const navigateDetail = (jid) =>{
        navigate(`/JobDetail/${jid}`)
    }
    




    useEffect(()=>{
        const fetchDataJob = async () =>{
            try {
                const res = await apiJob({});
                setJobs(res.data.jobData);
                // console.log(res.data.jobData)
            } catch (error) {
                console.log(error)
            }
        };
        fetchDataSpe();
        fetchDataJob();
    },[])

console.log(Jobs)
    return (
        <div>
            <div class="search-bar">
                
                <select  onChange={e=>{handelChange(e.target.value)}} defaultValue={"Ngành nghề"}  id="inputTypeCompany" class="form-select">
                    <option selected>Vui lòng chọn</option>
                    {Specia.map(spe=>(
                        <>
                            <option value={spe.id}>{spe.Specialized_name}</option>
                        </>
                    ))}
                    <option value={1}>test</option>
                </select>
                <input type="text" onChange={handelChangeFilter} placeholder="Tên, chức danh công ty"/>
                <button><i class="bi bi-search"></i></button>
            </div>

            <div className='home'>
                <div className='jobs'>
                    {Jobs.map(job=>(
                        <>
                            <div className='job'>
                                <div class="img-job">
                                    <a onClick={()=>navigateDetail(job.id)}><img src={job.Company.image}  alt="Company Logo"/></a>
                                </div>
                                <div className='content'>
                                    <Link className='link' to={`/JobDetail/${job.id}`}><h3>{job.Job_name}</h3></Link>
                                    <p onClick={()=>navigateDetail(job.id)}>{job.Company.nameCompany}</p>
                                    <p>Lương: {job.NewDetail.Salary} VND</p>
                                    <p>Địa điểm: {job.NewDetail.Address}</p>
                                    <p>Hạn nộp: {formatDate(job.date_expiration)}</p>
                                    <p>Phúc lợi: {job.NewDetail.Welfare}</p>
                                    <p>Cập nhật: {formatDate(job.NewDetail.updatedAt)}</p>
                                    <button>Lưu việc làm</button>
                                </div>
                            </div>
                        </>
                    ))

                    }
                </div>

            </div>
            <div className=''>

            </div>
            <div class="p-5 gap-2 col-6 d-md-flex mx-auto">
                <button class="btn circle" type="button">1</button>
                <button class="btn circle " type="button">2</button>
                <button class="btn circle " type="button">3</button>
                <button class="btn circle " type="button"><i class="bi bi-chevron-right"></i></button>
            </div>
        </div>
    );
}

export default Home;