import { raw } from "body-parser"
import db from "../models/index"
import moment from "moment"
import _, { includes } from "lodash"
import bcrypt from "bcryptjs"

var salt = bcrypt.genSaltSync(10);

const getAllProject = async () => {
    try {
        let data = await db.Projects.findAll({
            // // attributes: ["url", "description", "id"],
            include: [{
                model: db.Shipping_Unit, attributes: ["id", "NameUnit"],
                include: {
                    model: db.Shipping_Cost
                },
            },
            {
                model: db.Sales_Channel, attributes: ["name", "id"],

            }, {
                model: db.Customer

            },
            {
                model: db.Status_Delivery,

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
                model: db.Status_Payment,

            },
            {
                model: db.Image,
                through: { attributes: [] }

            },
            ]

        })
        return {
            EM: " get Project ok",
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
const getAllProjectWithPagination = async (page, limit, createBy) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Projects.findAndCountAll({
            where: { createdBy: createBy },
            include: [{
                model: db.Status_Payment

            },
            {
                model: db.Sales_Channel, attributes: ["name", "id"],

            },
            {
                model: db.Status_Delivery,

            },
            {
                model: db.Warehouse,

            }
            ],

            order: [['id', 'DESC']],
            offset: offset,
            limit: limit,


        },
        )


        let totalPage = Math.ceil(count / limit)

        let data = {
            totalProject: count,
            totalPage: totalPage,
            dataProject: rows

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
const getProjects = async (id) => {
    try {
        let data = await db.Projects.findAll({
            where: { id: id },

            include: [
                {
                    model: db.Shipping_Unit, attributes: ["id", "NameUnit"],
                    include: {
                        model: db.Shipping_Cost
                    },
                },
                {
                    model: db.Sales_Channel,
                    attributes: ["name", "id"],

                }, {
                    model: db.Customer

                },
                {
                    model: db.Status_Delivery,
                },
                {
                    model: db.Warehouse,
                    attributes: ["product"],
                },
                {
                    model: db.Status_Payment,

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
                    model: db.Address_Province,

                },
                {
                    model: db.Address_District,

                },
                {
                    model: db.Address_Ward,

                },
                {
                    model: db.Status_Warehouse,

                },
                {
                    model: db.Status_Pickup,

                },
                {
                    model: db.Chat,
                },
                {
                    model: db.Status_Received_money,

                },
                {
                    model: db.Image,
                    through: { attributes: [] }


                },
            ],
            order: [[{ model: db.Chat }, 'id', 'DESC']]

        }
        )
        if (data) {
            return {
                EM: "get Project success",
                EC: "0",
                DT: data

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
const createProjects = async (data) => {
    try {
        if (data) {
            let project = await db.Projects.create({
                order: data.order,
                ProductId: data.name_Product,
                quantity: data.number,
                money: data.money,
                statusPaymentId: data.StatusPaymentId,
                shippingUnit_Id: data.shippingUnitId,
                total: data.totalMoney,
                totalWithShippingCost: data.totalWithShippingCost,
                From_address: data.From_address,
                To_address: data.To_address,
                createdBy: data.createdBy,
                name_customer: data.customer_name,
                age_customer: data.age,
                Note: data.note,
                createdByName: data.createdByName,
                phoneNumber_customer: data.customer_name_phone,
                addressDetail: data.detail_address_customer,
                Province_customerId: data.Province_customer,
                District_customerId: data.District_customer,
                Ward_customerId: data.Ward_customer,
                salesChannelId: data.salesChannel,
                Notemore: data.Note_More,
                shipping_Cost: data.shipping_Cost,
                Pricedrop: data.price_drop,
                paid: data.paid,
                Address_provinceId: data.Province_of_receipt,
                Address_DistrictId: data.District_of_receipt,
                Address_WardId: data.Ward_of_receipt,
                Detail_Place_of_receipt: data.Detail_Place_of_receipt,
                flag: data.flag,
                done_status: data.done_status,
                statuspickupId: 0,
                statuswarehouseId: 0,
                statusDeliveryId: 0,
                receiveMoneyId: 0,
                unit: data.unit,
                unit_money: data.unit_money,
                Mode_of_payment: data.Mode_of_payment,
                Main_Account: data.Main_Account,
                name_account: data.name_account,
                Bank_name: data.Bank_name,


            })
            return {
                EM: " Create ok",
                EC: "0",
                DT: project,
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
const getSalesChannel = async () => {
    try {


        let data = await db.Sales_Channel.findAll({
            order: [['name', 'DESC']]
        })
        return {
            EM: " get Sales_Channel success",
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
const getAllStatusPayment = async () => {
    try {


        let data = await db.Status_Payment.findAll({
        })
        return {
            EM: " get Status_Payment success",
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
const updateProjectWithId = async (data) => {

    try {
        if (!data) {
            return {
                EM: "do not data to update",
                EC: "1",
                DT: "",
            }
        }
        let Project = await db.Projects.findOne({
            where: { id: data.id },
        })

        if (Project) {
            await Project.update({
                ProductId: data.ProductId,
                quantity: data.quantity,
                money: data.money,
                statusPaymentId: data.statusPaymentId,
                shippingUnit_Id: data.shippingUnit_Id,
                total: data.total,
                totalWithShippingCost: data.totalWithShippingCost,
                From_address: data.From_address,
                To_address: data.To_address,
                name_customer: data.name_customer,
                age_customer: data.age_customer,
                Note: data.Note,
                phoneNumber_customer: data.phoneNumber_customer,
                addressDetail: data.addressDetail,
                Province_customerId: data.Province_customerId,
                District_customerId: data.District_customerId,
                Ward_customerId: data.Ward_customerId,
                salesChannelId: data.salesChannelId,
                Notemore: data.Notemore,
                shipping_Cost: data.shipping_Cost,
                Pricedrop: data.Pricedrop,
                paid: data.paid,
                Address_provinceId: data.Address_provinceId,
                Address_DistrictId: data.Address_DistrictId,
                Address_WardId: data.Address_WardId,
                Detail_Place_of_receipt: data.Detail_Place_of_receipt,
                flag: data.flag,
                done_status: data.done_status,
                unit: data.createProjects,
                unit_money: data.unit_money,
                Mode_of_payment: data.Mode_of_payment,
                Main_Account: data.Main_Account,
                name_account: data.name_account,
                Bank_name: data.Bank_name,
            })
            return {
                EM: " Update Project Success",
                EC: "0",
                DT: "",
            }
        } else {
            return {
                EM: " Project Not Found",
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
const RemoveProject = async (id) => {
    try {
        let Projects = await db.Projects.findOne({
            where: { id: id }
        })
        if (Projects) {
            await Projects.destroy()
            return {
                EM: "Delete Projects success",
                EC: 0,
                DT: []

            }
        } else {
            return {
                EM: "Can delete Projects",
                EC: 2,
                DT: []

            }
        }
    } catch (error) {
        return {
            EM: "Error from Server",
            EC: "-1",
            DT: "",
        }
    }

}
const createChat = async (data) => {
    try {
        if (data) {
            let project = await db.Chat.create({
                projectId: data.ProductId,
                image: data.image,
                text: data.chatContent,
                CreatedByName: data.CreatedByName,
                CreatedByPhone: data.CreatedByPhone,
            })
            return {
                EM: " Create ok",
                EC: "0",
                DT: project,
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
const updateChat = async (data) => {
    try {
        if (!data) {
            return {
                EM: "do not data to edit",
                EC: "1",
                DT: "",
            }
        }
        let Chat = await db.Chat.findOne({
            where: { id: data.id, projectId: data.projectId },
        })

        if (Chat) {
            await Chat.update({

                text: data.text,

            })
            return {
                EM: " Edit chat Success",
                EC: "0",
                DT: "",
            }
        } else {
            return {
                EM: "  Not Found Chat",
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
const RemoveChatProject = async (id) => {
    try {
        let Chat = await db.Chat.findOne({
            where: { id: id }
        })
        if (Chat) {
            await Chat.destroy()
            return {
                EM: "Delete Chat success",
                EC: 0,
                DT: []

            }
        } else {
            return {
                EM: "Can delete Chat",
                EC: 2,
                DT: []

            }
        }
    } catch (error) {
        return {
            EM: "Error from Server",
            EC: "-1",
            DT: "",
        }
    }

}
const getDataSearch = async (data) => {
    try {
        let Alldata = await db.Projects.findAll(
            {
                include: [{
                    model: db.Status_Payment

                },
                {
                    model: db.Sales_Channel, attributes: ["name", "id"],

                },
                {
                    model: db.Status_Delivery,

                },
                {
                    model: db.Warehouse,

                },
                ]
            }
        )
        if (data) {
            const AlldataSearch = Alldata.filter(item => item.total.includes(data) ||
                item.name_customer.includes(data) ||
                item.order.includes(data) ||
                moment(`${item.createdAt}`).format("DD/MM/YYYY").includes(data) ||
                item?.Warehouse?.product.includes(data)

            )
            return {
                EM: " get data search success",
                EC: "0",
                DT: AlldataSearch,
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
const getDataSearchWithtime = async (startDate, endDate) => {
    try {
        let allProject = await db.Projects.findAll(
            {
                raw: true,
                nest: true,
                include: [{
                    model: db.Status_Payment

                },
                {
                    model: db.Sales_Channel, attributes: ["name", "id"],

                },
                {
                    model: db.Status_Delivery,

                },
                {
                    model: db.Warehouse,

                }
                ]


            }
        )
        let ProjectWithTimeDDXXYYYY = []
        allProject.forEach((item) => {
            ProjectWithTimeDDXXYYYY.push({ ...item })

        });


        if (!startDate && !endDate) {
            return {
                EM: "Not Found",
                EC: "1",
                DT: [],
            }
        }
        if (startDate === endDate) {

            let data = ProjectWithTimeDDXXYYYY.filter(item => moment(`${item.createdAt}`).format("DD-MM-YYYY") === startDate)
            if (data) {
                return {
                    EM: " success",
                    EC: "0",
                    DT: data,

                }
            } else {
                return {
                    EM: "Not Found",
                    EC: "1",
                    DT: [],
                }

            }
        }
        if (startDate !== endDate) {
            var date1 = new Date(moment(startDate, "DD-MM-YYYY"));
            var date2 = new Date(moment(endDate, "DD-MM-YYYY"));
            let data2 = []
            let datathree = ProjectWithTimeDDXXYYYY.filter(item => moment(`${item.createdAt}`).format("DD-MM-YYYY") === endDate)
            const data = [...datathree]


            for (let i = 0; i < ProjectWithTimeDDXXYYYY.length; i++) {

                if (
                    new Date(moment(ProjectWithTimeDDXXYYYY[i].createdAt, "DD-MM-YYYY")).getTime() > date1.getTime()
                    &&
                    new Date(moment(ProjectWithTimeDDXXYYYY[i].createdAt, "DD-MM-YYYY")).getTime() < date2.getTime()
                ) {
                    data2.push(ProjectWithTimeDDXXYYYY[i])
                }

            }
            const NewData = [...data2, ...datathree]

            if (NewData) {
                return {
                    EM: " success",
                    EC: "0",
                    DT: NewData,

                }
            } else {
                return {
                    EM: "Not Found",
                    EC: "1",
                    DT: [],
                }
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
const getAllProjectWithPaginationAndStatusPayment = async (page, limit, createBy, statuspaymentId) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Projects.findAndCountAll({
            where: { createdBy: createBy, statuspaymentId: statuspaymentId },

            include: [{
                model: db.Status_Payment

            },
            {
                model: db.Sales_Channel, attributes: ["name", "id"],

            },
            {
                model: db.Status_Delivery,

            },
            ],

            order: [['id', 'DESC']],
            offset: offset,
            limit: limit,


        },


        )


        let totalPage = Math.ceil(count / limit)

        let data = {
            totalProject: count,
            totalPage: totalPage,
            dataProject: rows

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
const getAllProjectWithPaginationAndStatusDeliveryNull = async (page, limit, createBy, statusdeliveryId) => {
    try {
        if (statusdeliveryId) {
            let offset = (page - 1) * limit;
            const { count, rows } = await db.Projects.findAndCountAll({
                where: { createdBy: createBy, statusdeliveryId: +statusdeliveryId },

                include: [{
                    model: db.Status_Payment

                },
                {
                    model: db.Sales_Channel, attributes: ["name", "id"],

                },
                {
                    model: db.Status_Delivery,

                },
                {
                    model: db.Warehouse,

                },
                ],

                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,


            },


            )


            let totalPage = Math.ceil(count / limit)

            let data = {
                totalProject: count,
                totalPage: totalPage,
                dataProject: rows

            }
            return {
                EM: " ok",
                EC: "0",
                DT: data,
            }
        } else {
            let offset = (page - 1) * limit;
            const { count, rows } = await db.Projects.findAndCountAll({
                where: { createdBy: createBy, statusdeliveryId: null },

                include: [{
                    model: db.Status_Payment

                },
                {
                    model: db.Sales_Channel, attributes: ["name", "id"],

                },
                {
                    model: db.Status_Delivery,

                },
                {
                    model: db.Warehouse,

                },
                ],

                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,


            },


            )


            let totalPage = Math.ceil(count / limit)

            let data = {
                totalProject: count,
                totalPage: totalPage,
                dataProject: rows

            }
            return {
                EM: " ok",
                EC: "0",
                DT: data,
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
const getAllProductName = async () => {
    try {
        let data = await db.Warehouse.findAll({
            raw: true,
            attributes: ["id", "product", "product_statusId", "Suppliers", "product_number", "createdBy"],

        })
        if (data) {
            return {
                EM: "  ok",
                EC: "0",
                DT: data,
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
const getAllnumberProduct = async (id) => {
    try {
        if (!id) {
            return {
                EM: "Not Found",
                EC: "0",
                DT: [],
            }
        }

        let data = await db.Warehouse.findOne({
            where: { id: id },
            attributes: ["product_number"],
            raw: true
        })
        if (data) {
            return {
                EM: " get number product  ok",
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
const getAllwarehhouseWithPagination = async (page, limit, createdBy) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Warehouse.findAndCountAll({
            where: { createdBy: createdBy },
            include: [{
                model: db.Product_status

            }],
            order: [['id', 'DESC']],
            offset: offset,
            limit: limit,


        },
        )
        let totalPage = Math.ceil(count / limit)

        let data = {
            totalProduct: count,
            totalPage: totalPage,
            dataProduct: rows

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
const createdUserIdAndProjectId = async (ProjectId, UserId) => {
    try {
        if (ProjectId, UserId) {

            await db.Project_Users.create({
                projectId: ProjectId,
                userId: UserId
            })
            return {
                EM: " Created  Success",
                EC: "0",
                DT: [],
            }
        }
    } catch (error) {
        return {
            EM: "Error from Server",
            EC: "-1",
            DT: "",
        }
    }
}
const createWarehouseProduct = async (data) => {
    console.log("data", data)
    try {
        if (data) {
            let project = await db.Warehouse.create({
                product: data.Product,
                product_number: data.Number,
                product_cost: data.Product_Prince,
                product_statusId: data.product_statusId,
                Suppliers: data.Suppliers,
                unit: data.unit,
                unitMoney: data.unitMoney,
                Suppliers_address: data.Suppliers_address,
                Suppliers_phone: data.Suppliers_phone,
                image: data.image,
                createdBy: data.createdBy
            })
            return {
                EM: " Create ok",
                EC: "0",
                DT: project,
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
const updateProductInWarehouse = async (data) => {
    try {
        if (!data) {
            return {
                EM: "do not data to update",
                EC: "1",
                DT: "",
            }
        }
        let Warehouse = await db.Warehouse.findOne({
            where: { id: data.id },
        })

        if (Warehouse) {
            await Warehouse.update({
                product: data.Product,
                product_number: data.Number,
                product_cost: data.Product_Prince,
                product_statusId: data.product_statusId,
                Suppliers: data.Suppliers,
                unit: data.unit,
                unitMoney: data.unitMoney,
                Suppliers_address: data.Suppliers_address,
                Suppliers_phone: data.Suppliers_phone,
                image: data.image

            })
            return {
                EM: " Update Warehouse Success",
                EC: "0",
                DT: "",
            }
        } else {
            return {
                EM: " Product in warehouse Not Found",
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
const updateNumberProductInWarehouse = async (id, number) => {
    try {
        if (!+id) {


            return {
                EM: "do not data to update",
                EC: "1",
                DT: "",
            }
        }
        let Warehouse = await db.Warehouse.findOne({
            where: { id: id },
        })

        if (Warehouse && number > 0) {
            await Warehouse.update({
                product_number: number,
                product_statusId: 4

            })

            return {
                EM: " Update Number Success",
                EC: "0",
                DT: "",
            }
        } else if (Warehouse && number === 0) {
            await Warehouse.update({
                product_number: number,
                product_statusId: 2
            })

            return {
                EM: " Update Number Success",
                EC: "0",
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
const getNumberInWarehouse = async (id) => {
    try {
        if (!id) {
            return {
                EM: "Not Found",
                EC: "0",
                DT: [],
            }
        }

        let data = await db.Warehouse.findOne({
            where: { id: id },
            attributes: ["id", "product_number"],
            raw: true
        })
        if (data) {
            return {
                EM: " get Prinse ok",
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
const getDataSearchWarehouse = async (data) => {
    try {
        let Alldata = await db.Warehouse.findAll(
            {
                include: [{
                    model: db.Product_status

                }],
            }
        )
        if (data) {
            const AlldataSearch = Alldata.filter(item =>
                item.product.includes(data) ||
                item.product_number.includes(data) ||
                item.product_cost.includes(data) ||
                item.Suppliers.includes(data) ||
                item.Suppliers_address.includes(data) ||
                item.Suppliers_phone.includes(data)
            )
            return {
                EM: " get data search success",
                EC: "0",
                DT: AlldataSearch,
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
const getataWarehouseWithPaginationAndAllStatusProduct = async (createdBy) => {
    try {

        let data = await db.Warehouse.findAll({
            where: { createdBy: createdBy },

        })
        if (data) {
            let newArr = []
            const AllProduct = data.length
            const product_statusId1 = data.filter(item => item.product_statusId === 1)
            const product_statusId2 = data.filter(item => item.product_statusId === 2)
            const product_statusId3 = data.filter(item => item.product_statusId === 3)
            const product_statusId4 = data.filter(item => item.product_statusId === 4)
            newArr.push({
                AllProduct: AllProduct,
                product_statusId1: product_statusId1.length,
                product_statusId2: product_statusId2.length,
                product_statusId3: product_statusId3.length,
                product_statusId4: product_statusId4.length
            })

            return {
                EM: " get data  success",
                EC: "0",
                DT: newArr,
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
const getProductByStatusInWarehouse = async (page, limit, createdBy, statusProductId) => {
    try {
        if (!statusProductId) {
            return {
                EM: " Not Found",
                EC: "-2",
                DT: [],
            }
        }
        if (statusProductId) {
            let offset = (page - 1) * limit;
            const { count, rows } = await db.Warehouse.findAndCountAll({
                where: { createdBy: createdBy, product_statusId: statusProductId },

                include: [{
                    model: db.Product_status

                }],
                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,


            },
            )
            let totalPage = Math.ceil(count / limit)

            let data = {
                totalProduct: count,
                totalPage: totalPage,
                dataProduct: rows

            }
            return {
                EM: " ok",
                EC: "0",
                DT: data,
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
const getAllAllWarehouseDashboard = async (createdBy) => {
    try {
        let data = await db.Warehouse.findAll({
            where: { createdBy: createdBy },
            raw: true

        })
        return {
            EM: " get data ok",
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
const getAllWarehouseDashboardWithTime = async (createdBy, startDate, endDate) => {
    try {

        let data = await db.Warehouse.findAll({
            where: { createdBy: createdBy },
            attributes: ["id", "createdAt"],
            raw: true

        })
        let ProjectWithTimeDDXXYYYY = []
        data.forEach((item) => {
            ProjectWithTimeDDXXYYYY.push({ ...item })

        });


        if (!startDate && !endDate) {
            return {
                EM: "Not Found",
                EC: "1",
                DT: [],
            }
        }

        if (startDate === endDate) {

            let data = ProjectWithTimeDDXXYYYY.filter(item => moment(`${item.createdAt}`).format("DD-MM-YYYY") === startDate)
            let newArrayOne = []
            data.forEach((item) => {
                newArrayOne.push({ id: item.id, createdAt: moment(`${item.createdAt}`).format("DD-MM-YYYY") })
            })
            const newArrayTwo = _.countBy(newArrayOne, 'createdAt')
            const array = _.map(newArrayTwo, (val, id) => {


                return { ...val, Time: id, number: val };
            });
            if (array) {
                return {
                    EM: " success",
                    EC: "0",
                    DT: array


                }
            } else {
                return {
                    EM: "Not Found",
                    EC: "1",
                    DT: [],
                }
            }
        }
        if (startDate !== endDate) {
            var date1 = new Date(moment(startDate, "DD-MM-YYYY"));
            var date2 = new Date(moment(endDate, "DD-MM-YYYY"));
            let datathree = ProjectWithTimeDDXXYYYY.filter(item => moment(`${item.createdAt}`).format("DD-MM-YYYY") === endDate)

            let data2 = []
            let newArr = [...datathree]


            for (let i = 0; i < ProjectWithTimeDDXXYYYY.length; i++) {

                if (
                    new Date(moment(ProjectWithTimeDDXXYYYY[i].createdAt, "DD-MM-YYYY")).getTime() > date1.getTime()
                    &&
                    new Date(moment(ProjectWithTimeDDXXYYYY[i].createdAt, "DD-MM-YYYY")).getTime() < date2.getTime()
                ) {
                    data2.push(ProjectWithTimeDDXXYYYY[i])
                }

            }
            const newArray = [...data2, ...newArr]

            let newArrayOne = []
            newArray.forEach((item) => {
                newArrayOne.push({ id: item.id, createdAt: moment(`${item.createdAt}`).format("DD-MM-YYYY") })
            })

            const data = _.countBy(newArrayOne, 'createdAt')
            const array = _.map(data, (val, id) => {


                return { ...val, Time: id, number: val };
            });
            if (array) {
                return {
                    EM: " success",
                    EC: "0",
                    DT: array


                }
            } else {
                return {
                    EM: "Not Found",
                    EC: "1",
                    DT: [],
                }
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
const getAllWarehouseDashboardWithMoney = async (createdBy) => {
    try {

        let data = await db.Warehouse.findAll({
            where: { createdBy: createdBy },
            attributes: ["id", "product_cost", "product_number", "product_statusId"],

        })
        if (data) {
            const res = data.filter(item => item.product_statusId !== 3)
            let newArr = []
            let num = 0

            res.forEach((item) => {
                let total = item.product_cost * item.product_number
                newArr.push(total)
            })
            newArr.forEach((item) => {
                num += item
            })

            return {
                EM: " get data  success",
                EC: "0",
                DT: num,
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
const CreateImageInWarehouse = async (image, Product, Product_Prince, Number, Suppliers, unit, unitMoney, Suppliers_address, product_statusId, createdBy, Suppliers_phone) => {


    try {
        if (image, Product, Product_Prince, Number, Suppliers, Suppliers_address, product_statusId, createdBy, Suppliers_phone) {
            let project = await db.Warehouse.create({
                product: Product,
                product_number: Number,
                product_cost: Product_Prince,
                product_statusId: product_statusId,
                Suppliers: Suppliers,
                unit: unit,
                unitMoney: unitMoney,
                Suppliers_address: Suppliers_address,
                Suppliers_phone: Suppliers_phone,
                image: image,
                createdBy: createdBy
            })
            return {
                EM: "Create ok",
                EC: "0",
                DT: project,
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
const UpdateImageInWarehouse = async (id, image, Product, Product_Prince, Number, Suppliers, unit, unitMoney, Suppliers_address, product_statusId, createdBy, Suppliers_phone) => {

    try {
        let Warehouse = await db.Warehouse.findOne({
            where: { id: id },
        })

        if (Warehouse) {
            await Warehouse.update({
                product: Product,
                product_number: Number,
                product_cost: Product_Prince,
                product_statusId: product_statusId,
                Suppliers: Suppliers,
                unit: unit,
                unitMoney: unitMoney,
                Suppliers_address: Suppliers_address,
                Suppliers_phone: Suppliers_phone,
                image: image,
                createdBy: createdBy
            })
            return {
                EM: "update  ok",
                EC: "0",
                DT: Warehouse,
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
const getAllDataProductDashboard = async (createdBy) => {
    try {
        let dataWarehouse = await db.Warehouse.findAll({
            attributes: ["id", "product"],
            raw: true

        })
        let data = await db.Projects.findAll({
            where: { createdBy: createdBy },



        })
        if (data) {
            let arr = []
            let arr1 = []
            let sum = 0
            const allProduct = data.length
            const doneStatus = data.filter(item => item.done_status === "1")
            const notDoneStatus = data.filter(item => item.done_status === "0")
            const cancelStatus = data.filter(item => item.done_status === "2")

            doneStatus.forEach((item) => {
                sum += +item.total
            })

            const dataUser = _.countBy(data, 'phoneNumber_customer')
            let max_buy = Object.keys(dataUser).reduce(function (a, b) { return dataUser[a] > dataUser[b] ? a : b });
            const dataProductId = _.countBy(data, 'ProductId')
            let max_seller = Object.keys(dataProductId).reduce(function (a, b) { return dataProductId[a] > dataProductId[b] ? a : b });
            for (let i = 0; i < dataWarehouse.length; i++) {
                if (dataWarehouse[i].id === +max_seller) {
                    arr1.push(dataWarehouse[i].product)
                }
            }
            arr.push({
                all_product: allProduct,
                done_Product: doneStatus.length,
                not_done_Product: notDoneStatus.length,
                cancel_Status: cancelStatus.length,
                allUser: Object.keys(dataUser).length,
                bestBuy_Phone: max_buy,
                all_productId_buy: Object.keys(dataProductId).length,
                best_seller: arr1.toString(),
                total: sum

            })
            return {
                EM: " get data ok",
                EC: "0",
                DT: arr,
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
const getAllDataProductDashboardByAge = async (createdBy) => {
    try {

        let data = await db.Projects.findAll({
            where: { createdBy: createdBy },
            attributes: ["age_customer"],



        })
        if (data) {
            let arr = []
            const all = data.length
            const under18age = data.filter(item => +item.age_customer < 18).length
            const From18AgeTo30Age = data.filter(item => +item.age_customer >= 18 && +item.age_customer < 30).length
            const From30AgeTo50Age = data.filter(item => +item.age_customer >= 30 && +item.age_customer < 50).length
            const over50age = data.filter(item => +item.age_customer >= 50).length

            arr.push({
                under_18: +under18age / +all * 100,
                From18AgeTo30Age: +From18AgeTo30Age / +all * 100,
                From30AgeTo50Age: +From30AgeTo50Age / +all * 100,
                over50age: +over50age / +all * 100,

            })
            return {
                EM: " get data ok",
                EC: "0",
                DT: arr,
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
const getAllProductDashboardWithTime = async (createdBy, startDate, endDate) => {
    try {

        let data = await db.Projects.findAll({
            where: { createdBy: createdBy },
            attributes: ["id", "createdAt"],
            raw: true

        })
        let ProjectWithTimeDDXXYYYY = []
        data.forEach((item) => {
            ProjectWithTimeDDXXYYYY.push({ ...item })

        });


        if (!startDate && !endDate) {
            return {
                EM: "Not Found",
                EC: "1",
                DT: [],
            }
        }

        if (startDate === endDate) {

            let data = ProjectWithTimeDDXXYYYY.filter(item => moment(`${item.createdAt}`).format("DD-MM-YYYY") === startDate)
            let newArrayOne = []
            data.forEach((item) => {
                newArrayOne.push({ id: item.id, createdAt: moment(`${item.createdAt}`).format("DD-MM-YYYY") })
            })
            const newArrayTwo = _.countBy(newArrayOne, 'createdAt')
            const array = _.map(newArrayTwo, (val, id) => {


                return { ...val, Time: id, number: val };
            });
            if (array) {
                return {
                    EM: " success",
                    EC: "0",
                    DT: array


                }
            } else {
                return {
                    EM: "Not Found",
                    EC: "1",
                    DT: [],
                }
            }
        }
        if (startDate !== endDate) {
            var date1 = new Date(moment(startDate, "DD-MM-YYYY"));
            var date2 = new Date(moment(endDate, "DD-MM-YYYY"));
            let datathree = ProjectWithTimeDDXXYYYY.filter(item => moment(`${item.createdAt}`).format("DD-MM-YYYY") === endDate)

            let data2 = []
            let newArr = [...datathree]


            for (let i = 0; i < ProjectWithTimeDDXXYYYY.length; i++) {

                if (
                    new Date(moment(ProjectWithTimeDDXXYYYY[i].createdAt, "DD-MM-YYYY")).getTime() > date1.getTime()
                    &&
                    new Date(moment(ProjectWithTimeDDXXYYYY[i].createdAt, "DD-MM-YYYY")).getTime() < date2.getTime()
                ) {
                    data2.push(ProjectWithTimeDDXXYYYY[i])
                }

            }
            const newArray = [...data2, ...newArr]

            let newArrayOne = []
            newArray.forEach((item) => {
                newArrayOne.push({ id: item.id, createdAt: moment(`${item.createdAt}`).format("DD-MM-YYYY") })
            })

            const data = _.countBy(newArrayOne, 'createdAt')
            const array = _.map(data, (val, id) => {


                return { ...val, Time: id, number: val };
            });
            if (array) {
                return {
                    EM: " success",
                    EC: "0",
                    DT: array


                }
            } else {
                return {
                    EM: "Not Found",
                    EC: "1",
                    DT: [],
                }
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
const getAllProductDashboardWithMounth = async (createdBy) => {
    try {

        let data = await db.Projects.findAll({
            where: { createdBy: createdBy },
            attributes: ["id", "createdAt"],
            raw: true

        })
        let newArr = []
        const all = data.filter(item => moment(`${item.createdAt}`).format("YYYY") == moment().year())
        const oneMounth = all.filter(item => +moment(`${item.createdAt}`).format("MM") == 1)
        const twoMounth = all.filter(item => +moment(`${item.createdAt}`).format("MM") == 2)
        const threeMounth = all.filter(item => +moment(`${item.createdAt}`).format("MM") == 3)
        const fourMounth = all.filter(item => +moment(`${item.createdAt}`).format("MM") == 4)
        const fiveMounth = all.filter(item => +moment(`${item.createdAt}`).format("MM") == 5)
        const sixMounth = all.filter(item => +moment(`${item.createdAt}`).format("MM") == 6)
        const sevenMounth = all.filter(item => +moment(`${item.createdAt}`).format("MM") == 7)
        const eightMounth = all.filter(item => +moment(`${item.createdAt}`).format("MM") == 8)
        const nightMounth = all.filter(item => +moment(`${item.createdAt}`).format("MM") == 9)
        const tenMounth = all.filter(item => +moment(`${item.createdAt}`).format("MM") == 10)
        const elevenMounth = all.filter(item => +moment(`${item.createdAt}`).format("MM") == 11)
        const twelveMounth = all.filter(item => +moment(`${item.createdAt}`).format("MM") == 12)
        newArr.push({
            tháng_1: oneMounth.length,
            tháng_2: twoMounth.length,
            tháng_3: threeMounth.length,
            tháng_4: fourMounth.length,
            tháng_5: fiveMounth.length,
            tháng_6: sixMounth.length,
            tháng_7: sevenMounth.length,
            tháng_8: eightMounth.length,
            tháng_9: nightMounth.length,
            tháng_10: tenMounth.length,
            tháng_11: elevenMounth.length,
            tháng_12: twelveMounth.length,

        })



        return {
            EM: " success",
            EC: "0",
            DT: newArr


        }




    } catch (error) {
        return {
            EM: " Wrongs with services",
            EC: "1",
            DT: [],
        }
    }
}
const getAllProductDashboardWithCutomer = async (createdBy) => {
    try {

        let data = await db.Projects.findAll({
            where: { createdBy: createdBy },
            attributes: ["id", "phoneNumber_customer"],



        })
        if (data) {
            const newArrayTwo = _.countBy(data, 'phoneNumber_customer')
            const array = _.map(newArrayTwo, (val, id) => {


                return { ...val, User_phone: id, number_shopping: val };
            });
            return {
                EM: " success",
                EC: "0",
                DT: array


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
const getAllProjectWithPaginationWithEmployer = async (page, limit, unit) => {
    try {
        if (!unit) {
            return {
                EM: " you can not access this page",
                EC: "1",
                DT: [],
            }
        }
        if (unit) {

            let offset = (page - 1) * limit;;

            const { count, rows } = await db.Projects.findAndCountAll({
                where: { shippingUnit_Id: +unit },
                include: [
                    {
                        model: db.Warehouse,
                    },


                    {
                        model: db.Status_Delivery,

                    },
                    {
                        model: db.Status_Warehouse,

                    },
                    {
                        model: db.Status_Received_money,

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
                        model: db.Status_Payment,

                    },

                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Address_Province,

                    },
                    {
                        model: db.Address_District,

                    },
                    {
                        model: db.Address_Ward,

                    },
                    {
                        model: db.Image,
                        through: { attributes: [] }

                    },

                ],

                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,


            },
            )


            let totalPage = Math.ceil(count / limit)

            let data = {
                totalProject: count,
                totalPage: totalPage,
                dataProject: rows

            }
            return {
                EM: " ok",
                EC: "0",
                DT: data,
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
const getAllProjectWithPaginationWithEmployerWithFlag = async (unit) => {
    try {

        let data = await db.Projects.findAll({
            where: { shippingUnit_Id: +unit, flag: 1 },
            include: [
                {
                    model: db.Warehouse,
                },

                {
                    model: db.Status_Delivery,

                },
                {
                    model: db.Status_Warehouse,

                },
                {
                    model: db.Status_Received_money,

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
                    model: db.Status_Payment,

                },

                {
                    model: db.Status_Pickup,

                },
                {
                    model: db.Status_Pickup,

                },
                {
                    model: db.Address_Province,

                },
                {
                    model: db.Address_District,

                },
                {
                    model: db.Address_Ward,

                },
                {
                    model: db.Image,
                    through: { attributes: [] }

                }

            ],
            raw: true,
            nest: true

        })
        if (data) {
            const result = data.filter(item => item.flag === 1)




            return {
                EM: " success",
                EC: "0",
                DT: result


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
const updateProjectWithEmployerWithId = async (data) => {
    try {
        if (!data.id) {
            return {
                EM: "do not data to update",
                EC: "1",
                DT: "",
            }
        }
        let abc = await db.Projects.findOne({
            where: { shippingUnit_Id: +data.unit, id: data.id },

        })
        if (abc) {
            await abc.update({
                flag: data.flag
            })

            return {
                EM: "Update  Success",
                EC: "0",
                DT: abc,
            }



        } else {
            return {
                EM: " Project Not Found",
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
const getAllProjectWithPaginationWithEmployerPickup = async (page, limit, unit) => {
    try {
        if (!unit) {
            return {
                EM: " you can not access this page",
                EC: "1",
                DT: [],
            }
        }
        if (unit) {

            let offset = (page - 1) * limit;
            const { count, rows } = await db.Projects.findAndCountAll({
                where: { shippingUnit_Id: +unit },

                include: [
                    {
                        model: db.Warehouse,
                    },

                    {
                        model: db.Status_Delivery,

                    },
                    {
                        model: db.Status_Warehouse,

                    },
                    {
                        model: db.Status_Received_money,

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
                        model: db.Status_Payment,

                    },

                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Status_Warehouse,

                    },
                    {
                        model: db.Address_Province,

                    },
                    {
                        model: db.Address_District,

                    },
                    {
                        model: db.Address_Ward,

                    },
                    {
                        model: db.Image,
                        through: { attributes: [] }

                    },

                ],

                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,


            },
            )


            let totalPage = Math.ceil(count / limit)

            let data = {
                totalProject: count,
                totalPage: totalPage,
                dataProject: rows

            }
            return {
                EM: " ok",
                EC: "0",
                DT: data,
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
const getAllProjectWithPaginationWithEmployerWithUsername = async (unit, Username, Phone) => {
    try {

        let data = await db.Projects.findAll({
            where: {
                shippingUnit_Id: +unit, User_PickUp: Username, Number_PickUp: Phone, statuspickupId: 1
            },
            include: [
                {
                    model: db.Warehouse,
                },
                {
                    model: db.Status_Received_money,

                },
                {
                    model: db.Status_Delivery,

                },
                {
                    model: db.Province_customer,

                },
                {
                    model: db.Status_Warehouse,

                },
                {
                    model: db.District_customer,

                },
                {
                    model: db.Ward_customer,

                },
                {
                    model: db.Status_Payment,

                },

                {
                    model: db.Status_Pickup,

                },
                {
                    model: db.Status_Pickup,

                },
                {
                    model: db.Address_Province,

                },
                {
                    model: db.Address_District,

                },
                {
                    model: db.Address_Ward,

                },
                {
                    model: db.Image,
                    through: { attributes: [] }

                }

            ],
            raw: true,
            nest: true

        })
        if (data) {




            return {
                EM: " success",
                EC: "0",
                DT: data


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
const updateProjectWithEmployerPickup = async (data) => {
    try {
        if (!data.id) {
            return {
                EM: "do not data to update",
                EC: "1",
                DT: "",
            }
        }
        let abc = await db.Projects.findOne({
            where: { shippingUnit_Id: +data.unitId, id: +data.id },

        })

        if (abc) {
            await abc.update({
                User_PickUp: data.username,
                Number_PickUp: data.phone,
                statuspickupId: data.status_pickup_Id,
                pickup_time: data.pickup_time,
                pickupDone_time: data.pickupDone_time
            })


            return {
                EM: "Update Success",
                EC: "0",
                DT: abc,
            }



        } else {
            return {
                EM: " Project Not Found",
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
const getAllProjectWithPaginationWithEmployerWarehouse = async (page, limit, unit) => {
    try {
        if (!unit) {
            return {
                EM: " you can not access this page",
                EC: "1",
                DT: [],
            }
        }
        if (unit) {

            let offset = (page - 1) * limit;
            const { count, rows } = await db.Projects.findAndCountAll({
                where: { shippingUnit_Id: +unit, statuspickupId: 2 },
                raw: true,
                include: [
                    {
                        model: db.Warehouse,
                    },

                    {
                        model: db.Status_Delivery,

                    },
                    {
                        model: db.Province_customer,

                    },
                    {
                        model: db.Status_Received_money,

                    },
                    {
                        model: db.District_customer,

                    },
                    {
                        model: db.Ward_customer,

                    },
                    {
                        model: db.Status_Payment,

                    },

                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Status_Warehouse,

                    },
                    {
                        model: db.Address_Province,

                    },
                    {
                        model: db.Address_District,

                    },
                    {
                        model: db.Address_Ward,

                    },
                    {
                        model: db.Image,
                        through: { attributes: [] }

                    },

                ],

                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,


            },
            )


            let totalPage = Math.ceil(count / limit)

            let data = {
                totalProject: count,
                totalPage: totalPage,
                dataProject: rows

            }
            return {
                EM: " ok",
                EC: "0",
                DT: data,
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
const getAllProjectWithPaginationWithEmployerWarehouseWithUsername = async (unit, Username, Phone) => {
    try {


        let data = await db.Projects.findAll({
            where: { shippingUnit_Id: +unit, User_Warehouse: Username, Number_Warehouse: Phone, statuswarehouseId: 1 },
            include: [
                {
                    model: db.Warehouse,
                },

                {
                    model: db.Status_Delivery,

                },
                {
                    model: db.Status_Received_money,

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
                    model: db.Status_Payment,

                },
                {
                    model: db.Status_Warehouse,

                },

                {
                    model: db.Status_Pickup,

                },
                {
                    model: db.Status_Pickup,

                },
                {
                    model: db.Address_Province,

                },
                {
                    model: db.Address_District,

                },
                {
                    model: db.Address_Ward,

                },
                {
                    model: db.Image,
                    through: { attributes: [] }

                }

            ],
            raw: true,
            nest: true

        })
        if (data) {




            return {
                EM: " success",
                EC: "0",
                DT: data


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
const updateProjectWithEmployerWarehouse = async (item) => {
    try {
        if (!item.id) {
            return {
                EM: "do not data to update",
                EC: "1",
                DT: "",
            }
        }
        let abc = await db.Projects.findOne({
            where: { shippingUnit_Id: +item.unitId, id: +item.id },

        })

        if (abc) {
            await abc.update({
                Status_product: item.StatusProduct,
                User_Warehouse: item.username,
                Number_Warehouse: item.phone,
                statuswarehouseId: item.status_warehouse_Id,
                warehouse_time: item.warehouse_time,
                warehouseDone_time: item.warehouseDone_time
            })

            return {
                EM: "Update  Success",
                EC: "0",
                DT: abc,
            }



        } else {
            return {
                EM: " Project Not Found",
                EC: "2",
                DT: "",
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
const getAllProjectWithPaginationWithEmployerDelivery = async (page, limit, unit) => {
    try {
        if (!unit) {
            return {
                EM: " you can not access this page",
                EC: "1",
                DT: [],
            }
        }
        if (unit) {

            let offset = (page - 1) * limit;
            const { count, rows } = await db.Projects.findAndCountAll({
                where: { shippingUnit_Id: +unit, statuswarehouseId: 2 },

                include: [
                    {
                        model: db.Warehouse,
                    },
                    {
                        model: db.Status_Received_money,

                    },
                    {
                        model: db.Status_Delivery,

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
                        model: db.Status_Payment,

                    },

                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Status_Warehouse,

                    },
                    {
                        model: db.Address_Province,

                    },
                    {
                        model: db.Address_District,

                    },
                    {
                        model: db.Address_Ward,

                    },
                    {
                        model: db.Image,
                        through: { attributes: [] }

                    },

                ],

                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,


            },
            )


            let totalPage = Math.ceil(count / limit)

            let data = {
                totalProject: count,
                totalPage: totalPage,
                dataProject: rows

            }
            return {
                EM: " ok",
                EC: "0",
                DT: data,
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
const getAllProjectWithPaginationWithEmployerDeliveryWithUsername = async (unit, Username, Phone) => {
    try {


        let data = await db.Projects.findAll({
            where: { shippingUnit_Id: +unit, User_Delivery: Username, Number_Delivery: Phone, statusdeliveryId: 1 },
            include: [
                {
                    model: db.Warehouse,
                },

                {
                    model: db.Status_Delivery,

                },
                {
                    model: db.Province_customer,

                },
                {
                    model: db.Status_Received_money,

                },
                {
                    model: db.District_customer,

                },
                {
                    model: db.Ward_customer,

                },
                {
                    model: db.Status_Payment,

                },
                {
                    model: db.Status_Warehouse,

                },

                {
                    model: db.Status_Pickup,

                },
                {
                    model: db.Status_Pickup,

                },
                {
                    model: db.Address_Province,

                },
                {
                    model: db.Address_District,

                },
                {
                    model: db.Address_Ward,

                },
                {
                    model: db.Image,
                    through: { attributes: [] }

                }

            ],
            raw: true,
            nest: true

        })
        if (data) {




            return {
                EM: " success",
                EC: "0",
                DT: data


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
const updateProjectWithEmployerDelivery = async (item) => {
    try {
        if (!item.id) {
            return {
                EM: "do not data to update",
                EC: "1",
                DT: "",
            }
        }
        let abc = await db.Projects.findOne({
            where: { shippingUnit_Id: +item.unitId, id: +item.id },

        })

        if (abc) {
            await abc.update({
                User_Delivery: item.username,
                Number_Delivery: item.phone,
                Cancel_reason: item.text,
                statusDeliveryId: +item.status_delivery,
                Notice_Delivery: item.textOne,
                Delivery_time: item.Delivery_time,
                DeliveryDone_time: item.DeliveryDone_time,
                Sub_money: item.Sub_money,
                receiveMoneyId: item.receiveMoneyId

            })

            return {
                EM: "Update  Success",
                EC: "0",
                DT: abc,
            }



        } else {
            return {
                EM: " Project Not Found",
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
const getAllProjectWithEmployerWithAllStausPickUp = async (page, limit, unit, statuspickup) => {
    try {
        if (!unit) {
            return {
                EM: " you can not access this page",
                EC: "1",
                DT: [],
            }
        }
        if (unit) {

            let offset = (page - 1) * limit;
            ;

            const { count, rows } = await db.Projects.findAndCountAll({
                where: { shippingUnit_Id: +unit, statuspickupId: +statuspickup },

                include: [
                    {
                        model: db.Warehouse,
                    },
                    {
                        model: db.Status_Received_money,

                    },

                    {
                        model: db.Status_Delivery,

                    },
                    {
                        model: db.Status_Warehouse,

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
                        model: db.Status_Payment,

                    },

                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Address_Province,

                    },
                    {
                        model: db.Address_District,

                    },
                    {
                        model: db.Address_Ward,

                    },
                    {
                        model: db.Image,
                        through: { attributes: [] }

                    },

                ],

                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,


            },
            )


            let totalPage = Math.ceil(count / limit)

            let data = {
                totalProject: count,
                totalPage: totalPage,
                dataProject: rows

            }
            return {
                EM: " ok",
                EC: "0",
                DT: data,
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
const getAllProjectWithEmployerWithAllStausWarehouse = async (page, limit, unit, statuswarehouse) => {
    try {
        if (!unit) {
            return {
                EM: " you can not access this page",
                EC: "1",
                DT: [],
            }
        }
        if (unit) {

            let offset = (page - 1) * limit;


            const { count, rows } = await db.Projects.findAndCountAll({
                where: { shippingUnit_Id: +unit, statuswarehouseId: +statuswarehouse },

                include: [
                    {
                        model: db.Warehouse,
                    },

                    {
                        model: db.Status_Received_money,

                    },
                    {
                        model: db.Status_Delivery,

                    },
                    {
                        model: db.Status_Warehouse,

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
                        model: db.Status_Payment,

                    },

                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Address_Province,

                    },
                    {
                        model: db.Address_District,

                    },
                    {
                        model: db.Address_Ward,

                    },
                    {
                        model: db.Image,
                        through: { attributes: [] }

                    },

                ],

                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,


            },
            )


            let totalPage = Math.ceil(count / limit)

            let data = {
                totalProject: count,
                totalPage: totalPage,
                dataProject: rows

            }
            return {
                EM: " ok",
                EC: "0",
                DT: data,
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
const getAllProjectWithEmployerWithAllStausDelivery = async (page, limit, unit, statusDelivery) => {
    try {
        if (!unit) {
            return {
                EM: " you can not access this page",
                EC: "1",
                DT: [],
            }
        }
        if (unit) {

            let offset = (page - 1) * limit;


            const { count, rows } = await db.Projects.findAndCountAll({
                where: { shippingUnit_Id: +unit, statusDeliveryId: statusDelivery },

                include: [
                    {
                        model: db.Warehouse,
                    },

                    {
                        model: db.Status_Received_money,

                    },
                    {
                        model: db.Status_Delivery,

                    },
                    {
                        model: db.Status_Warehouse,

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
                        model: db.Status_Payment,

                    },

                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Address_Province,

                    },
                    {
                        model: db.Address_District,

                    },
                    {
                        model: db.Address_Ward,

                    },
                    {
                        model: db.Image,
                        through: { attributes: [] }

                    },

                ],

                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,


            },
            )


            let totalPage = Math.ceil(count / limit)

            let data = {
                totalProject: count,
                totalPage: totalPage,
                dataProject: rows

            }
            return {
                EM: " ok",
                EC: "0",
                DT: data,
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
const getNumberEmployer = async (unit) => {
    try {
        let data = await db.Projects.findAll({
            raw: true,
            where: { shippingUnit_Id: +unit },

        })
        if (data) {
            let arr = []
            let allNum = data.length
            let no_pick_up = data.filter(item => item.statuspickupId === 0)
            let picking_up = data.filter(item => item.statuspickupId === 1)
            let pickupOk = data.filter(item => item.statuspickupId === 2)
            let no_warehouse = data.filter(item => item.statuswarehouseId === 0)
            let warehouseStatusOne = data.filter(item => item.statuswarehouseId === 1)
            let warehouseStatusTwo = data.filter(item => item.statuswarehouseId === 2)
            let No_delivery = data.filter(item => item.statusDeliveryId === 0)
            let deliveryStatusOne = data.filter(item => item.statusDeliveryId === 1)
            let delivery_ok = data.filter(item => item.statusDeliveryId === 2)
            let delivery_cancel = data.filter(item => item.statusDeliveryId === 3)
            let delivery_again = data.filter(item => item.statusDeliveryId === 4)
            arr.push({
                allNum: allNum,
                no_pick_up: no_pick_up.length,
                picking_up: picking_up.length,
                pickupOk: pickupOk.length,
                no_warehouse: no_warehouse.length,
                warehouseStatusOne: warehouseStatusOne.length,
                warehouseStatusTwo: warehouseStatusTwo.length,
                No_delivery: No_delivery.length,
                deliveryStatusOne: deliveryStatusOne.length,
                delivery_ok: delivery_ok.length,
                delivery_cancel: delivery_cancel.length,
                delivery_again: delivery_again.length
            })
            return {
                EM: " ok",
                EC: "0",
                DT: arr,
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
const showDataproductBySearchWithEmployer = async (data, positon, unit) => {


    try {
        let Alldata = await db.Projects.findAll(
            {
                where: { shippingUnit_Id: +unit },

                include: [
                    {
                        model: db.Warehouse,
                    },

                    {
                        model: db.Status_Received_money,

                    },
                    {
                        model: db.Status_Delivery,

                    },
                    {
                        model: db.Status_Warehouse,

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
                        model: db.Status_Payment,

                    },

                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Address_Province,

                    },
                    {
                        model: db.Address_District,

                    },
                    {
                        model: db.Address_Ward,

                    },
                    {
                        model: db.Image,
                        through: { attributes: [] }

                    },

                ],
            }
        )
        if (Alldata) {
            if (!positon) {
                const AlldataSearch = Alldata.filter(item =>
                    item?.order?.includes(data) ||
                    item?.Warehouse?.product?.includes(data) ||
                    item?.name_customer.includes(data) ||
                    item?.User_PickUp?.includes(data) ||
                    item?.Number_PickUp?.includes(data) ||
                    item?.User_Warehouse?.includes(data) ||
                    item?.Number_Warehouse?.includes(data) ||
                    item?.User_Delivery?.includes(data) ||
                    item?.Number_Delivery?.includes(data) ||
                    item?.User_Overview?.includes(data) ||
                    item?.Number_Overview?.includes(data) ||
                    moment(`${item?.createdAt}`).format("DD/MM/YYYY ").includes(data)




                )
                return {
                    EM: " get data search success",
                    EC: "0",
                    DT: AlldataSearch,
                }
            }
            if (positon === "Nhân viên lấy hàng") {
                const AlldataSearch = Alldata.filter(item =>
                    item?.order?.includes(data) ||
                    item?.Warehouse?.product?.includes(data) ||
                    item?.User_PickUp?.includes(data) ||
                    item?.Number_PickUp?.includes(data) ||
                    item?.Detail_Place_of_receipt?.includes(data) ||
                    item?.Address_Ward?.name?.includes(data) ||
                    item?.Address_District?.name?.includes(data) ||
                    item?.Address_Province?.name?.includes(data) ||
                    moment(`${item?.createdAt}`).format("DD/MM/YYYY ").includes(data) ||
                    moment(`${item?.pickup_time}`).format("DD/MM/YYYY HH:mm:ss").includes(data) ||
                    moment(`${item?.pickupDone_time}`).format("DD/MM/YYYY HH:mm:ss").includes(data)

                )
                return {
                    EM: " get data search success",
                    EC: "0",
                    DT: AlldataSearch,
                }
            }
            if (positon === "Nhân viên kho hàng") {
                const AlldataSearch = Alldata.filter(item =>
                    item?.order?.includes(data) ||
                    item?.Warehouse?.product?.includes(data) ||
                    item?.User_Warehouse?.includes(data) ||
                    item?.Number_Warehouse?.includes(data) ||
                    moment(`${item?.createdAt}`).format("DD/MM/YYYY").includes(data) ||
                    moment(`${item?.warehouse_time}`).format("DD/MM/YYYY HH:mm:ss").includes(data) ||
                    moment(`${item?.warehouseDone_time}`).format("DD/MM/YYYY HH:mm:ss").includes(data)
                )
                return {
                    EM: " get data search success",
                    EC: "0",
                    DT: AlldataSearch,
                }
            }
            if (positon === "Nhân viên giao hàng") {
                const AlldataSearch = Alldata.filter(item =>
                    item?.order?.includes(data) ||
                    item?.Warehouse?.product?.includes(data) ||
                    item?.name_customer?.includes(data) ||
                    item?.phoneNumber_customer?.includes(data) ||
                    item?.User_Delivery?.includes(data) ||
                    item?.Number_Delivery?.includes(data) ||
                    item?.addressDetail?.includes(data) ||
                    item?.Ward_customer?.name?.includes(data) ||
                    item?.District_customer?.name?.includes(data) ||
                    item?.Province_customer?.name?.includes(data) ||
                    moment(`${item?.createdAt}`).format("DD/MM/YYYY").includes(data) ||
                    moment(`${item?.Delivery_time}`).format("DD/MM/YYYY HH:mm:ss").includes(data) ||
                    moment(`${item?.DeliveryDone_time}`).format("DD/MM/YYYY HH:mm:ss").includes(data)
                )
                return {
                    EM: " get data search success",
                    EC: "0",
                    DT: AlldataSearch,
                }
            }
            if (positon === "Nhân viên kế toán") {
                const AlldataSearch = Alldata.filter(item =>
                    item?.order?.includes(data) ||
                    item?.createdBy?.includes(data) ||
                    item?.createdByName?.includes(data) ||
                    item?.Mode_of_payment?.includes(data) ||
                    item?.Main_Account?.includes(data) ||
                    item?.Bank_name?.includes(data) ||
                    item?.name_account?.includes(data) ||
                    item?.User_Overview?.includes(data) ||
                    item?.Number_Overview?.includes(data) ||
                    item?.total?.includes(data) ||
                    moment(`${item?.createdAt}`).format("DD/MM/YYYY").includes(data) ||
                    moment(`${item?.Overview_time}`).format("DD/MM/YYYY HH:mm:ss").includes(data) ||
                    moment(`${item?.OverviewDone_time}`).format("DD/MM/YYYY HH:mm:ss").includes(data)
                )
                return {
                    EM: " get data search success",
                    EC: "0",
                    DT: AlldataSearch,
                }
            }

        } else {
            return {
                EM: " not Found   ",
                EC: "0",
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
const getDataproductWithStatus = async (unit, statuspickupId, statuswarehouseId, statusDeliveryId, receiveMoneyId) => {


    try {
        if (!unit) {
            return {
                EM: " you can not access this page",
                EC: "1",
                DT: [],
            }
        }

        if (unit && statuspickupId && !statuswarehouseId && !statusDeliveryId && !receiveMoneyId) {
            let Alldata = await db.Projects.findAll(
                {
                    where: { shippingUnit_Id: +unit, statuspickupId: +statuspickupId },

                    include: [
                        {
                            model: db.Warehouse,
                        },

                        {
                            model: db.Status_Received_money,

                        },
                        {
                            model: db.Status_Delivery,

                        },
                        {
                            model: db.Status_Warehouse,

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
                            model: db.Status_Payment,

                        },

                        {
                            model: db.Status_Pickup,

                        },
                        {
                            model: db.Status_Pickup,

                        },
                        {
                            model: db.Address_Province,

                        },
                        {
                            model: db.Address_District,

                        },
                        {
                            model: db.Address_Ward,

                        },
                        {
                            model: db.Image,
                            through: { attributes: [] }

                        },

                    ],
                }
            )
            if (Alldata) {
                return {
                    EM: " get data search success",
                    EC: "0",
                    DT: Alldata,
                }
            }

        }
        if (unit && statuswarehouseId && !statuspickupId && !statusDeliveryId && !receiveMoneyId) {
            let Alldata = await db.Projects.findAll(
                {
                    where: { shippingUnit_Id: +unit, statuswarehouseId: +statuswarehouseId },

                    include: [
                        {
                            model: db.Warehouse,
                        },

                        {
                            model: db.Status_Received_money,

                        },
                        {
                            model: db.Status_Delivery,

                        },
                        {
                            model: db.Status_Warehouse,

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
                            model: db.Status_Payment,

                        },

                        {
                            model: db.Status_Pickup,

                        },
                        {
                            model: db.Status_Pickup,

                        },
                        {
                            model: db.Address_Province,

                        },
                        {
                            model: db.Address_District,

                        },
                        {
                            model: db.Address_Ward,

                        },
                        {
                            model: db.Image,
                            through: { attributes: [] }

                        },

                    ],
                }
            )
            if (Alldata) {
                return {
                    EM: " get data search success",
                    EC: "0",
                    DT: Alldata,
                }
            }

        }
        if (unit && statusDeliveryId && !statuspickupId && !statuswarehouseId && !receiveMoneyId) {
            let Alldata = await db.Projects.findAll(
                {
                    where: { shippingUnit_Id: +unit, statusDeliveryId: +statusDeliveryId },

                    include: [
                        {
                            model: db.Warehouse,
                        },

                        {
                            model: db.Status_Received_money,

                        },
                        {
                            model: db.Status_Delivery,

                        },
                        {
                            model: db.Status_Warehouse,

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
                            model: db.Status_Payment,

                        },

                        {
                            model: db.Status_Pickup,

                        },
                        {
                            model: db.Status_Pickup,

                        },
                        {
                            model: db.Address_Province,

                        },
                        {
                            model: db.Address_District,

                        },
                        {
                            model: db.Address_Ward,

                        },
                        {
                            model: db.Image,
                            through: { attributes: [] }

                        },

                    ],
                }
            )
            if (Alldata) {
                return {
                    EM: " get data search success",
                    EC: "0",
                    DT: Alldata,
                }
            }

        }
        if (unit && receiveMoneyId && !statuspickupId && !statuswarehouseId && !statusDeliveryId) {
            let Alldata = await db.Projects.findAll(
                {
                    where: { shippingUnit_Id: +unit, receiveMoneyId: +receiveMoneyId },

                    include: [
                        {
                            model: db.Warehouse,
                        },

                        {
                            model: db.Status_Received_money,

                        },
                        {
                            model: db.Status_Delivery,

                        },
                        {
                            model: db.Status_Warehouse,

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
                            model: db.Status_Payment,

                        },

                        {
                            model: db.Status_Pickup,

                        },
                        {
                            model: db.Status_Pickup,

                        },
                        {
                            model: db.Address_Province,

                        },
                        {
                            model: db.Address_District,

                        },
                        {
                            model: db.Address_Ward,

                        },
                        {
                            model: db.Image,
                            through: { attributes: [] }

                        },

                    ],
                }
            )
            if (Alldata) {
                return {
                    EM: " get data search success",
                    EC: "0",
                    DT: Alldata,
                }
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
const getAllProjectWithPaginationWithEmployerOverview = async (page, limit, unit) => {
    try {
        if (!unit) {
            return {
                EM: " you can not access this page",
                EC: "1",
                DT: [],
            }
        }
        if (unit) {

            let offset = (page - 1) * limit;
            const { count, rows } = await db.Projects.findAndCountAll({
                where: {
                    shippingUnit_Id: +unit, statusDeliveryId: 2
                },

                include: [
                    {
                        model: db.Warehouse,
                    },

                    {
                        model: db.Status_Delivery,

                    },
                    {
                        model: db.Status_Warehouse,

                    },
                    {
                        model: db.Status_Received_money,

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
                        model: db.Status_Payment,

                    },

                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Status_Pickup,

                    },
                    {
                        model: db.Status_Warehouse,

                    },
                    {
                        model: db.Address_Province,

                    },
                    {
                        model: db.Address_District,

                    },
                    {
                        model: db.Address_Ward,

                    },
                    {
                        model: db.Image,
                        through: { attributes: [] }

                    },

                ],

                order: [['id', 'DESC']],
                offset: offset,
                limit: limit,


            },
            )


            let totalPage = Math.ceil(count / limit)

            let data = {
                totalProject: count,
                totalPage: totalPage,
                dataProject: rows

            }
            return {
                EM: " ok",
                EC: "0",
                DT: data,
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
const getAllProjectWithPaginationWithEmployerOverviewWithUsername = async (unit, Username, Phone) => {
    try {

        let data = await db.Projects.findAll({
            where: {
                shippingUnit_Id: +unit, User_Overview: Username, Number_Overview: Phone, receiveMoneyId: 1
            },
            include: [
                {
                    model: db.Warehouse,
                },
                {
                    model: db.Status_Received_money,

                },
                {
                    model: db.Status_Delivery,

                },
                {
                    model: db.Province_customer,

                },
                {
                    model: db.Status_Warehouse,

                },
                {
                    model: db.District_customer,

                },
                {
                    model: db.Ward_customer,

                },
                {
                    model: db.Status_Payment,

                },

                {
                    model: db.Status_Pickup,

                },
                {
                    model: db.Status_Pickup,

                },
                {
                    model: db.Address_Province,

                },
                {
                    model: db.Address_District,

                },
                {
                    model: db.Address_Ward,

                },
                {
                    model: db.Image,
                    through: { attributes: [] }

                }

            ],
            raw: true,
            nest: true

        })
        if (data) {




            return {
                EM: " success",
                EC: "0",
                DT: data


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
const updateProjectWithEmployerOverview = async (item) => {
    try {
        if (!item.id) {
            return {
                EM: "do not data to update",
                EC: "1",
                DT: "",
            }
        }
        let abc = await db.Projects.findOne({
            where: { shippingUnit_Id: +item.unitId, id: +item.id },

        })

        if (abc) {
            await abc.update({
                User_Overview: item.User_Overview,
                Number_Overview: item.Number_Overview,
                receiveMoneyId: +item.receiveMoneyId,
                Overview_time: item.Overview_time,
                OverviewDone_time: item.OverviewDone_time,
                done_status: item.done_status
            })

            return {
                EM: "Update  Success",
                EC: "0",
                DT: abc,
            }



        } else {
            return {
                EM: " Project Not Found",
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
const createNotification = async (data) => {
    try {
        if (data) {
            let project = await db.Notification.create({
                ProjectId: data.ProjectId,
                Order: data.Order,
                Change_content: data.Change_content,
                ChangeBy: data.ChangeBy,
                CreatedBy: data.CreatedBy,
                ViewByuser: data.ViewByuser,
                ViewByStaff: data.ViewByStaff,
                Unit: data.unit
            })
            return {
                EM: " Create ok",
                EC: "0",
                DT: project,
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
const getshowAllNotification = async (unit, user) => {
    try {

        if (unit < 1 || !unit) {
            let data = await db.Notification.findAll({
                where: { CreatedBy: user },
                order: [['createdAt', 'DESC']],

            })
            return {
                EM: " get Project ok",
                EC: "0",
                DT: data,
            }
        }
        if (unit) {
            let data = await db.Notification.findAll({
                where: { Unit: unit },
                order: [['createdAt', 'DESC']],

            })
            return {
                EM: " get Project ok",
                EC: "0",
                DT: data,
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
const updateStatusNotification = async (data) => {
    try {
        if (!data.id) {
            return {
                EM: "do not data to update",
                EC: "1",
                DT: "",
            }
        }
        let Notification = await db.Notification.findOne({
            where: { id: +data.id },
        })
        if (Notification) {
            if (data.positon === "Customer") {
                await Notification.update({
                    ViewByuser: 1,
                })
                return {
                    EM: " Update  Success",
                    EC: "0",
                    DT: "",
                }
            }
            if (data.positon === "Staff") {
                await Notification.update({
                    ViewByStaff: 1,
                })
                return {
                    EM: " Update  Success",
                    EC: "0",
                    DT: "",
                }
            }

        } else {
            return {
                EM: "  Not Found",
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
const checkPassWord = (inputPassWord, hashPassWord) => {
    return bcrypt.compareSync(inputPassWord, hashPassWord)
}
const hashPassWord = (passwordInput) => {
    return bcrypt.hashSync(passwordInput, salt);
}
const UpdatePassWord = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { phone: data.phone }
        })
        if (user) {
            let isCorrectPassword = checkPassWord(data.password, user.password)
            if (isCorrectPassword == true) {
                let hashPass = hashPassWord(data.newpassWord);
                if (data.password === data.newpassWord) {
                    return {
                        EM: "The new password is the same as the password, please change it",
                        EC: "0",
                        DT: "",
                    }
                } else {
                    await user.update({
                        password: hashPass

                    })
                    return {
                        EM: " Update  Success",
                        EC: "0",
                        DT: "",
                    }
                }

            } else {
                return {
                    EM: "Wrong password , please check again",
                    EC: "2",
                    DT: "",
                }
            }
        } else {
            return {
                EM: "  Not Found",
                EC: "2",
                DT: "",
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

module.exports = {
    getAllProject, getAllProjectWithPagination, getProjects, createProjects, getSalesChannel, getAllStatusPayment,
    updateProjectWithId, RemoveProject, createChat, updateChat, RemoveChatProject, getDataSearch, getDataSearchWithtime,
    getAllProjectWithPaginationAndStatusPayment, getAllProjectWithPaginationAndStatusDeliveryNull, getAllProductName,
    getAllnumberProduct, createdUserIdAndProjectId, createdUserIdAndProjectId, getAllwarehhouseWithPagination,
    updateNumberProductInWarehouse, getNumberInWarehouse, updateProductInWarehouse,
    getDataSearchWarehouse, getataWarehouseWithPaginationAndAllStatusProduct, getProductByStatusInWarehouse,
    getAllAllWarehouseDashboard, getAllWarehouseDashboardWithTime, getAllWarehouseDashboardWithMoney,
    CreateImageInWarehouse, UpdateImageInWarehouse, getAllDataProductDashboard, getAllDataProductDashboardByAge,
    getAllProductDashboardWithTime, getAllProductDashboardWithMounth, getAllProductDashboardWithCutomer,
    getAllProjectWithPaginationWithEmployer, getAllProjectWithPaginationWithEmployerWithFlag, updateProjectWithEmployerWithId,
    getAllProjectWithPaginationWithEmployerPickup, getAllProjectWithPaginationWithEmployerWithUsername, updateProjectWithEmployerPickup,
    getAllProjectWithPaginationWithEmployerWarehouse, getAllProjectWithPaginationWithEmployerWarehouseWithUsername,
    updateProjectWithEmployerWarehouse, getAllProjectWithPaginationWithEmployerDelivery, getAllProjectWithPaginationWithEmployerDeliveryWithUsername,
    updateProjectWithEmployerDelivery, getAllProjectWithEmployerWithAllStausPickUp, getAllProjectWithEmployerWithAllStausWarehouse,
    getAllProjectWithEmployerWithAllStausDelivery, getNumberEmployer, showDataproductBySearchWithEmployer, getDataproductWithStatus,
    getAllProjectWithPaginationWithEmployerOverview, createWarehouseProduct, getAllProjectWithPaginationWithEmployerOverviewWithUsername,
    updateProjectWithEmployerOverview, createNotification, getshowAllNotification, updateStatusNotification, UpdatePassWord
}
