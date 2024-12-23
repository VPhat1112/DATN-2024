import { where } from "sequelize";
import db from "../models";
import { includes, reject } from "lodash";
import { formatDate } from './../ultils/dateUtils';



// FInd all your cv
export const allCv = (seekerid)=>
    new Promise(async(resolve,reject)=>{
        try {
            const response = await db.cv.findAll({
                where: {
                    seeker_id: seekerid
                },
                // distinct: true,
                // group:'cv.id',
                include: [
                    { 
                        model: db.seeker, 
                        as: "seeker",
                        include:[
                            { model: db.experience},
                            { model: db.education},
                            { model: db.project},
                            { model: db.skill},
                            { model: db.language}
                        ]
                    },
                    
                ],
                raw: true,
                nest: true
            })
            
            resolve({
                err: response ? 0 : 1,
                mes: response ? "Lấy thành công":"Không tìm thấy hồ sơ",
                CvData: response
            });

            
        } catch (error) {
            console.log(error)
            reject(error)
        }
    });

export const getCv = (seeker_id,cv_id)=>
    new Promise(async(resolve,reject)=>{
        try {
            const response = db.cv.findOne({
                where:{id:cv_id,seeker_id:seeker_id},
                include: [
                    { 
                        model: db.seeker, 
                        as: "seeker",
                        include:[
                            { model: db.experience},
                            { model: db.education},
                            { model: db.project},
                            { model: db.skill},
                            { model: db.language}
                        ]
                    },
                    
                ],
                raw: true,
                nest: true
            })

            

            resolve({
                err: response===null ? 0 : 1,
                mes: response===null ? "Đã lấy ":"Hồ sơ không tồn tại",
                CvData: response
            });

        } catch (error) {
            reject(error)
        }
    });


export const updateCvExp = (body,Eid)=>
    new Promise(async(resolve,reject)=>{
        try {
            if(Eid=== undefined){
                const createExp = await db.experience.create(body)
                resolve({
                    err: createExp ? 0 : 1,
                    mes: createExp ? "create CvExp complete":"Failed",
                });
            }else{
                const updateExp = await db.experience.update(body, {
                    where: { id: Eid }, 
                    updatedAt: new Date(), 
                });
                resolve({
                    err: updateExp > 0 ? 0 : 1,
                    mes: updateExp > 0 ? "update CvExp complete":"Failed",
                });
            }
        } catch (error) {
            reject(error)
        }
    });

export const updateCvEdu = (body,Did)=>
    new Promise(async(resolve,reject)=>{
        try {

            if(Did=== undefined){
                const createEdu = await db.education.create(body)
                resolve({
                    err: createEdu ? 0 : 1,
                    mes: createEdu ? "create CvEdu complete":"Failed",
                });
            }else{
                const updateEdu = await db.education.update(body, {
                    where: { id: Did }, 
                    updatedAt: new Date(), 
                });
                resolve({
                    err: updateEdu > 0 ? 0 : 1,
                    mes: updateEdu > 0  ? "update CvEdu complete":"Failed",
                    data: updateEdu
                });
            }
        }catch (error) {
            reject(error)
        }
    });

export const updateCvProject = (body,Pid)=>
    new Promise(async(resolve,reject)=>{
        try {
            if(Pid=== undefined){
                const createproject = await db.project.create(body)
                resolve({
                    err: createproject ? 0 : 1,
                    mes: createproject ? "create CvProject complete":"Failed",
                });
            }else{
                const updateproject = await db.project.update(body, {
                    where: { id: Pid }, 
                    updatedAt: new Date(), 
                });
                resolve({
                    err: updateproject > 0 ? 0 : 1,
                    mes: updateproject > 0 ? "update Cvproject complete":"Failed",
                });
            }
        } catch (error) {
            reject(error)
        }
    });

export const updateCvSkill = (body,Sid)=>
    new Promise(async(resolve,reject)=>{
        try {
            if(Sid=== undefined){
                const createSkill = await db.skill.create(body)
                resolve({
                    err: createSkill ? 0 : 1,
                    mes: createSkill ? "create CvProSkill complete":"Failed",
                });
            }else{
                const updateskill = await db.skill.update(body, {
                    where: { id: Sid }, 
                    updatedAt: new Date(), 
                });
                resolve({
                    err: updateskill > 0 ? 0 : 1,
                    mes: updateskill > 0 ? "update CvSkill complete":"Failed",
                });
            }
        } catch (error) {
            reject(error)
        }
    });

export const updateCvLan = (body,Lid)=>
    new Promise(async(resolve,reject)=>{
        try {

            if(Lid=== undefined){
                const createLan = await db.language.create(body)
                resolve({
                    err: createLan ? 0 : 1,
                    mes: createLan ? "create CvLan complete":"Failed",
                });
            }else{
                const updateLan = await db.language.update(body, {
                    where: { id: Lid }, 
                    updatedAt: new Date(), 
                });
                resolve({
                    err: updateLan > 0 ? 0 : 1,
                    mes: updateLan > 0 ? "update Cvproject complete":"Failed",
                });
            }
        } catch (error) {
            reject(error)
        }
    });

export const updateCvInformationJob = (body,Info_id)=>
    new Promise(async(resolve,reject)=>{
        try {

            if(Info_id=== undefined){
                const createLan = await db.Information_Job.create(body)
                resolve({
                    err: createLan ? 0 : 1,
                    mes: createLan ? "create CvLan complete":"Failed",
                });
            }else{
                const updateLan = await db.Information_Job.update(body, {
                    where: { id: Info_id }, 
                    updatedAt: new Date(), 
                });
                resolve({
                    err: updateLan > 0 ? 0 : 1,
                    mes: updateLan > 0 ? "update Infor_Job complete":"Failed",
                });
            }
        } catch (error) {
            reject(error)
        }
    });

export const UpdateCv = (body,CvId) =>
    new Promise(async(resolve,reject)=>{
        try {
            
            if(CvId===undefined){
                const response = await db.cv.create({
                    seeker_id:body.seeker_id,
                    Type_cv:body.Type_cv?body.seeker_id:null,
                    Career_goal:body.Career_goal?body.Career_goal:null,
                    title:body.title?body.title:null,
                    sumary:body.sumary?body.sumary:null,
                    color:body.color?body.color:null
                })

                // console.log(response)

                resolve({
                    err: response ? 0 : 1,
                    mes: response ? "create Cv complete.":"Failed",
                });
            }else{
                const response = await db.cv.update(body, {
                    where: { id: CvId }, 
                    updatedAt: new Date(), 
                });
                resolve({
                    err: response > 0 ? 0 : 1,
                    mes: response > 0 ? "update Cv complete":"Failed",
                });
            }
            
        } catch (error) {
            reject(error)
        }
    });

export const deleteCv = (CvId) =>
    new Promise(async(resolve,reject)=>{
        try {
            const response = await db.cv.destroy({
                where:{id:CvId},
            });
            resolve({
                err: response > 0 ? 0 : 1,
                mes: response > 0 ? "Xóa thành công" : "Xóa thất bại"
            })
        } catch (error) {
            reject(error)
        }
    })


export const ApplyCV =  (CVid,Jid) => 
    new Promise(async(resolve,reject)=>{
        try {

            const cvapply= await db.ApplyCv.findAll({
                where:{
                    new_id:Jid,
                    cv_id:CVid
                },
                raw: true,
                nest: true
            })
            // console.log(cvapply)

            

            if(!cvapply){
                resolve({
                    err: 1,
                    mes:  "Bạn đã nộp thành công cv cho công việc này" 
                })
            }else{
                
                const job= await db.news.findOne({
                    where: {id:Jid},
                    include: [
                        {
                            model:db.Company,
                            as:"Company"
                        },
                        {
                            model:db.NewDetail,
                            as: "NewDetail",
                        }
                    ],
                    raw: true,
                    nest: true
                });
                let updatedNumberCv = 0;
                const numbercv= job.numberCV;
                updatedNumberCv = numbercv + 1;
                
                const response  = await db.ApplyCv.create({
                    new_id:Jid,
                    cv_id:CVid
                })

                
                const res=await db.news.update(
                    {numberCV:updatedNumberCv},
                    {where:{id: job.id}}
                )
                console.log(res)
                    

                resolve({
                    err: response ? 0 : 1,
                    mes: response ? "Nộp thành công" : "Nộp thất bại"
                })
            }
            

        } catch (error) {
            reject(error)
        }
    })

export const GetApplyCvByID = (Cv_ID) =>
    new Promise(async(resolve,reject)=>{
        try {
            const response= await db.cv.findOne({
                where:{
                    id:Cv_ID
                },
                include:[
                    { 
                        model: db.seeker, 
                        as: "seeker",
                        include:[
                            { model: db.experience},
                            { model: db.education},
                            { model: db.project},
                            { model: db.skill},
                            { model: db.language}
                        ]
                    },
                ],
                raw: true,
                nest: true
            })

            resolve({
                err: response ? 0 : 1,
                mes: response ? "Lấy hồ sơ thành công":"Thất bại",
                CvData: response ? response : "Có lỗi"
            });
        } catch (error) {
            reject(error)
        }
    })

export const AcceptCv = (Cv_id,decision) =>
    new Promise(async(resolve,reject)=>{
        try {

            const ApplyCv = await db.ApplyCv.findOne({
                where:{
                    id: 19
                },
                include:[
                    {
                        model:db.news,
                        as:"newApply",
                        include:[
                            {
                                model:db.Company,
                                as:"Company"
                            },
                        ],
                        raw: true,
                        nest: true
                    },
                    {
                        model:db.cv,
                        as:"CvApply",
                        include:[
                            { 
                                model: db.seeker, 
                                as: "seeker",
                                include:[
                                    { model: db.experience},
                                    { model: db.education},
                                    { model: db.project},
                                    { model: db.skill},
                                    { model: db.language},
                                    { model: db.account,as:"account"},
                                ]
                            },
                        ]
                    },
                    {
                        model:db.cv,
                        as:"CvApply",
                    }
                ],
                raw: true,
                nest: true
            })

            // console.log(ApplyCv)

            // Make Deny CV
            if(decision=="1"){
                const response = await db.ApplyCv.update({
                    status: "Deny",
                    updateAt: new Date()
                }, {
                    where: { id: Cv_id }
                });
                await db.notification.create({
                    account_id:ApplyCv.CvApply.seeker.account_id,
                    notification_content:`Chúng tôi xin chân thành cảm ơn bạn đã dành thời gian nộp hồ sơ.`+
                    ` Tuy nhiên, sau khi cân nhắc kỹ lưỡng, chúng tôi nhận thấy hồ sơ mã số ${Cv_id} của bạn chưa đáp ứng đầy đủ các yêu cầu.`+
                    ` Chúng tôi rất trân trọng sự quan tâm của bạn và chúc bạn thành công trong các ứng tuyển tiếp theo.`
                })

                resolve({
                    err: response ? 0 : 1,
                    mes: response ? "Đã từ chối " : "Có lỗi xảy ra",
                    Data: response ? ApplyCv : "Có lỗi",
                })
            }else if (decision=="2"){
                // Accept CV
                const response = await db.ApplyCv.update({
                    status: "Accept",
                    updateAt: new Date()
                }, {
                    where: { id: Cv_id }
                });
                const currentDate= formatDate(new Date())
                const NameCompany=ApplyCv.newApply.Company.nameCompany
                await db.notification.create({
                    account_id:ApplyCv.CvApply.seeker.account_id,
                    notification_content:`Chúc mừng bạn! Hồ sơ ${Cv_id} vào công ty ${NameCompany} của bạn đã được duyệt vào ngày ${currentDate}.`+
                    `Hãy chuẩn bị các giấy tờ cần thiết để hoàn tất thủ tục. Hãy kiểm tra mail.`
                })

                resolve({
                    err: response ? 2 : 1,
                    mes: response ? "Đã duyệt hồ sơ" : "Có lỗi xảy ra",
                    Data: response ? ApplyCv : "Có lỗi",
                })
                
            }

            
        } catch (error) {
            reject(error)
        }
    })

export const AllApplyCv = (seeker_id) =>
    new Promise(async(resolve,reject)=>{
        try {
            const response= await db.ApplyCv.findAll({
                include:[
                    {
                        model:db.cv,
                        as:"CvApply",
                        where:{
                            seeker_id:seeker_id
                        }
                    },
                    {
                        model:db.news,
                        as:"newApply"
                    }
                ],
                raw: true,
                nest: true
            })

            resolve({
                err: response ? 0 : 1,
                mes: response ? "Lấy hồ sơ thành công" : "Có lỗi xảy ra",
                Data: response 
            })
        } catch (error) {
            reject(error)
        }
    })

export const AllCvByJob = (Jid) =>
    new Promise(async(resolve,reject)=>{
        try {
            const response= await db.ApplyCv.findAll({
                where:{
                    new_id:Jid,
                    status:"Waiting"
                },
                include:[
                    {
                        model:db.cv,
                        as:"CvApply",
                        include:[
                            {
                                model:db.seeker,
                                as:"seeker",
                                include:[
                                    { model: db.experience},
                                    { model: db.education},
                                    { model: db.project},
                                    { model: db.skill},
                                    { model: db.language},
                                    { model: db.account,as:"account"},
                                ]
                            }
                        ]
                    },
                    {
                        model:db.cv,
                        as:"CvApply",
                    }
                ],
                raw: true,
                nest: true
            })
            // console.log(Jid);
            resolve({
                err: response ? 0 : 1,
                mes: response ? "Lấy hồ sơ thành công" : "Có lỗi xảy ra",
                Data: response 
            })
        } catch (error) {
            reject(error)
        }
    })

export const AllCvByJobDeny = (Jid) =>
    new Promise(async(resolve,reject)=>{
        try {
            const response= await db.ApplyCv.findAll({
                where:{
                    new_id:Jid,
                    status:"Deny"
                },
                include:[
                    {
                        model:db.cv,
                        as:"CvApply",
                        include:[
                            {
                                model:db.seeker,
                                as:"seeker",
                                include:[
                                    { model: db.experience},
                                    { model: db.education},
                                    { model: db.project},
                                    { model: db.skill},
                                    { model: db.language},
                                    { model: db.account,as:"account"},
                                ]
                            }
                        ]
                    },
                    {
                        model:db.cv,
                        as:"CvApply",
                    }
                ],
                raw: true,
                nest: true
            })
            // console.log(Jid);
            resolve({
                err: response ? 0 : 1,
                mes: response ? "Lấy hồ sơ thành công" : "Có lỗi xảy ra",
                Data: response 
            })
        } catch (error) {
            reject(error)
        }
    })

export const AllCvByJobAccept = (Jid) =>
    new Promise(async(resolve,reject)=>{
        try {
            const response= await db.ApplyCv.findAll({
                where:{
                    new_id:Jid,
                    status:"Accept"
                },
                include:[
                    {
                        model:db.cv,
                        as:"CvApply",
                        include:[
                            {
                                model:db.seeker,
                                as:"seeker",
                                include:[
                                    { model: db.experience},
                                    { model: db.education},
                                    { model: db.project},
                                    { model: db.skill},
                                    { model: db.language},
                                    { model: db.account,as:"account"},
                                ]
                            }
                        ]
                    },
                    {
                        model:db.cv,
                        as:"CvApply",
                    }
                ],
                raw: true,
                nest: true
            })
            // console.log(Jid);
            resolve({
                err: response ? 0 : 1,
                mes: response ? "Lấy hồ sơ thành công" : "Có lỗi xảy ra",
                Data: response 
            })
        } catch (error) {
            reject(error)
        }
    })