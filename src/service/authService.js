import bcrypt from "bcryptjs"

import db from "../models/index"
import { Op } from "sequelize";
import { getGroupWithRole, shippingUnit } from "../service/jwtService"
import { CreateJwt } from "../middleware/JwtOption"
require("dotenv").config();

var salt = bcrypt.genSaltSync(10);


const hashPassWord = (passwordInput) => {
    return bcrypt.hashSync(passwordInput, salt);
}


const checkEmail = async (userEmail) => {
    let ixExitEmail = await db.User.findOne({
        where: { email: userEmail }
    })
    if (ixExitEmail) {
        return true
    }
    return false
}
const checkPhone = async (userPhone) => {
    let ixExitPhone = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (ixExitPhone) {
        return true
    }
    return false
}


const regiterNewUser = async (userData) => {
    console.log("userData", userData)
    try {
        let checkEmailExist = await checkEmail(userData.email)
        if (checkEmailExist === true) {
            return {
                EM: "email already exists ",
                EC: "1",
            }
        }
        let checkPhoneExist = await checkPhone(userData.Phone)
        if (checkPhoneExist === true) {
            return {
                EM: "Phone already exists ",
                EC: "1",
            }
        }
        let hashPass = hashPassWord(userData.password);

        await db.User.create({
            email: userData.email,
            password: hashPass,
            username: userData.username,
            phone: userData.Phone,
            groupId: 3,
        })
        return {
            EM: "Created new user succesfully ^-^ ",
            EC: 0
        }
    } catch (error) {
        return {
            EM: "please check again in service ",
            EC: -2
        }
    }




}



const checkPassWord = (inputPassWord, hashPassWord) => {
    return bcrypt.compareSync(inputPassWord, hashPassWord)
}


const LoginUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: data.valueLogin },
                    { phone: data.valueLogin }

                ]
            }
        })
        if (user) {
            let isCorrectPassword = checkPassWord(data.password, user.password)
            if (isCorrectPassword == true) {
                let groupWithRole = await getGroupWithRole(user);
                let nameUnit = await shippingUnit(+user.shippingUnit_Id);

                let payload = {
                    email: user.email,
                    phone: user.phone,
                    username: user.username,
                    phone: user.phone,
                    Position: user.Position,
                    shippingUnit_Id: user.shippingUnit_Id,
                    groupWithRole,
                    nameUnit
                }

                let token = CreateJwt(payload)
                return {
                    EM: "ok ! ",
                    EC: "0",
                    DT: {
                        access_token: token,
                        groupWithRole,
                        email: user.email,
                        phone: user.phone,
                        Position: user.Position,
                        username: user.username,
                        shippingUnit_Id: user.shippingUnit_Id,
                        nameUnit

                    }

                }
            }
        }
        return {
            EM: "Your email/phone number or password is incorrect ",
            EC: "1",
            DT: ""

        }
    } catch (error) {
        console.log(error)
        return {
            EM: "please check again in service ",
            EC: -2
        }
    }
}
module.exports = {
    regiterNewUser, checkPassWord, LoginUser
}