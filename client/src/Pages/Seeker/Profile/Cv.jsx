import React, { useState } from 'react';
import './Cv.css'
import TypeCv1 from './TypeCv1';
import TypeCv2 from './TypeCv2';

function Cv() {

    // const[selectType,setSelectType] = useState();
    // const handleChange = e =>{
    //     setSelectType((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // } 

    const divType1 = document.getElementById('Type1');
    const divType2 = document.getElementById('Type2');

    const showDiv = async(divToShow) =>{
        divType1.style.display = 'none';
        divType2.style.display = 'none';
        divToShow.style.display = 'block';
    }
    // console.log(selectType)
    const selectTypeCv = () =>{
        try {
            let select= document.getElementById('selectType').value;
            console.log(select)
            select=="1"? showDiv(divType1):showDiv(divType2);
        } catch (error) {
            console.log(error)
        }
    }

    return (
            <div className='container-fluif row p-3'>
                <form method='post'>
                    <div className='row'>
                        <div class='col-5 col-tools'>
                            <div class='tools-schemes'>
                                <div class='head-tools'>
                                    <div className='figure'>
                                        <div className='image'>
                                            <img src='https://static.careerviet.vn/themes/careerbuilder/img/dash-board/i9.png'></img>
                                        </div>
                                        <div className='figcaption'>
                                            <h2>Công cụ</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-show'>
                                    <div className='row'>
                                        <div className='col-sm-6 col-md-5 col-xl-12 col-xxxl-6'>
                                            <ul className='list-tools'>
                                                <li className='item-tools'> 
                                                    <div className='title-tools'><h3>Mẫu Cv</h3></div>
                                                    <div className='template'>
                                                        <div class="name">
                                                            <select  name='typecv' defaultValue={"Type 1"} 
                                                            onChange={()=>selectTypeCv()} 
                                                            id="selectType" class="form-select">
                                                                <option selected>Select</option>
                                                                <option value="1">Type 1</option>
                                                                <option value="2">Type 2</option>
                                                            </select>
                                                        </div>
                                                        <div class="change">
                                                            <a href="" class="btn-change-template">
                                                                Đổi Mẫu
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div class="title-tools">
                                                        <h3>Màu sắc</h3>
                                                    </div>
                                                    <div className='row' id='colorItems'>
                                                        <div class="col-xs-12 col-sm-3 col-md-6 color-selector-mb">
                                                            <div class="color-selector" data-color-id="21">
                                                                <div class="color-item mb2">
                                                                    <div style={{background:'#009973'}}  class="color-block"></div>
                                                                    <div style={{background:'#0EBBD6',margin:'0px 2px'}} class="color-block"></div>
                                                                    <div style={{background: '#58595B'}} class="color-block"></div>
                                                                    <div style={{background: '#fff', marginLeftL:'2px'}} class="color-block"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-sm-3 col-md-6 color-selector-mb">
                                                            <div class="color-selector" data-color-id="21">
                                                                <div class="color-item mb2">
                                                                    <div style={{background:'#FCB617'}}  class="color-block"></div>
                                                                    <div style={{background:'#C3996B',margin:'0px 2px'}} class="color-block"></div>
                                                                    <div style={{background:'#58595B'}} class="color-block"></div>
                                                                    <div style={{background:'#fff', marginLeftL:'2px'}} class="color-block"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-sm-3 col-md-6 color-selector-mb">
                                                            <div class="color-selector" data-color-id="21">
                                                                <div class="color-item mb2">
                                                                    <div style={{background:'#2A7BB8'}}  class="color-block"></div>
                                                                    <div style={{background:'#75DAF9',margin:'0px 2px'}} class="color-block"></div>
                                                                    <div style={{background:'#58595B'}} class="color-block"></div>
                                                                    <div style={{background:'#fff', marginLeftL:'2px'}} class="color-block"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-sm-3 col-md-6 color-selector-mb">
                                                            <div class="color-selector" data-color-id="21">
                                                                <div class="color-item mb2">
                                                                    <div style={{background:'#007457'}}  class="color-block"></div>
                                                                    <div style={{background:'#8BC53F',margin:'0px 2px'}} class="color-block"></div>
                                                                    <div style={{background:'#58595B'}} class="color-block"></div>
                                                                    <div style={{background:'#fff', marginLeftL:'2px'}} class="color-block"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-sm-3 col-md-6 color-selector-mb">
                                                            <div class="color-selector" data-color-id="21">
                                                                <div class="color-item mb2">
                                                                    <div style={{background:'#182641'}}  class="color-block"></div>
                                                                    <div style={{background:'#A6A8AB',margin:'0px 2px'}} class="color-block"></div>
                                                                    <div style={{background:'#58595B'}} class="color-block"></div>
                                                                    <div style={{background:'#fff', marginLeftL:'2px'}} class="color-block"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-sm-3 col-md-6 color-selector-mb">
                                                            <div class="color-selector" data-color-id="21">
                                                                <div class="color-item mb2">
                                                                    <div style={{background:'#0EBBD6'}}  class="color-block"></div>
                                                                    <div style={{background:'#D6DE23',margin:'0px 2px'}} class="color-block"></div>
                                                                    <div style={{background:'#58595B'}} class="color-block"></div>
                                                                    <div style={{background:'#fff', marginLeftL:'2px'}} class="color-block"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='Type1' className='p-4 col-7 col-template content-type'>
                            <TypeCv1/>
                        </div>
                        <div id='Type2' className=' col-7 content-type'>
                            <TypeCv2/>
                        </div>
                        
                    </div>
                </form>
            </div>
            
    );
}

export default Cv;