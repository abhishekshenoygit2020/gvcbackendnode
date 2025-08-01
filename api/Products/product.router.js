const { create, getById, get, update, deleteById, getByCategoryId, getProductFeatures, createsDealershipProduct,getDealershipProduct,updateDealershipProduct,deletesByIdDealershipProduct,createsSalesrepProduct,getSalesrepProduct,deletesByIdSalesrepProduct,updateSalesrepProduct } = require("./product.controller");
const router = require("express").Router();


router.post("/add", create)
        .post("/createsDealershipProduct", createsDealershipProduct)
        .post("/createsSalesrepProduct", createsSalesrepProduct)
        .get("/:id", getById)
        .post("/:id/getByCategory", getByCategoryId)
        .post("/:id/getProductFeatures", getProductFeatures)
        .get("/", get)
        .post("/getDealershipProduct", getDealershipProduct)
        .post("/getSalesrepProduct", getSalesrepProduct)
        .post("/:id/update", update)
        .post("/:id/updateDealershipProduct", updateDealershipProduct)
        .post("/:id/updateSalesrepProduct", updateSalesrepProduct)
        .delete("/:id/delete", deleteById)
        .post("/:id/deletesByIdDealershipProduct", deletesByIdDealershipProduct)
        .post("/:id/deletesByIdSalesrepProduct", deletesByIdSalesrepProduct);

module.exports = router;