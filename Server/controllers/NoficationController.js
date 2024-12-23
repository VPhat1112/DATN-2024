import * as services from "../service";
import { internalServerError, badRequest } from "../middleware/handdle_error";

export const AllNotification = async(req,res)=>{
    try {
        const {account_id} = req.params;
        const response = await services.getAllNotification(account_id);

        if(response.err===1) return res.status(400).json(response); 
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json(response);
        return internalServerError(res);
    }
}

export const AllNotificationHidden = async(req,res)=>{
    try {
        const {account_id} = req.params;
        const response = await services.getAllNotificationHidden(account_id);

        if(response.err===1) return res.status(400).json(response); 
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json(response);
        return internalServerError(res);
    }
}

export const HiddenNotification = async(req,res)=>{
    try {
        const {account_id,noti_id} = req.params;
        const response = await services.HiddenNotification(account_id,noti_id);

        if(response.err===1) return res.status(400).json(response); 
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json(response);
        return internalServerError(res);
    }
}

export const VisibleNotification = async(req,res)=>{
    try {
        const {account_id,noti_id} = req.params;
        const response = await services.VisibleNotification(account_id,noti_id);

        if(response.err===1) return res.status(400).json(response); 
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json(response);
        return internalServerError(res);
    }
}