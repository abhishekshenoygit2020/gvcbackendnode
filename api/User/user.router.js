const { create, getById , get, update,updateDealershipUser, deleteById,createUser,blockById,updateOVMICNO,getRelationshipManagerUser,getRelationshipManagerUserPerc} = require("./user.controller");
const router = require("express").Router();


router.post("/add", create)
        .post("/:id/added", getById)
        .post("/getUser", get)
        .post("/:id/updateUser", update)
        .post("/blockById", blockById)
        .post("/updateDealershipUser", updateDealershipUser)
        .post("/updateOVMICNO", updateOVMICNO)
        .post("/createUser",createUser)
        .post("/getRelationshipManagerUser",getRelationshipManagerUser)
        .post("/getRelationshipManagerUserPerc",getRelationshipManagerUserPerc)
        .delete("/:id/deleteUser", deleteById);

module.exports = router;