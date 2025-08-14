const router =require("express").Router();

const authRouter=require("../Auth/auth.router");
// const companyRouter=require("../Company/company.router");
const personalInformationRouter=require("../personalInformation/p_Inform.router");
// const medicalRouter=require("../Medical/medical.router");
// const doctorRouter=require("../Doctor/doctor.router");
// const stateRouter=require("../State/state.router");
const dealershipRouter=require("../Dealership/dealership.router");
const categoryRouter=require("../Category/category.router");
const userRouter=require("../User/user.router");
const productRouter=require("../Products/product.router");
const salesrepRouter = require("../Salesrep/salesrep.router")
const notifications = require("../Notifications/notification.router");
const relationshipManager = require("../RelationshipUser/relationshipUser.router");


router.use("/api/auth",authRouter);
router.use("/api/personalInformation",personalInformationRouter);
router.use("/api/dealership",dealershipRouter);
router.use("/api/relationshipManager",relationshipManager);
router.use("/api/category",categoryRouter);
router.use("/api/user",userRouter);
router.use("/api/product",productRouter);
router.use("/api/salesrep", salesrepRouter);
router.use("/api/notifications", notifications);




module.exports=router;