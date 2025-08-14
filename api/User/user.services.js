const pool = require("../../config/dbconfig");
require("dotenv").config(); //configuring database
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const SMTPConnection = require("nodemailer/lib/smtp-connection");

module.exports = {
    creates: (data, callBack) => {
        pool.query(
            `select * from user_master where email = ?`,
            [data.email],
            (err, results) => {
                var date = new Date();
                var status = "active";
                if (results == "") {
                    pool.query(
                        `INSERT INTO user_master(first_name,last_name,gender,email,contact,date_of_birth,date,status,blood_pressure,pulse,blood_group,height,weight,city_id,state_id,district_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                        [
                            data.first_name,
                            data.last_name,
                            data.gender,
                            data.email,
                            data.contact,
                            data.date_of_birth,
                            date,
                            status,
                            data.blood_pressure,
                            data.pulse,
                            data.blood_group,
                            data.height,
                            data.weight,
                            data.city_id,
                            data.state_id,
                            data.district_id
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
                            else {
                                var status = "active";
                                var date = new Date();
                                var user_type = "user";
                                var password = "user" + Math.floor(Math.random() * 90000 + 10000);
                                pool.query(
                                    `INSERT INTO login_master(user_name,user_email,user_type,user_password,status,date ) VALUES (?,?,?,?,?,?)`,
                                    [
                                        data.first_name,
                                        data.email,
                                        user_type,
                                        password,
                                        status,
                                        date
                                    ],
                                    (error) => {
                                        if (error) {
                                            return callBack(error);
                                        } else {
                                            message = {
                                                student_email: data.student_email,
                                                password: password
                                            };
                                            return callBack(null, message);
                                        }
                                    }
                                );

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
    createUser: (data, callBack) => {
        pool.query(
            `select * from login_master where user_email = ?`,
            [data.user_email],
            (err, results) => {
                var date = new Date();
                var status = "active";
                if (err) {
                    return callBack(err);
                }
                else if (results.length > 0) {
                    err = "User Already Registered";
                    return callBack(err)
                } else {
                    // return callBack(null, "data Not found");
                    var status = "active";
                    var date = new Date();
                    var user_type = data.userRole;
                    var userpassword = data.user_password;
                    var dealership = data.dealership;
                    var password = "user" + Math.floor(Math.random() * 90000 + 10000);
                    var commissionPerc = data.commissionPerc == "" ? 0 : data.commissionPerc;
                    pool.query(
                        `INSERT INTO login_master(firstname,lastname,user_email,user_type,user_password,status,date,dealership,ovmic_no,commissionPerc) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                        [
                            data.firstname,
                            data.lastname,
                            data.user_email,
                            user_type,
                            userpassword,
                            status,
                            date,
                            data.dealership,
                            data.ovmic_no,
                            commissionPerc
                        ],
                        (error) => {
                            if (error) {
                                return callBack(error);
                            } else {

                                var mailReq = {
                                    to: data.user_email,
                                    subject: "Get Covered Canada Login Credentials",
                                    html: `
                                    <p>Dear ${data.firstname} ${data.lastname},</p>
                                    
                                    <p>Please find your Get Covered Canada credentials below:</p>
                                    
                                    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                                        <tr>
                                            <td><b>Portal URL</b></td>
                                            <td><a href="https://dealers.getcoveredcanada.ca/">https://dealers.getcoveredcanada.ca/</a></td>
                                        </tr>
                                        <tr>
                                            <td><b>Username</b></td>
                                            <td>${data.user_email}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Password</b></td>
                                            <td>${userpassword}</td>
                                        </tr>
                                    </table>
                                    
                                    <p>You can log in using the credentials above to access the portal. Once logged in, you’ll have access to tools that simplify warranty registrations.</p>
                                    
                                    <p><b>Getting Started:</b></p>
                                    <ol>
                                        <li>Visit the Portal URL provided above.</li>
                                        <li>Log in using your unique username and password.</li>
                                        <li>Begin exploring the portal and registering warranties.</li>
                                    </ol>
                                    
                                    <p>Should you encounter any issues or have questions while getting started, our support team is here to assist. Feel free to reach out to us at <a href="mailto:support@getcoveredcanada.com">support@getcoveredcanada.com</a> or call 1-800-268-3284.</p>
                                    
                                    <p>Best regards,<br>
                                    The Get Covered Canada Team</p>
                                    `
                                };

                                var returnRes = {
                                    mail: mailReq,
                                    message: "Data added successfully"
                                }

                                return callBack(null, returnRes);
                            }
                        }
                    );
                }

            }
        );

    },
    getsById: (id, callBack) => {
        pool.query(
            `select * from user_master where id = ?`,
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
    blockById: (data, callBack) => {
        const action = data.action;
        const id = data.id;

        var block = 0;
        var message = "User is UnBlocked";

        if (action == 1) {
            block = 1;
            message = "User is Blocked";
        }
        pool.query(
            `UPDATE login_master SET blocked=? WHERE  id = ?`,
            [
                block,
                id
            ],
            (err, results) => {
                if (err) {
                    return callBack(err);
                }
                else {
                    return callBack(null, message);
                }
            }
        );
    },
    updateOVMICNO: (data, callBack) => {
        const ovmic_no = data.ovmic_no;
        const id = data.id;
        const action = 1;


        var block = 0;
        var message = "Data is Updated";

        if (action == 1) {
            block = 1;
            message = "Data is Updated";
        }
        pool.query(
            `UPDATE login_master SET ovmic_no=? , dealership = ?, commissionPerc = ?, isRelationshipManager = ? , user_type = ? WHERE  id = ?`,
            [
                ovmic_no,
                data.dealership,
                data.commissionPerc,
                data.isRelationshipManager,
                data.userRole,
                id
            ],
            (err, results) => {
                if (err) {
                    return callBack(err);
                }
                else {
                    return callBack(null, message);
                }
            }
        );
    },
    //getting the products data
    gets: (data, callBack) => {
        // const Query = data.dealership == 0
        //     ? `SELECT login_master.id, login_master.ovmic_no,login_master.firstname,login_master.lastname, login_master.user_email, login_master.user_type,login_master.status, login_master.date, login_master.blocked as userblocked, dealership.blocked as dealershipblocked FROM login_master INNER JOIN dealership ON dealership.id = login_master.dealership`  // Query for admin, no user condition
        //     : `SELECT login_master.id, login_master.ovmic_no,login_master.firstname,login_master.lastname, login_master.user_email, login_master.user_type,login_master.status, login_master.date, login_master.blocked as userblocked, dealership.blocked as dealershipblocked FROM login_master INNER JOIN dealership ON dealership.id = login_master.dealership WHERE login_master.dealership = ?`;

        // const Query = data.dealership == 0
        //     ? `SELECT login_master.id, login_master.ovmic_no,login_master.firstname,login_master.lastname, login_master.user_email, login_master.user_type,login_master.status, login_master.date, login_master.blocked as userblocked, dealership.blocked as dealershipblocked,dealership.tradeName,login_master.dealership FROM login_master INNER JOIN dealership ON dealership.id = login_master.dealership`  // Query for admin, no user condition
        //     : `SELECT login_master.id, login_master.ovmic_no,login_master.firstname,login_master.lastname, login_master.user_email, login_master.user_type,login_master.status, login_master.date, login_master.blocked as userblocked, dealership.blocked as dealershipblocked,dealership.tradeName,login_master.dealership FROM login_master INNER JOIN dealership ON dealership.id = login_master.dealership WHERE login_master.dealership = ?`;

        const Query = data.dealership == 0
            ? `SELECT 
    login_master.id AS id,
    login_master.ovmic_no,
    login_master.firstname,
    login_master.lastname,
    login_master.user_email,
    login_master.user_type,
    login_master.status,
    login_master.commissionPerc,
    login_master.date,
    login_master.blocked AS userblocked,
    login_master.isRelationshipManager,
    dealership.blocked AS dealershipblocked,
    dealership.tradeName,
    dealership.id AS dealership
FROM 
    login_master
INNER JOIN 
    dealership ON dealership.id = login_master.dealership`  // Query for admin, no user condition
            : data.dealership && data.user_email ? `SELECT 
    login_master.id AS id,
    login_master.ovmic_no,
    login_master.firstname,
    login_master.lastname,
    login_master.user_email,
    login_master.user_password,
    login_master.user_type,
    login_master.status,
    login_master.commissionPerc,
    login_master.date,
    login_master.blocked AS userblocked,
    dealership.blocked AS dealershipblocked,
    login_master.isRelationshipManager,
    dealership.tradeName,
    dealership.id AS dealership
FROM 
    login_master
INNER JOIN 
    dealership ON dealership.accountUserEmail = login_master.user_email WHERE login_master.user_email = ?` : `SELECT 
    login_master.id AS id,
    login_master.ovmic_no,
    login_master.firstname,
    login_master.lastname,
    login_master.user_email,
    login_master.user_type,
    login_master.status,
    login_master.commissionPerc,
    login_master.date,
    login_master.blocked AS userblocked,
    dealership.blocked AS dealershipblocked,
    login_master.isRelationshipManager,
    dealership.tradeName,
    dealership.id AS dealership
FROM 
    login_master
INNER JOIN 
    dealership ON dealership.id = login_master.dealership WHERE login_master.dealership = ?`;



        const params = data.dealership == 0 ? [] : data.dealership && data.user_email ? [data.user_email] : [data.dealership];

        pool.query(
            Query,
            params,
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
            `select * from user_master where  id = ?`,
            [

                id
            ],
            (err, results) => {
                if (results == "") {
                    pool.query(
                        `UPDATE student SET student_name=?,student_email=?,student_contact=?,student_image=?,balance=?,student_status=? WHERE  id = ?`,
                        [
                            data.student_name,
                            data.student_email,
                            data.student_contact,
                            data.student_image,
                            data.balance,
                            data.student_status,
                            id
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
    deletesById: (id, callBack) => {
        pool.query(`delete from login_master where id=?`,
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
    getRelationshipManagerUser: (callBack) => {
        pool.query(`SELECT id, firstname, lastname FROM login_master where user_type = 'Relationship Manager' order by id DESC;`,
            [

            ],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    return callBack("Data not found");
                } else {
                    message = "Data deleted successfully";
                    return callBack(null, results);
                }
            }
        );
    },
    getRelationshipManagerUserPerc: (callBack) => {
        pool.query(`SELECT 
    d.*, 
    lm.firstname, 
    lm.lastname,
    lm.commissionPerc
FROM 
    dealership d
JOIN 
    login_master lm 
    ON d.relationshipManager = lm.id
WHERE 
    lm.commissionPerc > 0   
ORDER BY 
    d.id DESC;`,
            [

            ],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    return callBack("Data not found");
                } else {
                    message = "Data deleted successfully";
                    return callBack(null, results);
                }
            }
        );
    },
    updateDealershipUser: (data, callBack) => {
        pool.query(
            "UPDATE dealership SET accountUserEmail = ?, firstname = ?, lastname = ? WHERE id = ?",
            [data.dealershipEmail,data.dealershipFirstname,data.dealershipLastname, data.dealershipId],
            (err, results) => {
                if (err) return callBack(err);

                // Sync with user table
                pool.query(
                    "UPDATE login_master SET user_email = ?, user_password = ?,firstname = ?, lastname = ?  WHERE user_email = ?",
                    [data.dealershipEmail, data.dealershipPassword, data.dealershipFirstname,data.dealershipLastname, data.dealershipEmailOld], // Use old email to find correct user
                    (err2) => {
                        if (err2) return callBack(err2);

                        var mailReq = {
                            to: data.dealershipEmail,
                            subject: "Get Covered Canada Login Credentials",
                            html: `
                                    <p>Dear ${data.dealershipFirstname} ${data.dealershipLastname},</p>
                                    
                                    <p>Please find your Get Covered Canada credentials below:</p>
                                    
                                    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                                        <tr>
                                            <td><b>Portal URL</b></td>
                                            <td><a href="https://dealers.getcoveredcanada.ca/">https://dealers.getcoveredcanada.ca/</a></td>
                                        </tr>
                                        <tr>
                                            <td><b>Username</b></td>
                                            <td>${data.dealershipEmail}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Password</b></td>
                                            <td>${data.dealershipPassword}</td>
                                        </tr>
                                    </table>
                                    
                                    <p>You can log in using the credentials above to access the portal. Once logged in, you’ll have access to tools that simplify warranty registrations.</p>
                                    
                                    <p><b>Getting Started:</b></p>
                                    <ol>
                                        <li>Visit the Portal URL provided above.</li>
                                        <li>Log in using your unique username and password.</li>
                                        <li>Begin exploring the portal and registering warranties.</li>
                                    </ol>
                                    
                                    <p>Should you encounter any issues or have questions while getting started, our support team is here to assist. Feel free to reach out to us at <a href="mailto:support@getcoveredcanada.com">support@getcoveredcanada.com</a> or call 1-800-268-3284.</p>
                                    
                                    <p>Best regards,<br>
                                    The Get Covered Canada Team</p>
                                    `
                        };

                        var returnRes = {
                            mail: mailReq,
                            message: "Dealership and User updated successfully"
                        }
                        return callBack(null, returnRes);
                    }
                );
            }
        );
    }
};




