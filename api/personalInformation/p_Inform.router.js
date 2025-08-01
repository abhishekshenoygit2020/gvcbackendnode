const { create, getById , get, update, deleteById,getByEmail} = require("./p_Inform.controller");
const router = require("express").Router();


router.post("/add", create)
        .get("/:id", getById)
        .get("/", get)
        .post("/", getByEmail)
        .post("/update", update)
        .delete("/:id/delete", deleteById);

module.exports = router;