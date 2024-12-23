import db from "../models";

export const getAllNotification = (account_id) =>
    new Promise(async(resolve,reject)=>{
        try {
            const response = await db.notification.findAll({
                where:{
                    account_id:account_id,
                    status:'visible'
                }
            })

            resolve({
                err: response ? 0 : 1,
                mes: response ? "Got" : "Notification not found",
                Notification: response,
            });
        } catch (error) {
            reject(error)
        }
    })

export const getAllNotificationHidden = (account_id) =>
    new Promise(async(resolve,reject)=>{
        try {
            const response = await db.notification.findAll({
                where:{
                    account_id:account_id,
                    status:'hidden'
                }
            })

            resolve({
                err: response ? 0 : 1,
                mes: response ? "Got" : "Notification not found",
                Notification: response,
            });
        } catch (error) {
            reject(error)
        }
    })

export const HiddenNotification = (account_id,noti_id) =>
    new Promise(async(resolve,reject)=>{
        try {
            const response = await db.notification.findAll({
                where:{
                    id:noti_id,
                    account_id:account_id,
                    status:'status'
                }
            })

            if(response===null){
                resolve({
                    err: 1,
                    mes: "Notification not found",
                });
            }else{
                const updateResponse= db.notification.update({
                    where:{
                        id:noti_id
                    },
                    status:'hidden'
                })
                resolve({
                    err: updateResponse > 0 ? 0 : 1,
                    mes: updateResponse > 0 ? "Hidden Complte" : "Error",
                    Notification: response,
                });
            }

            
        } catch (error) {
            reject(error)
        }
    })

export const VisibleNotification = (account_id,noti_id) =>
    new Promise(async(resolve,reject)=>{
        try {
            const response = await db.notification.findAll({
                where:{
                    id:noti_id,
                    account_id:account_id,
                    status:'hidden'
                }
            })

            if(response===null){
                resolve({
                    err: 1,
                    mes: "Notification not found",
                });
            }else{
                const updateResponse= db.notification.update({
                    where:{
                        id:noti_id
                    },
                    status:'visible'
                })
                resolve({
                    err: updateResponse > 0 ? 0 : 1,
                    mes: updateResponse > 0 ? "visible Complte" : "Error",
                    Notification: response,
                });
            }

            
        } catch (error) {
            reject(error)
        }
    })



