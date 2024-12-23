import React from 'react';
import './Notification.css'
function CvApply(props) {
    return (
        <div className='content-inner'>
            <div className='container-fluid'>
                <div className=' g-3 my-2 p-3 bg-white shadow-sm  rounded'>
                    <div className='widget widget-10'>
                        <div className='widget-head'>
                            <div className='cb-title-h3'>
                                <h3>Việc làm đã nộp</h3>
                            </div>
                        </div>
                        <div className='widget-body'>
                                <div className='content'><p>Bạn đã ứng tuyển vào các vị trí tuyển dụng trong 6 tháng gần nhất <br/>Danh Sách Việc Làm Đã Ẩn</p></div>
                            </div>
                        <div className='justify-content-around align-item-center'>
                        <table class="table caption-top bg-white rounded  table-striped ">
                            <thead className='table-light'>
                                <tr>
                                    <th scope="col">Chức danh</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Ngày nộp</th>
                                    <th scope="col">Hồ sơ ứng tuyển</th>
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

export default CvApply;