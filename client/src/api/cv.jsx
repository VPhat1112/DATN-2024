import axios from "../axios";

export const apiApplyCv = (Jid,CVid)=>
    axios({
        url:`/cv/${Jid}/${CVid}`,
        method: "put",
    });

export const apiAllCvByJob = (Jid) =>
    axios({
        url:`/cv/Company/get-cv-by-Job/${Jid}`,
        method: "get",
        data:Response
    })

export const apiAceptCv = (dec,Cv_id)=>
    axios({
        url:`/cv/accept/${dec}/${Cv_id}`,
        method: "put",
    })

export const apiUpdateCv = (CvId,data) =>
    axios({
        url:`/cv/update-cv/${CvId}`,
        method:"put",
        data:data
    })

export const apiGetCv = (Uid) =>
    axios({
        url:`/cv/get-all-cv/${Uid}`,
        method:"get",
        data:Response
    })

export const apiUpdateInforJob = (Info_id,data) =>
    axios({
        url:`/cv/Update-Infor-Job/${Info_id}`,
        method:"put",
        data:data
    })

export const apiupdateEx = (Eid,data)=>
    axios({
        url:`/cv/Update-Exp/${Eid}`,
        method:"put",
        data:data
    })

export const apiupdateEdu = (Did,data)=>
    axios({
        url:`/cv/Update-Edu/${Did}`,
        method:"put",
        data:data
    })

export const apiupdateSkill = (Sid,data)=>
    axios({
        url:`/cv/Update-Ski/${Sid}`,
        method:"put",
        data:data
    })

export const apiupdateProject = (Pid,data)=>
    axios({
        url:`/cv/Update-Pro/${Pid}`,
        method:"put",
        data:data
    })

export const apiupdateLanguage = (Lid,data)=>
    axios({
        url:`/cv/Update-Lan/${Lid}`,
        method:"put",
        data:data
    })