const pool = require("../../config/dbconfig");


module.exports = {
    creates: (data, callBack) => {
        pool.query(
            `select * from relationshipmanagerperc where userId = ? and dealershipId = ?`,
            [data.userId,data.dealershipId],
            (err, results) => {
                var date = new Date();              
                if (results == "") {
                    pool.query(
                        `INSERT INTO relationshipmanagerperc(userId, dealershipId, relationsipPerc) VALUES (?,?,?)`,
                        [
                            data.userId,
                            data.dealershipId,
                            data.relationsipPerc                           
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
            `select * from relationshipmanagerperc where id = ?`,
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
    gets: (data,callBack) => {
        const dealership = data.dealershipId;
        pool.query(
            `SELECT r.id, r.userid, r.dealershipId, r.relationsipPerc, CONCAT(l.firstname, ' ', l.lastname) AS username FROM relationshipmanagerperc AS r INNER JOIN login_master AS l ON r.userid = l.id where r.dealershipId = ?`,
            [dealership],
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
    updates: (data, callBack) => {     
        pool.query(
            `UPDATE relationshipmanagerperc 
                    SET                                    
                        userId = ?,                                   
                        dealershipId = ?,
                        relationsipPerc = ?                               
                    WHERE 
                        id = ?`,
            [
                data.userId,                            
                data.dealershipId,
                data.relationsipPerc,
                data.id
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
        
    },
    deletesById: (id, callBack) => {
        pool.query(`delete from relationshipmanagerperc where id=?`,
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
