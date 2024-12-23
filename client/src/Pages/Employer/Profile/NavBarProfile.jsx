import React from 'react';

function NavBarProfile(props) {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">DashBoard</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/ProfileEml/Jobs">Quản lý đăng tuyển</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Quản lý ứng viên</a>
                    </li>
                </ul>
                <button href='#'> 
                    <span class="navbar-text">
                        <i class="bi bi-search"></i>
                        Tìm ứng viên
                    </span>
                </button>

                <button href='#'> 
                    <span class="navbar-text">
                        <i class="bi bi-person-badge"></i>
                        Đăng tuyển dụng
                    </span>
                </button>
                
                </div>
            </div>
            </nav>
    );
}

export default NavBarProfile;