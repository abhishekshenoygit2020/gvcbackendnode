const { login, create,changePassword,getById , get, update, deleteById,forgotPassword,forgotpwdUpdate} = require("./auth.controller");
const router = require("express").Router();


router.post("/login", login)
        .post("/add", create)
        .post("/changePassword",changePassword)
        .get("/:id", getById) 
        .get("/", get)
        .post("/:id/update", update)
        .post("/forgotPassword", forgotPassword)
        .post("/forgotPasswordUpdate", forgotpwdUpdate)
        .delete("/:id/delete", deleteById);

module.exports = router;