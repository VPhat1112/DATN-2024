import React, { useEffect, useState } from 'react';
import './MyCv.css'
import { apigetCurrent } from '../../../api/user';
import { Link } from 'react-router-dom';

const MyCv = () => {
    const [Infor_User, setInfor_User] = useState([]);
    const User = JSON.parse(localStorage.getItem('user'));

    const fetchDataUser = async () => {
        try {
            const currentUser = await apigetCurrent(User.id);
            setInfor_User(currentUser.data.response.seeker);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    console.log(Infor_User)

    useEffect(() => {
        fetchDataUser();
    }, []);

    return (
        <div className='content-inner'>
        <div className='container-fluid'>
            <div className=' g-3 my-2 p-3 bg-white shadow-sm rounded'>
                {Infor_User ? (
                    <>
                    <h3>My Profile</h3>
                    <div className='row'>
                        <div className='profileText col-3 p-4'>
                        <div className='imgBx'>
                            <img src={Infor_User?.image} alt='' />
                        </div>
                        </div>
                        <div className='col-6 p-4'>
                        <h2>{Infor_User?.firstname} {Infor_User?.lastname}</h2>
                        <strong>Chưa cập nhật   </strong><Link to={"/Profile/EditCv"}><i class="bi bi-pen"></i><br /></Link>
                        <span><i class="bi bi-star-fill"></i> Chưa có kinh nghiệm</span><br />
                        
                        {Infor_User && Infor_User.Information_Job && Infor_User.Information_Job.Salary ? (
                            <>
                                <span><i class="bi bi-person-fill"></i> Cấp bậc mong muốn: {Infor_User.Information_Job.Desired_level}</span><br />
                                <span><i class="bi bi-currency-dollar"></i> Mức lương mong muốn: {Infor_User.Information_Job.Salary}</span>
                                <br />
                                <span><i class="bi bi-calendar-event"></i> Ngày cập nhật: {Infor_User.Information_Job.updatedAt}</span><br />
                            </>
                            ) : (
                            <>
                                <span><i class="bi bi-person-fill"></i> Cấp bậc mong muốn: Chưa cập nhật</span><br />
                                <span><i class="bi bi-currency-dollar"></i> Mức lương mong muốn: Chưa cập nhật</span><br />
                                <span><i class="bi bi-calendar-event"></i> Ngày cập nhật: dd/mm/yyyy</span><br />
                            </>
                        )}
                        
                        </div>
                    </div>
                    <div className='d-flex'>
                        <button class="update-profile-button p-2">
                        <span class="icon">🔄</span>
                        Cập nhật hồ sơ
                        </button>
                        <button class="update-profile-button p-2">
                        <span class="icon"><i class="bi bi-eye-fill"></i></span>
                        Xem hồ sơ
                        </button>
                        <button class="update-profile-button p-2">
                        <span class="icon"><i class="bi bi-download"></i></span>
                        Tải xuống
                        </button>
                    </div>
                    </>
                    ) : (
                    <>
                    </>
                )}
                
            </div>
        </div>
        </div>
    );
};

export default MyCv;