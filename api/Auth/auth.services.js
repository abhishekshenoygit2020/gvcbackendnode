const pool = require("../../config/dbconfig");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');

const SMTPConnection = require("nodemailer/lib/smtp-connection");


module.exports = {

    fetchuser: (data, callBack) => {
        pool.query(
            `select id,firstname,lastname,user_email,user_password,user_type,initialLogin,dealership,blocked, ovmic_no, salesrep from login_master where user_email = ?`,
            [
                data.user_email,
            ],
            (error, results, fields) => {
                const queryData = results;
                if (error) {
                    return callBack(error);
                } else if (results == "") {
                    err = "Email ID is not registered";
                    return callBack(err);
                }
                else {

                    if (data.user_password != queryData[0].user_password) {
                        err = "Login Failed, Password is incorrect";
                        return callBack(err);
                    } else if (queryData[0].blocked == 1) {
                        err = "Blocked! Please Contact Addministrator";
                        return callBack(err);
                    } else {
                        const user = {
                            id: queryData[0].id,
                            user_name: queryData[0].user_name,
                            user_email: queryData[0].user_email

                        };
                        const token = jwt.sign({ user }, 'secretkey', { expiresIn: 60 * 60 });

                        var accovmicno = "";

                        pool.query(
                            `select acc_ovmic_no, commission from dealership where id = ?`,
                            [queryData[0].dealership],
                            (err, resultnew, fields) => {
                                if (err) {
                                    // return callBack(err);
                                }
                                else if (resultnew == "") {
                                    err = "Data not found";
                                    accovmicno = "0000";

                                    var omvno = queryData[0].ovmic_no == null ? "" : queryData[0].ovmic_no;
                                    var firstname = queryData[0].firstname == null ? "" : queryData[0].firstname;
                                    var lastname = queryData[0].lastname == null ? "" : queryData[0].lastname;
                                    const message = {
                                        token: token,
                                        user_type: queryData[0].user_type,
                                        user_email: queryData[0].user_email,
                                        user_name: queryData[0].user_name,
                                        initialLogin: queryData[0].initialLogin,
                                        dealership: queryData[0].dealership,
                                        ovmic_no: omvno,
                                        accovmicno: accovmicno,
                                        username: firstname + " " + lastname,
                                        salesrep: queryData[0].id,
                                        commission: 0,
                                    };
                                    return callBack(null, message);

                                    // return callBack(err)
                                } else {
                                    if (resultnew) {
                                        accovmicno = resultnew;

                                        var omvno = queryData[0].ovmic_no == null ? "" : queryData[0].ovmic_no;
                                        var firstname = queryData[0].firstname == null ? "" : queryData[0].firstname;
                                        var lastname = queryData[0].lastname == null ? "" : queryData[0].lastname;
                                        const message = {
                                            token: token,
                                            user_type: queryData[0].user_type,
                                            user_email: queryData[0].user_email,
                                            user_name: queryData[0].user_name,
                                            initialLogin: queryData[0].initialLogin,
                                            dealership: queryData[0].dealership,
                                            ovmic_no: omvno,
                                            accovmicno: accovmicno[0].acc_ovmic_no,
                                            username: firstname + " " + lastname,
                                            salesrep: queryData[0].id,
                                            commission: accovmicno[0].commission
                                        };
                                        return callBack(null, message);

                                    }
                                    // return callBack(null, resultnew);
                                }

                            }
                        );




                    }
                }
            }
        );

    },

    create: (data, callBack) => {
        pool.query(
            `select * from login_master where user_email = ?`,
            [data.user_email],
            (err, results) => {
                var date = new Date();
                var password = "Admin123";
                if (results == "") {
                    pool.query(
                        `INSERT INTO login_master(firstname,lastname,user_email,user_type) VALUES (?,?)`,
                        [
                            data.firstname,
                            data.lastname,
                            data.user_email,
                            data.user_type,
                            password,
                            date
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
    changepwd: (bodyData, callBack) => {

        var user_email = bodyData.email;
        var bOldPassword = bodyData.oldPassword;
        var newPassword = bodyData.newPassword;
        var initialLogin = bodyData.initialLogin;
        var initialLogin = bodyData.initialLogin;
        var ovmic_no = bodyData.ovmic_no;

        pool.query(
            `select user_password from login_master where user_email = ?`,
            [user_email],
            (err, results) => {
                var queryData = results;
                if (err) {
                    return callBack(err);
                } else if (queryData.length == 0) {
                    return callBack("Unable to update your passord..!", null);
                } else if (bOldPassword != queryData[0].user_password) {
                    return callBack("Invalid current password..!", null);
                } else {
                    pool.query(
                        `update login_master set user_password = ? , initialLogin = ?, ovmic_no = ? where user_email = ? `,
                        [newPassword, initialLogin, ovmic_no, user_email],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            } else if (results) {
                                var userEmail = {
                                    to: user_email,
                                    subject: "GVC Password Updations",
                                    text: "Password has been updated"
                                };

                                var adminEmail = {
                                    to: "Abhishekshenoy97@gmail.com",
                                    subject: "GVC Password Updations From User",
                                    text: user_email + " has been updated his password"
                                };

                                var returnRes = {
                                    userEmail: userEmail,
                                    adminEmail: adminEmail
                                }
                                return callBack(null, returnRes);
                                // return callBack(null, "Password updated successfully..!");
                            } else {
                                return callBack("Unable to update your pasword..!")
                            }
                        }
                    );
                }
            }
        );

    },

    forgotpwd: (bodyData, callBack) => {

        var user_email = bodyData.email;
        var userType = bodyData.userType;
        var message = "";

        if (userType == "admin") {
            message = "Please Check The Email For Forgot Password Request";
        } else {
            message = "Password Reset Link Email Sent For the user";
        }

        pool.query(
            `select * from login_master where user_email = ?`,
            [user_email],
            (err, results) => {
                var queryData = results;
                if (err) {
                    return callBack(err);
                } else if (queryData.length == 0) {
                    return callBack("EmailId Not Found In Database", null);
                } else {
                    var otpNo = "";
                    var characters = '0123456789'; // Letters only
                    var length = 6;
                    for (var i = 0; i < length; i++) {
                        otpNo += characters.charAt(Math.floor(Math.random() * characters.length));
                    }

                    pool.query(
                        `UPDATE login_master  SET otpno=? WHERE  user_email = ?`,
                        [
                            otpNo,
                            user_email
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
                            else {

                                var portalURL = `https://dealers.getcoveredcanada.ca/ForgotPassword/${user_email}`;
                                var mailReq = {
                                    to: user_email,
                                    subject: "Get Covered Canada Forgot Password Request",
                                    html: `
                                    <p>Dear ${queryData[0].firstname} ${queryData[0].lastname},</p>
                                    <p>Your OTP No is  ${otpNo},</p>
                                    
                                    <p>Please Click On the below Portal URL<br>
                                    <p><a href="${portalURL}">${portalURL}</a><br>
                                    
                                    <p>Best regards,<br>
                                    The Get Covered Canada Team</p>
                                    `
                                };

                                var adminEmail = {
                                    to: "Abhishekshenoy97@gmail.com",
                                    subject: "GVC Password Updations From User",
                                    text: user_email + " has been updated his password"
                                };

                                var returnRes = {
                                    mail: mailReq,
                                    message: message
                                }
                                return callBack(null, returnRes);
                            }
                        }
                    );





                }
            }
        );

    },

    forgotpwdUpdate: (bodyData, callBack) => {

        var user_email = bodyData.email;
        var newPassword = bodyData.newPassword;
        var otp = bodyData.otp;
        var type = bodyData.type;


        if (type == "otpCheck") {
            pool.query(
                `select * from login_master where user_email = ?`,
                [user_email],
                (err, results) => {
                    var queryData = results;
                    if (err) {
                        return callBack(err);
                    } else if (queryData.length == 0) {
                        return callBack("EmailId Not Found In Database", null);
                    } else {
                        var results = queryData[0].otpno;
                        if (results == otp) {
                            return callBack(null, "Please Update Your New Password");
                        } else {
                            return callBack("Please Enter Valid Otp", null);
                        }
                    }
                });
        } else {
            pool.query(
                `select * from login_master where user_email = ?`,
                [user_email],
                (err, results) => {
                    var queryData = results;
                    if (err) {
                        return callBack(err);
                    } else if (queryData.length == 0) {
                        return callBack("EmailId Not Found In Database", null);
                    } else {
                        var otpNo = "";
                        var characters = '0123456789'; // Letters only
                        var length = 6;
                        for (var i = 0; i < length; i++) {
                            otpNo += characters.charAt(Math.floor(Math.random() * characters.length));
                        }

                        pool.query(
                            `UPDATE login_master  SET user_password=? WHERE  user_email = ?`,
                            [
                                newPassword,
                                user_email
                            ],
                            (err, results) => {
                                if (err) {
                                    return callBack(err);
                                }
                                else {

                                    var portalURL = `https://dealers.getcoveredcanada.ca/ForgotPassword/${user_email}`;
                                    var mailReq = {
                                        to: user_email,
                                        subject: "Get Covered Canada Forgot Password Request",
                                        html: `
                                        <p>Dear ${queryData[0].firstname} ${queryData[0].lastname},</p>
                                        
                                        <p>Please Click On the below Portal URL<br>
                                         <p><a href="${portalURL}">${portalURL}</a><br>
                                        
                                        <p>Best regards,<br>
                                        The Get Covered Canada Team</p>
                                        `
                                    };

                                    var returnRes = {
                                        mail: mailReq,
                                        message: "Please Check The Email For Forgot Password Request"
                                    }
                                    return callBack(null, "Password Updated Successfully, Please Login");
                                }
                            }
                        );
                    }
                }
            );
        }

    },

    getsById: (id, callBack) => {
        pool.query(
            `select * from login_master where id = ?`,
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
            `select * from login_master`,
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
            `select * from login_master where  id = ?`,
            [

                id
            ],
            (err, results) => {
                if (results == "") {
                    pool.query(
                        `UPDATE employee SET first_name=?,last_name=?,email=?,contact=?,address=?,designation=?,date=?,status=? WHERE  id = ?`,
                        [
                            data.first_name,
                            data.last_name,
                            data.email,
                            data.contact,
                            data.address,
                            data.designation,
                            data.date,
                            data.status,
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
};

const mail = (mailReq, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        PORT: 465,
        auth: {
            user: process.env.EMAILID,
            pass: process.env.PASSWORD
        },
        logger: true,
        debug: true
    });

    var infos = "information";
    var err = "error";

    transporter.sendMail(mailReq, function (error, info) {
        if (error) {
            console.log(error);
            //mailReq.err = error;            
        } else {

            console.log('Email sent: ' + info.response);
            return res.json({
                success: 1,
                subject: mailReq.subject,
                data: "message sent"
            });

        }
    });

};

