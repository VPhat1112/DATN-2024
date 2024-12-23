import { reject } from "lodash";

import db from "../models";
import { Op, Transaction, where } from "sequelize";

const moment = require("moment");

export const getTotalNewUserDay =() =>
    new Promise(async(resolve, reject)=>{
        try {
            let CurrentDate = moment(new Date()).format("YYYY-MM-DD");
            // console.log(CurrentDate)
            let users = await db.account.findAll({
                where:{role:"R2"},
                attributes: ["id", "createdAt"],
                raw: true,
                nest: true,
            })
            
            users.map((item)=>{
                item.createdAt = moment(item.createAt).format("YYYY-MM-DD");
                return item;
            })
            // console.log(users)
            users = users.filter((item) => item.createdAt == CurrentDate);

            let totalNewUserDay = users.length;

            resolve({
                err: 0,
                data: { totalNewUserDay: totalNewUserDay },
            });
        } catch (error) {
            reject(error)
        }
    })

export const getTotalNewUserMonth =() =>
    new Promise(async(resolve, reject)=>{
        try {
            let CurrentDate = moment(new Date()).format("MM");
            // console.log(CurrentDate)
            let users = await db.account.findAll({
                where:{role:"R2"},
                attributes: ["id", "createdAt"],
                raw: true,
                nest: true,
            })
            
            users.map((item)=>{
                item.createdAt = moment(item.createAt).format("MM");
                return item;
            })
            // console.log(users)
            users = users.filter((item) => item.createdAt == CurrentDate);

            let totalNewUserDay = users.length;

            resolve({
                err: 0,
                data: { totalNewUserDay: totalNewUserDay },
            });
        } catch (error) {
            reject(error)
        }
    })

export const getPecentUserandCompany = () =>
    new Promise(async(resolve,reject)=>{
        try {
            const Users = await db.account.findAndCountAll({
                where:{role:"R2"}
            })          
            const Companies = await db.account.findAndCountAll({
                where:{role:"R3"}
            })

            let max =  Users.count+Companies.count;

            let percentUsers=Users.count/max*100;

            let percentComapanues=Companies.count/max*100;

            let percentTotal = [
                {namePercent:"User",value:percentUsers},
                {namePercent:"Company",value:percentComapanues}
            ]

            resolve({
                err: 0,
                mes:"got",
                percentTotal: percentTotal ,
            });

        } catch (error) {
            reject(error)
        }
    })

export const getTotalCompany =()=>
    new Promise(async(resolve, reject)=>{
        try {
            let CurrentMonth = moment(new Date()).format("MM")
            console.log(CurrentMonth)
            let companies = await  db.Company.findAll({
                attributes: ["id", "createdAt"],
                raw: true,
                nest: true,
            })

            companies.map((item)=>{
                item.createdAt = moment(item.createAt).format("MM");
                return item;
            })

            console.log(companies)

            companies = companies.filter((item) => item.createdAt == CurrentMonth);

            let totalCompanyMoth = companies.length;

            resolve({
                err: 0,
                data: { totalCompanyMoth: totalCompanyMoth },
            });
        } catch (error) {
            reject(error)
        }
    })

export const getTotalApplyCvEachMonth = () =>
    new Promise(async(resolve,reject)=>{
        try {
            let applyCvs= await db.ApplyCv.findAll({
                attributes:["id","createdAt"],
                raw: true,
                nest: true,
            });

            applyCvs.map((item)=>{
                item.createdAt = moment(item.createdAt).month();
                return item;
            });


            let totalApplyCvMonth1 = 0;
            let totalApplyCvMonth2 = 0;
            let totalApplyCvMonth3 = 0;
            let totalApplyCvMonth4 = 0;
            let totalApplyCvMonth5 = 0;
            let totalApplyCvMonth6 = 0;
            let totalApplyCvMonth7 = 0;
            let totalApplyCvMonth8 = 0;
            let totalApplyCvMonth9 = 0;
            let totalApplyCvMonth10 = 0;
            let totalApplyCvMonth11 = 0;
            let totalApplyCvMonth12 = 0;

            

            applyCvs.map((item)=>{
                switch (item.createdAt) {
                    case 0:
                        totalApplyCvMonth1 = totalApplyCvMonth1 + 1;
                        break;
                    case 1:
                        totalApplyCvMonth2 = totalApplyCvMonth2 + 1;
                        break;
                    case 2:
                        totalApplyCvMonth3 = totalApplyCvMonth3 + 1;
                        break;
                    case 3:
                        totalApplyCvMonth4 = totalApplyCvMonth4 + 1;
                        break;    
                    case 4:
                        totalApplyCvMonth5 = totalApplyCvMonth5 + 1;
                        break;
                    case 5:
                        totalApplyCvMonth6 = totalApplyCvMonth6 + 1;
                        break;
                    case 6:
                        totalApplyCvMonth7 = totalApplyCvMonth7 + 1;
                        break;
                    case 7:
                        totalApplyCvMonth8 = totalApplyCvMonth8 + 1;
                        break;
                    case 8:
                        totalApplyCvMonth9 = totalApplyCvMonth9 + 1;
                        break;
                    case 9:
                        totalApplyCvMonth10 = totalApplyCvMonth10 + 1;
                        break;
                    case 10:
                        totalApplyCvMonth11 = totalApplyCvMonth11 + 1;
                        break;
                    case 11:
                        totalApplyCvMonth12 = totalApplyCvMonth12 + 1;
                        break;
                    default:
                        break;
                }
            })

            
            let dataApply12Month = [
                { month: 'January', value: totalApplyCvMonth1 },
                { month: 'February', value: totalApplyCvMonth2 },
                { month: 'March', value: totalApplyCvMonth3 },
                { month: 'April', value: totalApplyCvMonth4 },
                { month: 'May', value: totalApplyCvMonth5 },
                { month: 'June', value: totalApplyCvMonth6 },
                { month: 'July', value: totalApplyCvMonth7 },
                { month: 'August', value: totalApplyCvMonth8 },
                { month: 'September', value: totalApplyCvMonth9 },
                { month: 'October', value: totalApplyCvMonth10 },
                { month: 'November', value: totalApplyCvMonth11 },
                { month: 'December', value: totalApplyCvMonth12 },
            ];
            

            

            resolve({
                err: 0,
                dataApply12Month
            });
        } catch (error) {
            reject(error)
        }
    })

export const getTotalJobPostEachMonth = () =>
    new Promise(async(resolve,reject)=>{
        try {
            let Jobs= await db.news.findAll({
                attributes:["id","createdAt"],
                raw: true,
                nest: true,
            });

            Jobs.map((item)=>{
                item.createdAt = moment(item.createdAt).month();
                return item;
            });


            let totalJobsMonth1 = 0;
            let totalJobsMonth2 = 0;
            let totalJobsMonth3 = 0;
            let totalJobsMonth4 = 0;
            let totalJobsMonth5 = 0;
            let totalJobsMonth6 = 0;
            let totalJobsMonth7 = 0;
            let totalJobsMonth8 = 0;
            let totalJobsMonth9 = 0;
            let totalJobsMonth10 = 0;
            let totalJobsMonth11 = 0;
            let totalJobsMonth12 = 0;

            

            Jobs.map((item)=>{
                switch (item.createdAt) {
                    case 0:
                        totalJobsMonth1 = totalJobsMonth1 + 1;
                        break;
                    case 1:
                        totalJobsMonth2 = totalJobsMonth2 + 1;
                        break;
                    case 2:
                        totalJobsMonth3 = totalJobsMonth3 + 1;
                        break;
                    case 3:
                        totalJobsMonth4 = totalJobsMonth4 + 1;
                        break;    
                    case 4:
                        totalJobsMonth5 = totalJobsMonth5 + 1;
                        break;
                    case 5:
                        totalJobsMonth6 = totalJobsMonth6 + 1;
                        break;
                    case 6:
                        totalJobsMonth7 = totalJobsMonth7 + 1;
                        break;
                    case 7:
                        totalJobsMonth8 = totalJobsMonth8 + 1;
                        break;
                    case 8:
                        totalJobsMonth9 = totalJobsMonth9 + 1;
                        break;
                    case 9:
                        totalJobsMonth10 = totalJobsMonth10 + 1;
                        break;
                    case 10:
                        totalJobsMonth11 = totalJobsMonth11 + 1;
                        break;
                    case 11:
                        totalJobsMonth12 = totalJobsMonth12 + 1;
                        break;
                    default:
                        break;
                }
            })

            
            let dataJobs12Month = [
                { month: 'January', value: totalJobsMonth1 },
                { month: 'February', value: totalJobsMonth2 },
                { month: 'March', value: totalJobsMonth3 },
                { month: 'April', value: totalJobsMonth4 },
                { month: 'May', value: totalJobsMonth5 },
                { month: 'June', value: totalJobsMonth6 },
                { month: 'July', value: totalJobsMonth7 },
                { month: 'August', value: totalJobsMonth8 },
                { month: 'September', value: totalJobsMonth9 },
                { month: 'October', value: totalJobsMonth10 },
                { month: 'November', value: totalJobsMonth11 },
                { month: 'December', value: totalJobsMonth12 },
            ];
            

            

            resolve({
                err: 0,
                dataJobs12Month
            });
        } catch (error) {
            reject(error)
        }
    })

export const getTotalApplyCvMonth = () =>
    new Promise(async(resolve,reject)=>{
        try {

            let CurrentMonth = moment(new Date()).month()

            let applyCvs= await db.ApplyCv.findAll({
                attributes:["id","createdAt"],
                raw: true,
                nest: true,
            });
            applyCvs.map((item)=>{
                item.createdAt = moment(item.createdAt).month();
                return item;
            });

            let numbercvs = applyCvs.filter((item) => item.createdAt == CurrentMonth);

            let totalcvsMonth = numbercvs.length;

            resolve({
                err: 0,
                mes:"got",
                data: { totalcvsMonth: totalcvsMonth },
            });


        } catch (error) {
            reject(error)
        }
    })

export const getAllSpe = () =>
    new Promise(async(resolve,reject)=>{
        try {
            const response = await db.specialized.findAll();
            resolve({
                err: response ? 0 : 1,
                mess: response ? "Đã lấy" : "Đã có lỗi",
                response,
            });
        } catch (error) {
            reject(error)
        }
    })

export const updateSpe = (body,SpId) =>
    new Promise(async(resolve,reject)=>{
        try {
            if(SpId){
                const response = await db.specialized.update(body, {
                    where: { id: SpId }, 
                    updatedAt: new Date(), 
                });
                resolve({
                    err: response ? 0 : 1,
                    mes: response ? "update complete":"Failed",
                });
            }else{
                const response = await db.specialized.create(body);
                resolve({
                    err: response ? 0 : 1,
                    mes: response ? "create Spe complete":"Failed",
                });
            }

            

        } catch (error) {
            reject(error)
        }
    });

export const DeleteSpe =  (SpID) =>
    new Promise(async(resolve,reject)=>{
        try {
            const response = await db.specialized.destroy({
                where: { id: SpID } 
            });
            resolve({
                err: response > 0 ? 0 : 1,
                mess: response > 0 ? "Đã xóa" : "Đã có lỗi",
                response,
            });
        } catch (error) {
            reject(error)
        }
    })

export const filterUsers = (data)=>
    new Promise(async(resolve,reject)=>{
        try {
            let whereAcc= {};

            let email=data.email;


            let whereUser={};

            let firstname=data.firstname;
            let lastname=data.lastname;
            let address=data.address;
            let genber=data.gender;
            let phonenumber=data.phonenumber;

            if(firstname!== ''){
                whereAcc.firstname={
                    [Op.like]: '%'+firstname+'%'
                }
            } 
            if(lastname!== ''){
                whereAcc.lastname={
                    [Op.like]:'%'+lastname+'%'
                }
            } 
            if(email!== ''){
                whereUser.email={
                    [Op.like]:'%'+email+'%'
                }
            } 
            whereUser.role="R2"
            if(address!== ''){
                whereAcc.address={
                    [Op.like]:'%'+address+'%'
                }
            } 
            if(phonenumber!== '') whereAcc.phonenumber={
                [Op.like]:'%'+phonenumber+'%'
            }
            if(genber!=='') whereAcc.genber=={
                [Op.like]:'%'+genber+'%'
            }

            let dataUsers = await db.account.findAll({
                where:whereUser,
                raw: true,
                nest: true,
                attributes:{ exclude: ['password', 'createdAt', 'updatedAt','googleId','status','otp_expiration','tokenUser'] },
                include:[
                    {
                        model:db.seeker,
                        where:whereAcc,
                        attributes:{ exclude: ['createdAt', 'updatedAt'] },
                    }
                ]
            })

            resolve({
                err: dataUsers ? 0 : 1,
                mess: dataUsers  ? "Đã lấy" : "Đã có lỗi",
                dataUsers,
            });

        } catch (error) {
            reject(error)
        }
    })
