import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
function HomeAdmin() {
    return (
        <div className='container-fluid px-0 bg-secondary min-vh-100'>
            <div className='row'>
                <div className='col-2 bg-white min-vh-100 ' >
                    <SideBar/>
                </div>
                <div className='col-10 px-0'>
                    <Outlet/>
                </div>
            </div>
            
        </div>
    );
}

export default HomeAdmin;