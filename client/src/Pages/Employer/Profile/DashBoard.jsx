import React from 'react';
import NavBarProfile from './NavBarProfile';
import { Outlet } from 'react-router-dom';

function DashBoard() {
    return (
        <div className='container-fluid px-0 bg-secondary'>
            <div>
                <div>
                    <NavBarProfile/>
                </div>
                <div className='bg-profile min-vh-100 '>
                    <Outlet/>
                </div>
            </div>
            
        </div>
    );
}

export default DashBoard;