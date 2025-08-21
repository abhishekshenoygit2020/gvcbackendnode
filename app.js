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
const PdfPrinter = require("pdfmake");
const { vfs } = require("pdfmake/build/vfs_fonts");
const fs = require("fs");

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

// cron.schedule('* * * * *', () => {
//     // console.log('Running scheduled task every minute');

// //     pool.query(`SELECT 
// //     DATE_FORMAT(CurrentDate, '%Y-%m') AS Month,
// //     dealership.id AS dealership,
// //      dealership.tradeName,
// //     SUM(productCost) AS totalCost
// //     FROM 
// //     warranty
// // INNER JOIN 
// //     dealership ON dealership.id = warranty.dealership
// // WHERE 
// //     warranty.Status = 'Closed Won'
// // GROUP BY 
// //     DATE_FORMAT(CurrentDate, '%Y-%m'),
// //     Dealership  
// // ORDER BY Month ASC`,
// //         [
// //             // id
// //         ],
// //         (err, results) => {
// //             if (err) {
// //                 return res.status(500).json({
// //                     sucsess: 1,
// //                     data: "Something Went Wrong"
// //                 });

// //             } else if (results.length == 0) {
// //                 return res.status(200).json({
// //                     sucsess: 1,
// //                     data: "Data Not Found"
// //                 });

// //             } else {

// //                 const tableRows = results.map(item => `
// //     <tr>
// //         <td>${item.Month || '-'}</td>
// //         <td>${item.tradeName}</td>
// //         <td>${item.totalCost}</td>
// //     </tr>
// // `).join('');

// //                 const mailReq = {
// //                     to: "abhishekshenoy97@gmail.com",
// //                     subject: "Get Covered Canada Login Credentials!",
// //                     html: `
// //         <p>Dear abhishek,</p>

// //         <p>Welcome to Get Covered Canada!<br></p>


// //         <p><b>Warranty Summary Report:</b></p>
// //         <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
// //             <thead>
// //                 <tr>
// //                     <th>Month</th>
// //                     <th>Dealership</th>
// //                     <th>Total Cost</th>
// //                 </tr>
// //             </thead>
// //             <tbody>
// //                 ${tableRows}
// //             </tbody>
// //         </table>

// //         <p>You can log in using the credentials above to access the portal. Once logged in, you’ll have access to tools that simplify warranty registrations and enhance your operations.</p>

// //         <p><b>Getting Started:</b></p>
// //         <ol>
// //             <li>Visit the Portal URL provided above.</li>
// //             <li>Log in using your unique username and password.</li>
// //             <li>Begin exploring the portal and registering warranties.</li>
// //         </ol>

// //         <p>Should you encounter any issues or have questions while getting started, our support team is here to assist. Feel free to reach out to us at <a href="mailto:support@getcoveredcanada.com">support@getcoveredcanada.com</a> or call 1-800-268-3284.</p>

// //         <p>Thank you for choosing Get Covered Canada. We look forward to supporting your dealership and ensuring a seamless experience.</p>

// //         <p>Best regards,<br>
// //         The Get Covered Canada Team</p>
// //     `
// //                 };

// //                 mail(mailReq);



// //             }
// //         }
// //     );
// });


//     try {
//         const { dealership, month, data } = req.body;

//         // Use system fonts (no Roboto, no vfs_fonts)
//         const fonts = {
//             Helvetica: {
//                 normal: "Helvetica",
//                 bold: "Helvetica-Bold",
//                 italics: "Helvetica-Oblique",
//                 bolditalics: "Helvetica-BoldOblique"
//             }
//         };

//         const printer = new PdfPrinter(fonts);

//         const docDefinition = {
//             content: [
//                 { text: `Invoice for ${dealership} - ${month}`, style: "header" },
//                 {
//                     table: {
//                         widths: ["auto", "*", "auto"],
//                         body: [
//                             ["#", "Warranty#", "Cost"],
//                             ...data.map((item, i) => [i + 1, item.id, `$${item.productCost}`]),
//                         ],
//                     },
//                 },
//             ],
//             styles: {
//                 header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
//             },
//             defaultStyle: { font: "Helvetica" }
//         };

//         const pdfDoc = printer.createPdfKitDocument(docDefinition);
//         let chunks = [];
//         pdfDoc.on("data", chunk => chunks.push(chunk));
//         pdfDoc.on("end", async () => {
//             const pdfBuffer = Buffer.concat(chunks);

//             let transporter = nodemailer.createTransport({
//                 host: "smtp.gmail.com",
//                 port: 587,
//                 secure: false,
//                 auth: {
//                     user: process.env.EMAILID,
//                     pass: process.env.PASSWORD
//                 },
//             });

//             await transporter.sendMail({
//                 to: "abhishekshenoy7@gmail.com",
//                 subject: `Invoice - ${dealership} (${month})`,
//                 text: "Please find attached the invoice PDF.",
//                 attachments: [
//                     {
//                         filename: `invoice-${dealership}-${month}.pdf`,
//                         content: pdfBuffer,
//                     },
//                 ],
//             });

//             res.json({ success: true });
//         });

//         pdfDoc.end();

//     } catch (error) {
//         console.error("Error sending invoice email:", error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

app.post("/api/send-invoice", async (req, res) => {
    try {
        const { filename, pdfBase64, accountUserEmail, month, tradeName } = req.body;

        const pdfBuffer = Buffer.from(pdfBase64, "base64");

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAILID,
                pass: process.env.PASSWORD
            },
        });

        var senderEmail = "osama@carfinancedirect.ca";

        await transporter.sendMail({
            // from: `"Get Covered Canada" <${process.env.EMAILID}>`,
            from: `"Get Covered Canada" <${senderEmail}>`,
            to: accountUserEmail,
            subject: `Invoice - ${tradeName} (${month})`,
            text: "Please find attached the invoice PDF.",
            attachments: [
                {
                    filename: `invoice-${tradeName}-${month}.pdf`,
                    content: pdfBuffer,
                },
            ],
        });

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});





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

