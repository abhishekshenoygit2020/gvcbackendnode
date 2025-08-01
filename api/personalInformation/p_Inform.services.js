const pool = require("../../config/dbconfig");


module.exports = {
    creates: (data, callBack) => {
        pool.query(
            `select * from personalinformationdata where email = ?`,
            [data.email],
            (err, results) => {
                var date = new Date();
                var status = "1";
                if (results == "") {
                    pool.query(
                        `INSERT INTO personalinformationdata(account, email, dealerTrackId, mobileNo, salesPersonMarkup,salesMarkupPercentage, salesManOMVICNumber,date, status) VALUES (?,?,?,?,?,?,?,?,?)`,
                        [
                            data.account,
                            data.email,
                            data.dealerTrackId,
                            data.mobileNo,
                            data.salesPersonMarkup,
                            data.salesMarkupPercentage,
                            data.salesPersonMarkup,
                            date,
                            status
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
                            else {
                                return callBack(null, results);
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
            `select * from personalinformationdata where id = ?`,
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
    getsByEmail: (data, callBack) => {
        pool.query(
            `select * from personalinformationdata where email = ?`,
            [data.email],
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
            `select * from personalinformationdata`,
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
        pool.query(
            `select * from personalinformationdata where  email = ?`,
            [
                data.email
            ],
            (err, results) => {
                var date = new Date();
                var status = "1";
                if (results != "") {
                    pool.query(
                        `UPDATE personalinformationdata 
                                SET                                    
                                    account = ?,                                   
                                    dealerTrackId = ?,
                                    mobileNo = ?,
                                    salesPersonMarkup = ?,
                                    salesMarkupPercentage = ?,
                                    salesManOMVICNumber = ?,
                                    date = ?,
                                    status = ? 
                                WHERE 
                                    email = ?`,
                        [
                            data.account,                            
                            data.dealerTrackId,
                            data.mobileNo,
                            data.salesPersonMarkup,
                            data.salesMarkupPercentage,
                            data.salesManOMVICNumber,
                            date,
                            status,
                            data.email,
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
                            else {
                                return callBack(null, "Data Updated successfully");
                            }
                        }
                    );
                } else if (err) {
                    return callBack(err);
                } else {
                    pool.query(
                        `INSERT INTO personalinformationdata(account, email, dealerTrackId, mobileNo, salesPersonMarkup,salesMarkupPercentage, salesManOMVICNumber,date, status) VALUES (?,?,?,?,?,?,?,?,?)`,
                        [
                            data.account,
                            data.email,
                            data.dealerTrackId,
                            data.mobileNo,
                            data.salesPersonMarkup,
                            data.salesMarkupPercentage,
                            data.salesPersonMarkup,
                            date,
                            status
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
                            else {
                                return callBack(null, "Data Updated successfully");
                            }
                        }
                    );
                }
            }
        );
    },
    deletesById: (id, callBack) => {
        pool.query(`delete from medicine_master where id=?`,
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
