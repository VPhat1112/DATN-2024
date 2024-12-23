import React from 'react';
import SideBar from './Side/SideBar';
import { Outlet } from 'react-router-dom';
import './Personal.css'

function Personal() {
    return (
        <div className='container-fluid bg-profile min-vh-100'>
            <div className='row'>
                <div className='col-2 bg-white min-vh-100 ' >
                    <SideBar/>
                </div>
                <div className='col-9 px-0 '>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default Personal;