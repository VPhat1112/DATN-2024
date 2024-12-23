import * as services from "../service";
import { internalServerError, badRequest } from "../middleware/handdle_error";
import { getJobByCompany } from './../service/Job';

export const getJobs = async (req, res) => {
    try {
        const response = await services.getJobs(req.body);
        if(response.err===1){
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json(response);
        return internalServerError(res);
    }
};

export const getJob = async (req,res) =>{
    try {
        const {jid} = req.params; 
        const response = await services.getJob(jid);
        if(response.err===1){
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const createJob = async (req,res) =>{
    try {
        const{Company_id,Education,Job_name,date_expiration,Address,Min_Salary,Max_Salary,image_decscription,Gender_requirements,Age_requirements,typeJob,Salary,experience,jobLevel,Welfare,job_description,job_requirements,another_informations,specia}=req.body;
        if(
            Job_name==''&&
            date_expiration==''&&
            Address==''&&
            typeJob==''&&
            Salary==''&&
            experience==''&&
            jobLevel==''&&
            job_description==''&&
            job_requirements==''
        ){
            return res.status(400).json({
                err:1,
                mes:"Bạn đã nhập thiếu thông tin nào đó rồi! Vui lòng thử lại"
            })
        }
        const another_information =another_informations||null;
        const response = await services.createNew(req.body)
        if(response.err===1) return res.status(400).json(response); 
        
        return res.status(200).json(response);
        
        
    } catch (error) {
        
    }
}

export const updateJobs = async (req, res) => {
    try {
        const { pid } = req.params;
        const response = await services.UpdateNews(req.body, pid);
        if(response.err===1) return res.status(400).json(response); 
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};


export const getJobCompany = async(req,res) =>{
    try {
        const {Cid} = req.params;
        const response = await services.getJobByCompany(Cid);
        console.log(response);
        if(response.err===1) return res.status(400).json(response); 
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
}


export const filterJobs = async(req,res) =>{
    try {
        const response = await services.filterJobs(req.body);
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const filterJobsCompany = async(req,res) =>{
    try {
        const {Cid} = req.params;
        const response = await services.filterJobCompany(Cid,req.body);
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const SpeByJob = async(req,res)=>{
    try {
        const {Jid} = req.params;
        const response = await services.getSpeJob(Jid);
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}

export const getJobBySPe = async(req,res)=>{
    try {
        const {Sid} = req.params;
        const response = await services.getJobBySpe(Sid);
        if(response.err===1) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return internalServerError(res);
    }
}