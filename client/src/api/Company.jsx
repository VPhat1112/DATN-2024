import axios from "../axios";

    
export const api = (Jid) =>
    axios({
        url:`/cv/get-cv-by-Job/${Jid}`,
        method: "get",
        data: Response,
    });