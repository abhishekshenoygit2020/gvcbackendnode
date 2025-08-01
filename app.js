require("dotenv").config(); //configuring database
var express = require('express');
var cors = require('cors');
const path = require("path")
var bodyParser = require("body-parser");
var app = express();
const baseRoute = require("./api/Routes");
const { response } = require("express");
const cron = require('node-cron');
const router = require("express").Router();
//new code
const pool = require("./config/dbconfig");
var nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use('/Images', express.static('Images')); first method
app.use('/Images', express.static(path.join(__dirname, 'Images')));
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(baseRoute);

app.listen(process.env.APP_PORT, () => {
    console.log("server is running......", process.env.APP_PORT);
});

cron.schedule('* * * * *', () => {
    console.log('Running scheduled task every minute');

//     pool.query(`SELECT 
//     DATE_FORMAT(CurrentDate, '%Y-%m') AS Month,
//     dealership.id AS dealership,
//      dealership.tradeName,
//     SUM(productCost) AS totalCost
//     FROM 
//     warranty
// INNER JOIN 
//     dealership ON dealership.id = warranty.dealership
// WHERE 
//     warranty.Status = 'Closed Won'
// GROUP BY 
//     DATE_FORMAT(CurrentDate, '%Y-%m'),
//     Dealership  
// ORDER BY Month ASC`,
//         [
//             // id
//         ],
//         (err, results) => {
//             if (err) {
//                 return res.status(500).json({
//                     sucsess: 1,
//                     data: "Something Went Wrong"
//                 });

//             } else if (results.length == 0) {
//                 return res.status(200).json({
//                     sucsess: 1,
//                     data: "Data Not Found"
//                 });

//             } else {

//                 const tableRows = results.map(item => `
//     <tr>
//         <td>${item.Month || '-'}</td>
//         <td>${item.tradeName}</td>
//         <td>${item.totalCost}</td>
//     </tr>
// `).join('');

//                 const mailReq = {
//                     to: "abhishekshenoy97@gmail.com",
//                     subject: "Get Covered Canada Login Credentials!",
//                     html: `
//         <p>Dear abhishek,</p>

//         <p>Welcome to Get Covered Canada!<br></p>
        

//         <p><b>Warranty Summary Report:</b></p>
//         <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
//             <thead>
//                 <tr>
//                     <th>Month</th>
//                     <th>Dealership</th>
//                     <th>Total Cost</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 ${tableRows}
//             </tbody>
//         </table>

//         <p>You can log in using the credentials above to access the portal. Once logged in, you’ll have access to tools that simplify warranty registrations and enhance your operations.</p>

//         <p><b>Getting Started:</b></p>
//         <ol>
//             <li>Visit the Portal URL provided above.</li>
//             <li>Log in using your unique username and password.</li>
//             <li>Begin exploring the portal and registering warranties.</li>
//         </ol>

//         <p>Should you encounter any issues or have questions while getting started, our support team is here to assist. Feel free to reach out to us at <a href="mailto:support@getcoveredcanada.com">support@getcoveredcanada.com</a> or call 1-800-268-3284.</p>

//         <p>Thank you for choosing Get Covered Canada. We look forward to supporting your dealership and ensuring a seamless experience.</p>

//         <p>Best regards,<br>
//         The Get Covered Canada Team</p>
//     `
//                 };

//                 mail(mailReq);



//             }
//         }
//     );
});

app.post("/testData", (req, res) => {
    const { name, email, productCost, status } = req.body;

    // Insert directly into the database
    pool.query(`SELECT 
    DATE_FORMAT(CurrentDate, '%Y-%m') AS Month,
    dealership.id AS dealership,
     dealership.tradeName,
    SUM(productCost) AS totalCost
    FROM 
    warranty
INNER JOIN 
    dealership ON dealership.id = warranty.dealership
WHERE 
    warranty.Status = 'Closed Won'
GROUP BY 
    DATE_FORMAT(CurrentDate, '%Y-%m'),
    Dealership  
ORDER BY Month ASC`,
        [
            // id
        ],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    sucsess: 1,
                    data: "Something Went Wrong"
                });

            } else if (results.length == 0) {
                return res.status(200).json({
                    sucsess: 1,
                    data: "Data Not Found"
                });

            } else {

                const tableRows = results.map(item => `
    <tr>
        <td>${item.Month || '-'}</td>
        <td>${item.tradeName}</td>
        <td>${item.totalCost}</td>
    </tr>
`).join('');

                const mailReq = {
                    to: "abhishekshenoy7@gmail.com",
                    subject: "Get Covered Canada Login Credentials!",
                    html: `
        <p>Dear abhishek,</p>

        <p>Welcome to Get Covered Canada!<br></p>
        

        <p><b>Warranty Summary Report:</b></p>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Dealership</th>
                    <th>Total Cost</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>

        <p>You can log in using the credentials above to access the portal. Once logged in, you’ll have access to tools that simplify warranty registrations and enhance your operations.</p>

        <p><b>Getting Started:</b></p>
        <ol>
            <li>Visit the Portal URL provided above.</li>
            <li>Log in using your unique username and password.</li>
            <li>Begin exploring the portal and registering warranties.</li>
        </ol>

        <p>Should you encounter any issues or have questions while getting started, our support team is here to assist. Feel free to reach out to us at <a href="mailto:support@getcoveredcanada.com">support@getcoveredcanada.com</a> or call 1-800-268-3284.</p>

        <p>Thank you for choosing Get Covered Canada. We look forward to supporting your dealership and ensuring a seamless experience.</p>

        <p>Best regards,<br>
        The Get Covered Canada Team</p>
    `
                };

                mail(mailReq, res);



            }
        }
    );


    // db.query(insertQuery, [name, email, productCost, status], (err, result) => {
    //     if (err) {
    //         return res.status(500).json({
    //             success: 0,
    //             error: "Database insertion failed",
    //             details: err
    //         });
    //     }

    //     // Optional: Prepare a result object
    //     const insertedData = {
    //         id: result.insertId,
    //         name,
    //         email,
    //         productCost,
    //         status
    //     };

    //     // Call mail function (make sure it sends the response or handle response after this)
    //     mail(email, res);

    //     // If `mail()` doesn't send the response:
    //     // res.status(200).json({
    //     //     success: 1,
    //     //     data: insertedData
    //     // });
    // });
});


// SELECT
//     m.month_num,
//     m.month_name,
//     COALESCE(d.record_count, 0) AS record_count
// FROM (
//     SELECT 1 AS month_num, 'January' AS month_name UNION ALL
//     SELECT 2, 'February' UNION ALL
//     SELECT 3, 'March' UNION ALL
//     SELECT 4, 'April' UNION ALL
//     SELECT 5, 'May' UNION ALL
//     SELECT 6, 'June' UNION ALL
//     SELECT 7, 'July' UNION ALL
//     SELECT 8, 'August' UNION ALL
//     SELECT 9, 'September' UNION ALL
//     SELECT 10, 'October' UNION ALL
//     SELECT 11, 'November' UNION ALL
//     SELECT 12, 'December'
// ) m
// LEFT JOIN (
//     SELECT
//         MONTH(CurrentDate) AS month_num,
//         SUM(warrantySoldFor) AS record_count
//     FROM warranty
//     WHERE YEAR(CurrentDate) = YEAR(CURRENT_DATE())
//     GROUP BY MONTH(CurrentDate)
// ) d ON m.month_num = d.month_num
// ORDER BY m.month_num;


const mail = (mailReq) => {

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
            // return res.json({
            //     success: 1,
            //     subject: mailReq.subject,
            //     data: "message sent"
            // });

        }
    });

};

