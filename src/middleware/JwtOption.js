import jwt from "jsonwebtoken"
require("dotenv").config();


// khai bao cac route khong can check quyen cua jwt
const nonSecurePaths = ['/login', '/register', '/logout',];

const CreateJwt = (payload) => {
    console.log("payload",payload)
    let key = process.env.JWT_SECRET;

    console.log("process.env.JWT_SECRET",process.env.JWT_SECRET)
    let token = null
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN
            // set time het han cho token
        });
console.log("token",)
    } catch (error) {
        console.log(error)

    }
    return token
}



const VerifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null
    try {
        decoded = jwt.verify(token, key)
    } catch (error) {
        console.log(error)

    }
    return decoded


}
// ham lay token tren header
const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];

    }
    return null;
}



// check nguoi dung da dang nhap chua
const checkUserJwt = (req, res, next) => {
    // neu co cac route khong can check quyen thi den day duoc di tiep den controller
    if (nonSecurePaths.includes(req.path)) return next();

    let cookies = req.cookies
    let tokenFromHeader = extractToken(req);

    if ((cookies && cookies.jwt) || tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader
        let decoded = VerifyToken(token)
        if (decoded) {
            // khi da dang nhap co token thi duoc di tiep
            req.user = decoded;
            req.token = token;
            // truyen thong tin user va token cho moi phan tu sau khi check token thanh cong
            next();
        }


        else {
            return res.status(401).json({
                EM: "Not Authenticated the user",
                EC: "-1",
                DT: ""
            })
        }
        // console.log("check cookies", cookies.jwt)

    }





    else {
        return res.status(401).json({
            EM: "Not Authenticated the user",
            EC: "-1",
            DT: ""
        })
    }
}




// check nguoi dung co quyen truy cap vao cac duong link khong
const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === "/account") return next();
    if (req.user) {
        let email = req.user.email
        let role = req.user.groupWithRole.Roles
        let currentUrl = req.path;
        if (!role && role.lenghth === 0) {
            return res.status(403).json({
                EM: "you don't have permission to access this page ",
                EC: "-1",
                DT: ""
            })
        }
        let userCanAccess = role.some(item => item.url === currentUrl || currentUrl.includes(item.url))
        if (userCanAccess === true) {
            next()
        } else {
            return res.status(403).json({
                EM: "you don't have permission to access this page ",
                EC: "-1",
                DT: ""
            })
        }

    } else {
        return res.status(401).json({
            EM: "Not Authenticated the user",
            EC: "-1",
            DT: ""
        })
    }
}

module.exports = {
    CreateJwt, VerifyToken, checkUserJwt, checkUserPermission
}