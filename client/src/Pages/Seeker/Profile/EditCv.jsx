import React, { useCallback, useEffect, useRef, useState } from 'react';
import './EditCv.css'
import { apigetCurrent, apiUpdateSeeker, apiUpdateUSer } from '../../../api/user';
import { apiGetCv, apiUpdateCv, apiupdateEdu, apiupdateEx, apiUpdateInforJob, apiupdateLanguage, apiupdateProject, apiupdateSkill } from '../../../api/cv';
import Swal from 'sweetalert2';
import { apiAllSpe } from '../../../api/Admin';

function EditCv() {
    const User = JSON.parse(localStorage.getItem('user'));
    const [Infor_User, setInfor_User] = useState([]);
    const [OwnCv,setOwnCv] = useState([]);

    const [Information,setInformation] = useState({});

    const [Specia,setSpecia] = useState([]);
    const [loading, setLoading] = useState(false);
    const MAX_FILE_SIZE_MB = 2;

    const [selectedu,setSelectEdu]=useState([]);
    const [selectExp,setSelectExp]=useState([]);
    const [selectLan,setSelectLan]=useState([]);
    const [selectSkill,setSelectSkill]=useState([]);
    const [selectPro,setSelectPro]=useState([]);

    const [inputs,setInputs] = useState({
        seeker_id:User.seeker.id
    });
    const [isImage, setIsImage] = useState(false);

    const handleShow = (Item,select) =>{
        switch (select) {
            case 1:
                setSelectEdu(Item);
                break;
            case 2:
                setSelectExp(Item);
                break;
            case 3:
                setSelectLan(Item);
                break;
            case 4:
                setSelectSkill(Item);
                break;
            case 5:
                setSelectPro(Item);
                break;
            default:
                break;
        }
    } 




    const resetinput = () =>{
        try {
            setInputs({
                seeker_id:User.seeker.id
            })
        } catch (error) {
            console.log(error)
        }
    }
    const fetchDataUser = async () => {
        try {
            const currentUser = await apigetCurrent(User.id);
            setInfor_User(currentUser.data.response);
            const CvUser = await apiGetCv(User.id);
            setOwnCv(CvUser.data.CvData[0])
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchDataSpe = async() =>{
            try {
                const res = await apiAllSpe();
                setSpecia(res.data.response);
            } catch (error) {
                console.log(error)
            }
        }   

    const chooseFile = () =>{
        const inputFile= document.getElementById("fileAvatar");
        inputFile.click();
    }

    const UploadAvatar = useCallback(async (currentInformation) => {
        const Uid = User.seeker.id;
    
        try {
            const response = await apiUpdateSeeker(Uid, currentInformation);
            console.log("Response từ server:", response);
            fetchDataUser();
        } catch (error) {
            console.error("Lỗi upload", error);
            throw error;
        }
    }, []);
    const handleImage = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];

        if (!file) {
            return;
        }
        const fileSizeInMB = file.size / (1024 * 1024);
        console.log(fileSizeInMB)
        
        
        if (fileSizeInMB > MAX_FILE_SIZE_MB) {
            Swal.fire('UploadFile!', `File quá lớn. Vui lòng chọn file dưới ${MAX_FILE_SIZE_MB} MB.`, 'error');
            return;
        }

        setLoading(true);

        const reader = new FileReader();

        reader.onload = async () => {
            setInformation((prev) => ({ ...prev, image: reader.result }));
            try {
                await UploadAvatar({...Information, image: reader.result});
            } catch (uploadError) {
                console.log("Lỗi upload avatar:", uploadError);
            } finally {
                setLoading(false);
            }
        };

        reader.onerror = (readError) => {
            console.log("Lỗi khi đọc file:", readError);
            setLoading(false);
        };
    
        reader.readAsDataURL(file);
    };

    console.log(Information)

    const closeModalRef = useRef(null)

    
    

    const handleChange = e =>{
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } 
    // console.log(Infor_User)

    const handleSubmittest = async(e,select) =>{
        e.preventDefault()
        try {
            switch (select) {
                case 1:
                    // Update Cv
                    if(OwnCv){
                        const CvID =OwnCv.id
                        const response = await apiUpdateCv(CvID,inputs);
                        if(response.data.err=='0'){
                            Swal.fire('Cập nhật cv!', 'Cập nhật tiêu đề thành công.', 'success');
                            fetchDataUser()
                            closeModalRef.current.click()
                            resetinput();
                            setLoading(false);
                        }
                    }else{
                        const CvID =''
                        const response = await apiUpdateCv(CvID,inputs);
                        if(response.data.err=='0'){
                            Swal.fire('Cập nhật cv!', 'Cập nhật tiêu đề thành công.', 'success');
                            fetchDataUser();
                            resetinput();
                            closeModalRef.current.click()
                            setLoading(false);
                        }
                    }
                    break;
                case 2:
                    // Update Information
                    const Uid =User.seeker.id
                    const response = await apiUpdateSeeker(Uid,Information);
                    // console.log(response)
                    if(response.data.err=='0'){
                        Swal.fire('Cập nhật cv!', 'Cập nhật thông tin cá nhân thành công.', 'success');
                        fetchDataUser()
                        closeModalRef.current.click()
                        setLoading(false);
                    }else{
                        Swal.fire('Cập nhật cv!', 'Cập nhật thông tin cá nhân phát sinh lỗi!.', 'error');
                        setLoading(false);
                    }
                    break;
                case 3:
                    // Update Information-Job
                    if(Infor_User.seeker?.Information_Job.id==null){
                        const Info_id =''
                        const response = await apiUpdateInforJob(Info_id,inputs);
                        if(response.data.err=='0'){
                            Swal.fire('Cập nhật cv!', 'Cập nhật thông tin nghề nghiệp thành công.', 'success');
                            fetchDataUser()
                            closeModalRef.current.click()
                            resetinput();
                            setLoading(false);
                        }else{
                            Swal.fire('Cập nhật cv!', 'Cập nhật thông tin nghề nghiệp thành công.', 'error');
                            setLoading(false);
                        }
                    }else{
                        const Info_id =Infor_User.seeker?.Information_Job.id
                        const response = await apiUpdateInforJob(Info_id,inputs);
                        if(response.data.err=='0'){
                            Swal.fire('Cập nhật cv!', response.data.mes, 'success');
                            fetchDataUser()
                            resetinput();
                            closeModalRef.current.click()
                            setLoading(false);
                        }
                    }
                    break;
                case 4:
                    // Update Experience
                    if(selectExp.id==null){
                        const Eid =''
                        const response = await apiupdateEx(Eid,inputs);
                        if(response.data.err=='0'){
                            Swal.fire('Cập nhật cv!', 'Cập nhật thông tin kinh nghiệm thành công.', 'success');
                            fetchDataUser()
                            closeModalRef.current.click()
                            resetinput();
                            setLoading(false);
                        }else{
                            Swal.fire('Cập nhật cv!', 'Cập nhật thông tin kinh nghiệm thành công.', 'error');
                            setLoading(false);
                        }
                    }else{
                        const Eid =selectExp.id
                        const response = await apiupdateEx(Eid,inputs);
                        if(response.data.err=='0'){
                            Swal.fire('Cập nhật cv!', response.data.mes, 'success');
                            fetchDataUser()
                            resetinput();
                            closeModalRef.current.click()
                            setLoading(false);
                        }
                    }
                    break;
                case 5:
                    // Update Education
                    if(selectedu.id==null){
                        const Did =''
                        const response = await apiupdateEdu(Did,inputs);
                        if(response.data.err=='0'){
                            Swal.fire('Cập nhật cv!', 'Cập nhật thông tin học vấn thành công.', 'success');
                            fetchDataUser()
                            closeModalRef.current.click()
                            resetinput();
                            setLoading(false);
                        }else{
                            Swal.fire('Cập nhật cv!', 'Cập nhật thông tin học vấn thành công.', 'error');
                            setLoading(false);
                        }
                    }else{
                        const Did =selectedu.id
                        const response = await apiupdateEdu(Did,inputs);
                        if(response.data.err=='0'){
                            Swal.fire('Cập nhật cv!', response.data.mes, 'success');
                            fetchDataUser()
                            resetinput();
                            closeModalRef.current.click()
                            setLoading(false);
                        }
                    }
                    break;
                case 6:
                        // // Update Skill
                        if(selectSkill.id==null){
                            const Sid =''
                            const response = await apiupdateSkill(Sid,inputs);
                            if(response.data.err=='0'){
                                Swal.fire('Cập nhật cv!', 'Cập nhật thông tin kỹ năng thành công.', 'success');
                                fetchDataUser()
                                closeModalRef.current.click()
                                resetinput();
                                setLoading(false);
                            }else{
                                Swal.fire('Cập nhật cv!', 'Cập nhật thông tin kỹ năng thành công.', 'error');
                                setLoading(false);
                            }
                        }else{
                            const Sid =selectSkill.id
                            const response = await apiupdateSkill(Sid,inputs);
                            if(response.data.err=='0'){
                                Swal.fire('Cập nhật cv!', response.data.mes, 'success');
                                fetchDataUser()
                                resetinput();
                                closeModalRef.current.click()
                                setLoading(false);
                            }
                        }
                        break;
                    case 6:
                        // Update Project
                        if(selectPro.id==null){
                            const Pid =''
                            const response = await apiupdateProject(Pid,inputs);
                            if(response.data.err=='0'){
                                Swal.fire('Cập nhật cv!', 'Cập nhật thông tin dự án thành công.', 'success');
                                fetchDataUser()
                                closeModalRef.current.click()
                                resetinput();
                                setLoading(false);
                            }else{
                                Swal.fire('Cập nhật cv!', 'Cập nhật thông tin dự án thành công.', 'error');
                                setLoading(false);
                            }
                        }else{
                            const Pid =selectPro.id
                            const response = await apiupdateProject(Pid,inputs);
                            if(response.data.err=='0'){
                                Swal.fire('Cập nhật cv!', response.data.mes, 'success');
                                fetchDataUser()
                                resetinput();
                                closeModalRef.current.click()
                                setLoading(false);
                            }
                        }
                        break;
                    case 6:
                        // Update Language
                        if(selectLan.id==null){
                            const Lid =''
                            const response = await apiupdateLanguage(Lid,inputs);
                            if(response.data.err=='0'){
                                Swal.fire('Cập nhật cv!', 'Cập nhật thông tin ngoại ngữ thành công.', 'success');
                                fetchDataUser()
                                closeModalRef.current.click()
                                resetinput();
                                setLoading(false);
                            }else{
                                Swal.fire('Cập nhật cv!', 'Cập nhật thông tin ngoại ngữ thành công.', 'error');
                                setLoading(false);
                            }
                        }else{
                            const Lid =selectLan.id
                            const response = await apiupdateLanguage(Lid,inputs);
                            if(response.data.err=='0'){
                                Swal.fire('Cập nhật cv!', response.data.mes, 'success');
                                fetchDataUser()
                                resetinput();
                                closeModalRef.current.click()
                                setLoading(false);
                            }
                        }
                        break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleChangeInfor = e =>{
        setInformation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } 


    // ------------------------------------------------------------------------------------//
    const isComplete = 
        Infor_User && 
        Infor_User.seeker && 
        Object.values(Infor_User.seeker).every(
            (value) => value !== null && value !== ''
        );

    const isCompleteExp = 
        Infor_User && 
        Infor_User.seeker?.experiences && 
        Object.values(Infor_User.seeker?.experiences).every(
            (value) => value !== null && value !== ''
        );

    
    
    const isCompleteInforJob = 
        Infor_User && 
        Infor_User.seeker?.Information_Job && 
        Object.values(Infor_User.seeker?.Information_Job).every(
            (value) => value !== null && value !== ''
        );
    useEffect(()=>{
        fetchDataUser();
        fetchDataSpe();
    },[])

    // console.log(Information)

    return (
        <div className='content-inner'>
            <div className='container-fluid'>
                <div className='g-3 my-2 p-3 bg-white shadow-sm rounded'>
                    <h2><strong>My Profile</strong></h2>
                    <div className='d-flex'>
                        <div>
                            <div className='profileText p-4'>
                                <div className='imgBx'>
                                    <img  src={Infor_User.seeker?.image} alt=''></img>
                                </div>
                            </div>
                            <ul>
                                <li  className=' link-image'>
                                    <input class="hidden" id="fileAvatar" onChange={handleImage} type="file" name="image"></input>
                                    <a onClick={chooseFile} className='uploadImg'><i class="bi bi-image-fill p-2"></i>Tải hình ảnh</a>
                                </li>
                                <li  className=' link-image'><a className='uploadImg'>
                                    <i class="bi bi-x-circle p-2"></i>Xóa hình ảnh</a>
                                </li>
                            </ul>
                        </div>
                        <div className='p-4'>
                            <h3>{Infor_User.seeker?.firstname} {Infor_User.seeker?.lastname}</h3>
                        </div>
                    </div>
                    
                    
                </div>


                {/* Tiêu đề hồ sơ * */}
                <div className='widget widget-24'>
                    {OwnCv? (<>
                        <div className='widget-head'>
                            <div className='cb-title-h3'>
                                    <div className='figure'>
                                        <div class="image"><img src="https://static.careerviet.vn/themes/careerbuilder/img/dash-board/i14.png" alt=""/></div>
                                        <div class="figcaption">
                                        <h3>Tiêu đề hồ sơ *</h3>
                                        <div class="success">
                                            <p>Hoàn thành</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className='right-action'>
                                        <div class="link-edit">
                                            <a href="" data-bs-toggle="modal" data-bs-target="#TitleCV" ><i class="bi bi-pencil"></i><span>Chỉnh sửa</span></a>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div class="widget-body">
                            <p style={{color:'#5D677A'}}>{OwnCv.title}</p>
                            <input type="hidden" id="title_hidden_value" value={OwnCv.title}/>
                        </div>

                    </>):(<>
                        <div className='widget-head'>
                            <div className='cb-title-h3'>
                                    <div className='figure'>
                                        <div class="image"><img src="https://static.careerviet.vn/themes/careerbuilder/img/dash-board/i14.png" alt=""/></div>
                                        <div class="figcaption">
                                        <h3>Tiêu đề hồ sơ *</h3>
                                        {/* <div class="success hidden">
                                            <p>Hoàn thành</p>
                                        </div> */}
                                        <div class="error">
                                            <p>Chưa hoàn thành</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className='right-action'>
                                        <div class="link-edit">
                                            <a href="" data-bs-toggle="modal" data-bs-target="#TitleCV" ><i class="bi bi-pencil"></i><span>Chỉnh sửa</span></a>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </>)}
                    
                </div>


                <div class="modal fade" id="TitleCV" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Tiêu đề hồ sơ</h1>
                            <button  type="button" 
                            ref={closeModalRef} 
                            class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <form>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Tiêu đề</span>
                                {OwnCv? (<>
                                    <input type="text" defaultValue={OwnCv.title} name='title' onChange={handleChange} class="form-control" aria-describedby="basic-addon1"/>
                                </>):(<>
                                    <input type="text" name='title' onChange={handleChange} class="form-control" aria-describedby="basic-addon1"/>
                                </>)}
                            </div>
                            <div className='d-flex'>
                                <button type="submit" 
                                onClick={(e)=>handleSubmittest(e,1)} 
                                class="btn btn-primary">Lưu lại</button>
                            </div>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>



                {/* Thông tin cá nhân */}
                <div className='widget widget-24'>
                    <div className='widget-head'>
                        <div className='cb-title-h3'>
                                <div className='figure'>
                                    <div class="image"><img src="https://static.careerviet.vn/themes/careerbuilder/img/dash-board/i2.png" alt=""/></div>
                                    <div class="figcaption">
                                    <h3>Thông tin cá nhân *</h3>
                                    {isComplete ? (
                                        <div class="success">
                                            <p>Hoàn thành</p>
                                        </div>
                                    ) : (
                                        <div class="error">
                                            <p>Chưa hoàn thành</p>
                                        </div>
                                    )}
                                </div>
                                </div>
                                <div className='right-action'>
                                    <div class="link-edit">
                                        <a href="" data-bs-toggle="modal" data-bs-target="#Infor"><i class="bi bi-pencil"></i><span>Chỉnh sửa</span></a>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="widget-body border border-1 p-2">
                    <div>
                        <table>
                        <tbody>
                            <tr>
                                <td>Họ và Tên Lót</td>
                                <td>{Infor_User.seeker?.firstname}</td>
                            </tr>
                            <tr>
                                <td>Tên</td>
                                <td>{Infor_User.seeker?.lastname}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{Infor_User.email}</td>
                            </tr>
                            <tr>
                                <td>Quốc tịch</td>
                                <td>{Infor_User.seeker?.Nationality}</td>
                            </tr>
                            <tr>
                                <td>Tình trạng hôn nhân</td>
                                <td>{Infor_User.seeker?.Married}</td>
                            </tr>
                            <tr>
                                <td>Giới tính</td>
                                <td>{Infor_User.seeker?.genber}</td>
                            </tr>
                            <tr>
                                <td>Quốc gia</td>
                                <td>{Infor_User.seeker?.National}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>


                <div class="modal fade" id="Infor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Thông tin cá nhân </h1>
                            <button  type="button" 
                            ref={closeModalRef} 
                            class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <form>
                            <div className='row'>
                                <div className='col-6'>
                                    <div class="mb-3">
                                        <label class="form-label">*Họ và tên lót</label>
                                        <input type="text" onChange={handleChangeInfor} 
                                        defaultValue={Infor_User.seeker?.firstname} 
                                        class="form-control" 
                                        name='firstname'
                                        />
                                    </div>
                                    <label class="form-label">Giới tính</label>
                                    <div className='d-flex p-7'>
                                        <div class="form-check form-check-inline ">
                                            <input class="form-check-input" defaultChecked={Infor_User.seeker?.genber==="Nam"} type="radio" name="genber" onChange={handleChangeInfor} value="Nam"/>
                                            <label class="form-check-label" for="requiementAll2">Nam</label>
                                        </div>
                                        <div class="form-check form-check-inline ">
                                            <input class="form-check-input" defaultChecked={Infor_User.seeker?.genber==="Nữ"} type="radio" name="genber" onChange={handleChangeInfor} value="Nữ"/>
                                            <label class="form-check-label" for="requiementAll3">Nữ</label>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" style={{marginTop:'28px'}}>*Số điện thoại</label>
                                        <input type="phone" name='phonenumber'  onChange={handleChangeInfor} defaultValue={Infor_User.seeker?.phonenumber} class="form-control"  />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">*Quốc tịch</label>
                                        <select id="inputNational" class="form-select" name='Nationality' defaultValue={Infor_User.seeker?.Nationality} onChange={handleChangeInfor}>
                                            <option value="Người Việt Nam">Người Việt Nam</option>
                                            <option value="Người Nhật Bản">Người Nhật Bản</option>
                                            <option value="Người Trung Quốc">Người Trung Quốc</option>
                                            <option value="Người Lào">Người Lào</option>
                                            <option value="Người Đài Loan">Người Đài Loan</option>
                                        </select>
                                    </div>
                                    <div class="col-12">
                                        <label for="inputNational" class="form-label">Chọn Quốc gia</label>
                                        <select id="inputNational" class="form-select" name='National' defaultValue={Infor_User.seeker?.National} onChange={handleChangeInfor}>
                                            <option selected>Vui lòng chọn quốc gia</option>
                                            <option value="Việt Nam">Việt Nam</option>
                                            <option value="Nhật Bản">Nhật Bản</option>
                                            <option value="Trung Quốc">Trung Quốc</option>
                                            <option value="Lào">Lào</option>
                                            <option value="Đài Loan">Đài Loan</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div class="mb-3">
                                        <label class="form-label">*Tên</label>
                                        <input type="text" name='lastname' onChange={handleChangeInfor} defaultValue={Infor_User.seeker?.lastname} class="form-control" style={{background:'#fff'}} />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">*Ngày sinh</label>
                                        <input type="date" name='DateBirth' onChange={handleChangeInfor} defaultValue={Infor_User.seeker?.DateBirth} class="form-control"  />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">*Email</label>
                                        <input type="email" disabled  name='email' onChange={handleChangeInfor} defaultValue={Infor_User.email} class="form-control"/>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">*Tình trạng hôn nhân</label>
                                        <select id="inputNational" class="form-select" name='Married' defaultValue={Infor_User.seeker?.Married} onChange={handleChangeInfor}>
                                            <option value="Độc thân">Độc thân</option>
                                            <option value="Đã kết hôn">Đã kết hôn</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">*Địa chỉ</label>
                                        <input type="text" name='address' onChange={handleChangeInfor} defaultValue={Infor_User.seeker?.address} class="form-control" style={{background:'#fff'}}/>
                                    </div>
                                </div>
                            </div>



                            <button type="submit" onClick={(e)=>handleSubmittest(e,2)} class="btn btn-primary">Lưu lại</button>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>
                
                {/* Mục tiêu nghề nghiệp */}
                <div className='widget widget-24'>
                    <div className='widget-head'>
                        <div className='cb-title-h3'>
                                <div className='figure'>
                                    <div class="image"><img src="https://static.careerviet.vn/themes/careerbuilder/img/dash-board/i3.png" alt=""/></div>
                                    <div class="figcaption">
                                    <h3>Mục tiêu nghề nghiệp *</h3>
                                    {OwnCv && OwnCv.Career_goal ? (<>
                                        <div class="success">
                                            <p>Hoàn thành</p>
                                        </div>
                                    </>):(<>
                                        <div class="error">
                                            <p>Chưa hoàn thành</p>
                                        </div>
                                    </>)}
                                </div>
                                </div>
                                <div className='right-action'>
                                    <div class="link-edit">
                                        <a href="" data-bs-toggle="modal" data-bs-target="#Target"><i class="bi bi-pencil"></i><span>Chỉnh sửa</span></a>
                                    </div>
                                </div>
                        </div>
                    </div>
                    {OwnCv && OwnCv.Career_goal ? (<>
                        <div class="widget-body">
                            <div class="no-content p-2 row">
                                <p className='col-8'>{OwnCv.Career_goal}</p>
                                <a className='col-4' href="" data-bs-toggle="modal" data-bs-target="#Target" ><i class="bi bi-pencil-square"></i><span>Chỉnh sủa</span></a> 
                            </div>
                        </div>
                    </>):(<>
                        <div class="widget-body border border-1">
                            <div class="no-content p-2">
                                <p>Vui lòng thêm Mục tiêu nghề nghiệp</p>
                                <a href="" data-bs-toggle="modal" data-bs-target="#Target" ><i class="bi bi-plus-circle"></i><span>Thêm mới</span></a> </div>
                        </div>
                    </>)}
                    
                </div>

                <div class="modal fade" id="Target" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header ">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Mục tiêu nghề nghiệp </h1>
                            <button  type="button" 
                            ref={closeModalRef} 
                            class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <form>
                            
                            <div class="mb-3">
                                <textarea name='Career_goal' onChange={handleChange} defaultValue={OwnCv && OwnCv.Career_goal ? OwnCv.Career_goal : ""} type="text" class="form-control" style={{width:'100%',height:'200px'}} />
                            </div>
                            <button type="submit" onClick={(e)=>handleSubmittest(e,1)} class="btn btn-primary">Lưu lại</button>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Thông tin nghề nghiệp */}
                <div className='widget widget-24'>
                    <div className='widget-head'>
                        <div className='cb-title-h3'>
                                <div className='figure'>
                                    <div class="image"><img src="https://static.careerviet.vn/themes/careerbuilder/img/dash-board/i2.png" alt=""/></div>
                                    <div class="figcaption">
                                    <h3>Thông tin nghề nghiệp *</h3>
                                    {isCompleteInforJob ? (
                                        <div class="success">
                                            <p>Hoàn thành</p>
                                        </div>
                                    ) : (
                                        <div class="error">
                                            <p>Chưa hoàn thành</p>
                                        </div>
                                    )}
                                </div>
                                </div>
                                <div className='right-action'>
                                    <div class="link-edit">
                                        <a href="" data-bs-toggle="modal" data-bs-target="#InforJob"><i class="bi bi-pencil"></i><span>Chỉnh sửa</span></a>
                                    </div>
                                </div>
                        </div>
                    </div>
                    
                    <div className="widget-body border border-1 p-2">
                        <div>
                            <table>
                            <tbody>
                                <tr>
                                    <td>Cấp bậc mong muốn</td>
                                    <td>{Infor_User.seeker?.Information_Job.Desired_level}</td>
                                </tr>
                                <tr>
                                    <td>Mức lương</td>
                                    <td>{Infor_User.seeker?.Information_Job.Salary}</td>
                                </tr>
                                <tr>
                                    <td>Hình thức làm việc</td>
                                    <td>{Infor_User.seeker?.Information_Job.type_Work}</td>
                                </tr>
                                <tr>
                                    <td>Phương thức công việc</td>
                                    <td>{Infor_User.seeker?.Information_Job.work_methods}</td>
                                </tr>
                                <tr>
                                    <td>Ngành nghề</td>
                                    <td>{Infor_User.seeker?.Information_Job.Industry}</td>
                                </tr>
                                <tr>
                                    <td>Nơi làm việc</td>
                                    <td>{Infor_User.seeker?.Information_Job.Workplace}</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="InforJob" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Thông tin nghề nghiệp </h1>
                            <button  type="button" 
                            ref={closeModalRef} 
                            class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <form>
                            <div className='row'>
                                <div className='col-6'>
                                    <div class="mb-3">
                                        <label class="form-label">*Cấp bậc mong muốn</label>
                                        <input type="text" name='Desired_level' onChange={handleChange} defaultValue={Infor_User.seeker?.Information_Job.Desired_level} class="form-control" style={{background:'#fff'}}/>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">*Mức lương</label>
                                        <input type="text" name='Salary' onChange={handleChange} defaultValue={Infor_User.seeker?.Information_Job.Salary} class="form-control" style={{background:'#fff'}}/>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" >*Hình thức làm việc</label>
                                        {/* <input type="text" name='type_Work' onChange={handleChange} defaultValue={Infor_User.seeker?.Information_Job.type_Work} class="form-control" style={{background:'#fff'}} /> */}
                                        <select id="inputNational" class="form-select" name='type_Work' defaultValue={Infor_User.seeker?.Information_Job.type_Work} onChange={handleChange}>
                                            <option value="Sinh viên/ Thực tập sinh">Sinh viên/ Thực tập sinh</option>
                                            <option value="Mới tốt nghiệp">Mới tốt nghiệp</option>
                                            <option value="Nhân viên">Nhân viên</option>
                                            <option value="Trưởng nhóm/ Giám sát">Trưởng nhóm/ Giám sát</option>
                                            <option value="Quản lý/ Phó giám đốc">Quản lý/ Phó giám đốc</option>
                                            <option value="Giám đốc">Giám đốc</option>
                                            <option value="Tổng Giám đốc">Tổng Giám đốc</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div class="mb-3">
                                        <label class="form-label">*Nơi làm việc</label>
                                        <input type="text" name='Workplace' onChange={handleChange} defaultValue={Infor_User.seeker?.Information_Job.Workplace} class="form-control" style={{background:'#fff'}} />
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">*Phương thức công việc</label>
                                        {/* <input type="text" name='work_methods' onChange={handleChange} defaultValue={Infor_User.seeker?.Information_Job.work_methods} class="form-control"  style={{background:'#fff'}}/> */}
                                        <select id="inputNational" class="form-select" name='work_methods' defaultValue={Infor_User.seeker?.Information_Job.work_methods} onChange={handleChange}>
                                            <option value="Work at home">Work at home</option>
                                            <option value="Work at Company">Work at Company</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">*Ngành nghề</label>
                                        <select id="inputNational" class="form-select" name='Industry' defaultValue={Infor_User.seeker?.Information_Job.Industry} onChange={handleChange}>
                                        {Specia.map(spe=>(
                                                <>
                                                <option value={spe.Specialized_name}>{spe.Specialized_name}</option>
                                            </>
                                        ))}
                                        </select>
                                        
                                        {/* <input type="text" name='Industry' onChange={handleChange} defaultValue={Infor_User.seeker?.Information_Job.Industry} class="form-control"  style={{background:'#fff'}}/> */}
                                    </div>
                                </div>
                            </div>



                            <button type="submit" onClick={(e)=>handleSubmittest(e,3)}  class="btn btn-primary">Lưu lại</button>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>



                {/* Kinh nghiệm làm việc */}
                <div className='widget widget-24'>
                    <div className='widget-head'>
                        <div className='cb-title-h3'>
                                <div className='figure'>
                                    <div class="image"><img src="https://static.careerviet.vn/themes/careerbuilder/img/dash-board/i14.png" alt=""/></div>
                                    <div class="figcaption">
                                    <h3>Kinh nghiệm làm việc *</h3>
                                    {isCompleteExp? (<>
                                        <div class="success hidden">
                                            <p>Hoàn thành</p>
                                        </div>
                                    </>):(<>
                                        <div class="error">
                                            <p>Chưa hoàn thành</p>
                                        </div>
                                    </>)}
                                </div>
                                </div>
                                <div className='right-action'>
                                    <div class="link-edit">
                                        <a href="" data-bs-toggle="modal" data-bs-target="#ExpCompany" ><i class="bi bi-pencil"></i><span>Thêm mới</span></a>
                                    </div>
                                </div>
                        </div>
                    </div>

                    
                    { Infor_User.seeker?.experiences? (<>
                        
                        <div class="widget-body border border-1">
                            <div class="no-content p-2">
                                <p>Bạn hãy thêm kinh nghiệp làm việc của mình để nhà tuyển dụng tham khảo</p>
                                <a href="" ><i class="bi bi-plus-circle"></i><span>Thêm mới</span></a> 
                            </div>
                        </div>
                    </>):(<>
                        <div className='sticker'>
                            <ul className='list-sticker'>
                                <li className='item'>
                                    <div className='row'>
                                        <div className='col-11'>
                                            <h6 style={{fontWeight:'bold'}}>web developer</h6>
                                            <div className='sub-title'>
                                                <p>SUn Gansk</p>
                                            </div>
                                            <div className='date'>
                                                <p>02/2024 - Hiện tại</p>
                                            </div>
                                            
                                        </div>
                                        <ul class="col-1">
                                            <li style={{display:'inline'}} class="edit-link"><a href=""  onclick=""> <i class="bi bi-pencil"></i></a></li>
                                            <li style={{display:'inline'}} class="delete"><a href="" onclick=""> <i class="bi bi-x-circle"></i></a></li>
                                        </ul>
                                        <div className='col-4'></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </>)

                    }
                    
                </div>


                <div class="modal fade" id="ExpCompany" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header ">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Kinh nghiệm làm việc </h1>
                            <button  type="button" 
                            // ref={closeModalRef} 
                            class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">*Vị trí chức danh</label>
                                <input type="text" name='job_title' onChange={handleChange} defaultValue={Infor_User.seeker?.experiences.job_title} class="form-control" />
                            </div>

                            <div class="mb-3">
                                <span class="form-label" >Công ty</span>
                                <input type="text" name='company' onChange={handleChange} defaultValue={Infor_User.seeker?.experiences.company} class="form-control" />
                            </div>
                            
                            <div class="mb-3">
                                <span class="form-label" >Ngày bắt đầu</span>
                                <input type="date" name='start_date' onChange={handleChange} defaultValue={Infor_User.seeker?.experiences.start_date} class="form-control" />
                            </div>
                            <div class="mb-3">
                                <span class="form-label" >Ngày kết thúc</span>
                                <input type="date" name='end_date' onChange={handleChange} defaultValue={Infor_User.seeker?.experiences.end_date} class="form-control" />
                            </div>
                            <div class="mb-3">
                                <span class="form-label" >Mô tả công việc</span>
                                <textarea type="text" name='description' onChange={handleChange}  defaultValue={Infor_User.seeker?.experiences.description} class="form-control" style={{background:'#fff',width:'100%',height:'100px'}}/>
                            </div>


                            <button type="submit" class="btn btn-primary">Lưu lại</button>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>



                
                {/* Học vấn */}
                <div className='widget widget-24'>
                    <div className='widget-head'>
                        <div className='cb-title-h3'>
                                <div className='figure'>
                                    <div class="image"><img src="https://static.careerviet.vn/themes/careerbuilder/img/dash-board/i14.png" alt=""/></div>
                                    <div class="figcaption">
                                    <h3>Học vấn *</h3>
                                    <div class="success hidden">
                                        <p>Hoàn thành</p>
                                    </div>
                                    <div class="error">
                                        <p>Chưa hoàn thành</p>
                                    </div>
                                </div>
                                </div>
                                <div className='right-action'>
                                    <div class="link-edit">
                                        <a href="" data-bs-toggle="modal" data-bs-target="#Education"><i class="bi bi-pencil"></i><span>Chỉnh sửa</span></a>
                                    </div>
                                </div>
                        </div>
                    </div>

                    
                    <div class="widget-body border border-1">
                        <div class="no-content p-2">
	                        <p>Nhập thông tin học vấn của bạn</p>
	                        <a href="" ><i class="bi bi-plus-circle"></i><span>Thêm mới</span></a> 
                        </div>
                        {/* <div class="content">
                        <p>Tester</p>
                        </div>
                        <input type="hidden" id="title_hidden_value" value="Tester"/> */}
                        <div class="experience">
                            <table>
                            <tbody>
                                <tr>
                                <td>Bằng cấp cao nhất</td>
                                <td id="txt-experience">Chưa có kinh nghiệm</td>
                                <td><div class="link-edit"><a href="" > <i class="bi bi-pencil"></i></a></div></td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="Education" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header ">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Học vấn </h1>
                            <button  type="button" 
                            ref={closeModalRef} 
                            class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">*Trường</label>
                                <input type="text" defaultValue={Infor_User.seeker?.education.university} class="form-control" />
                            </div>

                            <div class="mb-3">
                                <span class="form-label" >Bằng cấp</span>
                                <input type="text" defaultValue={Infor_User.seeker?.education.degree} class="form-control" />
                            </div>
                            <div class="mb-3">
                                <span class="form-label" >Tốt nghiệp</span>
                                <input type="date" defaultValue={Infor_User.seeker?.education.graduation_date} class="form-control" style={{background:'#fff',width:'100%'}}/>
                            </div>
                            <div class="mb-3">
                                <span class="form-label" >Chuyên ngành</span>
                                <textarea type="text" defaultValue={Infor_User.seeker?.education.major} class="form-control" style={{background:'#fff',width:'100%',height:'100px'}}/>
                            </div>


                            <button type="submit" onClick={(e)=>handleSubmittest(e,5)} class="btn btn-primary">Lưu lại</button>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Ngoại ngữ */}
                <div className='widget widget-24'>
                    <div className='widget-head'>
                        <div className='cb-title-h3'>
                                <div className='figure'>
                                    <div class="image"><img src="https://static.careerviet.vn/themes/careerbuilder/img/dash-board/i14.png" alt=""/></div>
                                    <div class="figcaption">
                                    <h3>Ngoại ngữ *</h3>
                                    <div class="success hidden">
                                        <p>Hoàn thành</p>
                                    </div>
                                    <div class="error">
                                        <p>Chưa hoàn thành</p>
                                    </div>
                                </div>
                                </div>
                                <div className='right-action'>
                                    <div class="link-edit">
                                        <a href="" data-bs-toggle="modal" data-bs-target="#Language"><i class="bi bi-pencil"></i><span>Chỉnh sửa</span></a>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="widget-body ">
                        {/* <div class="content">
                        <p>Tester</p>
                        </div>
                        <input type="hidden" id="title_hidden_value" value="Tester"/> */}
                    </div>
                </div>

                <div class="modal fade modal-lg" id="Language" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header ">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Ngoại ngữ </h1>
                            <button  type="button" 
                            // ref={closeModalRef} 
                            class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">*Trình độ ngoại ngữ</label>
                                <input type="text" defaultValue={Infor_User.seeker?.languages.language_name} class="form-control" style={{background:'#fff',width:'100%'}}/>
                            </div>
                            
                            <div class="mb-5">
                                <label for="customRange3" class="form-label">trình độ</label>
                                <input type="range" class="form-range" min="1" max="5" step="1" id="customRange3"/>
                                <div class="progress-bar-labels">
                                    <span className='activate'>N/A</span>
                                    <span className=''>Sơ cấp</span>
                                    <span className=''>Trung cấp</span>
                                    <span className=''>Cao cấp</span>
                                    <span className=''>Bản ngữ</span>
                                </div>
                            </div>

                            <div class="mb-3">
                                <span class="form-label" >Chứng chỉ ngoại ngữ</span>
                                <input type="text" defaultValue={Infor_User.seeker?.languages.proficiency} class="form-control" />
                            </div>
                        
                            <button type="submit" class="btn btn-primary">Lưu lại</button>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>


                {/* Kỹ năng chuyên môn */}
                <div className='widget widget-24'>
                    <div className='widget-head'>
                        <div className='cb-title-h3'>
                                <div className='figure'>
                                    <div class="image"><img src="https://static.careerviet.vn/themes/careerbuilder/img/dash-board/i14.png" alt=""/></div>
                                    <div class="figcaption">
                                    <h3>Kỹ năng chuyên môn *</h3>
                                    <div class="success hidden">
                                        <p>Hoàn thành</p>
                                    </div>
                                    <div class="error">
                                        <p>Chưa hoàn thành</p>
                                    </div>
                                </div>
                                </div>
                                <div className='right-action'>
                                    <div class="link-edit">
                                        <a href="" data-bs-toggle="modal" data-bs-target="#Skill"><i class="bi bi-pencil"></i><span>Chỉnh sửa</span></a>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="widget-body">
                    <table>
                        <thead>
                            <tr>
                                <th>Skill</th>
                                <th>Mức độ</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    </div>
                </div>

                <div class="modal fade modal-lg" id="Skill" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header ">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Kĩ năng Chuyên môn </h1>
                            <button  type="button" 
                            // ref={closeModalRef} 
                            class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">*Nhập kĩ năng/chuyên môn</label>
                                <input type="text" defaultValue={Infor_User.seeker?.skills.Skill_name} class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">*Mô tả kĩ năng</label>
                                <input type="text" defaultValue={Infor_User.seeker?.skills.description} class="form-control" />
                            </div>
                            
                            <div class="mb-5">
                                <label for="customRange3" class="form-label">trình độ</label>
                                <input type="range" class="form-range" min="0" max="5" step="1" />
                                <div class="progress-bar-labels-skill">
                                    <span className='activate'>0</span>
                                    <span className=''>1</span>
                                    <span className=''>2</span>
                                    <span className=''>3</span>
                                    <span className=''>4</span>
                                    <span className=''>5</span>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Lưu lại</button>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default EditCv;