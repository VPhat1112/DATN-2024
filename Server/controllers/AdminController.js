import * as services from "../service";
import { internalServerError, badRequest } from "../middleware/handdle_error";

export const TotalNewUserDay = async (req, res) => {
    try {
        const response = await services.getTotalNewUserDay();
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const PercentUsersAndCompanies = async (req, res) => {
    try {
        const response = await services.getPecentUserandCompany();
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const TotalNewUserMonth = async(req,res) =>{
    try {
        const response = await services.getTotalNewUserMonth();
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const TotalCompanyMonth = async(req,res)=>{
    try {
        const response = await services.getTotalCompany();
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const TotalApplyCvYear = async(req,res)=>{
    try {
        const response = await services.getTotalApplyCvEachMonth();
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const TotalJobsYear = async(req,res)=>{
    try {
        const response = await services.getTotalJobPostEachMonth();
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const TotalApplyMonth = async(req,res)=>{
    try {
        const response = await services.getTotalApplyCvMonth();
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const filterUsers = async(req,res) =>{
    try {
        const response = await services.filterUsers(req.body);
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const AllSpe = async(req,res)=>{
    try {
        const response = await services.getAllSpe();
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const updateSpe = async (req,res)=>{
    try {
        const {SpID} = req.params;
        const response = await services.updateSpe(req.body,SpID);
        console.log(response);
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const DetleteSpe = async (req,res) =>{
    try {
        const {SpId} = req.params;
        const response = await services.DeleteSpe(SpId);
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const AllUSer = async(req,res) =>{
    try {
        const response= await services.getAllUser();
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const AllCompany = async(req,res)=>{
    try {
        const response= await services.getAllCompany();
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const getUserByID = async(req,res)=>{
    try {
        const {userID} = req.params;
        const response= await services.getUserByID(userID);
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}