import db from "../models/index"


const getImageByOrder = async (order) => {
    try {
        let data = await db.Image.findAll({
            where: { order: order },
        })
        if (data) {
            return {
                EM: " Find success",
                EC: "0",
                DT: data,
            }
        } else {
            return {
                EM: `Not order ${order}`,
                EC: "0",
                DT: data,
            }
        }

    } catch (error) {
        return {
            EM: " Wrongs with services",
            EC: "-1",
            DT: [],
        }
    }
}

const createdImageIdAndProjectId = async (projectId, ImageId) => {
    try {
        if (projectId, ImageId) {
            let nerArray = []
            ImageId.forEach((item) => {
                nerArray.push({ projectId: projectId, ImageId: item.id })



            });
            await db.Projects_Image.bulkCreate(nerArray, { returning: true })
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
const updateImage = async (order, image) => {
    try {
        await db.Image.destroy({
            where: { order: order }
        })
        let nerArrayImage = []
        image.forEach((item) => {
            nerArrayImage.push({ order: order, url: item.url })


        });
        let data = await db.Image.bulkCreate(nerArrayImage, { returning: true })
        return {
            EM: " Change Image Success",
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

const updateImageIdAndProjectId = async (projectId, image) => {


    try {
        if (projectId, image) {
            await db.Projects_Image.destroy({
                where: { projectId: +projectId }
            })
            let nerArray = []
            image.forEach((item) => {
                nerArray.push({ projectId: projectId, ImageId: item.id })



            });
            let data = await db.Projects_Image.bulkCreate(nerArray, { returning: true })
            return {
                EM: " Created  Success",
                EC: "0",
                DT: data,
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


const getImageByUser = async (email) => {
    try {
        let data = await db.User.findAll({
            where: { email: email },
        })
        if (data) {
            return {
                EM: " Find success",
                EC: "0",
                DT: data,
            }
        } else {
            return {
                EM: `Not email ${email}`,
                EC: "0",
                DT: "",
            }
        }

    } catch (error) {
        return {
            EM: " Wrongs with services",
            EC: "-1",
            DT: [],
        }
    }
}



module.exports = {
    getImageByOrder, createdImageIdAndProjectId, updateImage, updateImageIdAndProjectId, getImageByUser
}