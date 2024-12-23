import { reject } from "lodash";
import db from "../models";
import bcrypt from "bcryptjs";
import { where } from "sequelize";

// Chưa nối api/Controller

export const getAllUser= () =>
    new Promise(async (resolve, reject)=>{
        try {
            const response = await db.account.findAll({
                where:{role:"R2"},
                include:[
                    {
                        model:db.seeker,
                        as:"seeker",
                        attributes:{ exclude: ['createdAt', 'updatedAt'] },
                    }
                ],
                attributes:{ exclude: ['password', 'createdAt', 'updatedAt','googleId','status','otp_expiration','tokenUser'] },
                raw: true,
                nest:true
            })
            resolve({
                err: response ? 0 : 1,
                mes: response ? "Lấy danh sách thành công" : "Lấy danh sách thất bại",
                response
            })
        } catch (error) {
            reject(error)
        }
    })

export const getAllCompany = () =>
    new Promise(async(resolve, reject)=>{
        try {
            const response = await db.account.findAll({
                where:{role:"R3"},
                include: [{ 
                    model: db.Company, 
                    as: "Company",
                    attributes:{ exclude: ['createdAt', 'updatedAt'] }, 
                }],
                attributes:{ exclude: ['password', 'createdAt', 'updatedAt','googleId','status','otp_expiration','tokenUser'] },
                raw: true,
                nest:true
            })
            resolve({
                err: response ? 0 : 1,
                mes: response ? "Lấy danh sách thành công" : "Lấy danh sách thất bại",
                response
            })
        } catch (error) {
            reject(error)
        }
    })

export const getUserByID= (userID) =>
    new Promise(async(resolve,reject)=>{
        try {
            const response= db.account.findOne({
                where:{
                    id:userID
                },
                attributes:{ exclude: ['password', 'createdAt', 'updatedAt','googleId','status','otp_expiration','tokenUser'] },
                raw: true,
                nest:true
            })

            resolve({
                err: response ? 0 : 1,
                mes: response ? "Lấy thông tin thành công" : "Lấy thông tin thất bại",
                response
            })

        } catch (error) {
            reject(error)
        }
    })

