import axios from "../axios";

export const apiUserDay = () =>
    axios({
        url:"/admin/get-total-new-user-day",
        method: "get",
        data: Response,
    });

export const apiPercentUandC = () =>
    axios({
        url:"/admin/get-percent-users-companies",
        method: "get",
        data: Response,
    });


export const apiUserMonth = () =>
    axios({
        url:"/admin/get-total-new-user-month",
        method: "get",
        data: Response,
    });

export const apiCompanyMonth = () =>
    axios({
        url:"/admin/get-total-company-month",
        method: "get",
        data: Response,
    });

export const apiApplyCvEachMonth = () =>
    axios({
        url:"/admin/get-total-applycv-each-month",
        method: "get",
        data: Response,
    });

export const apiJobsEachMonth = () =>
    axios({
        url:"/admin/get-total-jobs-each-month",
        method: "get",
        data: Response,
    });

export const apiApplyCvthisMonth = () =>
    axios({
        url:"/admin/get-total-applycv-month",
        method: "get",
        data: Response,
    });

export const apiAllSpe = () =>
    axios({
        url:"/admin/allSpe",
        method: "get",
        data: Response,
    });

export const apiUpdateSpe = (SpID,inputData)=>
    axios({
        url:`/admin/${SpID}`,
        method: "put",
        data: inputData,
    })

export const apiDeleteSpe = (SpId) =>
    axios({
        url:`/admin/${SpId}`,
        method:"delete",
    })

export const apifilterUsers =(data) =>
    axios({
        url:"/admin/filter-users",
        method:"post",
        data:data,
    })

export const apiAllUser =()=>
    axios({
        url:"/admin/get-all-user",
        method:"get",
        data:Response,
    })

export const apiAllCompany =()=>
    axios({
        url:"/admin/get-all-company",
        method:"get",
        data:Response,
    })

export const apiUserByID =(userID)=>
    axios({
        url:`/admin/get-user-by-id/${userID}`,
        method:"get",
        data:Response,
    })