import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './report.css'
import {Chart as ChartJS} from 'chart.js/auto'
import {Bar,Doughnut,Line} from 'react-chartjs-2'
import { apiApplyCvEachMonth, apiJobsEachMonth, apiPercentUandC } from '../../../api/Admin';

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

// defaults.plugins.title.display = true;
// defaults.plugins.title.align = "start";
// defaults.plugins.title.font.size = 20;
// defaults.plugins.title.color = "black";

function report() {

    const [JobsMonths,setJobsMonths] = useState([]);
    const [ApplyCvMonths,setApplyCvMonths] = useState([]);
    const [Percent,setPercent] = useState([]);

    useEffect(()=>{
            const fetchDataApplyCv= async()=>{
                try {
                    const res = await apiApplyCvEachMonth({});
                    setApplyCvMonths(res.data.dataApply12Month);
                    // console.log(res.data);
                } catch (error) {
                    console.log(error)
                }
            };

            const fetchDataJobs= async()=>{
                try {
                    const res = await apiJobsEachMonth({});
                    setJobsMonths(res.data.dataJobs12Month);
                    // console.log(res.data);
                } catch (error) {
                    console.log(error)
                }
            };


            const fetchDataPercent= async()=>{
                try {
                    const res = await apiPercentUandC({});
                    setPercent(res.data.percentTotal);
                    // console.log(res.data);
                } catch (error) {
                    console.log(error)
                }
            };
            fetchDataPercent();
            fetchDataJobs();
            fetchDataApplyCv();
        },[])
    
        const options = {
            scales: {
                y: {
                    min: 0, // Set minimum y-axis value
                    max: 30, // Set maximum y-axis value
                },
            },
        };
    return (
        <div className='px-5'>
            <Navbar/>
                <div className='bg-white rounded report'>
                    <div className='dataCard revenueCard'>
                        <Line 
                            data={{
                                labels:JobsMonths.map((data)=>data.month),
                                datasets:[
                                    {
                                        label:"Job Post",
                                        data: JobsMonths.map((data)=>data.value),
                                        backgroundColor:"#064FF0",
                                        borderColor:"#064FF0"
                                    }
                                ]
                            }}
                            options={{
                                    plugins:{
                                        title:{
                                            display: true,
                                            text:"JOBS POST IN YEAR"
                                        }
                                    },
                                    scales: {
                                        y: {
                                            min: 0, // Set minimum y-axis value
                                            max: 30, // Set maximum y-axis value
                                        },
                                    },
                                }}
                        />
                    </div>
                    <div className='dataCard applycvCard'>
                        <Bar 
                            data={{
                                labels:ApplyCvMonths.map((data)=>data.month),
                                datasets:[
                                    {
                                        label:"cv applied",
                                        data: ApplyCvMonths.map((data)=>data.value)
                                    }
                                ]
                            }}
                            options={{
                                    plugins:{
                                        title:{
                                            display: true,
                                            text:"APPLY CV EVERY MONTH"
                                        }
                                    },
                                    scales: {
                                        y: {
                                            min: 0, // Set minimum y-axis value
                                            max: 30, // Set maximum y-axis value
                                        },
                                    },
                                }}
                            
                        />
                    </div>

                    <div className='dataCard percentCard'>
                        
                        <Doughnut 
                                data={{
                                    labels:Percent.map((data)=>data.namePercent),
                                    datasets:[
                                        {
                                            label:"cv applied",
                                            data: Percent.map((data)=>data.value),
                                            backgroundColor:[
                                                'rgba(21, 231, 229, 0.8)',
                                                'rgba(231, 120, 21, 0.8)'
                                            ]
                                        }
                                    ]
                                }}
                                options={{
                                    plugins:{
                                        title:{
                                            display: true,
                                            text:"Monthly Revenue & Cost"
                                        }
                                    },
                                }}
                                
                            />
                    </div>
                </div>
            
            
            
        </div>
    );
}

export default report;