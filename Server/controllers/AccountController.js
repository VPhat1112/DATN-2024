import * as services from "../service";
import { sendMail } from "../ultils/sendMail";
import { internalServerError, badRequest } from "../middleware/handdle_error";
import { email, Passwords } from "../helpers/joi_schema";
import Joi from "joi";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    // Validate input data
    const { email, Passwords, firstName, lastName, SDT } = req.body;
    if (!email || !Passwords || !firstName || !lastName || !SDT) {
      return res.status(400).json("Missing inputs");
    }

    // Check if email already exists
    const checkMail = await services.checkMail({ email });
    if (checkMail?.err === 0) {
      return res.status(400).json(
        "User already exists"
      );
    }

    // Generate token and create new user
    const token = Math.floor(Math.random() * 900000) + 100000;
    const emailedited = btoa(email) + "@" + token;
    const Role = 'R2';
    const newUser = await services.newUser({
      email: emailedited,
      Passwords,
      Role,
      tokenUser: token,
      firstName,
      lastName,
      SDT,
    });

    // If user creation is successful, send verification email and schedule deletion
    if (newUser.err === 0) {
      // const html = `<h2>Register code:</h2><br/><blockquote>${token}</blockquote>`;
      const html  =`
        <h3 style="font-weight:bold;"><b>MS-Clinic xin kính chào  ${email}!</b></h3>
        
        <p>Bạn nhận được email này vì đã đăng ký tài khoản online trên mywebsite</p>
        <p>Để xác nhận tài khoản vui lòng click vào đường dẫn ở dưới để active tài khoản:</p>
        
        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để hoàn tất thủ tục.</p>
        <div><a href="http://127.0.0.1:8080/api/v1/user/finalregister/${token}" target="_blank; style="color:blue; text-decoration:underline;">Click here</a></div>

        <div>Xin chân thành cảm ơn!</div>
        `;
      await sendMail({
        email,
        html,
        subject: "hoàn tất đăng ký ",
      });

      setTimeout(async () => {
        await services.deleteEmail(emailedited);
      }, 300000); // Adjust timeout as needed
    }

    return res.json(newUser);
  } catch (error) {
    return internalServerError(res);
  }
};

export const registerCompany = async (req, res) => {
  try {
    // Validate input data
    const { email, Passwords, nameCompany, typeCompany, numberEmployees,National,Address,Company_description,contactPerson,phoneContact } = req.body;
    if (!email || !Passwords || !nameCompany || !typeCompany || !numberEmployees || !National || !Address || !Company_description || !contactPerson || !phoneContact) {
      return res.status(400).json(
        "Missing inputs"
      );
    }

    // Check if email already exists
    const checkMail = await services.checkMail({ email });
    if (checkMail?.err === 0) {
      return res.status(400).json(
        "User has existed"
      );

    }

    // Generate token and create new user
    const token = Math.floor(Math.random() * 900000) + 100000;
    const emailedited = btoa(email) + "@" + token;
    const Role = 'R3';
    const newUser = await services.newCompany({
      email: emailedited,
      Passwords,
      Role,
      tokenUser: token,
      nameCompany,
      typeCompany,
      numberEmployees,
      National,
      Address,
      Company_description,
      contactPerson,
      phoneContact
    });

    // If user creation is successful, send verification email and schedule deletion
    if (newUser.err === 0) {
      const html  =`
        <h3 style="font-weight:bold;"><b>MS-Clinic xin kính chào  ${email}!</b></h3>
        
        <p>Bạn nhận được email này vì đã đăng ký tài khoản online với tư cách nhà tuyển dụng trên mywebsite</p>
        <p>Để xác nhận tài khoản vui lòng click vào đường dẫn ở dưới để active tài khoản:</p>
        
        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để hoàn tất thủ tục.</p>
        <div><a href="http://127.0.0.1:8080/api/v1/user/finalregister/${token}" target="_blank; style="color:blue; text-decoration:underline;">Click here</a></div>

        <div>Xin chân thành cảm ơn!</div>
        `;
      await sendMail({
        email,
        html,
        subject: "hoàn tất đăng ký ",
      });

      setTimeout(async () => {
        await services.deleteEmail(emailedited);
      }, 300000); // Adjust timeout as needed
    }

    return res.json(newUser);
  } catch (error) {
    return internalServerError(res);
  }
};


export const finalregister = async (req, res) => {
  try {
    const { token } = req.params;
    const notActivedEmail = await services.notActivedEmail(token);
    if (notActivedEmail.err === 0) {
      await services.updateUser(notActivedEmail?.mes?.id, {
        email: atob(notActivedEmail?.mes?.email?.split("@")[0]),
      });
      await services.getCurrent(notActivedEmail?.mes?.id);
      return res.send('Đăng ký thành công');
    }
    return res.send('Có lỗi xảy ra. Vui lòng thử lại');
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};
export const getCurrent = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.getCurrent(id);

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const token = Math.floor(Math.random() * 900000) + 100000;
    if (!email) throw new Error("Missing email");
    const response = await services.forgotPassword(email,token);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword, token,email } = req.body;
    if (!newPassword || !token || !email) throw new Error("Missing input");
    const response = await services.resetPassword(email, token,newPassword );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

export const loginSeeker = async (req, res) => {
  try {
    const { error } = Joi.object({ email, Passwords }).validate(req.body);
    if (error) {
      return badRequest(error.details[0]?.message, res);
    }
    const response = await services.loginUSer(req.body);
    if(response.err===1){
      return res.status(400).json(response);
    }
    console.log(response.userData.id)
    const token =jwt.sign({id:response.userData.id,role:response.userData.role}, 'jwtKey');
    console.log(token)

    // res.cookie('auth',token);
    // res.send('ok');
    return res
    .cookie("access_token_Company", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        withCredentials: true
    })
    .status(200)
    .json(response)
    
      
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

export const loginCompany = async (req, res) => {
  try {
    const { error } = Joi.object({ email, Passwords }).validate(req.body);
    if (error) {
      return badRequest(error.details[0]?.message, res);
    }
    const response = await services.loginCompany(req.body);

    if(response.err===1){
      return res.status(400).json(response);
    }
    console.log(response.userData.id)
    const token =jwt.sign({id:response.userData.id,role:response.userData.role}, 'jwtKey');
    console.log(token)

    // res.cookie('auth',token);
    // res.send('ok');
    return res
    .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        withCredentials: true
    })
    .status(200)
    .json(response)
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

export const LoginGoogle = async (req, res) => {
  try {
    let response = await services.handleLoginGoogle(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return internalServerError(res);
  }
};

export const Logout = async(req,res) =>{
  res.clearCookie("access_token",{
    SameSite:"none",
    secure:true
  }).status(200).json("user has been logout")
}