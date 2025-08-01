const pool = require("../../config/dbconfig");


module.exports = {
    creates: (data, callBack) => {
        pool.query(
            `select * from salesrep where accountUserEmail = ?`,
            [data.accountUserEmail],
            (err, results) => {
                var date = new Date();
                var status = "active";
                if (results == "") {
                    pool.query(
                        `INSERT INTO salesrep(dealership,accountUserEmail,firstname,lastname,tradeName, accountPhone, nameLegal, accountFax, accountName, doNotShowPriceContracts, billingStreet, billingCity, billingStateProvince, billingCountry, billingZippostalCode,website,date,status,acc_ovmic_no,ovmic_no) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                        [
                            data.dealership,
                            data.accountUserEmail,
                            data.firstname,
                            data.lastname,
                            data.tradeName,
                            data.accountPhone,
                            data.nameLegal,
                            data.accountFax,
                            data.accountName,
                            data.doNotShowPriceContracts,
                            data.billingStreet,
                            data.billingCity,
                            data.billingStateProvince,
                            data.billingCountry,
                            data.billingZippostalCode,
                            data.website,
                            date,
                            status,
                            data.acc_ovmic_no,
                            data.ovmic_no,
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
                            else {
                                var salesrepRs = results.insertId;
                                // console.log(dealershipRs);

                                pool.query(
                                    `select * from login_master where user_email = ?`,
                                    [data.accountUserEmail],
                                    (err, results) => {
                                        var date = new Date();
                                        var status = "active";
                                        if (err) {
                                            return callBack(err);
                                        }
                                        else if (results.length > 0) {
                                            err = "User Already Registered";
                                            //delete dealership which was created

                                            return callBack(err)
                                        } else {
                                            // return callBack(null, "data Not found");
                                            var status = "active";
                                            var date = new Date();
                                            var user_type = "salesrep";
                                            var userpassword = "";
                                            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // Letters only
                                            var length = 6;
                                            for (var i = 0; i < length; i++) {
                                                userpassword += characters.charAt(Math.floor(Math.random() * characters.length));
                                            }

                                            var password = "user" + Math.floor(Math.random() * 90000 + 10000);

                                            // console.log("dealership id", dealershipRs);

                                            var salesrepPwd = data.password;

                                            pool.query(
                                                `INSERT INTO login_master(firstname,lastname,user_email,salesrep,user_type,user_password,status,date,ovmic_no,dealership) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                                                [
                                                    data.firstname,
                                                    data.lastname,
                                                    data.accountUserEmail,
                                                    salesrepRs,
                                                    user_type,
                                                    salesrepPwd,
                                                    status,
                                                    date,
                                                    data.ovmic_no,
                                                    data.dealership
                                                ],
                                                (error) => {
                                                    if (error) {
                                                        return callBack(error);
                                                    } else {

                                                        var salesrepName = data.accountName; // Replace with the actual dealership name variable
                                                        var portalURL = "https://dealers.getcoveredcanada.ca/";
                                                        var username = data.accountUserEmail; // Replace with the actual username variable
                                                        var password = salesrepPwd; // Replace with the actual password variable

                                                        // var mailReq = {
                                                        //     to: data.accountUserEmail,
                                                        //     subject: "GVC Login Credentials",
                                                        //     text: "Email: " + data.accountUserEmail +
                                                        //         "  Password: " + dealershipPwd +
                                                        //         "\n\nLogin here: https://acc.alhamtechnologies.com/"
                                                        // };

                                                        var mailReq = {
                                                            to: data.accountUserEmail,
                                                            subject: "Get Covered Canada Login Credentials!",
                                                            html: `
                                                            <p>Dear ${data.firstname}  ${data.lastname},</p>
                                                            
                                                            <p>Welcome to Get Covered Canada!<br>
                                                            We’re thrilled to have you onboard as a valued partner. To help you get started with our Warranty Registration Portal, we’ve created your account, which allows you to register and sell warranty policies seamlessly.</p>
                                                            
                                                            <p><b>Your Login Credentials:</b></p>
                                                            <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                                                                <tr>
                                                                    <td><b>Portal URL</b></td>
                                                                    <td><a href="${portalURL}">${portalURL}</a></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Username</b></td>
                                                                    <td>${username}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Password</b></td>
                                                                    <td>${password}</td>
                                                                </tr>
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
                                // return callBack(null, results.insertId);
                            }
                        }
                    );
                } else if (err) {
                    return callBack(err);
                } else {
                    err = "Salesrep email already registered";
                    return callBack(err);
                }
            }
        );

    },
    updates: (data, id, callBack) => {
        pool.query(
            `SELECT * FROM salesrep WHERE id = ?`,
            [id],
            (err, results) => {
              if (err) {
                return callBack(err);
              }
          
              if (!results || results.length === 0) {
                return callBack("Data Not Found");
              }
          
              const date = new Date();
              const status = "active";
          
              pool.query(
                `UPDATE salesrep 
                  SET   
                    dealership = ?,                            
                    accountUserEmail = ?,
                    tradeName = ?,
                    accountPhone = ?,
                    nameLegal = ?,
                    accountFax = ?,
                    accountName = ?,
                    doNotShowPriceContracts = ?,
                    billingStreet = ?,
                    billingCity = ?,
                    billingStateProvince = ?,
                    billingCountry = ?,
                    billingZippostalCode = ?,
                    website = ?,
                    date = ?,
                    status = ?,
                    acc_ovmic_no = ?,
                    ovmic_no = ?,
                    firstname = ?,
                    lastname = ?
                  WHERE id = ?`,
                [
                  data.dealership,
                  data.accountUserEmail,
                  data.tradeName,
                  data.accountPhone,
                  data.nameLegal,
                  data.accountFax,
                  data.accountName,
                  data.doNotShowPriceContracts,
                  data.billingStreet,
                  data.billingCity,
                  data.billingStateProvince,
                  data.billingCountry,
                  data.billingZippostalCode,
                  data.website,
                  date,
                  status,
                  data.acc_ovmic_no,
                  data.ovmic_no,
                  data.firstname,
                  data.lastname,
                  id
                ],
                (err) => {
                  if (err) {
                    return callBack(err);
                  }
          
                  pool.query(
                    `UPDATE login_master 
                      SET 
                        ovmic_no = ?,
                        firstname = ?,
                        lastname = ?
                      WHERE user_email = ?`,
                    [
                      data.ovmic_no,
                      data.firstname,
                      data.lastname,
                      data.accountUserEmail,
                    ],
                    (err) => {
                      if (err) {
                        return callBack(err);
                      }
          
                      return callBack(null, "Data Updated Successfully");
                    }
                  );
                }
              );
            }
          );
    },
    getsById: (id, callBack) => {
        pool.query(
            `select tradeName,billingStreet, billingCity,billingCountry,billingZippostalCode,acc_ovmic_no, ovmic_no, accountPhone from salesrep where id = ?`,
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
            `select * from salesrep where accountUserEmail = ?`,
            [data.accountUserEmail],
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
        pool.query(
            `SELECT id, firstname, lastname FROM login_master where dealership = ?`,
            [data.dealership],
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
    

}

// // creates : async(data)=>{
//        try {

//                 const [results] = await pool.promise().query('select * from salesrep where accountUserEmail = ?',[data.accountUserEmail]);
//                 var date = new Date();
//                 var status = "active";
//                 if(results.length == "")
//                 {
//                     pool.promise().query(`INSERT INTO dealership(accountUserEmail,firstname,lastname,tradeName, accountPhone, nameLegal, accountFax, accountName, doNotShowPriceContracts, billingStreet, billingCity, billingStateProvince, billingCountry, billingZippostalCode,website,date,status,acc_ovmic_no,ovmic_no) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
//                                     data.accountUserEmail,
//                                     data.firstname,
//                                     data.lastname,
//                                     data.tradeName,
//                                     data.accountPhone,
//                                     data.nameLegal,
//                                     data.accountFax,
//                                     data.accountName,
//                                     data.doNotShowPriceContracts,
//                                     data.billingStreet,
//                                     data.billingCity,
//                                     data.billingStateProvince,
//                                     data.billingCountry,
//                                     data.billingZippostalCode,
//                                     data.website,
//                                     date,
//                                     status,
//                                     data.acc_ovmic_no,
//                                     data.ovmic_no,
//                     ]);
//                     return {
//                         success: true,
//                         message: "SalesRep created successfully",
//                         insertedId: insertResult.insertId,
//                         mail: {
//                             from: process.env.EMAILID,
//                             to: data.accountUserEmail,
//                             subject: "Welcome to SalesRep",
//                             text: `Hello ${data.firstname}, your account has been created.`
//                         }
//                     }
//                 }
//                 else
//                 {
//                     throw new Error("SalesRep Email Is Already Registered");
//                 }
//        } catch (error) {
//             console.error("Error:", error.message);  // Log the error message for better debugging
//             throw error;
//        }
//     },