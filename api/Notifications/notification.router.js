const {getNotifications } = require("./notification.controller");
const router = require("express").Router();


router.get("/getNotifications", getNotifications)

module.exports = router;
