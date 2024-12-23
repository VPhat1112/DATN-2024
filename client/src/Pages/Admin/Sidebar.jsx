import React from 'react';
import './Sidebar.css'
function SideBar(props) {
    return (
        <div className='bg-white p-2 '>
            <div className='m-2'>
                <i className='bi bi-bootstrap-fill my-2 fs-4'></i>
                <span className='brand-name fs-4'>  ADMIN HOME</span>
            </div>
            <hr className='text-dark'/>
            <div className='list-group list-group-flush'>
                {/* <a className='list-group-item py-2' href='#'>
                    <i className="bi bi-speedometer2 fs-5 me-3"></i>
                    <span className="fs-5">DashBoard</span>
                </a> */}
                <a className='list-group-item py-2' href='/admin-DashBoard'>
                    <i className='bi bi-house fs-4 me-3'></i>
                    <span className="fs-5">Home</span>
                </a>
                <a className='list-group-item py-2' href='/admin-DashBoard/Speci'>
                    <i className="bi bi-people fs-5 me-3"></i>
                    <span className="fs-5">specialized</span>
                </a>
                <a className='list-group-item py-2' href='/admin-DashBoard/Company'>
                    <i className='bi bi-building fs-4 me-3'></i>
                    <span className="fs-5">Company</span>
                </a>
                <a className='list-group-item py-2' href='/admin-DashBoard/report'>
                    <i className='bi bi-clipboard-data fs-4 me-3'></i>
                    <span className="fs-5">Report</span>
                </a>
                <a className='list-group-item py-2' href='/'>
                    <i className='bi bi-box-arrow-right fs-4 me-3'></i>
                    <span className="fs-5">Logout</span>
                </a>
                
            </div>
        </div>
        
    );
}

export default SideBar;