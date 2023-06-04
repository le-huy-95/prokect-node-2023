import db from "../models/index"


const getAllUnit = async () => {
    try {
        let data = await db.Shipping_Unit.findAll({


        })
        return {
            EM: " get Shipping_Unit ok",
            EC: "0",
            DT: data,
        }



    } catch (error) {
        return {
            EM: " Wrongs with services",
            EC: "1",
            DT: error,
        }
    }
}

const getFromAddressByShipping_Unit = async (id) => {
    try {

        if (!id) {
            return {
                EM: " From_Address empty or not Exist",
                EC: "0",
                DT: [],
            }
        }

        let data = await db.Shipping_Unit.findOne({
            where: { id: id },

            include: [{
                model: db.Shipping_Cost,

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
const getPriceByAddress = async (shippingUnit_Id, From, To) => {
    try {


        if (!From) {
            return {
                EM: " From_Address empty or not Exist",
                EC: "0",
                DT: [],
            }
        }
        if (!To) {
            return {
                EM: " To_Address empty or not Exist",
                EC: "0",
                DT: [],
            }
        }
        if (!shippingUnit_Id) {
            return {
                EM: " shippingUnit_Id empty or not Exist",
                EC: "0",
                DT: [],
            }
        }

        let data = await db.Shipping_Cost.findOne({
            where: { shippingUnit_Id: shippingUnit_Id, From: From, To: To },


        })
        if (data) {
            return {
                EM: " get Price information  ok",
                EC: "0",
                DT: data,
            }
        } else {
            return {
                EM: " do not have infomation Price",
                EC: "0",
                DT: data,
            }
        }

    } catch (error) {
        return {
            EM: "please check again in service ",
            EC: -2
        }
    }

}

module.exports = {
    getAllUnit, getFromAddressByShipping_Unit, getPriceByAddress
}