const {getNotifications,markAllRead } = require("./notification.controller");
const router = require("express").Router();


router.get("/getNotifications", getNotifications)
router.post("/markAllRead", markAllRead)

module.exports = router;
