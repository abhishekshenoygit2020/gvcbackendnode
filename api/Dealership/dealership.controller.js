const { creates, gets, getsById, getUserWarrantyCommissionDetails,getDealershipUsers,getRestoreWarranty,warrantyRestore, saveUserNote, deleteUserNote, getUserNote, getUserWarrantyCommissionDetailsSR, getUserWarrantyGiftDetails, getDealershipDateTotalCost, getDateUserWarrantyCommissionDetailsRM, getDateUserWarrantyCommissionDetailsSR, deletesByIdproduct, deletesByIdcategory, deletesByIdsubcategory, getLogDetails, updateSalesrep, deletesByIdwarrantyprotection, getSoldDataCount, updates, blockDealership, getsByEmail, createWarranty, getPendingWarranty, updateWarranty, getClosedWarranty, deletesByIdWarranty, gettableDataCount, getProductData, getPendingWarrantyGraph, getClosedWonGraph, getDealershipTotalCost, getDealershipMonthTotalCost, getUserWarrantyCommissionDetailsRM } = require("./dealership.services");
var nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");
const fs = require('fs');
const mime = require('mime');
const path = require('path');

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
                // return res.status(200).json({
                //     sucsess: 1,
                //     data: results
                // });


                mail(results.mail, res);

            }
        });
    },
    createWarranty: (req, res) => {
        const body = req.body;
        createWarranty(body, (err, results) => {
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
    updateWarranty: (req, res) => {
        const body = req.body;
        updateWarranty(body, (err, results) => {
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
    getPendingWarranty: (req, res) => {
        const data = req.body;
        getPendingWarranty(data, (err, results) => {
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
    getClosedWarranty: (req, res) => {
        const data = req.body;
        getClosedWarranty(data, (err, results) => {
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
    getRestoreWarranty: (req, res) => {
        const data = req.body;
        getRestoreWarranty(data, (err, results) => {
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
    gettableDataCount: (req, res) => {
        const data = req.body;
        gettableDataCount(data, (err, results) => {
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
    getProductData: (req, res) => {
        const data = req.body;
        getProductData(data, (err, results) => {
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
    getLogDetails: (req, res) => {
        const data = req.body;
        getLogDetails(data, (err, results) => {
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
    getUserWarrantyCommissionDetails: (req, res) => {
        const data = req.body;
        getUserWarrantyCommissionDetails(data, (err, results) => {
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
    getPendingWarrantyGraph: (req, res) => {
        const data = req.body;
        getPendingWarrantyGraph(data, (err, results) => {
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
    getClosedWonGraph: (req, res) => {
        const data = req.body;
        getClosedWonGraph(data, (err, results) => {
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
    getSoldDataCount: (req, res) => {
        const data = req.body;
        getSoldDataCount(data, (err, results) => {
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
    getByEmail: (req, res) => {
        const data = req.body;
        getsByEmail(data, (err, results) => {
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
    updateSalesrep: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        updateSalesrep(body, id, (err, results) => {
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
    blockDealership: (req, res) => {
        const body = req.body;
        blockDealership(body, (err, results) => {
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
    deletesByIdWarranty: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        deletesByIdWarranty(id, data, (err, results) => {
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
    deletesByIdcategory: (req, res) => {
        const id = req.params.id;
        deletesByIdcategory(id, (err, results) => {
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
    deletesByIdsubcategory: (req, res) => {
        const id = req.params.id;
        deletesByIdsubcategory(id, (err, results) => {
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
    deletesByIdwarrantyprotection: (req, res) => {
        const id = req.params.id;
        deletesByIdwarrantyprotection(id, (err, results) => {
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
    deletesByIdproduct: (req, res) => {
        const id = req.params.id;
        deletesByIdproduct(id, (err, results) => {
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
    getDealershipTotalCost: (req, res) => {
        const data = req.body;
        getDealershipTotalCost(data,(err, results) => {
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
    getDealershipUsers: (req, res) => {
        const data = req.body;
        getDealershipUsers(data,(err, results) => {
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
    getDealershipDateTotalCost: (req, res) => {
        const data = req.body;
        getDealershipDateTotalCost(data, (err, results) => {
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
    getDealershipMonthTotalCost: (req, res) => {
        // const id = req.params.id;
        getDealershipMonthTotalCost((err, results) => {
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
    getUserWarrantyCommissionDetailsRM: (req, res) => {
        // const id = req.params.id;
        getUserWarrantyCommissionDetailsRM((err, results) => {
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
    getUserWarrantyCommissionDetailsSR: (req, res) => {
        const data = req.body;
        getUserWarrantyCommissionDetailsSR(data, (err, results) => {
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
    getDateUserWarrantyCommissionDetailsSR: (req, res) => {
        const data = req.body;
        getDateUserWarrantyCommissionDetailsSR(data, (err, results) => {
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
    getDateUserWarrantyCommissionDetailsRM: (req, res) => {
        const data = req.body;
        getDateUserWarrantyCommissionDetailsRM(data, (err, results) => {
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
    getUserWarrantyGiftDetails: (req, res) => {
        const data = req.body;
        getUserWarrantyGiftDetails(data, (err, results) => {
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

    saveUserNote: async (req, res) => {
        const { warrantyId, notes, base64Files = [], type, action, id, existingFiles = [] } = req.body;

        if (type === "add" && (!notes || base64Files.length === 0)) {
            return res.status(400).json({ success: 0, message: "Missing fields or no files provided" });
        }

        const folder = './Uploads';
        const publicPath = '/Uploads';
        const savedFiles = Array.isArray(existingFiles) ? [...existingFiles] : [];

        try {
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }

            for (const base64Str of base64Files) {
                if (!base64Str) continue;

                const matches = base64Str.match(/^data:(.+);base64,(.+)$/);
                if (!matches || matches.length !== 3) {
                    console.error("Invalid base64 format:", base64Str);
                    continue; // Skip invalid file
                }

                const mimeType = matches[1];
                const extension = mimeType.split('/')[1].split(';')[0]; // handle 'image/png;base64,...'
                const base64Data = matches[2];

                const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${extension}`;
                const filePath = path.join(folder, filename);

                fs.writeFileSync(filePath, base64Data, 'base64');
                savedFiles.push(`${publicPath}/${filename}`);
            }

            saveUserNote(warrantyId, notes, savedFiles, id, action, (err, result) => {
                if (err) {
                    console.error("DB Error:", err);
                    return res.status(500).json({ success: 0, error: "DB Save Failed" });
                }

                return res.status(200).json({ success: 1, message: "Note saved", data: result });
            });
        } catch (err) {
            console.error("Upload Error:", err);
            return res.status(500).json({ success: 0, error: "File processing error" });
        }
    },

    getUserNote: (req, res) => {
        const data = req.body;
        getUserNote(data, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    data: err
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },

    deleteUserNote: (req, res) => {
        const data = req.body;
        deleteUserNote(data, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    data: err
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    warrantyRestore: (req, res) => {
        const data = req.body;
        warrantyRestore(data, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    data: err
                });
            } else {
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
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

