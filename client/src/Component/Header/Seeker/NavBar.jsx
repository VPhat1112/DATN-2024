import React,{useContext, useEffect,useState} from 'react';
import reactLogo from '../../../assets/react.svg';
import { Link } from 'react-router-dom';
import googleOneTap from "google-one-tap";
import { AuthContext } from '../../../context/AuthContext';




function NavBar(props) {
    const {currentUser,logoutUSer} =useContext(AuthContext);

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src={reactLogo} alt="react" width="30" height="24"/>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Tìm việc làm</a>
                </li>
                <li class="nav-item">
                </li>
            </ul>
            <form class="d-flex" >
                {currentUser?<span className='me-2 mb-2 mb-lg-0 txt-user'><a href='/Profile/MyCv'>{currentUser?.seeker.firstname+currentUser?.seeker.lastname}</a></span>:<span className='me-2 mb-2 mb-lg-0 txt-user'><Link className='link' to={"/LoginSeeker"}>Đăng nhập</Link></span>}
                {currentUser?<span onClick={logoutUSer} className='me-2 mb-2 mb-lg-0 txt-user'><Link>Logout</Link></span>:<span className='me-2 mb-2 mb-lg-0 txt-user'><Link className='link' to={"/SignUpSeeker"}>Đăng ký</Link></span>}
                
                
                <div className='main-employer me-2'>
                    <a href='/LoginEmployer' onClick={logoutUSer} title='Đăng tuyển , tìm ứng viên'>
                        <div>
                            <div className='bck-employer'>
                                Dành cho nhà tuyển dụng
                            </div>
                        </div>
                    </a>
                </div>
            </form>
            </div>
        </div>
        </nav>
    );
}

export default NavBar;