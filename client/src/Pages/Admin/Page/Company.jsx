import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { apiAllCompany } from '../../../api/Admin';
import './Company.css'

function Company() {

    const [Companies,setCompanies] = useState([])

    useEffect(()=>{
        const fetchDataCompanies= async()=>{
            try {
                const res = await apiAllCompany({});
                setCompanies(res.data.response);
                // console.log(res.data);
            } catch (error) {
                console.log(error)
            }
        };
        fetchDataCompanies();
    },[])


    return (
        <div className='px-3'>
            <div className='container-fluid'>
                <div className='row g-3 my-2'>
                    <div className='col-md-3 p-1'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-item-center rounded'>
                            <div>
                                <p className='fs-5'>New Comapny on day</p>
                                {/* <h3 className='fs-2'>{numberUsers}</h3> */}
                            </div>
                            <i className='bi bi-people p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-3 p-1'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-item-center rounded'>
                            <div>
                                <p className='fs-5'>New Company on Month</p>
                                {/* <h3 className='fs-2'>{UsersMonth}</h3> */}
                            </div>
                            <i className='bi bi-file-earmark-person-fill p-3 fs-1'></i>
                        </div>
                    </div>
                    {/* <div className='col-md-3 p-1'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-item-center rounded'>
                            <div>
                                <p className='fs-5'>ApplyCV</p>
                                <h3 className='fs-2'>{Cv}</h3>
                            </div>
                            <i className='bi bi-file-earmark-person-fill p-3 fs-1'></i>
                        </div>
                    </div> */}
                    
                </div>
            </div>
            <table class="table caption-top bg-white rounded ">
                <caption className='text-white fs-4'>New User</caption>
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">email</th>
                        <th scope="col">address</th>
                        <th scope="col">name Company</th>
                        <th scope="col">number Employees</th>
                        <th scope="col">contact Person</th>
                        <th scope="col">phone Contact</th>
                        <th scope="col">type Company</th>
                        <th scope="col">image</th>
                        <th scope="col">National</th>
                        <th scope="col">Company description</th>
                    </tr>
                </thead>
                <tbody>
                    {Companies.map(company=>(<>
                        <tr>
                            <th scope="row">{company.id}</th>
                            <td>{company.email}</td>
                            <td>{company.Company.Address}</td>
                            <td>{company.Company.nameCompany}</td>
                            <td>{company.Company.numberEmployees}</td>
                            <td>{company.Company.contactPerson}</td>
                            <td>{company.Company.phoneContact}</td>
                            <td>{company.Company.typeCompany}</td>
                            <td><img className='imageC' src={company.Company.image} /></td>
                            <td>{company.Company.National}</td>
                            <td>{company.Company.Company_description}</td>
                        </tr>
                    </>))}
                </tbody>
            </table>
        </div>
    );
}

export default Company;