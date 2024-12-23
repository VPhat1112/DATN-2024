import { query } from "express";
import db from "../models";
import { Op, Transaction, where } from "sequelize";
import { orderBy, reject } from "lodash";



export const getJobs = ({
    salary,
    salarygte,
    salarygt,
    salarylt,
    salarylte,
    q
    }) =>
    new Promise(async(resolve,reject)=>{
        let where = {};
        
        
        if (salary) where.Salary = { [Op.between]: salary };
        if (salarygte) where.Salary = { [Op.gte]: salarygte };
        if (salarygt) where.Salary = { [Op.gt]: salarygt };
        if (salarylt) where.Salary = { [Op.lt]: salarylt };
        if (salarylte) where.Salary = { [Op.lte]: salarylte };
        if (q) {
            // query[Op.or] = [{ Job_name: { [Op.substring]: q } }];
            where[Op.or] = [{ job_description: { [Op.substring]: q } }];
        }
            
            
        try {
            let response = await db.news.findAll({
                where:{
                    date_expiration: {
                        [Op.gt]: new Date()
                    }
                },
                include: [
                {
                    model:db.Company,
                    as:"Company"
                },
                {
                    model:db.NewDetail,
                    as: "NewDetail",
                    where,
                },
            ],
            
            raw: true,
            nest: true,
            distinct:true
            })


            resolve({
                err: response ? 0 : 1,
                mes: response ? "Got" : "Job not found",
                jobData: response,
            });
        } catch (error) {
            reject(error)
        }
    });


export const getJob =(jid) =>
    new Promise(async (resolve,reject)=>{
        try {
            const response= await db.news.findOne({
                where: {id:jid},
                include: [
                    {
                        model:db.Company,
                        as:"Company"
                    },
                    {
                        model:db.NewDetail,
                        as: "NewDetail",
                    },
                    {
                        model:db.ApplyCv,
                        as:"ApplyNews"
                    }
                ],
                raw: true,
                nest: true
            });

            

            resolve({
                err: response ? 0 : 1,
                mes: response ? "Got" : "product not found",
                JobData: response,
            });
        } catch (error) {
            reject(error)
        }
    });

export const getJobByCompany = (Cid) =>
    new Promise(async(resolve,reject)=>{
        try {
            const response = await db.news.findAndCountAll({
                where:{
                    Company_id:Cid
                },
                include: [
                {
                    model:db.Company,
                    as:"Company"
                },
                {
                    model:db.NewDetail,
                    as: "NewDetail",
                    where,
                }
            ],
            raw: true,
            nest: true
            })
            resolve({
                err: response ? 0 : 1,
                mes: response ? "Got" : "Job not found",
                jobData: response,
            });
        } catch (error) {
            console.log(error)
            reject(error);
        }
    });


export const UpdateNews = async (body, Pid) => {
    try {
      // Fetch the news record with details using eager loading
        const job = await db.news.findOne({
            where: { id: Pid },
            include: [{ model: db.NewDetail, as: "NewDetail" }],
        });

        if (!job) {
            return { err: 1, message: "Job not found" }; // Use 'message' for clarity
        }

      // Update either news or NewDetail based on presence of specific properties
        const isNewsUpdate = 'date_expiration' in body || 'Job_name' in body;

        const updateTarget = isNewsUpdate ? db.news : db.NewDetail;

        if(updateTarget==db.news){
            const updatedCount = await updateTarget.update(body, {
                where: { id: Pid }, 
                updatedAt: new Date(), 
            });
            return {
                err: updatedCount[0] > 0 ? 0 : 1,
                message: updatedCount[0] > 0 ? "Updated." : "Failed",
            };
        }else{
            const updatedCount = await updateTarget.update(body, {
                where: { new_id: Pid }, 
                updatedAt: new Date(), 
            });
            return {
                err: updatedCount[0] > 0 ? 0 : 1,
                message: updatedCount[0] > 0 ? "Updated." : "Failed",
            };
        }
        
    } catch (error) {
        console.error(error); 
        throw error; 
    }
};
export const createNew = async (body) => {
    try {

        
    const SpeData = body.specia; 


    
      // Create the news record
    const responseNews = await db.news.create({
        Company_id: body.Company_id,
        Job_name: body.Job_name,
        date_expiration: body.date_expiration,
    })

      // Create the detailed information record
    const newDetailData = {
        new_id: responseNews.id,
        Address: body.Address,
        typeJob: body.typeJob,
        Salary: body.Salary,
        Min_Salary:body.Min_Salary,
        experience: body.experience,
        Education: body.Education,
        Welfare: body.Welfare,
        image_decscription:body.image_decscription,
        Gender_requirements:body.Gender_requirements,
        Age_requirements:body.Age_requirements,
        job_description: body.job_description,
        job_requirements: body.job_requirements,
        another_information: body.another_information,
    };

    await db.NewDetail.create(newDetailData);

    const SpeIds = SpeData.split(',').map(id => parseInt(id, 10)).filter(id => Number.isInteger(id) && id > 0);


    // if (SpeIds.length === 0) {
    //     throw new Error('No valid specialization IDs found.');  // Handle empty array
    // }

    for (const speId of SpeIds) {
        await db.new_spe.create({newsId:responseNews.id,specializedId:speId});
    }
    

    
    

    
    const response = await db.news.findOne({
        where:{id:responseNews.id},
        include: [
            { model: db.Company, as: 'Company' },
            { model: db.NewDetail, as: 'NewDetail' },
            // {model:db.new_spe,as:'spe'}
        ],
        raw: true,
        nest: true,
        distinct:true
    });
    console.log(response)

    return {
            err: 0, // Consistent with success code
            mes: 'Created successfully',
            JobData: response,
        };
        } catch (error) {
        console.error(error); // Log the error for debugging
        return {
            err: 1,
            mes: 'Failed to create job',
            error: error.message, // Include error message for troubleshooting
        };
        }
    };

export const getSpeJob = (Jid) =>new Promise(async(resolve,reject)=>{
    try {
        const Spe= await db.new_spe.findAll({
            where:{newsId:Jid},
            include:[{
                model:db.specialized,
            }]
        })
        // console.log(Spe)
        resolve({
            err: Spe ? 0 : 1,
            mes: Spe ? "Got" : "Error",
            SpeData: Spe,
        });
    } catch (error) {
        reject(error)
    }
})

export const getJobBySpe = (Sid) => new Promise(async(resolve,reject)=>{
    try {
        const response= await db.news.findAndCountAll({
            include:[
                {   
                    model:db.new_spe,
                    where:{
                        specializedId:Sid
                    },
                    as:'spe'
                },
                {
                    model:db.Company,
                    as:'Company'
                },
                {
                    model:db.NewDetail,
                    as: "NewDetail",
                }
            ]
        })
        resolve({
            err: response ? 0 : 1,
            mes: response ? "Got" : "Error",
            jobData: response,
        });
    } catch (error) {
        reject(error)
    }
})

export const filterJobCompany = (Cid, body) =>
        new Promise(async (resolve, reject) => {
        let q = body.q;
        let where = {};
    
        if (q !== '') {
            where.job_description = {
                [Op.like]: '%' + q + '%',
            };
        }
        
    
        let dateCreate = body.dateCreate;

        let dateStart= body.dateStart;

        let dateEnd = body.dateEnd;

        if(dateStart!==''&&dateEnd!==''){
            where.createdAt={
                [Op.between]:[
                    new Date(`${dateStart} 00:00:00`),
                    new Date(`${dateEnd} 23:59:59`),
                ]
            }
        }
    
    
        if (dateCreate !== '') {
            // Ensure exact date comparison (including time)
                where.createdAt = {
                    [Op.between]: [
                        new Date(`${dateCreate} 00:00:00`),
                        new Date(`${dateCreate} 23:59:59`),
                      ], // Use Op.eq for exact comparison
                };
            }
            console.log(where)
            try {
            let response = await db.news.findAll({
                where: {
                date_expiration: { [Op.gt]: new Date() }, // Active jobs
                Company_id: Cid,
                },
                include: [
                {
                    model: db.Company,
                    as: 'Company',
                },
                {
                    model: db.NewDetail,
                    as: 'NewDetail',
                    where:where, // Apply the where clause for filtering within NewDetail
                },
                // { // Include other models as needed
                //   model: db.numberspecia,
                //   as: 'NewSpe',
                // },
                ],
              raw: true, // Return raw data if necessary
              nest: true,  // Nest included models if applicable
            });

            resolve({
                err: response ? 0 : 1,
                mes: response ? 'Got' : 'Job not found',
                jobData: response,
            });
            } catch (error) {
                reject(error);
            }
    });

export const filterJobs = (body) =>
    new Promise(async(resolve,reject)=>{
        try {
            let whereCom= {};
            let whereSpe= {};
            let Specialized_name=body.Specialized_name;
            let nameCompany = body.nameCompany;

            if(Specialized_name!== ''){
                whereSpe.Specialized_name={
                    [Op.like]: '%'+Specialized_name+'%'
                }
            } 

            if(nameCompany!== ''){
                whereCom.nameCompany={
                    [Op.like]: '%'+nameCompany+'%'
                }
            } 

            let response = await db.news.findAll({
                where:{
                    date_expiration: {
                        [Op.gt]: new Date()
                    }
                },
                group: ['news.id'],
                include: [
                {
                    model:db.Company,
                    as:"Company",
                    where:whereCom
                },
                {
                    model:db.NewDetail,
                    as: "NewDetail",
                },
            ],
            distinct: true,
            raw: true,
            nest: true
            })

            resolve({
                err: response ? 0 : 1,
                mes: response ? "Got" : "Job not found",
                jobData: response,
            });
        } catch (error) {
            reject(error)
        }
    })

