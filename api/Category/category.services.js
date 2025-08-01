const pool = require("../../config/dbconfig");


module.exports = {
    creates: (data, callBack) => {
        pool.query(
            `select * from category where categoryName = ?`,
            [data.categoryName],
            (err, results) => {
                var date = new Date();
                var status = "active";
                if (results == "") {
                    pool.query(
                        `INSERT INTO category(categoryName) VALUES (?)`,
                        [
                            data.categoryName
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
                            else {
                                return callBack(null, "Data Added Succesfully");
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
    createsubcategory: (data, callBack) => {
        pool.query(
            `select * from subcategory where subcategory = ?`,
            [data.subcategory],
            (err, results) => {
                var date = new Date();
                var status = "active";
                if (results == "") {
                    pool.query(
                        `INSERT INTO subcategory(category,subcategory) VALUES (?,?)`,
                        [
                            data.category,
                            data.subcategory
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
                            else {
                                return callBack(null, "Data Added Succesfully");
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
    createwarrantyprotection: (data, callBack) => {
        pool.query(
            `select * from warrantyprotection where warrantyprotection = ? and category = ? and subcategory = ?`,
            [data.warrantyprotection,data.category,data.subcategory],
            (err, results) => {
                var date = new Date();
                var status = "active";
                if (results == "") {
                    pool.query(
                        `INSERT INTO warrantyprotection(category,subcategory,warrantyprotection) VALUES (?,?,?)`,
                        [
                            data.category,
                            data.subcategory,
                            data.warrantyprotection,
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
                            else {
                                return callBack(null, "Data Added Succesfully");
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
            `select * from category where id = ?`,
            [id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                else if (results == "") {
                    err = "Data not found";
                    return callBack(err)
                } else {
                    return callBack(null, results);
                }

            }
        );
    },
    //getting the products data
    gets: (callBack) => {
        pool.query(
            `select * from category`,
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
    getsubcategory: (callBack) => {
        pool.query(
            `SELECT category.categoryName, subcategory.category,subcategory.id,subcategory.subcategory FROM subcategory INNER JOIN category ON category.id = subcategory.category`,
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    err = "Data Not Founds";
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }

            }
        );
    },

    getsubcategorybycat: (data,callBack) => {
        pool.query(
            `select * from subcategory where category = ?`,
            [data.id],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    err = "Data Not Founds";
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }

            }
        );
    },

    getwarrantyprobycatsubcat: (data,callBack) => {
        pool.query(
            `select * from warrantyprotection where category = ? and subcategory = ?`,
            [data.category,data.subcategory],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    err = "Data Not Founds";
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }

            }
        );
    },
  
    getwarrantyprotection: (callBack) => {
        pool.query(
            `SELECT category.categoryName,subcategory.subcategory as subcat ,warrantyprotection.category,warrantyprotection.subcategory,warrantyprotection.warrantyProtection,warrantyprotection.id FROM warrantyprotection INNER JOIN category ON category.id = warrantyprotection.category INNER JOIN subcategory ON subcategory.id = warrantyprotection.subcategory`,
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    err = "Data Not Founds";
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }

            }
        );
    },
    updates: (data, id, callBack) => {
        pool.query(
            `select * from category where categoryName = ?`,
            [data.categoryName],
            (err, results) => {
                var date = new Date();
                var status = "active";
                // if (results != "") {
                    pool.query(
                        `UPDATE category SET categoryName = ? where id = ?`,
                        [
                            data.categoryName,
                            id
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
                            else {
                                return callBack(null, "Data Updated Successfully");
                            }
                        }
                    );
                // } else if (err) {
                //     return callBack(err);
                // } 
                // else {
                //     err = "Data Found Duplicate";
                //     return callBack(err);
                // }
            }
        );

    },
    updatesubcategory: (data, id, callBack) => {
        pool.query(
            `select * from subcategory where id = ?`,
            [id],
            (err, results) => {
                var date = new Date();
                var status = "active";
                if (results != "") {
                    pool.query(
                        `UPDATE subcategory SET category = ? , subcategory = ?  where id = ?`,
                        [
                            data.category,
                            data.subcategory,
                            id
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
                            else {
                                return callBack(null, "Data Updated Successfully");
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
    updatewarrantyprotection: (data, id, callBack) => {
        pool.query(
            `select * from warrantyprotection where id = ?`,
            [id],
            (err, results) => {
                var date = new Date();
                var status = "active";
                if (results != "") {
                    pool.query(
                        `UPDATE warrantyprotection SET category = ? , subcategory = ?, warrantyprotection = ? where id = ?`,
                        [
                            data.category,
                            data.subcategory,
                            data.warrantyprotection,
                            id
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
                            else {
                                return callBack(null, "Data Updated Successfully");
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
    deletesById: (id, callBack) => {
        pool.query(`delete from category where id=?`,
            [
                id
            ],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    return callBack("Data not found");
                } else {
                    message = "Data deleted successfully";
                    return callBack(null, message);
                }
            }
        );
    },




};
