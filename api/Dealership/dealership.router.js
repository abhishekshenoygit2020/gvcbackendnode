const { create, getSoldDataCount,deletesByIdproduct,saveUserNote,getDealershipUsers,getBrokerageDpt,deleteUserNote,getUserNote,getRestoreWarranty,warrantyRestore,getUserWarrantyCommissionDetailsSR,getUserWarrantyGiftDetails,getDateUserWarrantyCommissionDetailsSR,getDateUserWarrantyCommissionDetailsRM,getUserWarrantyCommissionDetails,getDealershipDateTotalCost,deletesByIdcategory,getLogDetails,deletesByIdsubcategory,deletesByIdwarrantyprotection,getById ,updateSalesrep, get, update, blockDealership,getByEmail,createWarranty,getPendingWarrantyGraph,getPendingWarranty,updateWarranty,getClosedWarranty,deletesByIdWarranty,gettableDataCount,getProductData,getClosedWonGraph,getDealershipTotalCost,getDealershipMonthTotalCost,getUserWarrantyCommissionDetailsRM} = require("./dealership.controller");
const router = require("express").Router();


router.post("/add", create)
        .get("/:id/fetch", getById)
        .get("/", get)
        .post("/getLogDetails", getLogDetails)
        .post("/getPending",getPendingWarranty)
        .post("/getClosed",getClosedWarranty)        
        .post("/getRestoreWarranty",getRestoreWarranty)        
        .post("/getPendingWarrantyGraph",getPendingWarrantyGraph)        
        .post("/getClosedWonGraph",getClosedWonGraph)        
        .post("/", getByEmail)
        .post("/getDataCount",gettableDataCount)
        .post("/getSoldDataCount",getSoldDataCount)
        .post("/:id/update", update)
        .post("/addDealershipWarranty",createWarranty)
        .post("/updateDealershipWarranty",updateWarranty)
        .post("/:id/deletesByIdWarranty",deletesByIdWarranty)
        .post("/:id/deletesByIdproduct",deletesByIdproduct)
        .post("/:id/deletesByIdcategory",deletesByIdcategory)
        .post("/:id/deletesByIdsubcategory",deletesByIdsubcategory)
        .post("/:id/deletesByIdwarrantyprotection",deletesByIdwarrantyprotection)
        .post("/:id/updateSalesrep",updateSalesrep)
        .post("/getProductData",getProductData)
        .post("/getDealershipTotalCost",getDealershipTotalCost)
        .post("/getDealershipUsers",getDealershipUsers)
        .post("/getDealershipDateTotalCost",getDealershipDateTotalCost)
        .post("/getDealershipMonthTotalCost",getDealershipMonthTotalCost)
        .post("/getUserWarrantyCommissionDetailsRM",getUserWarrantyCommissionDetailsRM)
        .post("/getUserWarrantyCommissionDetailsSR",getUserWarrantyCommissionDetailsSR)
        .post("/getDateUserWarrantyCommissionDetailsSR",getDateUserWarrantyCommissionDetailsSR)
        .post("/getDateUserWarrantyCommissionDetailsRM",getDateUserWarrantyCommissionDetailsRM)
        .post("/saveUserNote",saveUserNote)
        .post("/getUserNote",getUserNote)
        .post("/deleteUserNote",deleteUserNote)
        .post("/getUserWarrantyGiftDetails",getUserWarrantyGiftDetails)
        .post("/warrantyRestore",warrantyRestore)
        .post("/getUserWarrantyCommissionDetails",getUserWarrantyCommissionDetails)
        .post("/getBrokerageDpt", getBrokerageDpt)
        .post("/blockDealership", blockDealership);

module.exports = router;

// SELECT 
//     id,
//     retirementPerson,
//     CONCAT(
//         SUBSTRING(retirementPerson, 4, 4), '-', -- Extract the year
//         CASE 
//             WHEN SUBSTRING(retirementPerson, 9, 3) = 'JAN' THEN '01' 
//             WHEN SUBSTRING(retirementPerson, 9, 3) = 'FEB' THEN '02'
//             WHEN SUBSTRING(retirementPerson, 9, 3) = 'MAR' THEN '03'
//             WHEN SUBSTRING(retirementPerson, 9, 3) = 'APR' THEN '04'
//             WHEN SUBSTRING(retirementPerson, 9, 3) = 'MAY' THEN '05'
//             WHEN SUBSTRING(retirementPerson, 9, 3) = 'JUN' THEN '06'
//             WHEN SUBSTRING(retirementPerson, 9, 3) = 'JUL' THEN '07'
//             WHEN SUBSTRING(retirementPerson, 9, 3) = 'AUG' THEN '08'
//             WHEN SUBSTRING(retirementPerson, 9, 3) = 'SEP' THEN '09'
//             WHEN SUBSTRING(retirementPerson, 9, 3) = 'OCT' THEN '10'
//             WHEN SUBSTRING(retirementPerson, 9, 3) = 'NOV' THEN '11'
//             WHEN SUBSTRING(retirementPerson, 9, 3) = 'DEC' THEN '12'
//         END, '-', -- Extract the month abbreviation and convert to numeric
//         SUBSTRING(retirementPerson, 12, 2) -- Extract the day
//     ) AS extracted_date
// FROM 
//     payment where retirementPerson = 'RET2025_JAN1_1';s