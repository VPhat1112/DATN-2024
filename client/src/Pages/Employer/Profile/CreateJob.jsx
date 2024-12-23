import React, { useEffect, useState } from 'react';
import './CreateJob.css'
import { apicreateJob } from '../../../api/job';
import Swal from 'sweetalert2';
import { apiAllSpe } from '../../../api/Admin';
import { formatDate } from '../../../../Utils/dateUtils';
import { useNavigate } from 'react-router-dom';

function CreateJob() {
    const [selectedValues, setSelectedValues] = useState('');
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [minExp,setMinExp] = useState('');
    const [maxExp,setMaxExp] = useState('');
    const [moreRequi,setmoreRequi] = useState('');
    const [SpeChoose,setSpeChoose] = useState('');

    const Company = JSON.parse(localStorage.getItem('Company'))

    const [Specia,setSpecia] = useState([]);
    const [inputs,setinputs] = useState({
        Company_id:Company.id,
        Job_name:'',
        date_expiration:'',
        Address:'',
        typeJob:'',
        Salary:'',
        Min_Salary:'',
        Max_Salary:'',
        experience:'',
        Education:'',
        Welfare:'',
        image_decscription:'',
        Gender_requirements:'',
        Age_requirements:'',
        job_description:'',
        job_requirements:'',
        another_information:'',
        specia:''
    })
    
    const [isDivVisible, setIsDivVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const navigate = useNavigate()
    const fetchDataSpe = async() =>{
            try {
                const res = await apiAllSpe();
                setSpecia(res.data.response);
            } catch (error) {
                console.log(error)
            }
    }

    // const handleCheckboxChange = (event) => {
    //     const value = event.target.value;
    //     const isChecked = event.target.checked;
    
    //     if (isChecked) {
    //       // Nếu checkbox được chọn, thêm giá trị vào mảng
    //         setSelectedValues([...selectedValues, value]);
    //     } else {
    //         // Nếu checkbox bị bỏ chọn, lọc bỏ giá trị khỏi mảng
    //         setSelectedValues(selectedValues.filter(item => item !== value));
    //     }
    // };



    const handleCheckboxChange = (event, selectedValues) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
    
        if (isChecked) {
            setSelectedValues(selectedValues + ' - ' + value);
        } else {
            const valuesArray = selectedValues.split(' - ');
            const newValues = valuesArray.filter(item => item !== value).join(' - ');
            setSelectedValues(newValues);
        }
    };
    console.log(inputs)

    const takeSelect = () =>{
        const selectElement = document.getElementById("Specialize");

        const tex = selectElement.options[selectElement.selectedIndex].text;
        setSpeChoose(tex);
        console.log(SpeChoose)
    }
    

    const handleChange = e =>{
        // takeSelect();
        setinputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if(inputs.experience!=""){
            if(e.target.value=='Có kinh nghiệm'){
                setIsDivVisible(true);
                setinputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
                // console.log(e.target.value)
                
            }else{
                setIsDivVisible(false);
                setMinExp('');
                setMaxExp('');
                // console.log(e.target.value)
            }
            
        }else{
        }
    } 

    const handleChangeRequie = e =>{
        setmoreRequi(e.target.value)
    }

    
    const handleChangeImage = e =>{
        const data = new FileReader()

        
        data.onload = () => {
            setIsImage(true);
            setinputs((prev) => ({ ...prev, image: data.result })); // Update image in state
            setSelectedFile(true);
        };

        data.onerror = () => {
            setIsImage(false);
            setSelectedFile(false);
            console.error('File is not a valid image');
        };
        
        data.readAsDataURL(e.target.files[0])
    }

    const handleCreate = async(event) => {
        event.preventDefault();
        const ageRange = minAge + "-" + maxAge;
        
        setinputs((prev) => ({ ...prev, Age_requirements: ageRange }));

        setinputs((prev) => ({ ...prev, [event.target.name]: prev[event.target.name] + '. Yêu cầu thêm' + moreRequi }));

        setinputs((prev) => ({ ...prev, Welfare: selectedValues }));

        if(inputs.experience=='Có kinh nghiệm'){
            if(minExp!=''&&maxExp!='')  {
                const ExpRange = inputs.experience+":"+minExp + "-" + maxExp;
                setinputs((prev) => ({ ...prev, experience: ExpRange }));
            }else if(minExp!=''&&maxExp=='') {
                const ExpRange = inputs.experience+": Trên " + minExp;
                setinputs((prev) => ({ ...prev, experience: ExpRange }));
            }else if(minExp==''&&maxExp!=''){
                const ExpRange = inputs.experience+": Dưới " + minExp;
                setinputs((prev) => ({ ...prev, experience: ExpRange }));
            }else if(minExp==''&&maxExp=='') {
                Swal.fire("Lỗi!", "Bạn chưa đưa ra mức yêu cầu kinh nghiệm làm việc", "error");
                setLoading(false);
                return;
            }
        }else{
            const res = await apicreateJob(inputs);
            if(res.data.mes==1){
                Swal.fire("Đăng tuyển dụng!", "Đã có vấn đề trong việc đăng tin tuyển dụng, vui lòng thử lại!", "error");
                
                setLoading(true);
            }else{
                Swal.fire("Đăng tuyển dụng!", "Bạn đã đăng tuyển dụng thành công", "success");
                navigate("/ProfileEml/Jobs")
                setLoading(false);
            }
        }
    };



    

    useEffect(()=>{
        fetchDataSpe();
    },[])

    return (
        <div className='content-inner p-2'>
            <div className='container-fluid'>
                <div className=' g-3 my-2 p-3 bg-white rounded'>
                    <h3>Đăng tuyển dụng</h3>
                    <div className='row'>
                        <form className='p-4'>
                            <div className='col bg-info '>
                                <strong><h4 type="button" >Thông tin tuyển dụng </h4></strong>
                                
                            </div>
                            <div class="mb-3 col-7">
                                <label for="NameJob" class="form-label">Chức danh công việc </label>
                                <input type="text" onChange={handleChange}  name='Job_name' class="form-control" required/>
                            </div>
                            <div class="mb-3 col-7">
                                <label for="Specialize" class="form-label">Ngành nghề </label>
                                <select  name='specia' defaultValue={"chọn"} 
                                onChange={handleChange} 
                                id="Specialize" class="form-select">
                                    <option selected>Vui lòng chọn</option>
                                    {Specia.map(spe=>(
                                        <>
                                            <option value={spe.id}>{spe.Specialized_name}</option>
                                        </>
                                    ))}
                                </select>
                            </div>

                            <div class="mb-3 col-7 ">
                                <label for="Address" class="form-label">Nơi làm việc  </label>
                                <select  name='Address' defaultValue={"chọn"} 
                                onChange={handleChange} 
                                id="Address" class="form-select">
                                    <option selected>Vui lòng chọn</option>
                                    <option value="Nơi làm việc">Nơi làm việc</option>
                                </select>
                                <p>Bạn có thể nhập nơi làm việc mới tại đây</p>
                                <i class="bi bi-arrow-down"></i>
                                <input onChange={handleChange}  type="text" name='Address' class="form-control" required/>
                            </div>

                            <div class="mb-3 col-7">
                                <label for="JobDesc" class="form-label">Mô tả công việc  </label>
                                <textarea type="text" name='job_description'
                                onChange={handleChange}
                                style={{height:'100px'}} class="form-control" id="JobDesc" required/>
                            </div>

                            <div class="mb-3 col-7">
                                <label for="jobRequirements" class="form-label">Yêu cầu công việc  </label>
                                <textarea type="text" 
                                name='job_requirements' onChange={handleChange}
                                style={{height:'100px'}} class="form-control" id="jobRequirements" required/>
                            </div>
                            
                            <div class="mb-3 col-7">
                                <label for="VideoJob" class="form-label">Video mô tả công việc  </label>
                                <input type="file" onChange={handleChangeImage} class="form-control" id="VideoJob" required/>
                                {inputs.image?<img src={inputs.image} class="img-thumbnail" alt="..."/>:<></>}
                            </div>

                            <div className='mb-3 row'>
                                <div class="mb-3 col-2">
                                    <label for="Salary" class="form-label">Mức lương  </label>
                                    <input type="text" name='Salary' onChange={handleChange} class="form-control" id="Salary" required/>
                                </div>
                                <div class="mb-3 col-2">
                                    <label for="NameJob" class="form-label">Tối thiểu  </label>
                                    <input type="text" name='Min_Salary' onChange={handleChange} class="form-control" id="MinSalary" required/>
                                </div>
                                <div class="mb-3 col-2">
                                    <label for="NameJob" class="form-label">Tối đa  </label>
                                    <input type="text" name='Max_Salary' onChange={handleChange} class="form-control" id="MaxSalary" required/>
                                </div>

                                <div className='mb-3 '>
                                    <label for="TypeJob" class="form-label">Hình thức  </label>
                                    <div class="mb-3">
                                        <div class="form-check form-check-inline col-4">
                                            <input class="form-check-input" type="radio" onClick={handleChange} name="typeJob" id="TypeChoose1" value="Nhân viên chính thức"/>
                                            <label class="form-check-label" for="TypeChoose1">Nhân viên chính thức</label>
                                        </div>
                                        <div class="form-check form-check-inline col-4">
                                            <input class="form-check-input" type="radio" onClick={handleChange} name="typeJob" id="TypeChoose2" value="Bán thời gian"/>
                                            <label class="form-check-label" for="TypeChoose2">Bán thời gian</label>
                                        </div>
                                        <div class="form-check form-check-inline col-4">
                                            <input class="form-check-input" type="radio" onClick={handleChange} name="typeJob" id="TypeChoose3" value="Thời vụ - nghề tự do"/>
                                            <label class="form-check-label" for="TypeChoose3">Thời vụ - nghề tự do</label>
                                        </div>
                                        <div class="form-check form-check-inline col-4">
                                            <input class="form-check-input" type="radio" onClick={handleChange} name="typeJob" id="TypeChoose4" value="Thực tập"/>
                                            <label class="form-check-label" for="TypeChoose4">Thực tập</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3 col-3 inline">
                                <label for="Date-exp" class="form-label">Thời hạn nộp hồ sơ </label>
                                <input type="date" name='date_expiration' onChange={handleChange} class="form-control" id="Date-exp" required/>
                            </div>
                            
                            
                            <div className='mb-3 '>
                                <label for="TypeJob" class="form-label">Yêu cầu phỏng vấn ?  </label>
                                <div class="mb-3">
                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" type="radio" onClick={handleChangeRequie} name="job_requirements" id="Cv1" value="Bắt buộc phỏng vấn"/>
                                        <label class="form-check-label" for="Cv1">Bắt buộc</label>
                                    </div>
                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" type="radio" onClick={handleChangeRequie} name="job_requirements" id="Cv2" value="Không bắt buộc phỏng vấn"/>
                                        <label class="form-check-label" for="Cv2">Không bắt buộc</label>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-info '>
                                <strong><h3>Phúc lợi </h3></strong>
                            </div>
                            {/* Warefale */}
                            <div class="mb-3">
                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" onChange={(e) => handleCheckboxChange(e, selectedValues)}type="checkbox" id="Welfare1" value="Chế độ bảo hiểm "/>
                                        <label class="form-check-label" for="Welfare1"><i class="bi bi-prescription2"></i>Chế độ bảo hiểm </label>
                                    </div>
                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" onChange={(e) => handleCheckboxChange(e, selectedValues)}type="checkbox" id="Welfare2" value="Du lịch"/>
                                        <label class="form-check-label" for="Welfare2"><i class="bi bi-airplane"></i>Du lịch</label>
                                    </div>
                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" onChange={(e) => handleCheckboxChange(e, selectedValues)}type="checkbox" id="Welfare2" value="Chế độ thưởng"/>
                                        <label class="form-check-label" for="Welfare2"><i class="bi bi-currency-dollar"></i>Chế độ thưởng</label>
                                    </div>
                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" onChange={(e) => handleCheckboxChange(e, selectedValues)}type="checkbox" id="Welfare2" value="Chăm sóc sức khỏe"/>
                                        <label class="form-check-label" for="Welfare2"><i class="bi bi-lungs"></i>Chăm sóc sức khỏe </label>
                                    </div>
                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" onChange={(e) => handleCheckboxChange(e, selectedValues)}type="checkbox"  id="Welfare2" value="Đào tạo"/>
                                        <label class="form-check-label" for="Welfare2"><i class="bi bi-mortarboard-fill"></i>Đào tạo </label>
                                    </div>
                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" onChange={(e) => handleCheckboxChange(e, selectedValues)}type="checkbox" id="Welfare2" value="Tăng lương"/>
                                        <label class="form-check-label" for="Welfare2"><i class="bi bi-graph-up-arrow"></i>Tăng lương</label>
                                    </div>
                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" onChange={(e) => handleCheckboxChange(e, selectedValues)}type="checkbox"  id="Welfare2" value="Laptop"/>
                                        <label class="form-check-label" for="Welfare2"><i class="bi bi-laptop"></i>Laptop</label>
                                    </div>
                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" onChange={(e) => handleCheckboxChange(e, selectedValues)}type="checkbox"  id="Welfare2" value="Phụ cấp"/>
                                        <label class="form-check-label" for="Welfare2"><i class="bi bi-cash"></i>Phụ cấp</label>
                                    </div>
                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" onChange={(e) => handleCheckboxChange(e, selectedValues)}type="checkbox"  id="Welfare2" value="Xe đưa đón "/>
                                        <label class="form-check-label" for="Welfare2"><i class="bi bi-bus-front-fill"></i>Xe đưa đón </label>
                                    </div>
                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" onChange={(e) => handleCheckboxChange(e, selectedValues)}type="checkbox"  id="Welfare2" value="Du lịch nước ngoài"/>
                                        <label class="form-check-label" for="Welfare2"><i class="bi bi-airplane"></i>Du lịch nước ngoài</label>
                                    </div>

                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" onChange={(e) => handleCheckboxChange(e, selectedValues)}type="checkbox"  id="Welfare2" value="Phụ cấp thâm niên"/>
                                        <label class="form-check-label" for="Welfare2"><i class="bi bi-cash"></i>Phụ cấp thâm niên  </label>
                                    </div>

                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" onChange={(e) => handleCheckboxChange(e, selectedValues)}type="checkbox"  id="Welfare2" value="Nghỉ phép năm"/>
                                        <label class="form-check-label" for="Welfare2"><i class="bi bi-briefcase"></i>Nghỉ phép năm  </label>
                                    </div>

                                    <div class="form-check form-check-inline col-4">
                                        <input class="form-check-input" onChange={(e) => handleCheckboxChange(e, selectedValues)}type="checkbox"  id="Welfare2" value="Câu lạc bộ thể thao"/>
                                        <label class="form-check-label" for="Welfare2"><i class="bi bi-heart-pulse"></i>Câu lạc bộ thể thao</label>
                                    </div>

                                </div>

                            <div className='bg-info '>
                                <strong><h3>Yêu cầu chung </h3></strong>
                            </div>

                            <div class="mb-3">
                                <div class="form-check form-check-inline ">
                                    <input class="form-check-input" type="radio" onClick={handleChange} name="Gender_requirements" id="requiementAll1" value="Nam/Nữ"/>
                                    <label class="form-check-label" for="requiementAll1">Nam/Nữ</label>
                                </div>
                                <div class="form-check form-check-inline ">
                                    <input class="form-check-input" type="radio" onClick={handleChange} name="Gender_requirements" id="requiementAll2" value="Nam"/>
                                    <label class="form-check-label" for="requiementAll2">Nam</label>
                                </div>
                                <div class="form-check form-check-inline ">
                                    <input class="form-check-input" type="radio" onClick={handleChange} name="Gender_requirements" id="requiementAll3" value="Nữ"/>
                                    <label class="form-check-label" for="requiementAll3">Nữ</label>
                                </div>
                            </div>

                            <div className='row'>
                                <label for="MinAges" class="form-label">Tuổi</label>
                                <div class="mb-3 col-3">
                                    <input  onClick={(e) => setMinAge(e.target.value)} type="text" placeholder='Từ' class="form-control" id="MinAges" required/>
                                </div>
                                <div class="mb-3 col-3">
                                    {/* <label for="MaxAge" class="form-label">Tới  </label> */}
                                    <input  onClick={(e) => setMaxAge(e.target.value)} type="text" placeholder='Tới' class="form-control" id="MaxAge" required/>
                                </div>
                            </div>

                            <div className='row'>
                                <div class="mb-3 col-3">
                                    <label for="Exp" class="form-label">Kinh nghiệm</label>
                                    <select name='experience' id='Exp' 
                                    onChange={handleChange} 
                                    class="form-select">
                                        <option selected>Chọn</option>
                                        <option value="Chưa có kinh nghiệm">Chưa có kinh nghiệm</option>
                                        <option value="Không yêu cầu kinh nghiệm">Không yêu cầu kinh nghiệm</option>
                                        <option value="Có kinh nghiệm">Có kinh nghiệm</option>
                                    </select>
                                </div>
                                
                                <div className='mb-3 col-3 row' >
                                    <div class="mb-3 col-3" style={{ display: isDivVisible ? 'block' : 'none',width:'100px' }}>
                                        <label for="MinExp" class="form-label">năm  </label>
                                        <input type="text" onChange={(e) => setMinExp(e.target.value)} placeholder='Từ' class="form-control" id="MinExp" required/>
                                    </div>

                                    <div class="mb-3 col-3" style={{ display: isDivVisible ? 'block' : 'none',width:'100px' }}>
                                        <label for="MaxExp" class="form-label">.  </label>
                                        <input type="text" onChange={(e) => setMaxExp(e.target.value)} placeholder='Tới' class="form-control" id="MaxExp" required/>
                                    </div>
                                </div>


                                
                            </div>
                            <div class="mb-3 col-3">
                                    <label for="degree" class="form-label">Bằng cấp</label>
                                    <select  name='Education' defaultValue={"chọn"} 
                                    onChange={handleChange} 
                                    id="degree" class="form-select">
                                        <option selected>Chọn bằng cấp</option>
                                        <option value="Không yêu cầu bằng cấp ">Không yêu cầu bằng cấp </option>
                                        <option value="Trung học">Trung học</option>
                                        <option value="Cao đẳng">Cao đẳng</option>
                                        <option value="Đại học">Đại học</option>
                                    </select>
                                </div>


                                <div class="p-5 gap-2 col-6 d-md-flex mx-auto">
                                    <button class="btn btn-secondary  me-md-2" type="button">Hủy</button>
                                    <button class="btn btn-success " data-bs-toggle="modal" data-bs-target="#formCreateJob" type="submit">Xem lại thông tin đăng tuyển</button>
                                    <button class="btn btn-info " onClick={handleCreate} type="submit">Xác nhận và đăng tuyển</button>
                                </div>
                        </form>
                    </div>
                </div>

                <div class="modal fade modal-lg" id="formCreateJob" tabindex="-1" aria-labelledby="formCreateJob" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header ">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Xem trước form đăng tuyển </h1>
                            <button  type="button" 
                            // ref={closeModalRef} 
                            class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <div id='DetailJ'>
                                <div>
                                    <div className='bg-info p-4 row'>
                                        <div className='col-3 infor-div'>
                                            <strong><p>Địa chỉ</p></strong>
                                            <a>{inputs.Address}</a>
                                            {/* <hr></hr> */}
                                        </div>
                                        <div className='col-3 infor-div'>
                                            <strong><p>Ngày cập nhật</p></strong>
                                            <a>{formatDate(new Date())}</a>
                                            {/* <hr></hr> */}
                                        </div>
                                        <div className='col-3 infor-div'>
                                            <strong><p>Lương</p></strong>
                                            <a>{inputs.Salary+" "}VND<br></br> Khoản lương : 
                                            {inputs.Min_Salary}-{inputs.Max_Salary }
                                            </a>
                                            {/* <hr></hr> */}
                                        </div>
                                        <div className='col-3 infor-div'>
                                            <strong><p>Ngành nghề</p></strong>
                                            {/* <a>{
                                                ($("#Specialize option:selected").text())
                                            }</a> */}
                                            
                                            {/* <hr></hr> */}
                                        </div>
                                    </div>
                                    <div className='bg-info p-4 row'>
                                        <div className='col-3'>
                                            <strong><p>Kinh nghiệm</p></strong>
                                            <a>{inputs.experience}</a>
                                            {/* <hr></hr> */}
                                        </div>
                                        <div className='col-3'>
                                            <strong><p>Hình thức</p></strong>
                                            <a>{inputs.typeJob}</a>
                                            {/* <hr></hr> */}
                                        </div>
                                        <div className='col-3'>
                                            <strong><p>Cấp bậc</p></strong>
                                            <a>{inputs.Welfare}</a>
                                            {/* <hr></hr> */}
                                        </div>
                                        <div className='col-3'>
                                            <strong><p>Hết hạn nộp</p></strong>
                                            <a>{formatDate(inputs.date_expiration)}</a>
                                            {/* <hr></hr> */}
                                        </div>
                                    </div>
                                </div>
        
                                <div className='p-4'>
                                    <strong><h3>Phúc lợi</h3></strong>
                                    <p>{selectedValues}</p>
                                </div>
        
                                <div className='p-4'>
                                    <strong><h3>Mô tả công việc</h3></strong>
                                    <p>{}</p>
                                    <img src={inputs.image}></img>
                                </div>
        
                                <div className='p-4'>
                                    <strong><h3>Yêu cầu công việc</h3></strong>
                                    <p>{inputs.job_requirements}</p>
                                </div>
        
                                <div className='p-4'>
                                    <strong><h3>Địa điểm làm việc</h3></strong>
                                    <p>{inputs.Address}</p>
                                </div>
        
                                <div className='p-4'>
                                    <strong><h3>Thông tin khác</h3></strong>
                                    <p>{inputs.another_information}</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CreateJob;