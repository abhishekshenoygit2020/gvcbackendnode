const pool = require("../../config/dbconfig");

module.exports = {
    creates: (data, callBack) => {
        pool.query(
            `SELECT id FROM product_details WHERE id = ?`,
            [data.id],
            (err, results) => {
                var date = new Date();
                if (results == "") {
                    pool.query(
                        `INSERT INTO product_details(warrantyprotection,category, subcategory, features, products,subCat) VALUES (?,?,?,?,?,?)`,
                        [
                            data.warrantyprotection,
                            data.category,
                            data.subCategory,
                            data.features,
                            data.products,
                            data.subCat

                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            } else {
                                return callBack(null, "Data added successfully");
                            }
                        }
                    );
                } else if (err) {
                    return callBack(err);
                } else {
                    err = "Data Found Duplicate";
                    return callBack(err);
                }
            }
        );
    },
    createsDealershipProduct: (data, callBack) => {
        pool.query(
            `SELECT id FROM dealership_product_details WHERE dealership = ? and category = ? and subcategory = ?`,
            [
                data.userDealership,
                data.category,
                data.subCategory
            ],
            (err, results) => {
                var date = new Date();
                if (results == "") {
                    pool.query(
                        `INSERT INTO dealership_product_details(dealership,warrantyprotection,category, subcategory, features, products,subCat) VALUES (?,?,?,?,?,?,?)`,
                        [
                            data.userDealership,
                            data.warrantyprotection,
                            data.category,
                            data.subCategory,
                            data.features,
                            data.products,
                            data.subCat

                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            } else {
                                return callBack(null, "Data added successfully");
                            }
                        }
                    );
                } else if (err) {
                    return callBack(err);
                } else {
                    err = "Data Found Duplicate";
                    return callBack(err);
                }
            }
        );
    },
    createsSalesrepProduct: (data, callBack) => {
        pool.query(
            `SELECT id FROM salesrep_product_details WHERE salesrep = ? and category = ? and subcategory = ?`,
            [
                data.userSalesrep,
                data.category,
                data.subCategory
            ],
            (err, results) => {
                var date = new Date();
                if (results == "") {
                    pool.query(
                        `INSERT INTO salesrep_product_details(dealership,salesrep,warrantyprotection,category, subcategory, features, products,subCat) VALUES (?,?,?,?,?,?,?,?)`,
                        [
                            data.userDealership,
                            data.userSalesrep,
                            data.warrantyprotection,
                            data.category,
                            data.subCategory,
                            data.features,
                            data.products,
                            data.subCat

                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            } else {
                                return callBack(null, "Data added successfully");
                            }
                        }
                    );
                } else if (err) {
                    return callBack(err);
                } else {
                    err = "Data Found Duplicate";
                    return callBack(err);
                }
            }
        );
    },

    getsById: (id, callBack) => {
        pool.query(
            `SELECT id, category, subcategory, features, products FROM product_details WHERE id = ?`,
            [id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    err = "Data not found";
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }
            }
        );
    },

    getDealershipProduct: (callBack) => {
        pool.query(
            `SELECT 
    d.accountname AS accountname,
    dpd.id AS id,
    dpd.category AS category,
    dpd.subCat AS subCat,
    dpd.subcategory AS subcategory,
    dpd.warrantyprotection AS warrantyprotection,
    dpd.features AS features,
    dpd.products AS products,
    dpd.PDF AS PDF,
    dpd.dealership AS dealership
FROM 
    dealership_product_details dpd
INNER JOIN 
    dealership d ON d.id = dpd.dealership`,
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    err = "Data Not Found";
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    getSalesrepProduct: (callBack) => {
        pool.query(
            `SELECT 
    CONCAT(d.firstname, ' ', d.lastname) AS salesrepname,
    dpd.id AS id,
    dpd.category AS category,
    dpd.subCat AS subCat,
    dpd.subcategory AS subcategory,
    dpd.warrantyprotection AS warrantyprotection,
    dpd.features AS features,
    dpd.products AS products,
    dpd.PDF AS PDF,
    dpd.dealership AS dealership,
    dpd.salesrep AS salesrep
FROM 
    salesrep_product_details dpd
INNER JOIN 
    login_master d ON d.id = dpd.salesrep`,
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    err = "Data Not Found";
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    gets: (callBack) => {
        pool.query(
            `SELECT 
    pd.id AS id,
    pd.category AS product_category_id,
    c.id AS category_id,
    c.categoryName AS category_name,
    pd.subcategory AS product_subcategory,
    pd.warrantyprotection AS warrantyprotection,
    pd.subCat AS subCat,
    pd.features AS product_features,
    pd.products AS products
FROM 
    product_details AS pd
INNER JOIN 
    category AS c
ON 
    pd.category = c.id`,
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    err = "Data Not Found";
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }
            }
        );
    },

    updates: (data, id, callBack) => {

        let query = "";
        let params = "";
        if (data.pdf) {
            query = `UPDATE product_details SET  warrantyprotection = ?, category=?, subcategory=?, features=?, products=?, subCat=?, PDF=? WHERE id = ?`;
            params = [
                data.warrantyprotection,
                data.category,
                data.subCategory,
                data.features,
                data.products,
                data.subCat,
                data.pdf,
                id
            ];
        } else {
            query = `UPDATE product_details SET warrantyprotection = ?,category=?, subcategory=?, features=?, products=?,subCat=?  WHERE id = ?`;
            params = [
                data.warrantyprotection,
                data.category,
                data.subCategory,
                data.features,
                data.products,
                data.subCat,
                id
            ];
        }
        pool.query(
            `SELECT* FROM product_details WHERE id = ?`,
            [id],
            (err, results) => {
                var date = new Date();
                if (results == "") {
                    err = "DataNot Found";
                    return callBack(err);
                } else if (err) {
                    return callBack(err);
                } else {
                    pool.query(
                        query,
                        params,
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            } else {
                                return callBack(null, "Data Updated Successfully");
                            }
                        }
                    );

                }
            }
        );
    },
    updateDealershipProduct: (data, id, callBack) => {

        let query = "";
        let params = "";
        if (data.pdf) {
            query = `UPDATE dealership_product_details SET  warrantyprotection = ?, category=?, subcategory=?, features=?, products=?, subCat=?, PDF=? WHERE id = ?`;
            params = [
                data.warrantyprotection,
                data.category,
                data.subCategory,
                data.features,
                data.products,
                data.subCat,
                data.pdf,
                id
            ];
        } else {
            query = `UPDATE dealership_product_details SET warrantyprotection = ?,category=?, subcategory=?, features=?, products=?,subCat=?  WHERE id = ?`;
            params = [
                data.warrantyprotection,
                data.category,
                data.subCategory,
                data.features,
                data.products,
                data.subCat,
                id
            ];
        }
        pool.query(
            `SELECT* FROM dealership_product_details WHERE id = ?`,
            [id],
            (err, results) => {
                var date = new Date();
                if (results == "") {
                    err = "Data Not Found";
                    return callBack(err);
                } else if (err) {
                    return callBack(err);
                } else {
                    pool.query(
                        query,
                        params,
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            } else {
                                return callBack(null, "Data Updated Successfully");
                            }
                        }
                    );

                }
            }
        );
    },
    updateSalesrepProduct: (data, id, callBack) => {

        let query = "";
        let params = "";
        if (data.pdf) {
            query = `UPDATE salesrep_product_details SET  warrantyprotection = ?, category=?, subcategory=?, features=?, products=?, subCat=?, PDF=? WHERE id = ?`;
            params = [
                data.warrantyprotection,
                data.category,
                data.subCategory,
                data.features,
                data.products,
                data.subCat,
                data.pdf,
                id
            ];
        } else {
            query = `UPDATE salesrep_product_details SET warrantyprotection = ?,category=?, subcategory=?, features=?, products=?,subCat=?  WHERE id = ?`;
            params = [
                data.warrantyprotection,
                data.category,
                data.subCategory,
                data.features,
                data.products,
                data.subCat,
                id
            ];
        }
        pool.query(
            `SELECT* FROM salesrep_product_details WHERE id = ?`,
            [id],
            (err, results) => {
                var date = new Date();
                if (results == "") {
                    err = "Data Not Found";
                    return callBack(err);
                } else if (err) {
                    return callBack(err);
                } else {
                    pool.query(
                        query,
                        params,
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            } else {
                                return callBack(null, "Data Updated Successfully");
                            }
                        }
                    );

                }
            }
        );
    },
    deletesById: (id, callBack) => {
        pool.query(
            `DELETE FROM product_details WHERE id = ?`,
            [id],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    return callBack("Data not found");
                } else {
                    const message = "Data deleted successfully";
                    return callBack(null, message);
                }
            }
        );
    },
    deletesByIdDealershipProduct: (id, callBack) => {
        pool.query(
            `DELETE FROM dealership_product_details WHERE id = ?`,
            [id],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    return callBack("Data not found");
                } else {
                    const message = "Data deleted successfully";
                    return callBack(null, message);
                }
            }
        );
    },
    deletesByIdSalesrepProduct: (id, callBack) => {
        pool.query(
            `DELETE FROM salesrep_product_details WHERE id = ?`,
            [id],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    return callBack("Data not found");
                } else {
                    const message = "Data deleted successfully";
                    return callBack(null, message);
                }
            }
        );
    },
    getByCategoryId: (id, callBack) => {
        pool.query(
            `Select subcategory FROM product_details WHERE category = ?`,
            [id],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    return callBack("Data not found");
                } else {
                    // const message = "Data deleted successfully";
                    return callBack(null, results);
                }
            }
        );
    },
    getProductFeatures: (id, data, callBack) => {

        if (data.dealership == 0) {
            pool.query(
                `SELECT subcategory, PDF, products, features FROM product_details WHERE category = ? and subcategory = ?`,
                [id, data.subcategory],
                (err, results) => {
                    if (err) {
                        return callBack(err);
                    } else if (!results.length) {
                        return callBack("Data not found");
                    } else {
                        const subcategories = [];
                        const products = [];
                        var PDF = "";
                        var features = "";

                        results.forEach(row => {
                            // Collect subcategories
                            subcategories.push(row.subcategory);

                            // Parse products
                            try {
                                const parsedProducts = row.products
                                    .replace(/\\\"/g, '"') // Handle escaped quotes
                                    .match(/\[.*?\]/g) // Match all JSON arrays
                                    ?.map(jsonString => JSON.parse(jsonString)) // Parse each array
                                    ?.flat() || []; // Flatten the arrays
                                products.push(...parsedProducts);
                            } catch (error) {
                                console.error("Error parsing products:", error);
                            }

                            // Parse features similarly if needed
                            try {
                                PDF = row.PDF;
                                features = row.features;
                            } catch (error) {
                                console.error("Error parsing features:", error);
                            }
                        });

                        const transformedResults = {
                            subcategories,
                            products,
                            features,
                            PDF,
                            originalProducts:[]
                        };

                        return callBack(null, transformedResults);
                    }
                }
            );
        } else if (data.salesrep) {
            pool.query(
                `SELECT subcategory, PDF, products, features FROM salesrep_product_details WHERE category = ? and subcategory = ? and salesrep = ?`,
                [id, data.subcategory, data.salesrep],
                (err, results) => {
                    if (err) {
                        return callBack(err);
                    } else if (!results.length) {

                        pool.query(
                            `SELECT subcategory, PDF, products, features FROM dealership_product_details WHERE category = ? and subcategory = ? and dealership = ?`,
                            [id, data.subcategory, data.dealership],
                            (err, results) => {
                                if (err) {
                                    return callBack(err);
                                } else if (!results.length) {
                                    pool.query(
                                        `SELECT subcategory, PDF, products, features FROM product_details WHERE category = ? and subcategory = ?`,
                                        [id, data.subcategory],
                                        (err, results) => {
                                            if (err) {
                                                return callBack(err);
                                            } else if (!results.length) {
                                                return callBack("Data not found");
                                            } else {
                                                const subcategories = [];
                                                const products = [];
                                                var PDF = "";
                                                var features = "";

                                                results.forEach(row => {
                                                    // Collect subcategories
                                                    subcategories.push(row.subcategory);

                                                    // Parse products
                                                    try {
                                                        const parsedProducts = row.products
                                                            .replace(/\\\"/g, '"') // Handle escaped quotes
                                                            .match(/\[.*?\]/g) // Match all JSON arrays
                                                            ?.map(jsonString => JSON.parse(jsonString)) // Parse each array
                                                            ?.flat() || []; // Flatten the arrays
                                                        products.push(...parsedProducts);
                                                    } catch (error) {
                                                        console.error("Error parsing products:", error);
                                                    }

                                                    // Parse features similarly if needed
                                                    try {
                                                        PDF = row.PDF;
                                                        features = row.features;
                                                    } catch (error) {
                                                        console.error("Error parsing features:", error);
                                                    }
                                                });

                                                const transformedResults = {
                                                    subcategories,
                                                    products,
                                                    features,
                                                    PDF,
                                                    originalProducts:[]
                                                };

                                                return callBack(null, transformedResults);
                                            }
                                        }
                                    );
                                } else {
                                    const subcategories = [];
                                    const products = [];
                                    var PDF = "";
                                    var features = "";

                                    results.forEach(row => {
                                        // Collect subcategories
                                        subcategories.push(row.subcategory);

                                        // Parse products
                                        try {
                                            const parsedProducts = row.products
                                                .replace(/\\\"/g, '"') // Handle escaped quotes
                                                .match(/\[.*?\]/g) // Match all JSON arrays
                                                ?.map(jsonString => JSON.parse(jsonString)) // Parse each array
                                                ?.flat() || []; // Flatten the arrays
                                            products.push(...parsedProducts);
                                        } catch (error) {
                                            console.error("Error parsing products:", error);
                                        }

                                        // Parse features similarly if needed
                                        try {
                                            PDF = row.PDF;
                                            features = row.features;
                                        } catch (error) {
                                            console.error("Error parsing features:", error);
                                        }
                                    });

                                    // const transformedResults = {
                                    //     subcategories,
                                    //     products,
                                    //     features,
                                    //     PDF
                                    // };

                                    // return callBack(null, transformedResults);

                                    pool.query(
                                        `SELECT subcategory, PDF, products, features FROM product_details WHERE category = ? and subcategory = ?`,
                                        [id, data.subcategory],
                                        (err, results) => {
                                            if (err) {
                                                return callBack(err);
                                            } else if (!results.length) {
                                                return callBack("Data not found");
                                            } else {

                                                const originalProducts = [];

                                                results.forEach(row => {

                                                    try {
                                                        const parsedProducts = row.products
                                                            .replace(/\\\"/g, '"') // Handle escaped quotes
                                                            .match(/\[.*?\]/g) // Match all JSON arrays
                                                            ?.map(jsonString => JSON.parse(jsonString)) // Parse each array
                                                            ?.flat() || []; // Flatten the arrays
                                                        originalProducts.push(...parsedProducts);
                                                    } catch (error) {
                                                        console.error("Error parsing products:", error);
                                                    }

                                                });

                                                const transformedResults = {
                                                    subcategories,
                                                    products,
                                                    features,
                                                    PDF,
                                                    originalProducts
                                                };

                                                return callBack(null, transformedResults);
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    } else {
                        const subcategories = [];
                        const products = [];
                        var PDF = "";
                        var features = "";

                        results.forEach(row => {
                            // Collect subcategories
                            subcategories.push(row.subcategory);

                            // Parse products
                            try {
                                const parsedProducts = row.products
                                    .replace(/\\\"/g, '"') // Handle escaped quotes
                                    .match(/\[.*?\]/g) // Match all JSON arrays
                                    ?.map(jsonString => JSON.parse(jsonString)) // Parse each array
                                    ?.flat() || []; // Flatten the arrays
                                products.push(...parsedProducts);
                            } catch (error) {
                                console.error("Error parsing products:", error);
                            }

                            // Parse features similarly if needed
                            try {
                                PDF = row.PDF;
                                features = row.features;
                            } catch (error) {
                                console.error("Error parsing features:", error);
                            }
                        });

                        // const transformedResults = {
                        //     subcategories,
                        //     products,
                        //     features,
                        //     PDF
                        // };

                        // return callBack(null, transformedResults);

                        pool.query(
                            `SELECT subcategory, PDF, products, features FROM product_details WHERE category = ? and subcategory = ?`,
                            [id, data.subcategory],
                            (err, results) => {
                                if (err) {
                                    return callBack(err);
                                } else if (!results.length) {
                                    return callBack("Data not found");
                                } else {

                                    const originalProducts = [];

                                    results.forEach(row => {

                                        try {
                                            const parsedProducts = row.products
                                                .replace(/\\\"/g, '"') // Handle escaped quotes
                                                .match(/\[.*?\]/g) // Match all JSON arrays
                                                ?.map(jsonString => JSON.parse(jsonString)) // Parse each array
                                                ?.flat() || []; // Flatten the arrays
                                            originalProducts.push(...parsedProducts);
                                        } catch (error) {
                                            console.error("Error parsing products:", error);
                                        }

                                    });

                                    const transformedResults = {
                                        subcategories,
                                        products,
                                        features,
                                        PDF,
                                        originalProducts
                                    };

                                    return callBack(null, transformedResults);
                                }
                            }
                        );
                    }
                }
            );
        } else {

        }
    },
};
