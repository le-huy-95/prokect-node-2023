import express from "express";

import crudUser from "../controller/crudUserController"
import groupController from "../controller/groupController"
import { checkUserJwt, checkUserPermission } from "../middleware/JwtOption"
const router = express.Router();



const CrudUser = (app) => {


    // router.all('*', checkUserJwt, checkUserPermission);

    router.get("/user/show", crudUser.show);
    router.post("/user/create", crudUser.create);
    router.put("/user/update", crudUser.update);
    router.delete("/user/delete", crudUser.remove);
    router.get("/group/show", groupController.showGroup);
    router.get("/user/search", crudUser.showDataBySearch);
    router.get("/user/show/search/byGroup", crudUser.showUserbyGroup);
    router.get("/user/findwithphone", crudUser.finduserwithphone);



    return app.use("/api/v2", router);
};

export default CrudUser;