const { fetchuser, creates, changepwd, gets, getsById, updates, deletesById, forgotpwd,forgotpwdUpdate } = require("./auth.services");
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const SMTPConnection = require("nodemailer/lib/smtp-connection");

module.exports = {
    login: (req, res) => {
        const body = req.body;

        fetchuser(body, (err, results) => {
            if (err) {
                // console.log(err);
                return res.status(500).json({
                    success: 0,
                    status: 500,
                    error: err
                });
            }
            else {
                return res.status(200).json({
                    success: 1,
                    data: {
                        token: results.token,
                        user_type: results.user_type,
                        user_email: results.user_email,
                        user_name: results.user_name,
                        initialLogin: results.initialLogin,
                        dealership: results.dealership,
                        ovmic_no:results.ovmic_no,
                        accovmicno:results.accovmicno,
                        username:results.username,
                        salesrep:results.salesrep,
                        commission:results.commission
                    },
                    status: 200
                });
            }
        });
    },

    create: (req, res) => {
        const bodyData = req.body;
        creates(bodyData, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    data: err
                });
            } else {
                return res.status(200).json({
                    sucsess: 1,
                    data: results
                });
            }
        });
    },
    changePassword: (req, res) => {
        const bodyData = req.body;

        changepwd(bodyData, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    status: 500,
                    error: err
                });
            } else if (results) {
                mail(results.userEmail, res);
                mail(results.adminEmail, res);
                // return res.status(200).json( {
                //     success:1,
                //     status:200,
                //     message:results
                // });
            }
        });


    },
    forgotpwdUpdate: (req, res) => {
        const bodyData = req.body;

        forgotpwdUpdate(bodyData, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    status: 500,
                    error: err
                });
            } else if (results) {
                // mailForgot(results, res);               
                return res.status(200).json( {
                    success:1,
                    status:200,
                    message:results
                });
            }
        });


    },
    forgotPassword: (req, res) => {
        const bodyData = req.body;

        forgotpwd(bodyData, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    status: 500,
                    error: err
                });
            } else if (results) {
                mailForgot(results, res);               
                // return res.status(200).json( {
                //     success:1,
                //     status:200,
                //     message:results
                // });
            }
        });


    },
    getById: (req, res) => {
        const id = req.params.id;
        getsById(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    data: err
                });
            } else {
                return res.status(200).json({
                    sucsess: 1,
                    data: results
                });
            }
        });
    },
    get: (req, res) => {
        gets((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    data: err
                });
            } else {
                return res.status(200).json({
                    sucsess: 1,
                    data: results
                });
            }
        });
    },
    update: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        updates(body, id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            } else {
                return res.status(200).json({
                    sucsess: 1,
                    message: results
                });
            }
        });
    },
    deleteById: (req, res) => {
        const id = req.params.id;
        deletesById(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    error: err,
                    status: 500
                });
            } else {
                return res.status(200).json({
                    sucsess: 1,
                    data: results
                });
            }
        });
    },
    verifyToken: (req, res, next) => {
        //get the auth header value
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(":");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            jwt.verify(req.token, 'secretkey', (err, authData) => {
                if (err) {
                    res.status(403).json({
                        success: 0,
                        status: 500,
                        error: err
                    });
                }
                else {
                    req.authData = authData;
                    next();
                    // res.status(403).json({
                    //     authData,
                    //     status:200
                    // });
                }
            });



        } else {
            res.status(403).json({
                error: "unauthenticated",
                status: 403
            });
        }
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
                data: "Password Updated"
            });

        }
    });

};


const mailForgot = (mailReq, res) => {

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

    transporter.sendMail(mailReq.mail, function (error, info) {
        if (error) {
            console.log(error);
            //mailReq.err = error;            
        } else {

            console.log('Email sent: ' + info.response);
            return res.json({
                success: 1,
                // subject: mailReq.subject,
                message: mailReq.message
            });

        }
    });

};




