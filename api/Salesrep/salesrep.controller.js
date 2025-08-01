const { getByEmail } = require('../personalInformation/p_Inform.controller');
const SalesrepServices = require('./salesrep.services');
const nodemailer = require('nodemailer');

module.exports = {
    create: (req, res) => {
        const body = req.body;
        SalesrepServices.creates(body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    data: err
                });
            } else {
                // return res.status(200).json({
                //     sucsess: 1,
                //     data: results
                // });

               
                mail(result.mail,res);
                return res.status(200).json({
                    success: 1,
                    data: result
                })
                
            }
        });
    },
    getById: (req, res) => {
        const id = req.params.id; // ✅ properly extract `id` from the URL
        SalesrepServices.getsById(id, (err, result) => {
            if (err) {
                console.error('Error in getByEmail controller:', err);
                return res.status(500).json({
                    success: 0,
                    error: err.message || err  // handles both string or Error object
                });
            }
    
            return res.status(200).json({
                success: 1,
                status: 200,
                data: result
            });
        });
    },
    getByEmail: (req, res) => {
        SalesrepServices.getsByEmail(req.body, (err, result) => {
            if (err) {
                console.error('Error in getByEmail controller:', err);
                return res.status(500).json({
                    success: 0,
                    error: err.message || err  // handles both string or Error object
                });
            }
    
            return res.status(200).json({
                success: 1,
                status: 200,
                data: result
            });
        });
    },
    get: (req, res) => {
        const body = req.body;
        SalesrepServices.gets(body,(err, result) => {
            if (err) {
                console.error('Error in getting controller:', err);
                return res.status(500).json({
                    success: 0,
                    error: err.message || err  // handles both string or Error object
                });
            }
    
            return res.status(200).json({
                success: 1,
                status: 200,
                data: result
            });
        });
    },
    create: (req, res) => {
        const body = req.body;
        SalesrepServices.creates(body, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    data: err
                });
            } else {
                // return res.status(200).json({
                //     sucsess: 1,
                //     data: results
                // });

               
                mail(result.mail,res);
                return res.status(200).json({
                    success: 1,
                    data: result
                })
                
            }
        });
    },
    update: (req, res) => {
        const body = req.body;
        const id = req.params.id;
      
        SalesrepServices.updates(body, id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    data: err
                });
            } else {
                // return res.status(200).json({
                //     sucsess: 1,
                //     data: results
                // });

               
                // mail(result.mail,res);
                return res.status(200).json({
                    success: 1,
                    status: 200,
                    data: result
                });
                
            }
        });
    },


};



// make mail() return a Promise properly
const mail = (mailReq) => {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAILID,
                pass: process.env.PASSWORD
            },
            logger: true,
            debug: true
        });

        transporter.sendMail(mailReq, function (error, info) {
            if (error) {
                console.error('Error sending mail:', error);
                return reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                return resolve({
                    subject: mailReq.subject,
                    message: "Email sent successfully"
                });
            }
        });
    });
};
