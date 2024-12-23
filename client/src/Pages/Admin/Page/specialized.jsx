import React, { useEffect, useRef, useState } from 'react';
import { apiAllSpe, apiUpdateSpe } from '../../../api/Admin';
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function specialized() {

    const [specialize,setspecialized] = useState([])
    const [selectedSpe, setSelectedSpe] = useState({});
    const [inputs,setInputs] = useState({
        Specialized_name:'',
        Specialized_description:''
    })

    // const SpId =''

    const handleChange = e =>{
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } 


    const handleShow = (spe) =>{
        setSelectedSpe(spe)
        console.log(selectedSpe)
    } 


    const closeModalRef = useRef(null);
    // console.log(inputs)

    
    const fetchDataSpe = async()=>{
        try {
            const res = await apiAllSpe();
            setspecialized(res.data.response);
            // console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitCreate = async(e) =>{
        e.preventDefault();
        try {
            const SpId=''
            const res = await apiUpdateSpe(SpId,inputs);
            // console.log(res)
            
            
            // toast.success(res.data.mes, {
            //     position: toast.POSITION.TOP_RIGHT,
            // });
            Swal.fire("Cập nhật!", res.data.mes, "success");
            fetchDataSpe();
            closeModalRef.current.click();
            setLoading(false);
            
        } catch (error) {
            // console.log(error)
            Swal.fire("Error!", error.response.data, "error");
        } 
    }

    const handleSubmitUpdate = async(e) =>{
        e.preventDefault();
        try {
            const SpId=selectedSpe.id;
            const res = await apiUpdateSpe(SpId,inputs);
            Swal.fire("Cập nhật!", res.data.mes, "success");
            fetchDataSpe();
            closeModalRef.current.click();
            setLoading(true);
        } catch (error) {
            Swal.fire("Error!", error.response.data, "error");
            setLoading(false)
        }
    }

    useEffect(()=>{
        
        fetchDataSpe();
    },[selectedSpe])

    return (
        <div className='px-3'>
            <table  class="table table-bordered caption-top bg-white rounded ">
                <caption className='text-white fs-4'>specialized</caption>
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">name</th>
                        <th scope="col">Specialized_description</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {specialize.map(specia=>(<>
                        <tr>
                            <th scope="row">{specia.id}</th>
                            <td>{specia.Specialized_name}</td>
                            <td>{specia.Specialized_description}</td>
                            <td><button><i onClick={()=>handleShow(specia)} data-bs-toggle="modal" data-bs-target="#updateModal" class="bi bi-pen"></i></button></td>
                        </tr>
                    </>))}
                    <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td><button data-bs-toggle="modal" data-bs-target="#createModal"><i class="bi bi-plus-lg"></i></button></td>
                    </tr>
                </tbody>
            </table>
            
                {/* <!-- Modal update-->  */}
            <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Update specialized</h1>
                        <button  type="button" ref={closeModalRef} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="Specialized_name" class="form-label">Name</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                defaultValue={selectedSpe.Specialized_name}
                                name='Specialized_name'
                                class="form-control"
                                id="Specialized_name"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Description</label>
                            <textarea type="text" onChange={handleChange} 
                            defaultValue={selectedSpe.Specialized_description} 
                            name='Specialized_description' class="form-control" 
                            id="exampleInputPassword1" aria-label="With textarea"/>
                        </div>
                        <div className='d-flex'>
                            <button type="submit" onClick={handleSubmitUpdate} class="btn btn-primary">Submit</button>
                        </div>
                            
                    </form>
                    </div>
                    </div>
                </div>
                </div>

                 {/* <!-- Modal create-->  */}
                <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">New specialized</h1>
                        <button  type="button" ref={closeModalRef} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input type="text" onChange={handleChange} name='Specialized_name' class="form-control" id="exampleInputEmail1" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Description</label>
                            <textarea type="text" onChange={handleChange} name='Specialized_description' class="form-control" id="exampleInputPassword1" aria-label="With textarea"/>
                        </div>
                        <div className='d-flex'>
                            <button type="submit" onClick={handleSubmitCreate} class="btn btn-primary">Submit</button>
                        </div>
                            
                    </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        
    );
}

export default specialized;