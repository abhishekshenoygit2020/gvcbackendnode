const { create, getById , get, update, deleteById,createsubcategory,updateDealershipCategory,updateDealershipSubCategory,updatesubcategory,getsubcategory,createwarrantyprotection,updatewarrantyprotection,getwarrantyprotection,getsubcategorybycat,getwarrantyprobycatsubcat} = require("./category.controller");
const router = require("express").Router();


router.post("/add", create)
        .post("/addSubCat", createsubcategory)
        .post("/addwarrantyprotection", createwarrantyprotection)
        .get("/:id", getById)
        .post("/getsubcategorybycat", getsubcategorybycat)
        .post("/getwarrantyprobycatsubcat", getwarrantyprobycatsubcat)
        .get("/", get)
        .post("/getsubcategory", getsubcategory)
        .post("/getwarrantyprotection", getwarrantyprotection)
        .post("/:id/update", update)
        .post("/:id/updateSubcategory", updatesubcategory)
        .post("/:id/updatewarrantyprotection", updatewarrantyprotection)
        .post("/:id/updateDealershipCategory", updateDealershipCategory)
        .post("/:id/updateDealershipSubCategory", updateDealershipSubCategory)
        .delete("/:id/delete", deleteById);

module.exports = router;