import db from "../models";
import bcrypt from "bcryptjs";
import { Op, where } from "sequelize";
import { sendMail } from "../ultils/sendMail";
const {OAuth2Client} = require('google-auth-library')


const client = new OAuth2Client("137217508049-o22mgm7kg0qms4ibp7219ig99ott61ib.apps.googleusercontent.com")
  

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(4));

const googleAuth = async (token) => {
  // console.log(token);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  return payload;
}



export const handleLoginGoogle = (tokenID) => {
  return new Promise(async (resolve, reject) => {
    try {
    // let userData = {};

      let googleUser = await googleAuth(tokenID)

      // console.log(googleUser);

      let user = await db.account.findOrCreate({
        where: { email: googleUser.email },
        defaults: {
          email: googleUser.email,
          role: "R2",
        },
      });

      let currentUser={};
      let address = null;
      let genber = null;
      let image = googleUser.picture;
      let firstname= googleUser.family_name;
      let lastname = googleUser.given_name;
      let SDT =null;
      const UserID= user[0].dataValues.id
      // console.log(firstname)
      if(user[0].dataValues.role=='R3'){
        currentUser= await db.account.findOne({
          where: { email: googleUser.email },
          attributes: { exclude: ['password'] },
          include: [
          {
            model:db.Company, as: "Company"
          }],
          raw: true,
          nest: true,
        });

        // console.log(currentUser)
      }else if (user[0].dataValues.role=='R2'){
        await db.seeker.findOrCreate({
          where:{account_id:UserID},
          defaults:{
            account_id: UserID,
            firstname: firstname,
            lastname: lastname,
            address:address,
            phonenumber: SDT,
            genber:genber, 
            image:image, 
          }
        });

        currentUser= await db.account.findOne({
          where: { email: googleUser.email },
          
          include: [
          {
            model:db.seeker,
            as: "seeker",
          }],
          raw: true,
          nest: true,
        });
      }

      
      resolve({
        err: currentUser? 0 : 1 ,
        mes: currentUser? "success":"failed",
        userData:currentUser? currentUser : {}
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
          let National= null
          let Nationality= null
          let Married= null
          let DateBirth= null

          // await db.query("INSERT INTO seekers (account_id,firstname,lastname,address,phonenumber,genber,image) VALUES (?,?,?,?,?,?,?)"),[newUserId,firstname,lastname,address,phonenumber,genber,image],(err,rows)
          await db.seeker.create({
            account_id: newUserId,
            firstname: firstName,
            lastname: lastName,
            address, // Assuming address is still null
            phonenumber: SDT,
            genber, // Assuming genber is still null
            image, // Assuming image is still null
            National,
            Nationality,
            Married,
            DateBirth
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
  export const newCompany = ({ email, Passwords, Role, tokenUser,nameCompany,typeCompany,numberEmployees,National,Address,Company_description,contactPerson,phoneContact,image}) =>
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
          phoneContact:phoneContact,
          image:image
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
        const response = await db.Company.update(body, {
          where: { id: userId },
          updatedAt: new Date(), 
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
  
  export const updateUserSeeker = (userId, body) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await db.seeker.update(body, {
          where: { id: userId },
          updatedAt: new Date(), 
        });
        // console.log(body)
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
        if (User==null) {
          resolve({
            err: 1,
            mes: "User not found",
          });
        }else{
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
              ? "Hãy kiểm tra mail của bạn"
              : "Đã có lổi,hảy thử lại",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
// Reset your password with token
  export const resetPassword = (email, token, newPassword) =>
    new Promise(async (resolve, reject) => {
      try {
          const User = await db.account.findOne({ where: { email } });
        if (User==null) {
          resolve({
            err: 1,
            mes: "User not found",
          });
        }
        // const otpExpirationDate = new Date(account.otp_expiration);
        if (User.tokenUser != token || User.otp_expiration < new Date()) {
          resolve({
            err: 1,
            mes: 'Invalid or expired OTP',
            data: {token,email,newPassword},
            ourdata: User,
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

        const account = await db.account.findOne({
          where: {
            id: userId,
          },
        })

        if(account&&account.role=='R2'){
          const response = await db.account.findOne({
            where: {
              id: userId,
            },
            include: [
              {
                model:db.seeker,
                as: "seeker",
                include:[
                    { model: db.experience},
                    { model: db.education},
                    { model: db.project},
                    { model: db.skill},
                    { model: db.language},
                    { model: db.Information_Job}
                ]
              },
            ],
            attributes: {
              exclude: ["Passwords"],
            },
            nest:true,
            raw: true
          });

          resolve({
            err: response ? 0 : 1,
            mes: response ? "Got" : "User not found",
            response,
          });
        }else if(account&&account.role=='R3'){
          const response = await db.account.findOne({
            where: {
              id: userId,
            },
            include: [
              {
                model:db.Company,
                as:"Company"
              }
            ],
            attributes: {
              exclude: ["Passwords"],
            },
            nest:true,
            raw: true
          });
          resolve({
            err: response ? 0 : 1,
            mes: response ? "Got" : "User not found",
            response,
          });
        }

        
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
          nest: true
        });
        const isChecked =
          response && bcrypt.compareSync(Passwords, response.password);
          
          

        if (!response || !bcrypt.compareSync(Passwords, response.password)) {
          // Combined login failure message
          resolve({ err: 1, mes: "Login failed. Incorrect email, password." });
        }
        if (response.role == 'R2') {
          if(response.status == 'lock'){
            resolve({
              err: 1 ,
              mes: "Your Account have been lock",
            }); 
          }
            resolve({
              err: 0 ,
              mes: "Login Seeker is successful",
              userData:
                { 
                    id: response.id,
                    email: response.email,
                    SDT: response.SDT,
                    role:response.role,
                    seeker:response.seeker
  
                  }
                ,
            }); 
          
        }else if(response.role == 'R0'){
          
          resolve({
            err: 0 ,
            mes: "Bạn đang truy cập với quyền admin",
            userData:
              { 
                  id: response.id,
                  email: response.email,
                  role:response.role,
                }
              ,
          }); 
        }
        resolve({ err: 1, mes: "Không thể đăng nhập. Gmail dùng đăng nhập không có quyền truy cập với quyền là nhà tuyển dụng" });
      } catch (error) {
        reject(error);
      }
    });
      
  export const loginCompany = ({ email, Passwords }) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await db.account.findOne({
          where: { email },  // Use email directly
          // attributes: { exclude: ['tokenUser','createdAt','updatedAt','password'] },
          include: [{ model: db.Company, as: "Company" }],
          raw: true,
          nest: true
        });
        const isChecked =
          response && bcrypt.compareSync(Passwords, response.password);

          if (!response || !bcrypt.compareSync(Passwords, response.password)) {
            // Combined login failure message
            resolve({ err: 1, mes: "Login failed. Incorrect email, password." });
          }
          if (response.role == 'R3') {
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
                
            }); 
          }else if(response.role == 'R0'){
          
            resolve({
              err: 0 ,
              mes: "Bạn đang truy cập với quyền admin",
              userData:
                { 
                    id: response.id,
                    email: response.email,
                    role:response.role,
                  }
                ,
            }); 
          }
          resolve({ err: 1, mes: "Login failed. You do not have access to this service. Maybe the gmail just now is registered to the Seeker" });
      } catch (error) {
        reject(error);
      }
    });
  export const getUser = (email) =>
    new Promise(async(resolve,reject)=>{
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
          nest: true
        });

        resolve({
            err: response ? 0 : 1, 
            mes: response ? "Lấy thông tin thành công.":"Lấy thông tin thất bại, đã có lỗi." 
          });
      } catch (error) {
        reject(error)
      }
    })
  
    export const getCompany = (email) =>
      new Promise(async(resolve,reject)=>{
        try {
          const response = await db.account.findOne({
            where: { email },  
            include: [{ model: db.Company, as: "Company" }],
            raw: true,
            nest: true
          });
  
          resolve({
              err: response ? 0 : 1, 
              mes: response ? "Lấy thông tin thành công.":"Lấy thông tin thất bại, đã có lỗi." 
            });
        } catch (error) {
          reject(error)
        }
      })
    