import React from 'react';
import './TypeCv1.css'

function TypeCv1(props) {
    return (
        <div class="wrapper">
		<div class="resume_design">
			<div class="resume_left">
				<div class="about_sec">
					<div class="button">About Me</div>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat.</p>
					<p> Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
					proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</div>
				<div class="exp_sec">
					<div class="button">Experience</div>
					<ul>
						<li>
							<div class="item">
								<div class="item_grp">
									<p class="title">Experience_1</p>
									<p class="sub_title">Sub_Experience_1</p>
									<span class="timeline">2020 - Present</span>
								</div>
								<p class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
							</div>
						</li>
						<li>
							<div class="item">
								<div class="item_grp">
									<p class="title">Experience_2</p>
									<p class="sub_title">Sub_Experience_2</p>
									<span class="timeline">2017 - 2020</span>
								</div>
								<p class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
							</div>
						</li>
						<li>
							<div class="item">
								<div class="item_grp">
									<p class="title">Experience_3</p>
									<p class="sub_title">Sub_Experience_3</p>
									<span class="timeline">2015 - 2017</span>
								</div>
								<p class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="edu_sec">
					<div class="button">Education</div>
					<ul>
						<li>
							<div class="item">
								<div class="item_grp">
									<p class="title">Education_1</p>
									<p class="sub_title">Sub_Education_1</p>
									<span class="timeline">2011-2015</span>
								</div>
								<p class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
							</div>
						</li>
						<li>
							<div class="item">
								<div class="item_grp">
									<p class="title">Education_1</p>
									<p class="sub_title">Sub_Education_1</p>
									<span class="timeline">2009-2011</span>
								</div>
								<p class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="resume_right">
                    <div class="profile_sec">
                        <div class="img_holder">
                            <img src='https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' alt="profile image"/>
                        </div>
                        <div class="profile_info">
                            <p class="first_name">Mark</p>
                            <p class="last_name">levin peterwood</p>
                            <p class="role">Full Stack Developer</p>
                        </div>
                    </div>
                    <div class="contact_sec">
                        <div class="button">Contact US</div>
                        <ul>
                            <li class="item">
                                <div class="icon">
                                    <i class="bi bi-phone" style={{display:'flex'}}><p style={{paddingLeft:'10px'}}> Phone</p></i>
                                    <p class="subtitle">+123 45566688</p>
                                </div>  
                            </li>
                            <li class="item">
                                <div class="icon">
                                    <i class="bi bi-envelope" style={{display:'flex'}}><p style={{paddingLeft:'10px'}}> Email</p></i>
                                    <p class="subtitle">Markwood@gmail.com</p>
                                </div>
                            </li>
                            <li class="item">
                                <div class="icon">
                                    <i class="bi bi-house" style={{display:'flex'}}><p style={{paddingLeft:'10px'}}>Address</p></i>
                                    
                                    <p class="subtitle">12th cross, Townhall, NY, USA</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="skills_sec">
                        <div class="button">Skills</div>
                        <ul>
                            <li class="item">
                                <div class="content">HTML/CSS</div>
                                <div class="bar_wrap">
                                    <p class="bar" style={{width:'100%'}}></p>
                                </div>
                            </li>
                            <li class="item">
                                <div class="content">Javascript</div>
                                <div class="bar_wrap">
                                    <p class="bar" style={{width:'70%'}}></p>
                                </div>
                            </li>
                            <li class="item">
                                <div class="content">PHP</div>
                                <div class="bar_wrap">
                                    <p class="bar"style={{width:'50%'}}></p>
                                </div>
                            </li>
                            <li class="item">
                                <div class="content">SQL</div>
                                <div class="bar_wrap">
                                    <p class="bar" style={{width:'80%'}}></p>
                                </div>
                            </li>
                            <li class="item">
                                <div class="content">Github</div>
                                <div class="bar_wrap">
                                    <p class="bar" style={{width:'100%'}}></p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TypeCv1;