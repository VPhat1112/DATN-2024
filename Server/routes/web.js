import Account from './Account.js';
import Job from './Job.jsx';
import { notfound } from "../middleware/handdle_error.js";
const initRoutes =(app)=>{
    app.use("/api/v1/user",Account);
    app.use("/api/v1/job",Job)
    app.use(notfound);
}
module.exports = initRoutes;