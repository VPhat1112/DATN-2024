import React from 'react';
import './Notification.css'
function DeleteCv(props) {
    return (
        <div className='content-inner'>
            <div className='container-fluid'>
                <div className=' g-3 my-2 p-3 bg-white shadow-sm  rounded'>
                    <div className='widget widget-10'>
                        <div className='widget-head'>
                            <div className='cb-title-h3'>
                                <h3>Danh sách hồ sơ đã xóa </h3>
                            </div>
                        </div>
                        <div className='justify-content-around align-item-center'>
                        <table class="table caption-top bg-white rounded  table-striped ">
                            <thead className='table-light'>
                                <tr>
                                    <th scope="col">Tiêu đề hồ sơ</th>
                                    <th scope="col">Ngày cập nhật cuối cùng</th>
                                    <th scope="col">Ngày Xóa</th>
                                    <th scope="col">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <th scope="row">Không có dữ liệu </th> */}
                                </tr>
                            </tbody>

                        </table>
                        <div style={{textAlign:"center"}}>
                            Không có dữ liệu
                        </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default DeleteCv;