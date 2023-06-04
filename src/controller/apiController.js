
import authService from "../service/authService"


const TestApi = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: "ok da ket noi"
    })

}
const HandleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.Phone || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameters",
                EC: "1",
                DT: "",
            })
        }
        if (req.body.password && req.body.password.length < 6 || !req.body.password) {
            return res.status(200).json({
                EM: "Password have to enter at least 6 character",
                EC: "1",
                DT: "",
            })
        }


        let data = await authService.regiterNewUser(req.body)


        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: "",
        })

    } catch (error) {
        return res.status(500).json({
            EM: "Error from Server",
            EC: "-1",
            DT: "",
        })
    }

}






const HandleLogin = async (req, res) => {
    try {
        let data = await authService.LoginUser(req.body);
        console.log("req.body", req.body)
        //set cookie (khi login thanh cong va co token thi moi set cookie)
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000
                // set time cookies ton tai

            })
        }

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT

        })
    } catch (error) {
        return res.status(500).json({
            EM: "Error from Server",
            EC: "-1",
            DT: "",
        })
    }

}


const HandleGetUserAccount = async (req, res) => {
    return res.status(200).json({
        EM: "ok",
        EC: 0,
        DT: {
            access_token: req.token,
            groupWithRole: req.user.groupWithRole,
            email: req.user.email,
            username: req.user.username,
            phone: req.user.phone,
            image: req.user.image,
            Position: req.user.Position,
            shippingUnit_Id: req.user.shippingUnit_Id,
            nameUnit: req.user.nameUnit
        }

    })
}



const HandleLogout = (req, res) => {

    try {
        res.clearCookie("jwt")
        return res.status(200).json({
            EM: "log out ok",
            EC: 0,
            DT: "",
        })

    } catch (error) {
        return res.status(500).json({
            EM: "Error from Server",
            EC: "-1",
            DT: "",
        })
    }
}
module.exports = {
    TestApi, HandleRegister, HandleLogin, HandleGetUserAccount,
    HandleLogout
}