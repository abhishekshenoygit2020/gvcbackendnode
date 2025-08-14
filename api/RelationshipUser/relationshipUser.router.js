const { create, getById , get, update, deleteById} = require("./relationshipUser.controller");
const router = require("express").Router();


router.post("/add", create)
        .get("/:id", getById)
        .post("/", get)       
        .post("/update", update)
        .delete("/:id/delete", deleteById);

module.exports = router;