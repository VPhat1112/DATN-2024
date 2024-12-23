import axios from "../axios";

// export const apiJob = (q,salary,salarygte,salarygt,salarylt,salarylte) =>{
//     const params = [];

//     if (q) {params.push(`q=${q}`);}
//     if (salary) {params.push(`salary=${salary}`);}
//     if (salarygte) {params.push(`salarygte=${salarygte}`);}
//     if (salarygt) {params.push(`salarygt=${salarygt}`);}
//     if (salarylt) {params.push(`salarylt=${salarylt}`);}
//     if (salarylte) {params.push(`salarylte=${salarylte}`);}

    
export const apiJob = () =>
    axios({
        url:`/job/`,
        method: "get",
        data: Response,
    });

export const apiDetailJob =(jid) =>
    axios({
        url:`/job/${jid}`,
        method:"get",
        data:Response
    })

export const apiSpeByJob = (Jid) =>
    axios({
        url:`/job/SpeByJob/${Jid}`,
        method:"get",
        data:Response
    })

export const apiJobByCompany = (Cid) =>
    axios({
        url:`/job/Company/${Cid}`,
        method: "get",
        data: Response,
    })

export const apiJobSearchcompany = (Cid,data)=>
    axios({
        url:`/job/Company/${Cid}`,
        method: "post",
        data:data
    })

export const apiJobBySpe = (Sid)=>
    axios({
        url:`/job/JobBySpe/${Sid}`,
        method: "get",
        data:data
    })

export const apiFilterJob = (data)=>
    axios({
        url:`/job/filter-job`,
        method: "post",
        data:data
    })

export const ApplyCv = (Jid,CVid)=>
    axios({
        url:`/cv/${Jid}/${CVid}`,
        method:"put",
    })
    
export const apicreateJob= (data) =>
    axios({
        url:`/job/`,
        method: "post",
        data:data
    })