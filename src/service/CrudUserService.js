import { raw } from "body-parser";
import db from "../models/index"
import bcrypt from "bcryptjs"

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




const getAllUser = async () => {
    let data = {
        EM: "",
        EC: "",
        DT: "",
    }
    try {
        let users = await db.User.findAll({

            include: [
                {
                    model: db.Group,
                },
                {
                    model: db.Province_customer,

                },
                {
                    model: db.District_customer,

                },
                {
                    model: db.Ward_customer,

                },
                {
                    model: db.Shipping_Unit,

                },

            ],



        })
        if (users) {
            // let data = users.get({ plain: true })
            return {
                EM: " get data ok",
                EC: "0",
                DT: users,
            }

        }
        else {
            return {
                EM: " get data ok",
                EC: "0",
                DT: [],
            }
        }
    } catch (error) {
        return {
            EM: " Wrongs with services",
            EC: "1",
            DT: [],
        }

    }
}
const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll(
            {
                include: [
                    {
                        model: db.Group,
                    },
                    {
                        model: db.Province_customer,

                    },
                    {
                        model: db.District_customer,

                    },
                    {
                        model: db.Ward_customer,

                    },
                    {
                        model: db.Shipping_Unit,

                    },

                ],
                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,
                // sort: ""

            },

        )

        let totalPage = Math.ceil(count / limit)
        let data = {
            totalUser: count,
            totalPage: totalPage,
            dataUser: rows
        }



        return {
            EM: " ok",
            EC: "0",
            DT: data,
        }

    } catch (error) {
        return {
            EM: " Wrongs with services",
            EC: "1",
            DT: [],
        }
    }
}
const createUser = async (data) => {
    try {
        let checkEmailExist = await checkEmail(data.email)
        if (checkEmailExist === true) {
            return {
                EM: "email already exists ",
                EC: "1",
                DT: "email"
            }
        }

        let checkPhoneExist = await checkPhone(data.phone)
        if (checkPhoneExist === true) {
            return {
                EM: "Phone already exists ",
                EC: "1",
                DT: "phone"

            }

        }


        let hashPass = hashPassWord(data.password);
        if (!data.group) {
            await db.User.create({
                email: data.email,
                phone: data.phone,
                password: hashPass,
                username: data.username,
                address: data.addressDetail,
                sex: data.sex,
                groupId: 4,
                image: data.image,
                Province_customerId: data.Province_customerId,
                District_customerId: data.District_customerId,
                Ward_customerId: data.Ward_customerId,
                addressDetail: data.addressDetail,
                Position: data.Position,
                shippingUnit_Id: data.shippingUnit_Id

            })
            return {
                EM: " Create ok",
                EC: "0",
                DT: [],
            }

        }
        if (data.group) {
            await db.User.create({
                email: data.email,
                phone: data.phone,
                password: hashPass,
                username: data.username,
                address: data.addressDetail,
                sex: data.sex,
                groupId: data.group,
                image: data.image,
                Province_customerId: data.Province_customerId,
                District_customerId: data.District_customerId,
                Ward_customerId: data.Ward_customerId,
                addressDetail: data.addressDetail,
                Position: data.Position,
                shippingUnit_Id: data.shippingUnit_Id

            })
            return {
                EM: " Create ok",
                EC: "0",
                DT: [],
            }

        }


    } catch (error) {
        return {
            EM: " Wrongs with services",
            EC: "1",
            DT: [],
        }
    }

}
const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: " Can Not Update with Empty GroudId",
                EC: "1",
                DT: "group",
            }
        }



        let User = await db.User.findOne({
            where: { id: data.id }
        })

        if (User) {
            await User.update({
                address: data.address,
                sex: data.sex,
                groupId: data.groupId,
                image: data.image,
                username: data.username,
                Province_customerId: data.Province_customerId,
                District_customerId: data.District_customerId,
                Ward_customerId: data.Ward_customerId,
                addressDetail: data.addressDetail,
                Position: data.Position,
                shippingUnit_Id: data.shippingUnit_Id

            })
            return {
                EM: " Update Success",
                EC: "0",
                DT: "",
            }
        } else {
            return {
                EM: " User Not Found",
                EC: "2",
                DT: "",
            }

        }
    } catch (error) {
        return {
            EM: " Wrongs with services",
            EC: "1",
            DT: [],
        }
    }
}
const deleteUser = async (id) => {
    try {
        let User = await db.User.findOne({
            where: { id: id }
        })
        if (User) {
            await User.destroy()
            return {
                EM: "Delete user success",
                EC: 0,
                DT: []

            }
        } else {
            return {
                EM: "Can delete user",
                EC: 2,
                DT: []

            }
        }
    } catch (error) {
        return res.status(500).json({
            EM: "Error from Server",
            EC: "-1",
            DT: "",
        })
    }

}
const getDataSearchUser = async (data) => {
    try {
        let AllUser = await db.User.findAll({
            include: [
                {
                    model: db.Group,
                },
                {
                    model: db.Province_customer,

                },
                {
                    model: db.District_customer,

                },
                {
                    model: db.Ward_customer,

                },
                {
                    model: db.Shipping_Unit,

                },

            ],

        })
        if (AllUser) {
            const AllUserSearch = AllUser.filter(item =>
                item.email.includes(data) ||
                item.username.includes(data) ||
                item.phone.includes(data) ||
                item.Province_customer.name.includes(data) ||
                item.District_customer.name.includes(data) ||
                item.Ward_customer.name.includes(data) ||
                item.addressDetail.includes(data)
            )
            return {
                EM: " get data search success",
                EC: "0",
                DT: AllUserSearch,

            }

        } else {
            return {
                EM: " not Found   ",
                EC: "0",
                DT: [],
            }
        }

    } catch (error) {
        return {
            EM: " Wrongs with services",
            EC: "1",
            DT: [],
        }
    }
}

const getUserWithPaginationbyGroupName = async (page, limit, GroupId) => {

    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll(

            {
                where: { groupId: GroupId },

                include: [
                    {
                        model: db.Group,
                    },
                    {
                        model: db.Province_customer,

                    },
                    {
                        model: db.District_customer,

                    },
                    {
                        model: db.Ward_customer,

                    },
                    {
                        model: db.Shipping_Unit,

                    },

                ],
                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,

            },

        )

        let totalPage = Math.ceil(count / limit)
        let data = {
            totalUser: count,
            totalPage: totalPage,
            dataUser: rows
        }



        return {
            EM: " ok",
            EC: "0",
            DT: data,
        }

    } catch (error) {
        return {
            EM: " Wrongs with services",
            EC: "1",
            DT: [],
        }
    }
}

const getUserWithphone = async (phone) => {
    try {
        let User = await db.User.findOne({
            where: { phone: phone }
        })
        if (User) {
            return {
                EM: "  success",
                EC: 0,
                DT: User

            }
        } else {
            return {
                EM: "not found",
                EC: 2,
                DT: []

            }
        }
    } catch (error) {
        return res.status(500).json({
            EM: "Error from Server",
            EC: "-1",
            DT: "",
        })
    }

}

module.exports = {
    getAllUser, createUser, updateUser, deleteUser, getUserWithPagination, getDataSearchUser, getUserWithPaginationbyGroupName, getUserWithphone
}