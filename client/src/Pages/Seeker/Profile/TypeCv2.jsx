import React from 'react';
import './TypeCv2.css'
function TypeCv2(props) {
    return (
        <div className='main-template'>
            <div className='left-Side'>
                <div className='profileText'>
                    <div className='imgBx'>
                        <img src='https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' alt=''></img>
                    </div>
                    <h2>Nguyễn Văn A</h2>
                    <span>Expected Tittle</span>
                </div>
                <div className='contactInfo'>
                    <h3 className='title'>Contact Info</h3>
                    <ul>
                        <li>
                            <span><i class="bi bi-telephone"> </i></span>
                            <span className='text'>+84 123 4567 897</span>
                        </li>
                        <li>
                            <span><i class="bi bi-envelope"> </i></span>
                            <span className='text'>test@gmail.com</span>
                        </li>
                        <li>
                            <span><i class="bi bi-house"> </i></span>
                            <span className='text'>Address</span>
                        </li>
                    </ul>
                </div>

                <div className='contactInfo education'>
                    <h3 className='title'>Education</h3>
                    <ul>
                        <li>
                            <h5>2020-2025</h5>
                            <h6>Descrption</h6>
                            <h6>University-Name</h6>
                        </li>
                    </ul>
                </div>

                <div className='contactInfo language'>
                    <h3 className='title'>Languages</h3>
                    <ul>
                    <li>
                            <span className='text'>English</span>
                            <span className='percent'>
                                <div style={{width:'90%'}}></div>
                            </span>
                        </li>
                    </ul>
                </div>
                

            </div>
            <div className='right-Side'>
                <div className='about'>
                    <h5 className='title2'>Profile</h5>
                    <p>TEst</p>
                </div>
                <div className='about'>
                    <h5 className='title2'>Contact</h5>
                    <div className='box'>
                        <div className='profile_infor'>
                            <h6>Birthday        : MM/DD/YYYY</h6>
                            <h6>Marital status  : Single</h6>
                            <h6>Nationality     : Vietnamese</h6>
                            <h6>Location        : Vietnam</h6>
                        </div>
                    </div>
                </div>

                <div className='about'>
                    <h5 className='title2'>Project</h5>
                    <div className='box'>
                        <div className='profile_infor'>
                            <p>Test</p>
                        </div>
                    </div>
                </div>

                <div className='about'>
                    <h5 className='title2'>experience</h5>
                    <h6> Expected Tittle</h6>
                    <div className='box'>
                        <div className='year-Company'>
                            <p style={{fontSize:'12px'}}>Information:</p>
                        </div>
                    </div>
                    <p style={{fontSize:'12px'}}>Key achievements:</p>
                </div>
            </div>
        </div>
    );
}

export default TypeCv2;