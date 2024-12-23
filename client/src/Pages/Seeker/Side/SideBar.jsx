import React from 'react';
import './SideBar.css';
function SideBar() {
    return (
        <div className='bg-white p-2 '>
            <div className='m-2'>
                {/* <i className='bi bi-bootstrap-fill my-2 fs-4'></i> */}
                <span className='brand-name fs-4'> MY PROFILE</span>
            </div>
            <hr className='text-dark'/>
            <div className='list-group list-group-flush'>
                <ul className='list-group list-group-flush'>
                    <li className='active'>
                        <a className='border border-0 list-group-item py-2' href='/Profile/MyCv'>
                            <i className='bi bi-palette fs-4 me-3'></i>
                            <span className="fs-6">Quản lý hồ sơ</span>
                        </a>
                    </li>
                    <li>
                        <a className='border border-0 list-group-item py-2' href='/Profile/Cv'>
                            <i className="bi bi-person-fill fs-5 me-3"></i>
                            <span className="fs-6">Hồ sơ có thể dùng</span>
                        </a>
                    </li>
                    <li>
                        <a className='border border-0 list-group-item py-2' href='/Profile/EditCv'>
                            <i className='bi bi-file-person fs-4 me-3'></i>
                            <span className="fs-6">Chỉnh mẫu hồ sơ</span>
                        </a>
                    </li>
                    <li >
                        <ul className='list-unstyled' style={{display:"block"}}>
                            <li>
                                <a className='border border-0 list-group-item py-2' href='/Profile/CvApply'>
                                    <i className='bi bi-pen fs-4 me-3'></i>
                                    <span>Việc làm đã lưu</span>
                                </a>
                            </li>
                            <li>
                                <a className='border border-0 list-group-item py-2' href='/Profile/CvApply'>
                                    <i className='bi bi-pen fs-4 me-3'></i>
                                    <span>Việc làm đã nộp</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a className='border border-0 list-group-item  py-2' href='/Profile/Notification'>
                            <i className='bi bi-bell-fill fs-4 me-3'></i>
                            <span className="fs-6">Thông báo việc làm</span>
                        </a>
                    </li>
                    <li>
                        <a className='border border-0 list-group-item py-2' href='/Profile/DeleteCv'>
                            <i className='bi bi-file-earmark-minus-fill fs-4 me-3'></i>
                            <span className="fs-6">Hồ sơ đã xóa</span>
                        </a>
                    </li>
                    <li>
                        <a className='border border-0 list-group-item py-2' href='/'>
                            <i className='bi bi-box-arrow-right fs-4 me-3'></i>
                            <span className="fs-6">Thoát</span>
                        </a>
                    </li>
                </ul>
                
            </div>
        </div>
    );
} 

export default SideBar;