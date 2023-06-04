import db from "../models/index"



const getAllProvinceCustomer = async () => {
    try {
        let data = await db.Province_customer.findAll({
            raw: true

        })
        return {
            EM: " get Province ok",
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

const getAllProvince = async () => {
    try {
        let data = await db.Address_Province.findAll({
            raw: true

        })
        return {
            EM: " get Province ok",
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
const getAllAddress_to = async () => {
    try {
        let data = await db.Address_To.findAll({
            raw: true

        })
        return {
            EM: " get Address_To ok",
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
const getAllAddress_From = async () => {
    try {
        let data = await db.Address_From.findAll({
            raw: true

        })
        return {
            EM: " get Address_From ok",
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
const getDistrictCustomerByProvinceCustomer = async (id) => {
    try {

        if (!id) {
            return {
                EM: " Province empty or not Exist",
                EC: "0",
                DT: [],
            }
        }

        let data = await db.Province_customer.findOne({
            where: { id: id },

            include: [{
                model: db.District_customer,

            }],

        })
        return {
            EM: " get address information  ok",
            EC: "0",
            DT: data,
        }

    } catch (error) {
        return {
            EM: "please check again in service ",
            EC: -2
        }
    }

}

const getDistrictByProvince = async (id) => {
    try {

        // if (!id) {
        //     return {
        //         EM: " Province empty or not Exist",
        //         EC: "0",
        //         DT: [],
        //     }
        // }

        let data = await db.Address_Province.findOne({
            where: { id: id },

            include: [{
                model: db.Address_District,

            }],

        })
        return {
            EM: " get address information  ok",
            EC: "0",
            DT: data,
        }

    } catch (error) {
        return {
            EM: "please check again in service ",
            EC: -2
        }
    }

}


const getWardCustomerByDistrictCustomer = async (id) => {
    try {

        if (!id) {
            return {
                EM: " District empty or not Exist",
                EC: "0",
                DT: [],
            }
        }

        let data = await db.District_customer.findOne({
            where: { id: id },

            include: [{
                model: db.Ward_customer,





            }],

        })
        return {
            EM: " get address information  ok",
            EC: "0",
            DT: data,
        }

    } catch (error) {
        return {
            EM: "please check again in service ",
            EC: -2
        }
    }

}
const getWardByDistrict = async (id) => {
    try {

        if (!id) {
            return {
                EM: " District empty or not Exist",
                EC: "0",
                DT: [],
            }
        }

        let data = await db.Address_District.findOne({
            where: { id: id },

            include: [{
                model: db.Address_Ward,
            }],

        })
        return {
            EM: " get address information  ok",
            EC: "0",
            DT: data,
        }

    } catch (error) {
        return {
            EM: "please check again in service ",
            EC: -2
        }
    }

}

module.exports = {
    getDistrictCustomerByProvinceCustomer, getWardCustomerByDistrictCustomer, getAllProvinceCustomer,
    getAllAddress_to, getAllAddress_From, getAllProvince, getDistrictByProvince, getWardByDistrict
}