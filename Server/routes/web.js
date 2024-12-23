import Account from './Account';
import Job from './Job';
import cv from './Cv';
import apply from './Apply.js';
import notification from './Notification.js';
import admin from './Admin.js';
import Site from './SiteRoute.js';
import { notfound } from "../middleware/handdle_error.js";
const initRoutes =(app)=>{
    app.use("/api/v1/user",Account);
    app.use("/api/v1/job",Job);
    app.use("/api/v1/cv",cv);
    app.use("/api/v1/apply",apply);
    app.use("/api/v1/notifi",notification);
    app.use("/api/v1/admin",admin);
    app.use("/api/v1/site",Site);
    app.use(notfound);
}
module.exports = initRoutes;