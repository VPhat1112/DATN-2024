import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Home(props) {

    const Jobs=[
        {
            id:1,
            Job_name:'Nhân viên kho - Bắc Giang',
            date_expiration:'26-10-2024',
            image_company:'https://images.careerviet.vn/employer_folders/lot1/312911/155x155/95342ynghialogo.png',
            nameCompany:'Công Ty Cổ Phần Thép Việt Xô Hà Nội',
            newDetail:{
                newDetail_id:1,
                Address:'Bắc Giang',
                typeJob:'Làm việc trực tiếp',
                Salary:'8tr-10tr VND',
                experience:'0 year',
                jobLevel:'no',
                Welfare:'Chế độ bảo hiểm, Phụ cấp, Chế độ thưởng',
                job_description:'Trông coi và vận chuyển làm việc trong kho ',
                job_requirements:'',
                another_information:'',
                updateAt:'27-10-2024'
            }
        },
        {
            id:2,
            Job_name:'Nhân viên kho - Bắc Cạn',
            date_expiration:'26-10-2024',
            image_company:'https://images.careerviet.vn/employer_folders/lot9/320489/155x155/115346logo-nvl.jpg',
            nameCompany:'Công Ty Cổ Phần Thép Việt Xô Hà Nội',
            newDetail:{
                newDetail_id:1,
                Address:'Bắc Giang',
                typeJob:'Làm việc trực tiếp',
                Salary:'10tr-12tr VND',
                experience:'0 year',
                jobLevel:'no',
                Welfare:'Chế độ bảo hiểm, Phụ cấp, Chế độ thưởng',
                job_description:'Trông coi và vận chuyển làm việc trong kho ',
                job_requirements:'',
                another_information:'',
                updateAt:'27-10-2024'
            }
        }
    ]


    return (
        <div>
            <div class="search-bar">
                <input type="text" placeholder="Ngành nghề"/>
                <input type="text" placeholder="Cấp bậc"/>
                <button><i class="fa fa-search"></i></button>
            </div>

            <div className='home'>
                <div className='jobs'>
                    {Jobs.map(job=>(
                        <div className='job'>
                            <div class="img-job">
                                <img src={job.image_company} alt="Company Logo"/>
                            </div>
                            <div className='content'>
                                <Link className='link' to={job.id}><h3>{job.Job_name}</h3></Link>
                                <p>{job.nameCompany}</p>
                                <p>Lương:{job.newDetail.Salary}</p>
                                <p>Địa điểm:{job.newDetail.Address}</p>
                                <p>Hạn nộp: {job.date_expiration}</p>
                                <p>Phúc lợi: {job.newDetail.Welfare}</p>
                                <p>Cập nhật: {job.newDetail.updateAt}</p>
                                <button>Lưu việc làm</button>
                            </div>
                        </div>
                        
                        
                        
                    ))

                    }
                </div>

            </div>

    {/* <div class="job-listings">
        <h2>50 việc làm theo ngày cập nhật mới nhất</h2>

        {Jobs.map(job=>(
                <div class="job-listing">
                
                <div class="job-logo">
                    <img src={job.image_company} alt="Company Logo"/>
                </div>
                <div class="job-info">
                <Link className='link' to={job.id}><h3>{job.Job_name}</h3></Link>
                    <p>{job.nameCompany}</p>
                    <p>Lương:{job.newDetail.Salary}</p>
                    <p>Địa điểm:{job.newDetail.Address}</p>
                    <p>Hạn nộp: {job.date_expiration}</p>
                    <p>Phúc lợi: {job.newDetail.Welfare}</p>
                    <p>Cập nhật: {job.newDetail.updateAt}</p>
                    <button>Lưu việc làm</button>
                </div>
            </div>
            ))}
        

        </div> */}
        </div>
    );
}

export default Home;