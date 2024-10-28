import db from "../models";
import bcrypt, { compare } from "bcryptjs";
import { Op, where } from "sequelize";
import { sendMail } from "../ultils/sendMail";
import { email } from "../helpers/joi_schema";
import account from "../models/account";
import jwt from "jsonwebtoken";
  

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(4));

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const googleAuth = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  const {sub,email,name,picture} = payload;
  const userId=sub;
  return {userId,email,fullname:name,photoUrl:picture};
}



export const handleLoginGoogle = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
    let userData = {};

     let googleUser = await googleAuth(data.tokenId)

      let user = await db.account.findOrCreate({
        where: { email: googleUser.email },
        defaults: {
          email: googleUser.email,
          role: "R2",
        },
      });

      let currentUser;
      if(user && user[0].role=='R2'){
        currentUser= await db.account.findOne({
          where: { email: user[0].email },
          
          include: [
          {
            model:db.seeker,
            as: "seeker",
          }],
          raw: true,
          nest: true,
        });
      }

      let checkSeeker = db.seeker.findOne({
        where:{account_id:user.id}
      })

      if(!checkSeeker){
        const newUserId = user.id; // Adjust based on your database

        let address = null;
        let genber = null;
        let image = null;

        await db.seeker.create({
          account_id: newUserId,
          firstname: null,
          lastname: googleUser.fullname,
          address:address, // Assuming address is still null
          phonenumber: SDT,
          genber, // Assuming genber is still null
          image, // Assuming image is still null
        });
      }

      if(currentUser){
        userData.errCode = 0;
        userData.errMessage = "OK";
        delete currentUser.password;
        userData.user = currentUser;
      }

      resolve({
        err: 0 ,
        mes: "success",
        userData:currentUser
      }); 
    } catch (e) {
      reject(e);
    }
  });
};
    // Check mail in db
  export const checkMail = ({ email }) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await db.account.findOne({
            where: { email },
          });
          resolve({
            err: response ? 0 : 1,
          });
        } catch (error) {
          reject(error);
          console.log(error);
        }
      });

    // Not activedEmail
  export const notActivedEmail = (token) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await db.account.findOne({
          where: {
            email: {
              [Op.endsWith]: token,
            },
          },
        });
        resolve({
          err: response ? 0 : 1,
          mes: response ? response : "something went wrong",
        });
      } catch (error) {
        console.log(error);
  
        reject(error);
      }
    });

    // Delete Mail
  export const deleteEmail = (email) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await db.account.destroy({
          where: { email: email },
        });
        resolve({
          err: response > 0 ? 0 : 1,
          mes: `${response} user deleted`,
        });
      } catch (error) {
        reject(error);
      }
    });
    // Create new User
  export const newUser = ({ email, Passwords, Role, tokenUser,firstName,lastName,SDT}) =>
      new Promise(async (resolve, reject) => {
          try {
            let googleId=null
            const response = await db.account.create({
              email: email,
              password: hashPassword(Passwords),
              role:Role,
              googleId,
              tokenUser,
          });
          
          // Extract the new account's ID using appropriate property name based on your database schema
          const newUserId = response.id; // Adjust based on your database

          let address = null;
          let genber = null;
          let image = null;

          // await db.query("INSERT INTO seekers (account_id,firstname,lastname,address,phonenumber,genber,image) VALUES (?,?,?,?,?,?,?)"),[newUserId,firstname,lastname,address,phonenumber,genber,image],(err,rows)
          await db.seeker.create({
            account_id: newUserId,
            firstname: firstName,
            lastname: lastName,
            address, // Assuming address is still null
            phonenumber: SDT,
            genber, // Assuming genber is still null
            image, // Assuming image is still null
          });
        
          resolve({
              err: response ? 0 : 1,
              mes: response ? "Register is successful. Please Check your mail" : "something went wrong",
          });
          } catch (error) {
          console.log(error);
      
          reject(error);
          }
      });
  
  // Create new Company
  export const newCompany = ({ email, Passwords, Role, tokenUser,nameCompany,typeCompany,numberEmployees,National,Address,Company_description,contactPerson,phoneContact}) =>
    new Promise(async (resolve, reject) => {
        try {
          const response = await db.account.create({
            email: email,
            password:  hashPassword(Passwords),
            role:Role,
            tokenUser,
        });
        
        const newCompanyId = response.id;
        await db.Company.create({
          account_id: newCompanyId,
          nameCompany:nameCompany,
          typeCompany:typeCompany,
          numberEmployees:numberEmployees,
          National:National,
          Address:Address,
          Company_description:Company_description,
          contactPerson:contactPerson,
          phoneContact:phoneContact
        })
      
        resolve({
            err: response ? 0 : 1,
            mes: response ? "Register Company is successful" : "something went wrong",
        });
        } catch (error) {
        console.log(error);
    
        reject(error);
        }
    });
  // Update User
  export const updateUser = (userId, body) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await db.account.update(body, {
          where: { id: userId },
        });
        resolve({
          err: response[0] > 0 ? 0 : 1,
          mes:
            response[0] > 0
              ? `${response[0]} user updated`
              : "some thing went wrong",
        });
      } catch (error) {
        reject(error);
      }
    });
  // For got password
  export const forgotPassword = (email,token) =>
    new Promise(async (resolve, reject) => {
      try {
        const User = await db.account.findOne({ where: { email } });
        if (!User) {
          resolve({
            err: 1,
            mes: "User not found",
          });
        }
          const expirationTime = new Date(Date.now() + 10 * 60000);
        await db.account.update(
          {
            tokenUser:token,
            otp_expiration: expirationTime 
          },
          {
            where: { email },
          }
        );
        const html = `<h2>Authentication code:</h2><br/><blockquote>${token}</blockquote>`;
          const data = {
            email,
            html,
            subject: "hoàn tất xác thực ",
          }
        const rs = await sendMail(data);
        resolve({
          err: rs.response.includes("OK") ? 0 : 1,
          mes: rs.response.includes("OK")
            ? "Hảy kiểm tra mail của bạn"
            : "Đã có lổi,hảy thử lại",
        });
      } catch (error) {
        reject(error);
      }
    });
// Reset your password with token
  export const resetPassword = (email, token, newPassword) =>
    new Promise(async (resolve, reject) => {
      try {
          const User = await db.account.findOne({ where: { email } });
        if (!User) {
          resolve({
            err: 1,
            mes: "User not found",
          });
          return
        }
        // const otpExpirationDate = new Date(account.otp_expiration);
        if (User.tokenUser != token || User.otp_expiration < new Date()) {
          resolve({
            err: 1,
            mes: 'Invalid or expired OTP',
            data: {token,email,newPassword},
            ourdata: User,
            // check: new Date(),
            // newdata: account.otp_expiration
          });
          return
        }
        const userUpdate = await db.account.update(
          {
            password: hashPassword(newPassword),
            otp_expiration:null
          },
          {
            where: {
              email
            },
          }
        );
        resolve({
          err: userUpdate[0] > 0 ? 0 : 1,
          mes: userUpdate[0] > 0 ? "Updated password" : "Something went wrong",
        });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

  export const getCurrent = (userId) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await db.account.findOne({
          where: {
            id: userId,
          },
          include: [
            {
              model:db.seeker,
              as: "seeker",
            },
            {
              model:db.Company,
              as:"Company"
            }
          ],
          attributes: {
            exclude: ["Passwords"],
          },
        });
        resolve({
          err: response ? 0 : 1,
          mes: response ? "Got" : "User not found",
          userData: response,
        });
      } catch (error) {
        reject(error);
      }
    });

  export const loginUSer = ({ email, Passwords }) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await db.account.findOne({
          where: {
            email,
          },
          include: [
          {
            model:db.seeker,
            as: "seeker",
          }
        ],
          raw: true,
        });
        const isChecked =
          response && bcrypt.compareSync(Passwords, response.password);
          
          

        if (!response || !bcrypt.compareSync(Passwords, response.password)) {
          // Combined login failure message
          resolve({ err: 1, mes: "Login failed. Incorrect email, password." });
        }
        if (response.role !== 'R2') {
          resolve({ err: 1, mes: "Login failed. You do not have access to this service. Maybe the gmail just now is registered to the employer" });
        }else{
          

          resolve({
            err: 0 ,
            mes: "Login Seeker is successful",
            userData:
              { 
                  // data:response,
                  id: response.id,
                  email: response.email,
                  firstName: response?.["seeker.firstname"],
                  lastName: response?.["seeker.lastname"],
                  // lastName: response.seeker.lastname,
                  SDT: response.SDT,
                  role:response.role,

                }
              ,
          }); 
        }
      } catch (error) {
        reject(error);
      }
    });
      
  export const loginCompany = ({ email, Passwords }) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await db.account.findOne({
          where: {
            email,
          },
          include: [
          {
            model:db.Company,
            as: "Company",
          }
        ],
          raw: true,
        });
        const isChecked =
          response && bcrypt.compareSync(Passwords, response.password);

          if (!response || !bcrypt.compareSync(Passwords, response.password)) {
            // Combined login failure message
            resolve({ err: 1, mes: "Login failed. Incorrect email, password." });
          }
          if (response.role !== 'R3') {
            resolve({ err: 1, mes: "Login failed. You do not have access to this service. Maybe the gmail just now is registered to the Seeker" });
          }else{
            resolve({
              err: 0 ,
              mes: "Login Employers is successful",
              userData:
                { 
                    // data:response,
                    id: response.id,
                    email: response.email,
                    nameCompany: response?.["Company.nameCompany"],
                    SDT: response.SDT,
                    role:response.role,
                    Company: response.Company,
                  }
                ,
            }); 
          }
      } catch (error) {
        reject(error);
      }
    });
  
  
  