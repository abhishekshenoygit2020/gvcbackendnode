const { getLastMonthSales, getTotalCost } = require("./dashboard.controller");

const router = require("express").Router();


router.get("/lastMonthSales/:id/:user_type", getLastMonthSales);
router.get("/totalCost/:id", getTotalCost );


module.exports = router;
