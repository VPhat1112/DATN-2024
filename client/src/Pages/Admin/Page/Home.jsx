import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { apiAllUser, apiApplyCvthisMonth, apifilterUsers, apiUserDay, apiUserMonth } from '../../../api/Admin';
import  Swal  from 'sweetalert2';

function Home() {
    const [Users,setUsers] = useState([]);
    const [UsersMonth,setUserMonths]=useState([]);
    const [Cv,setCvs] = useState([]);
    const [numberUsers,setNumberUsers]=useState([]);


    const[inputs,setInputs]=useState({
        email:'',
        firstname:'',
        lastname:'',
        address:'',
        phonenumber:'',
        genber:''
    })
    const handleChange = e =>{
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } 
    const handleSubmitSearch = async (e) =>{
        e.preventDefault();
        try {
            const res = await apifilterUsers(inputs);
            setUsers(res.data.dataUsers);
        } catch (error) {
            Swal.fire("Lỗi!", error.response.data.mes, "error");
            setLoading(false)
        }
        
    }


    const fetchDataUsers= async()=>{
        try {
            const res = await apiAllUser({});
            setUsers(res.data.response);
            // console.log(res.data.response);
        } catch (error) {
            console.log(error)
        }
    };

    const fetchDataUsersMonth= async()=>{
        try {
            const res = await apiUserMonth({});
            setUserMonths(res.data.data.totalNewUserDay);
            // console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    };

    const fetchDataNumberUser = async()=>{
        try {
            const res = await apiUserDay({});
            setNumberUsers(res.data.data.totalNewUserDay)
            // console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    const fetchDataNumberCV = async()=>{
        try {
            const res = await apiApplyCvthisMonth({});
            setCvs(res.data.data.totalcvsMonth)
            // console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(inputs)
    useEffect(()=>{
        

        fetchDataUsersMonth();
        fetchDataUsers();
        fetchDataNumberUser();
        fetchDataNumberCV();
    },[])
    return (
        <div className='px-3'>
            <Navbar />
            <div className='container-fluid'>
                <div className='row g-3 my-2'>
                    <div className='col-md-3 p-1'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-item-center rounded'>
                            <div>
                                <p className='fs-5'>New Users on day</p>
                                <h3 className='fs-2'>{numberUsers}</h3>
                            </div>
                            <i className='bi bi-people p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-3 p-1'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-item-center rounded'>
                            <div>
                                <p className='fs-5'>New Users on Month</p>
                                <h3 className='fs-2'>{UsersMonth}</h3>
                            </div>
                            <i className='bi bi-file-earmark-person-fill p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-3 p-1'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-item-center rounded'>
                            <div>
                                <p className='fs-5'>Apply CV</p>
                                <h3 className='fs-2'>{Cv}</h3>
                            </div>
                            <i className='bi bi-file-earmark-person-fill p-3 fs-1'></i>
                        </div>
                    </div>
                    
                </div>
            </div>
            <table class="table caption-top bg-white rounded ">
                <caption className='text-white fs-4'>New User</caption>
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">email</th>
                        <th scope="col">address</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">gender</th>
                        <th scope="col">image</th>
                        <th scope="col">phone</th>
                    </tr>
                </thead>
                <tbody>
                    {Users.map(user=>(<>
                        <tr>
                        <th scope="row">{user.id}</th>
                        <td>{user.email}</td>
                        <td>{user.seeker.address}</td>
                        <td>{user.seeker.firstname}</td>
                        <td>{user.seeker.lastname}</td>
                        <td>{user.seeker.genber}</td>
                        <td><img src={user.seeker.image} /></td>
                        <td>{user.seeker.phonenumber}</td>
                    </tr>
                    </>))}
                </tbody>
            </table>


            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Search
            </button>

            <div class="collapse" id="collapseExample">
            <div class="card card-body">
                <form class="row g-3 my-2 p-1">
                        <div class="col-md-4">
                            <label for="FirstName" class="form-label">First name</label>
                            <input type="text"  onChange={handleChange} class="form-control" name='firstname' id="FirstName" required/>
                        </div>
                        <div class="col-md-4">
                            <label for="LastName" class="form-label">Last name</label>
                            <input type="text" onChange={handleChange} name='lastname' class="form-control" id="LastName" required/>
                        </div>
                        <div class="col-md-4">
                            <label for="UserName" class="form-label">email</label>
                            <div class="input-group">
                                <span class="input-group-text" id="inputGroupPrepend2">@</span>
                                <input type="text" name='email' onChange={handleChange} class="form-control" id="UserName" aria-describedby="inputGroupPrepend2" required/>
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="Address" class="form-label">Address</label>
                            <input type="text" name='address' onChange={handleChange} class="form-control" id="Address"  required/>
                        </div>
                        
                        
                        <div class="col-md-4">
                            <label for="Gender" class="form-label">Gender</label>
                            <select name='genber' onChange={handleChange} class="form-select" id='Gender' aria-label="Default select example">
                                <option  selected></option>
                                <option value="Nam" >Male</option>
                                <option value="Nữ">Female</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="Phone" class="form-label">Phone</label>
                            <input onChange={handleChange} name='phonenumber'  type="tel" class="form-control" id="Phone"  required/>
                        </div>
                        <div class=" d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-primary " onClick={handleSubmitSearch} type="submit">Submit form</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;