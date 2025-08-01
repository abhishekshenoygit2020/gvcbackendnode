const { creates, gets, getsById, updates, deletesById, createUser,blockById, updateOVMICNO,getRelationshipManagerUser,getRelationshipManagerUserPerc} = require("./user.services");
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");

module.exports = {
    create: (req, res) => {
        const body = req.body;
        creates(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    data: err
                });
            } else {
                return res.status(200).json({
                    sucsess: 1,
                    message: results
                });
            }
        });
    },
    blockById: (req, res) => {
        const body = req.body;
        blockById(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    data: err
                });
            } else {
                return res.status(200).json({
                    sucsess: 1,
                    message: results
                });
            }
        });
    },
    updateOVMICNO: (req, res) => {
        const body = req.body;
        updateOVMICNO(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    data: err
                });
            } else {
                return res.status(200).json({
                    sucsess: 1,
                    message: results
                });
            }
        });
    },
    createUser: (req, res) => {
        const body = req.body;
        createUser(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    data: err
                });
            } else {


                mail(results.mail,res);
                // return res.status(200).json({
                //     success: 1,
                //     data: results
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
        const body = req.body;
        gets(body,(err, results) => {
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
    getRelationshipManagerUser: (req, res) => {
        // const id = req.params.id;
        getRelationshipManagerUser((err, results) => {
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
    getRelationshipManagerUserPerc: (req, res) => {
        // const id = req.params.id;
        getRelationshipManagerUserPerc((err, results) => {
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
    }
};


const mail = (mailReq,res) => {

    var transporter = nodemailer.createTransport({
            service: 'gmail',       
            PORT:465,
            auth: {
                user: process.env.EMAILID,
                pass: process.env.PASSWORD
            },
            logger:true,
            debug:true
    });

    var infos = "information";
    var err = "error";

    transporter.sendMail(mailReq, function(error, info){
        if (error) {
            console.log(error);
            //mailReq.err = error;            
        } else {

        console.log('Email sent: ' + info.response);        
            return res.json({
                success:1,
                subject:mailReq.subject,
                data:"message sent"
            });             

        }
    }); 
    
};


