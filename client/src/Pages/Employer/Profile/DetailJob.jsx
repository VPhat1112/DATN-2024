import React from 'react';

function DetailJob() {
    return (
        <div className='row border border-1 p-2 rounded m-1'>
            <div>
                <h2 className='fw-bolder text-primary-emphasis'>Tên chức danh </h2>
            </div>
            <div className='row'>
                <div className='col-2'>
                    <b>Hết hạn</b>
                </div>
                <div className='col-2'>
                    <i>ngày hết hạn</i>
                </div>
                <div className='col-2'>
                    <b>Nộp trực tuyến </b>
                </div>
                <div className='col-2'>
                    <a href=''>Xem hồ sơ ứng viên</a>
                </div>

                <div className='col justify-content-md-start'>
                    <button className='border border-0'><i className='bi bi-pen'>Sửa</i></button>
                </div>
            </div>
        </div>
    );
}

export default DetailJob;