import * as services from "../service";
import { internalServerError, badRequest } from "../middleware/handdle_error";
import { reject } from "lodash";
import { sendMail } from "../ultils/sendMail";


export const getallCv = async(req,res) =>{
    try {
        const {seekerid} = req.params;
        const response= await services.allCv(seekerid);
        if(response.err===1){
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json("Có lỗi trong quá trình tìm hồ sơ của bạn!")
        return internalServerError(res);
    }
}


export const getCvbySeekerId = async(req,res) =>{
    try {
        const {cv_id,seeker_id}=req.params;
        const response = await services.getCv(seeker_id,cv_id);
        if(response.err===1){
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json("Có lỗi khi lấy hồ sơ! Vui lòng thử lại sau")
        return internalServerError(res);
    }
}


export const newCv = async (req,res)=>{
    try {
        // const {seeker_id,Type_cv,Career_goal,Education_name,Education_yearFirst,Education_yearLast,experience_name,experience_year,Skill_name,Project_name,Project_git,language_name,language_year} = req.body;
        const response = await services.newCv(req.body);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi tạo mới hồ sơ' });
        return internalServerError(res);
    }
}

export const deleteCv = async(req,res) => {
    try {
        const {CvId} = req.params;
        const response = await services.deleteCv(CvId);
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi xóa hồ sơ' });
        return internalServerError(res);
    }
}


export const updateExp = async (req, res) => {
    try {
        const {Eid} = req.params;
        const response = await services.updateCvExp(req.body,Eid);
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi cập nhật hồ sơ' });
        return internalServerError(res);
    }
};

export const updateEdu = async (req, res) => {
    try {
        const {Did} = req.params;
        const response = await services.updateCvEdu(req.body,Did);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi cập nhật hồ sơ' });
        return internalServerError(res);
    }
};

export const updateSkill = async (req, res) => {
    try {
        const {Sid} = req.params;
        const response = await services.updateCvSkill(req.body,Sid, { new: true });
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi cập nhật hồ sơ' });
        return internalServerError(res);
    }
};

export const updateProject = async (req, res) => {
    try {
        const {Pid} = req.params;
        const response = await services.updateCvProject(req.body,Pid, { new: true });
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi cập nhật hồ sơ' });
        return internalServerError(res);
    }
};

export const updateLanguege = async (req, res) => {
    try {
        const {Lid} = req.params;
        const response = await services.updateCvLan(req.body,Lid, { new: true });
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi cập nhật hồ sơ' });
        return internalServerError(res);
    }
};

export const updateInformationJob = async (req, res) => {
    try {
        const {Info_id} = req.params;
        const response = await services.updateCvInformationJob(req.body,Info_id, { new: true });
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi cập nhật hồ sơ' });
        return internalServerError(res);
    }
};

export const updateCv = async (req, res) => {
    try {
        const {CvId} = req.params;
        const response = await services.UpdateCv(req.body,CvId, { new: true });
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi cập nhật hồ sơ' });
        return internalServerError(res);
    }
};

export const ApplyCv = async(req,res) =>{
    try {
        const {CVid,Jid} = req.params;
        const response = await services.ApplyCV(CVid,Jid);
        if(response.err===1){
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi không thể nộp hồ sơ' });
        return internalServerError(res);
    }
}

export const AcceptCVCon= async(req,res) =>{
    try {
        const {Cv_id,dec} = req.params;

        const response= await services.AcceptCv(Cv_id,dec);

        console.log(response)

        let email = response.Data.CvApply.seeker.account.email


        let CompanyName = response.Data.newApply.Company.nameCompany

        console.log(email)
        
        if (response.err === 2) {
            const html  =`
                <h3 style="font-weight:bold;"><b> xin kính chào  ${email}!</b></h3>
                
                <p>Bạn nhận được email này vì hồ sơ của bạn đã nộp vào ${CompanyName} đã được duyệt </p>
                
                <p>Vui lòng liên lạc với công ty qua số điện thoại của người liên lạc thông tin và trao đổi thêm.</p>
        
                <div>Xin chân thành cảm ơn!</div>
                `;
            await sendMail({
                email,
                html,
                subject: "Chúc mừng hồ sơ của bạn đã được duyệt ",
            });

            return res.status(200).json(response);
        }else if(response.err === 0){
            const html  =`
                <h3 style="font-weight:bold;"><b> xin kính chào  ${email}!</b></h3>
                
                <p>Bạn nhận được email này vì hồ sơ của bạn đã nộp vào ${CompanyName} bị từ chối </p>
                
                <p>Chúng tôi đã xem và đánh giá hồ sơ của bạn nhưng chúng tôi rất tiếc vì nó không phù hợp với yêu cầu của chúng tôi.</p>
        
                <div>Xin chân thành cảm ơn!</div>
                `;
            await sendMail({
                email,
                html,
                subject: "Rất tiếc hồ sơ của bạn đã được từ chối",
            });

            return res.status(200).json(response);
        }
        if(response.err===1){
            return res.status(400).json(response);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi' });
        return internalServerError(res);
    }
}

export const AllAppLyCvCon= async(req,res)=>{
    try {
        const {id} = req.params;
        const response = await services.AllApplyCv(id);
        if(response.err===1){
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy hồ sơ' });
        return internalServerError(res);
    }
}

export const getCvById = async(req,res)=>{
    try {
        const {id} = req.params;
        const response = await services.GetApplyCvByID(id);
        if(response.err===1){
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy hồ sơ' });
        return internalServerError(res);
    }
}

export const getCvByJob = async(req,res)=>{
    try {
        const {Jid} = req.params;
        const response = await services.AllCvByJob(Jid);
        if(response.err===1){
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy hồ sơ' });
        return internalServerError(res);
    }
}

export const getCvByJobDeny = async(req,res)=>{
    try {
        const {Jid} = req.params;
        const response = await services.AllCvByJobDeny(Jid);
        if(response.err===1){
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy hồ sơ' });
        return internalServerError(res);
    }
}

export const getCvByJobAccept = async(req,res)=>{
    try {
        const {Jid} = req.params;
        const response = await services.AllCvByJobAccept(Jid);
        if(response.err===1){
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy hồ sơ' });
        return internalServerError(res);
    }
}




