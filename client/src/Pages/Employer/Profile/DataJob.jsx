import React from 'react';

function DataJob(props) {
    return (
        <div className='border border-1'>
                        <table class="table caption-top bg-white rounded  table-striped ">
                                    <thead className='table-light'>
                                        <tr>
                                            <th scope="col">Chức danh</th>
                                            <th scope="col">Ngày đăng</th>
                                            <th scope="col">Lượt xem </th>
                                            <th scope="col">Lượt nộp</th>
                                            <th scope="col">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope='col'><a href='/ProfileEml/Jobs/DetailJob'>Test</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
    );
}

export default DataJob;