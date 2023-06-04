import db from "../models/index"

import { getGroupWithRole } from "../service/jwtService"

const creatNewGroup = async (roles) => {
    try {

        let CurrenRoles = await db.Role.findAll({
            attributes: ["url", "description"],
            raw: true
        })
        // ham so sanh tim ra phan tu khac nhau giua 2arrary
        const results = roles.filter(({ url: url1 }) =>
            !CurrenRoles.some(({ url: url2 }) => url1 === url2))
        if (results.length == 0) {
            return {
                EM: " nothing to Create or role already exist",
                EC: "0",
                DT: [],
            }
        } else {
            await db.Role.bulkCreate(results)
            return {
                EM: `Create success ${results.length} roles `,
                EC: "1",
                DT: [],
            }
        }

    } catch (error) {
        console.log(error)
        return {
            EM: " Wrongs with services",
            EC: "1",
            DT: [],
        }
    }
}



const getAllRole = async () => {
    try {
        let data = await db.Role.findAll({
            attributes: ["url", "description", "id"],
            raw: true

        })
        return {
            EM: " get Role ok",
            EC: "0",
            DT: data,
        }



    } catch (error) {
        console.log(error)
        return {
            EM: " Wrongs with services",
            EC: "1",
            DT: [],
        }
    }
}


const getAllRoleWithPaginate = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Role.findAndCountAll(

            {
                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,

            }
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
        console.log(error)
        return {
            EM: " Wrongs with services",
            EC: "1",
            DT: [],
        }
    }
}
const removeRole = async (id) => {
    try {
        let data = await db.Role.findOne({
            where: { id: id }
        })
        if (data) {
            await data.destroy()
            return {
                EM: "Delete Role success",
                EC: 0,
                DT: []

            }
        } else {
            return {
                EM: "Can not delete Role",
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


const fetchRoleByGroup = async (id) => {
    try {

        if (!id) {
            return {
                EM: " groupId empty or not Exist",
                EC: "0",
                DT: [],
            }
        }

        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ["name", "description", "id"],

            include: [{
                model: db.Role,
                attributes: ["url", "description", "id"],
                through: { attributes: [] }
            }],

        })
        return {
            EM: " get Role by group ok",
            EC: "0",
            DT: roles,
        }

    } catch (error) {
        return res.status(500).json({
            EM: "Error from Server",
            EC: "-1",
            DT: "",
        })
    }
}


const assignRoleToGroup = async (data) => {

    try {
        await db.Group_Role.destroy({
            where: { groupId: +data.groupId }
        })
        await db.Group_Role.bulkCreate(data.GroupRole)
        return {
            EM: " Change Role Success",
            EC: "0",
            DT: [],
        }
    } catch (error) {
        return {
            EM: "Error from Server",
            EC: "-1",
            DT: "",
        }
    }
}
module.exports = {
    creatNewGroup, getAllRole, getAllRoleWithPaginate,
    removeRole, fetchRoleByGroup, assignRoleToGroup
}