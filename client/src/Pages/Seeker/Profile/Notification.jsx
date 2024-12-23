import React, { useEffect, useState } from 'react';
import './Notification.css'
import { getNotification } from '../../../api';
import { formatDate } from './../../../../Utils/dateUtils';

function Notification(props) {
    const[NOtification,setNotification] = useState([]);
    
    const user = JSON.parse(localStorage.getItem('user'))
    const fetchDataNotification = async() =>{
        try {
            const response= await getNotification(user.id);
            setNotification(response.data.jobData);
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchDataNotification();
    },[])

    // console.log(NOtification)
    return (
        <div className='content-inner'>
            <div className='container-fluid'>
                <div className=' g-3 my-2 p-3 bg-white shadow-sm  rounded'>
                    <div className='widget widget-10'>
                        <div className='widget-head'>
                            <div className='cb-title-h3'>
                                <h3>Thông báo việc làm </h3>
                            </div>
                        </div>
                        <div className='justify-content-around'>
                            <div className='widget-body'>
                                <div className='content'><p>Bạn có thể nhận được thông báo từ các công việc bạn đã nộp hồ sơ tại đây</p></div>
                            </div>
                            <table class="table caption-top bg-white rounded  table-striped ">
                                <thead className='table-light'>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Ngày tạo</th>
                                        <th scope="col">Nội dung</th>
                                        <th scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {NOtification && Object.keys(NOtification) ? (
                                        NOtification.map(Notification=>(
                                        <tr>
                                            <th scope="row">{Notification.id} </th>
                                            <th >{formatDate(Notification.createdAt)} </th>
                                            <th >{Notification.notification_content} </th>
                                            <th ><i className='bi bi-delete'></i></th>
                                        </tr>
                                    ))
                                    ):(<></>)

                                    }
                                    
                                </tbody>

                            </table>

                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <a class="btn btn-info" type="button"><i className='bi bi-plus-lg'>Tạo mới</i></a>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Notification;