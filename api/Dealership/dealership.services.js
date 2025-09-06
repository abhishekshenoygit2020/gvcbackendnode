const pool = require("../../config/dbconfig");


module.exports = {
    creates: (data, callBack) => {
        pool.query(
            `select * from dealership where accountUserEmail = ?`,
            [data.accountUserEmail],
            (err, results) => {
                var date = new Date();
                var status = "active";
                if (results == "") {
                    pool.query(
                        `INSERT INTO dealership(accountUserEmail,firstname,lastname,tradeName, accountPhone, nameLegal, accountFax, accountName, doNotShowPriceContracts, billingStreet, billingCity, billingStateProvince, billingCountry, billingZippostalCode,website,date,status,acc_ovmic_no,ovmic_no, relationshipManager,relationshipManagerPerc) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                        [
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
                            data.relationshipManager,
                            data.relationshipManagerPerc
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            }
                            else {
                                var dealershipRs = results.insertId;
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
                                            var user_type = "dealership";
                                            var userpassword = "";
                                            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // Letters only
                                            var length = 6;
                                            for (var i = 0; i < length; i++) {
                                                userpassword += characters.charAt(Math.floor(Math.random() * characters.length));
                                            }

                                            var password = "user" + Math.floor(Math.random() * 90000 + 10000);

                                            // console.log("dealership id", dealershipRs);

                                            var dealershipPwd = data.password;

                                            pool.query(
                                                `INSERT INTO login_master(firstname,lastname,user_email,dealership,user_type,user_password,status,date,ovmic_no) VALUES (?,?,?,?,?,?,?,?,?)`,
                                                [
                                                    data.firstname,
                                                    data.lastname,
                                                    data.accountUserEmail,
                                                    dealershipRs,
                                                    user_type,
                                                    dealershipPwd,
                                                    status,
                                                    date,
                                                    data.ovmic_no
                                                ],
                                                (error) => {
                                                    if (error) {
                                                        return callBack(error);
                                                    } else {

                                                        var dealershipName = data.accountName; // Replace with the actual dealership name variable
                                                        var portalURL = "https://dealers.getcoveredcanada.ca/";
                                                        var username = data.accountUserEmail; // Replace with the actual username variable
                                                        var password = dealershipPwd; // Replace with the actual password variable

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
                    err = "Dealership Email Is Already Registered";
                    return callBack(err);
                }
            }
        );

    },
    getsById: (id, callBack) => {
        pool.query(
            `select tradeName,billingStreet, billingCity,billingCountry,billingZippostalCode,acc_ovmic_no, ovmic_no, accountPhone,accountUserEmail from dealership where id = ?`,
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
            `select * from dealership where accountUserEmail = ?`,
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
    gets: (callBack) => {
        pool.query(
            `select * from dealership`,
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
    getLogDetails: (data, callBack) => {
        pool.query(
            `select * from logdetails order by id desc`,
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
            `SELECT * FROM dealership WHERE id = ?`,
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

                if (data.type == "update") {
                    pool.query(
                        `UPDATE dealership 
                  SET                               
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
                    lastname = ?,
                     relationshipManager = ?,
                     relationshipManagerPerc = ?
                  WHERE id = ?`,
                        [
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
                            data.relationshipManager,
                            data.relationshipManagerPerc,
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
                } else {
                    pool.query(
                        `UPDATE dealership 
                  SET                               
                    	relationshipManager = ?,
                     relationshipManagerPerc = ?
                  WHERE id = ?`,
                        [
                            data.relationshipManager,
                            data.relationshipManagerPerc,
                            id
                        ],
                        (err) => {
                            if (err) {
                                return callBack(err);
                            }


                            return callBack(null, "Commission Data Updated Successfully");
                        }
                    );
                }


            }
        );
    },
    blockDealership: (data, callBack) => {

        const action = data.action;
        const id = data.id;

        var block = 0;
        var message = "Dealership is UnBlocked";

        if (action == 1) {
            block = 1;
            message = "Dealership is Blocked";
        }

        pool.query(`update dealership SET blocked = ? where id = ?`,
            [
                block, id
            ],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    return callBack("Data not found");
                } else {
                    pool.query(`update login_master SET blocked = ? where dealership = ?`,
                        [
                            block, id
                        ],
                        (err, results) => {
                            if (err) {
                                return callBack(err);
                            } else if (results == "") {
                                return callBack("Data not found");
                            } else {
                                // message = "Dealership Blocked successfully";
                                return callBack(null, message);
                            }
                        }
                    );
                    // message = "Data deleted successfully";
                    // return callBack(null, message);
                }
            }
        );



    },
    createWarrantyOld: (data, callBack) => {
        const options = {
            timeZone: 'America/Toronto', // Eastern Time Zone
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };

        const formatter = new Intl.DateTimeFormat('en-CA', options);
        const parts = formatter.formatToParts(new Date());

        const currentDate = `${parts[0].value}-${parts[2].value}-${parts[4].value}`;
        var commissionEarned = 0;

        const {
            commercialVehicle, userId, commission, originalCost, giftCardCredit, dealership, user, useromvicno, vinNoText, makeText, modelText, yearText, odometerText, salePriceofVehicleText, comprehensiveFactoryWarrantyValidText, languageText, serviceDateText,
            warrantyClassText, warrantyTypeText, warrantyProtectionText, warrantyOptionText, warrantyOptionPriceText, highRatioCoverageText, highRatioCoveragePriceText,
            deductibleText, deductiblePriceText, customerFirstNameText, customerLastNameText, streetAddressText, townText, provinceText, postalCodeText, customerPhoneText,
            customerEmailText, driverLicenceText, customerLanguageText, dealNotesText, vinCustText, salePriceofVehicleCustText, financeCompanyText, vehicleDeliveryDateText,
            warrantySoldForText, termsConditonChecked, vinNo, make, model, year, odometer, salePriceofVehicle, comprehensiveFactoryWarrantyValid, language, serviceDate,
            warrantyClass, warrantyType, warrantyProtection, warrantyOption, highRatioCoverage, highRatioCoveragePrice, deductible, deductiblePrice, customerFirstName,
            customerLastName, streetAddress, town, province, postalCode, customerPhone, customerEmail, driverLicence, customerLanguage, dealNotes, vinCust, salePriceofVehicleCust,
            financeCompany, vehicleDeliveryDate, warrantySoldFor, Status, packages, packagesTypes, productIndex, productCost, packagesText, productName, warrantyApplicationDate
        } = data;

        if (parseInt(commission) > 0) {
            commissionEarned = (warrantySoldFor * parseInt(commission)) / 100;
        }


        pool.query(`SELECT COUNT(*) AS total FROM warranty WHERE Status = "Closed Won"`, (err, countResult) => {
            if (err) {
                return callBack(err);
            }

            let invno = "";
            let merchantno = "";
            if (Status === "Closed Won") {
                invno = countResult[0].total + 1 + 1000; // Increment the count by 1
                merchantno = parseInt(dealership) + 100; // Increment the count by 1
            }


            var giftCard = 0;
            // commission = warrantySoldFor - productCost;

            pool.query(
                `INSERT INTO warranty (
                        vinNoText, makeText, modelText, yearText, odometerText,                        
                        salePriceofVehicleText, comprehensiveFactoryWarrantyValidText, languageText, serviceDateText,
                        warrantyClassText, warrantyTypeText, warrantyProtectionText, warrantyOptionText, warrantyOptionPriceText,    
                        highRatioCoverageText, highRatioCoveragePriceText,
                        deductibleText, deductiblePriceText, customerFirstNameText, customerLastNameText, streetAddressText, townText,
                              provinceText, postalCodeText, customerPhoneText,
                              customerEmailText, driverLicenceText, customerLanguageText, dealNotesText, vinCustText, salePriceofVehicleCustText,
                              financeCompanyText, vehicleDeliveryDateText,
                              warrantySoldForText, termsConditonChecked, vinNo, make, model, year, odometer, salePriceofVehicle,
                              comprehensiveFactoryWarrantyValid, language, serviceDate,
                               warrantyClass, warrantyType, warrantyProtection, warrantyOption, highRatioCoverage, highRatioCoveragePrice, deductible, deductiblePrice, customerFirstName,
                               customerLastName, streetAddress, town, province, postalCode, customerPhone, customerEmail, driverLicence, customerLanguage, dealNotes, vinCust, salePriceofVehicleCust,
                               financeCompany, vehicleDeliveryDate, warrantySoldFor,Status,packages, packagesTypes, productIndex, productCost, packagesText, productName,user,dealership,currentDate,warrantyApplicationDate,createdDate,useromvicno,invno,merchantno,commission,commissionEarned,giftCardCredit,originalCost,userId,commercialVehicle
                       )
                    VALUES (?,?, ?, ?, ?, ?,?,?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?, ?, ?,?, ?, ?,?, ?,?, ?,?, ?,?, ?,?, ?, ?,?, ?,?, ?,?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                `, [
                vinNoText, makeText, modelText, yearText, odometerText,
                salePriceofVehicleText, comprehensiveFactoryWarrantyValidText, languageText, serviceDateText,
                warrantyClassText, warrantyTypeText, warrantyProtectionText, warrantyOptionText, warrantyOptionPriceText,
                highRatioCoverageText, highRatioCoveragePriceText,
                deductibleText, deductiblePriceText, customerFirstNameText, customerLastNameText, streetAddressText, townText,
                provinceText, postalCodeText, customerPhoneText,
                customerEmailText, driverLicenceText, customerLanguageText, dealNotesText, vinCustText, salePriceofVehicleCustText,
                financeCompanyText, vehicleDeliveryDateText,
                warrantySoldForText, termsConditonChecked, vinNo, make, model, year, odometer, salePriceofVehicle,
                comprehensiveFactoryWarrantyValid, language, serviceDate,
                warrantyClass, warrantyType, warrantyProtection, warrantyOption, highRatioCoverage, highRatioCoveragePrice, deductible, deductiblePrice, customerFirstName,
                customerLastName, streetAddress, town, province, postalCode, customerPhone, customerEmail, driverLicence, customerLanguage, dealNotes, vinCust, salePriceofVehicleCust,
                financeCompany, vehicleDeliveryDate, warrantySoldFor, Status, packages, packagesTypes, productIndex, productCost, packagesText, productName, user, dealership, currentDate, warrantyApplicationDate, currentDate, useromvicno, invno, merchantno, commission, commissionEarned, giftCardCredit, originalCost, userId, commercialVehicle

            ],
                (err, results) => {
                    if (err) {
                        return callBack(err);
                    }
                    else {
                        if (Status === "Closed Won") {
                            pool.query(
                                `SELECT tradeName FROM dealership WHERE id = ?`,
                                [dealership],
                                (err, result) => {
                                    if (err) {
                                        return callBack(err);
                                    }

                                    const dealershipTradeName = result.length > 0 ? result[0].tradeName : '';
                                    const messageNotification = `${dealershipTradeName} has closed a ${warrantyClassText} for ${warrantySoldFor} on ${currentDate}`;

                                    const queryNotification = `
                INSERT INTO notifications (dealershipId, message, status, date)
                VALUES (?, ?, ?, ?)
            `;

                                    pool.query(queryNotification, [dealership, messageNotification, 0, currentDate], (error) => {
                                        if (error) {
                                            return callBack(error);
                                        } else {
                                            let data = {
                                                message: "Data Updated Successfully",
                                                invCount: invno,
                                                merchantno: merchantno,
                                                results: results
                                            };
                                            return callBack(null, data);
                                        }
                                    });
                                }
                            );
                        } else {
                            let data = {
                                message: "Data Added Successfully",
                                invCount: invno,
                                merchantno: merchantno,
                                results: results
                            };
                            return callBack(null, data);
                        }
                    }
                }
            );


        });


    },
    createWarranty: (data, callBack) => {
        const options = {
            timeZone: 'America/Toronto', // Eastern Time Zone
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };

        const formatter = new Intl.DateTimeFormat('en-CA', options);
        const parts = formatter.formatToParts(new Date());

        const currentDate = `${parts[0].value}-${parts[2].value}-${parts[4].value}`;
        var commissionEarned = 0;

        const {
            commercialVehicle, userId, commission, originalCost, giftCardCredit, dealership, user, useromvicno, vinNoText, makeText, modelText, yearText, odometerText, salePriceofVehicleText, comprehensiveFactoryWarrantyValidText, languageText, serviceDateText,
            warrantyClassText, warrantyTypeText, warrantyProtectionText, warrantyOptionText, warrantyOptionPriceText, highRatioCoverageText, highRatioCoveragePriceText,
            deductibleText, deductiblePriceText, customerFirstNameText, customerLastNameText, streetAddressText, townText, provinceText, postalCodeText, customerPhoneText,
            customerEmailText, driverLicenceText, customerLanguageText, dealNotesText, vinCustText, salePriceofVehicleCustText, financeCompanyText, vehicleDeliveryDateText,
            warrantySoldForText, termsConditonChecked, vinNo, make, model, year, odometer, salePriceofVehicle, comprehensiveFactoryWarrantyValid, language, serviceDate,
            warrantyClass, warrantyType, warrantyProtection, warrantyOption, highRatioCoverage, highRatioCoveragePrice, deductible, deductiblePrice, customerFirstName,
            customerLastName, streetAddress, town, province, postalCode, customerPhone, customerEmail, driverLicence, customerLanguage, dealNotes, vinCust, salePriceofVehicleCust,
            financeCompany, vehicleDeliveryDate, warrantySoldFor, Status, packages, packagesTypes, productIndex, productCost, packagesText, productName, warrantyApplicationDate
        } = data;

        if (parseInt(commission) > 0) {
            commissionEarned = (warrantySoldFor * parseInt(commission)) / 100;
        }


        pool.query(`SELECT COUNT(*) AS total FROM warranty WHERE Status = "Closed Won"`, (err, countResult) => {
            if (err) {
                return callBack(err);
            }

            let invno = "";
            let merchantno = "";
            if (Status === "Closed Won") {
                invno = countResult[0].total + 1 + 1000; // Increment the count by 1
                merchantno = parseInt(dealership) + 100; // Increment the count by 1
            }


            var giftCard = 0;
            // commission = warrantySoldFor - productCost;

            pool.query(
                `INSERT INTO warranty (
                        vinNoText, makeText, modelText, yearText, odometerText,                        
                        salePriceofVehicleText, comprehensiveFactoryWarrantyValidText, languageText, serviceDateText,
                        warrantyClassText, warrantyTypeText, warrantyProtectionText, warrantyOptionText, warrantyOptionPriceText,    
                        highRatioCoverageText, highRatioCoveragePriceText,
                        deductibleText, deductiblePriceText, customerFirstNameText, customerLastNameText, streetAddressText, townText,
                              provinceText, postalCodeText, customerPhoneText,
                              customerEmailText, driverLicenceText, customerLanguageText, dealNotesText, vinCustText, salePriceofVehicleCustText,
                              financeCompanyText, vehicleDeliveryDateText,
                              warrantySoldForText, termsConditonChecked, vinNo, make, model, year, odometer, salePriceofVehicle,
                              comprehensiveFactoryWarrantyValid, language, serviceDate,
                               warrantyClass, warrantyType, warrantyProtection, warrantyOption, highRatioCoverage, highRatioCoveragePrice, deductible, deductiblePrice, customerFirstName,
                               customerLastName, streetAddress, town, province, postalCode, customerPhone, customerEmail, driverLicence, customerLanguage, dealNotes, vinCust, salePriceofVehicleCust,
                               financeCompany, vehicleDeliveryDate, warrantySoldFor,Status,packages, packagesTypes, productIndex, productCost, packagesText, productName,user,dealership,currentDate,warrantyApplicationDate,createdDate,useromvicno,invno,merchantno,commission,commissionEarned,giftCardCredit,originalCost,userId,commercialVehicle
                       )
                    VALUES (?,?, ?, ?, ?, ?,?,?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?, ?, ?,?, ?, ?,?, ?,?, ?,?, ?,?, ?,?, ?, ?,?, ?,?, ?,?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                `, [
                vinNoText, makeText, modelText, yearText, odometerText,
                salePriceofVehicleText, comprehensiveFactoryWarrantyValidText, languageText, serviceDateText,
                warrantyClassText, warrantyTypeText, warrantyProtectionText, warrantyOptionText, warrantyOptionPriceText,
                highRatioCoverageText, highRatioCoveragePriceText,
                deductibleText, deductiblePriceText, customerFirstNameText, customerLastNameText, streetAddressText, townText,
                provinceText, postalCodeText, customerPhoneText,
                customerEmailText, driverLicenceText, customerLanguageText, dealNotesText, vinCustText, salePriceofVehicleCustText,
                financeCompanyText, vehicleDeliveryDateText,
                warrantySoldForText, termsConditonChecked, vinNo, make, model, year, odometer, salePriceofVehicle,
                comprehensiveFactoryWarrantyValid, language, serviceDate,
                warrantyClass, warrantyType, warrantyProtection, warrantyOption, highRatioCoverage, highRatioCoveragePrice, deductible, deductiblePrice, customerFirstName,
                customerLastName, streetAddress, town, province, postalCode, customerPhone, customerEmail, driverLicence, customerLanguage, dealNotes, vinCust, salePriceofVehicleCust,
                financeCompany, vehicleDeliveryDate, warrantySoldFor, Status, packages, packagesTypes, productIndex, productCost, packagesText, productName, user, dealership, currentDate, warrantyApplicationDate, currentDate, useromvicno, invno, merchantno, commission, commissionEarned, giftCardCredit, originalCost, userId, commercialVehicle

            ],
                (err, results) => {
                    if (err) {
                        return callBack(err);
                    }
                    else {
                        if (Status === "Closed Won") {
                            pool.query(
                                `SELECT tradeName FROM dealership WHERE id = ?`,
                                [dealership],
                                (err, result) => {
                                    if (err) {
                                        return callBack(err);
                                    }

                                    const dealershipTradeName = result.length > 0 ? result[0].tradeName : '';
                                    const messageNotification = `${dealershipTradeName} has closed a ${warrantyClassText} for ${warrantySoldFor} on ${currentDate}`;

                                    const queryNotification = `
                                            INSERT INTO notifications (dealershipId, message, status, date)
                                            VALUES (?, ?, ?, ?)
                                        `;

                                    pool.query(queryNotification, [dealership, messageNotification, 0, currentDate], (error) => {
                                        if (error) {
                                            return callBack(error);
                                        } else {
                                            // sending e-mail
                                            pool.query(
                                                `SELECT lm.user_email, lm.firstname, lm.lastname
                                                    FROM relationshipmanagerperc rmp
                                                    INNER JOIN login_master lm ON lm.id = rmp.userId
                                                    WHERE rmp.dealershipId = ?`,
                                                [dealership],
                                                (err, rmEmails) => {
                                                    if (err) {
                                                        console.error("Error fetching RM emails:", err);
                                                        return callBack(err);
                                                    }

                                                    if (rmEmails.length > 0) {

                                                        // Combine all RM emails into a single comma-separated string
                                                        const recipientEmails = rmEmails.map(rm => rm.user_email).join(',');

                                                        // Optional: pick one RM for personalized greeting (or use a generic one)
                                                        const rm = rmEmails[0];

                                                        const mailReq = {
                                                            to: recipientEmails, // 👈 multiple recipients in one email
                                                            subject: "New Warranty Registered",
                                                            html: `
                                                            <p>Dear Team,</p>
                                                            <p>A new warranty has been Closed for dealership <b>${dealershipTradeName}</b>.</p>
                                                            <ul>
                                                                <li>Warranty Class: ${warrantyClassText}</li>
                                                                <li>Warranty Sold For: $${warrantySoldFor}</li>
                                                                <li>Date: ${currentDate}</li>
                                                                <li>VIN: ${vinNo}</li>
                                                                <li>Customer: ${customerFirstName} ${customerLastName}</li>
                                                            </ul>
                                                            <p>Best regards,<br>Get Covered Canada Team</p>
                                                        `
                                                        };

                                                        let data = {
                                                            message: "Data Updated Successfully",
                                                            invCount: invno,
                                                            merchantno: merchantno,
                                                            results: results
                                                        };

                                                        var returnRes = {
                                                            mail: mailReq,
                                                            message: data
                                                        }

                                                        return callBack(null, returnRes);
                                                    } else {
                                                        let data = {
                                                            message: "Data Updated Successfully",
                                                            invCount: invno,
                                                            merchantno: merchantno,
                                                            results: results
                                                        };

                                                        var returnRes = {
                                                            mail: "",
                                                            message: data
                                                        }

                                                        return callBack(null, returnRes);
                                                    }

                                                }
                                            );

                                            // let data = {
                                            //     message: "Data Updated Successfully",
                                            //     invCount: invno,
                                            //     merchantno: merchantno,
                                            //     results: results
                                            // };
                                            // return callBack(null, data);
                                        }
                                    });
                                }
                            );
                        } else {

                            pool.query(
                                `SELECT tradeName FROM dealership WHERE id = ?`,
                                [dealership],
                                (err, result) => {
                                    if (err) {
                                        return callBack(err);
                                    }

                                    const dealershipTradeName = result.length > 0 ? result[0].tradeName : '';
                                    const messageNotification = `${dealershipTradeName} has created a ${warrantyClassText} for ${warrantySoldFor} on ${currentDate}`;

                                    const queryNotification = `
                                            INSERT INTO notifications (dealershipId, message, status, date)
                                            VALUES (?, ?, ?, ?)
                                        `;

                                    pool.query(queryNotification, [dealership, messageNotification, 0, currentDate], (error) => {
                                        if (error) {
                                            return callBack(error);
                                        } else {
                                            // sending e-mail
                                            pool.query(
                                                `SELECT lm.user_email, lm.firstname, lm.lastname
                                                    FROM relationshipmanagerperc rmp
                                                    INNER JOIN login_master lm ON lm.id = rmp.userId
                                                    WHERE rmp.dealershipId = ?`,
                                                [dealership],
                                                (err, rmEmails) => {
                                                    if (err) {
                                                        console.error("Error fetching RM emails:", err);
                                                        return callBack(err);
                                                    }

                                                    if (rmEmails.length > 0) {



                                                        // Combine all RM emails into a single comma-separated string
                                                        const recipientEmails = rmEmails.map(rm => rm.user_email).join(',');

                                                        // Optional: pick one RM for personalized greeting (or use a generic one)
                                                        const rm = rmEmails[0];

                                                        const mailReq = {
                                                            to: recipientEmails, // 👈 multiple recipients in one email
                                                            subject: "New Warranty Registered",
                                                            html: `
                                                            <p>Dear Team,</p>
                                                            <p>A new warranty has been created for dealership <b>${dealershipTradeName}</b>.</p>
                                                            <ul>
                                                                <li>Warranty Class: ${warrantyClassText}</li>
                                                                <li>Warranty Sold For: $${warrantySoldFor}</li>
                                                                <li>Date: ${currentDate}</li>
                                                                <li>VIN: ${vinNo}</li>
                                                                <li>Customer: ${customerFirstName} ${customerLastName}</li>
                                                            </ul>
                                                            <p>Best regards,<br>Get Covered Canada Team</p>
                                                        `
                                                        };

                                                        let data = {
                                                            message: "Data Updated Successfully",
                                                            invCount: invno,
                                                            merchantno: merchantno,
                                                            results: results
                                                        };

                                                        var returnRes = {
                                                            mail: mailReq,
                                                            message: data
                                                        }

                                                        return callBack(null, returnRes);
                                                    } else {
                                                        let data = {
                                                            message: "Data Updated Successfully",
                                                            invCount: invno,
                                                            merchantno: merchantno,
                                                            results: results
                                                        };

                                                        var returnRes = {
                                                            mail: "",
                                                            message: data
                                                        }

                                                        return callBack(null, returnRes);
                                                    }


                                                }
                                            );

                                            // let data = {
                                            //     message: "Data Updated Successfully",
                                            //     invCount: invno,
                                            //     merchantno: merchantno,
                                            //     results: results
                                            // };
                                            // return callBack(null, data);
                                        }
                                    });
                                }
                            );
                            // let data = {
                            //     message: "Data Added Successfully",
                            //     invCount: invno,
                            //     merchantno: merchantno,
                            //     results: results
                            // };
                            // return callBack(null, data);
                        }
                    }
                }
            );


        });


    },
    updateWarranty: (data, callBack) => {
        const options = {
            timeZone: 'America/Toronto', // Eastern Time Zone
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };

        const formatter = new Intl.DateTimeFormat('en-CA', options);
        const parts = formatter.formatToParts(new Date());

        const currentDate = `${parts[0].value}-${parts[2].value}-${parts[4].value}`;
        var commissionEarned = 0;


        const {
            commercialVehicle, id, userId, giftCardCredit, originalCost, commission, vinNoText, makeText, modelText, yearText, odometerText, salePriceofVehicleText, comprehensiveFactoryWarrantyValidText, languageText, serviceDateText,
            warrantyClassText, warrantyTypeText, warrantyProtectionText, warrantyOptionText, warrantyOptionPriceText, highRatioCoverageText, highRatioCoveragePriceText,
            deductibleText, deductiblePriceText, customerFirstNameText, customerLastNameText, streetAddressText, townText, provinceText, postalCodeText, customerPhoneText,
            customerEmailText, driverLicenceText, customerLanguageText, dealNotesText, vinCustText, salePriceofVehicleCustText, financeCompanyText, vehicleDeliveryDateText,
            warrantySoldForText, termsConditonChecked, vinNo, make, model, year, odometer, salePriceofVehicle, comprehensiveFactoryWarrantyValid, language, serviceDate,
            warrantyClass, warrantyType, warrantyProtection, warrantyOption, highRatioCoverage, highRatioCoveragePrice, deductible, deductiblePrice, customerFirstName,
            customerLastName, streetAddress, town, province, postalCode, customerPhone, customerEmail, driverLicence, customerLanguage, dealNotes, vinCust, salePriceofVehicleCust,
            financeCompany, vehicleDeliveryDate, warrantySoldFor, Status, packages, packagesTypes, productIndex, productCost, packagesText, productName, user, dealership,
            warrantyApplicationDate, useromvicno, oldUser
        } = data;

        if (parseInt(commission) > 0) {
            commissionEarned = (warrantySoldFor * parseInt(commission)) / 100;
        }
        var giftCard = 0;
        // commission = warrantySoldFor - productCost;

        pool.query(`SELECT COUNT(*) AS total FROM warranty WHERE Status = "Closed Won"`, (err, countResult) => {
            if (err) {
                return callBack(err);
            }

            let invno = "";
            let merchantno = "";
            if (Status === "Closed Won") {
                invno = countResult[0].total + 1 + 1000; // Increment the count by 1
                merchantno = parseInt(dealership) + 100; // Increment the count by 1
            }

            pool.query(
                `UPDATE warranty SET 
                    vinNoText = ?, makeText = ?, modelText = ?, yearText = ?, odometerText = ?,                        
                    salePriceofVehicleText = ?, comprehensiveFactoryWarrantyValidText = ?, languageText = ?, serviceDateText = ?,
                    warrantyClassText = ?, warrantyTypeText = ?, warrantyProtectionText = ?, warrantyOptionText = ?, warrantyOptionPriceText = ?,    
                    highRatioCoverageText = ?, highRatioCoveragePriceText = ?,
                    deductibleText = ?, deductiblePriceText = ?, customerFirstNameText = ?, customerLastNameText = ?, streetAddressText = ?, townText = ?,
                    provinceText = ?, postalCodeText = ?, customerPhoneText = ?,
                    customerEmailText = ?, driverLicenceText = ?, customerLanguageText = ?, dealNotesText = ?, vinCustText = ?, salePriceofVehicleCustText = ?,
                    financeCompanyText = ?, vehicleDeliveryDateText = ?,
                    warrantySoldForText = ?, termsConditonChecked = ?, vinNo = ?, make = ?, model = ?, year = ?, odometer = ?, salePriceofVehicle = ?,
                    comprehensiveFactoryWarrantyValid = ?, language = ?, serviceDate = ?,
                    warrantyClass = ?, warrantyType = ?, warrantyProtection = ?, warrantyOption = ?, highRatioCoverage = ?, highRatioCoveragePrice = ?, deductible = ?, deductiblePrice = ?, 
                    customerFirstName = ?, customerLastName = ?, streetAddress = ?, town = ?, province = ?, postalCode = ?, customerPhone = ?, customerEmail = ?, driverLicence = ?, 
                    customerLanguage = ?, dealNotes = ?, vinCust = ?, salePriceofVehicleCust = ?, financeCompany = ?, vehicleDeliveryDate = ?, warrantySoldFor = ?, Status = ?, 
                    packages = ?, packagesTypes = ?, productIndex = ?, productCost = ?, packagesText = ?, productName = ?, user = ?, dealership = ?, currentDate = ?, warrantyApplicationDate = ?,  
                    useromvicno = ?, invno = ?, merchantno = ?,commission = ?,commissionEarned = ?,giftCardCredit = ?,originalCost = ?, userId = ?, commercialVehicle = ?
                WHERE id = ?`,
                [
                    vinNoText, makeText, modelText, yearText, odometerText,
                    salePriceofVehicleText, comprehensiveFactoryWarrantyValidText, languageText, serviceDateText,
                    warrantyClassText, warrantyTypeText, warrantyProtectionText, warrantyOptionText, warrantyOptionPriceText,
                    highRatioCoverageText, highRatioCoveragePriceText,
                    deductibleText, deductiblePriceText, customerFirstNameText, customerLastNameText, streetAddressText, townText,
                    provinceText, postalCodeText, customerPhoneText,
                    customerEmailText, driverLicenceText, customerLanguageText, dealNotesText, vinCustText, salePriceofVehicleCustText,
                    financeCompanyText, vehicleDeliveryDateText,
                    warrantySoldForText, termsConditonChecked, vinNo, make, model, year, odometer, salePriceofVehicle,
                    comprehensiveFactoryWarrantyValid, language, serviceDate,
                    warrantyClass, warrantyType, warrantyProtection, warrantyOption, highRatioCoverage, highRatioCoveragePrice, deductible, deductiblePrice, customerFirstName,
                    customerLastName, streetAddress, town, province, postalCode, customerPhone, customerEmail, driverLicence, customerLanguage, dealNotes, vinCust, salePriceofVehicleCust,
                    financeCompany, vehicleDeliveryDate, warrantySoldFor, Status, packages, packagesTypes, productIndex, productCost, packagesText, productName, user, dealership, currentDate,
                    warrantyApplicationDate, useromvicno, invno, merchantno, commission, commissionEarned, giftCardCredit, originalCost, userId, commercialVehicle,  // invno updated if status is "closed won"
                    id // WHERE condition
                ],
                (err, results) => {
                    if (err) {
                        return callBack(err);
                    } else {
                        // var currentdate = new Date();
                        if (oldUser != user) {

                            pool.query(
                                `SELECT tradeName FROM dealership WHERE id = ?`,
                                [dealership], // Or replace with dynamic dealership ID variable
                                (err, result) => {
                                    if (err) {
                                        return callBack(err);
                                    }

                                    // If no dealership found, set empty string
                                    const dealershipTradeName = result.length > 0 ? result[0].tradeName : '';

                                    pool.query(
                                        `INSERT INTO logdetails(previousUser,currentUser,action,warrantyId,VINNO,dateTime, dealership) VALUES (?,?,?,?,?,?,?)`,
                                        [
                                            oldUser,
                                            user,
                                            "update",
                                            id,
                                            vinNo,
                                            currentDate,
                                            dealershipTradeName
                                        ],
                                        (error) => {
                                            if (error) {
                                                return callBack(error);
                                            } else {
                                                if (Status === "Closed Won") {

                                                    // var message = "";“[DealershipName] has closed a [warranty package name] for [$XX.XX] on [Date]”
                                                    var messageNotification = `${dealershipTradeName} has closed a ${warrantyClassText} for ${warrantySoldFor} on ${currentDate}”`;

                                                    const queryNotification = `
                                                        INSERT INTO notifications (dealershipId, message, status, date)
                                                        VALUES (?, ?, ?, ?)
                                                    `;

                                                    pool.query(queryNotification, [dealership, messageNotification, 0, currentDate], (error) => {
                                                        if (error) {
                                                            return callBack(error);
                                                        } else {
                                                            let data = {
                                                                message: "Data Updated Successfully",
                                                                invCount: invno,
                                                                merchantno: merchantno
                                                            };
                                                            return callBack(null, data);
                                                        }
                                                    });
                                                } else {
                                                    let data = {
                                                        message: "Data Updated Successfully",
                                                        invCount: invno,
                                                        merchantno: merchantno,
                                                        results: id
                                                    };
                                                    return callBack(null, data);
                                                }
                                            }
                                        });

                                });



                        } else {
                            if (Status === "Closed Won") {
                                pool.query(
                                    `SELECT tradeName FROM dealership WHERE id = ?`,
                                    [dealership],
                                    (err, result) => {
                                        if (err) {
                                            return callBack(err);
                                        }

                                        const dealershipTradeName = result.length > 0 ? result[0].tradeName : '';
                                        const messageNotification = `${dealershipTradeName} has closed a ${warrantyClassText} for ${warrantySoldFor} on ${currentDate}`;

                                        const queryNotification = `
                INSERT INTO notifications (dealershipId, message, status, date)
                VALUES (?, ?, ?, ?)
            `;

                                        pool.query(queryNotification, [dealership, messageNotification, 0, currentDate], (error) => {
                                            if (error) {
                                                return callBack(error);
                                            } else {
                                                let data = {
                                                    message: "Data Updated Successfully",
                                                    invCount: invno,
                                                    merchantno: merchantno
                                                };
                                                return callBack(null, data);
                                            }
                                        });
                                    }
                                );
                            } else {
                                let data = {
                                    message: "Data Updated Successfully",
                                    invCount: invno,
                                    merchantno: merchantno,
                                    results: id
                                };
                                return callBack(null, data);
                            }
                        }

                    }
                }
            );
        });
    },
    getPendingWarranty: (data, callBack) => {

        let QueryOld; // Declare the query variable
        let params;   // Declare the params variable

        if (data.fromDate && data.toDate) {
            // Define the query and params for the date range case
            QueryOld = data.dealership == 0
                ? `SELECT * FROM warranty WHERE Status = 'Pending' AND CurrentDate BETWEEN ? AND ?  order by id desc`  // Query for admin, no user condition
                : `SELECT * FROM warranty WHERE Status = 'Pending' AND dealership = ? AND CurrentDate BETWEEN ? AND ? order by id desc`;

            params = data.dealership == 0
                ? [data.fromDate, data.toDate]
                : [data.dealership, data.fromDate, data.toDate];
        } else {
            // Define the query and params for no date range case
            QueryOld = data.dealership == 0
                ? `SELECT * FROM warranty WHERE Status = 'Pending' order by id desc`  // Query for admin, no user condition
                : `SELECT * FROM warranty WHERE Status = 'Pending' AND dealership = ? order by id desc`;

            params = data.dealership == 0
                ? []
                : [data.dealership];
        }


        pool.query(
            QueryOld,
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
    getClosedWarranty: (data, callBack) => {
        let QueryOld;
        let params;

        if (data.fromDate && data.toDate) {
            QueryOld = data.dealership == 0
                ? `SELECT * FROM warranty WHERE Status = 'Closed Won' AND (deleteStatus = 0 OR deleteStatus = '') AND CurrentDate BETWEEN ? AND ? ORDER BY CurrentDate DESC`
                : `SELECT * FROM warranty WHERE Status = 'Closed Won' AND dealership = ? AND (deleteStatus = 0 OR deleteStatus = '') AND CurrentDate BETWEEN ? AND ? ORDER BY CurrentDate DESC`;

            params = data.dealership == 0
                ? [data.fromDate, data.toDate]
                : [data.dealership, data.fromDate, data.toDate];
        } else {
            QueryOld = data.dealership == 0
                ? `SELECT * FROM warranty WHERE Status = 'Closed Won' AND (deleteStatus = 0 OR deleteStatus = '')  ORDER BY CurrentDate DESC`
                : `SELECT * FROM warranty WHERE Status = 'Closed Won' AND dealership = ? AND (deleteStatus = 0 OR deleteStatus = '') ORDER BY CurrentDate DESC`;

            params = data.dealership == 0
                ? []
                : [data.dealership];
        }

        pool.query(
            QueryOld,
            params,
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (!results || results.length === 0) {
                    return callBack("Data Not Found");
                } else {
                    return callBack(null, results);
                }
            }
        );
    },

    getRestoreWarranty: (data, callBack) => {
        let QueryOld;
        let params;

        if (data.fromDate && data.toDate) {
            QueryOld = data.dealership == 0
                ? `SELECT * FROM warranty WHERE Status = 'Closed Won' AND (deleteStatus = 1) AND CurrentDate BETWEEN ? AND ?`
                : `SELECT * FROM warranty WHERE Status = 'Closed Won' AND dealership = ? AND (deleteStatus = 1) AND CurrentDate BETWEEN ? AND ?`;

            params = data.dealership == 0
                ? [data.fromDate, data.toDate]
                : [data.dealership, data.fromDate, data.toDate];
        } else {
            QueryOld = data.dealership == 0
                ? `SELECT * FROM warranty WHERE Status = 'Closed Won' AND (deleteStatus = 1)`
                : `SELECT * FROM warranty WHERE Status = 'Closed Won' AND dealership = ? AND (deleteStatus = 1)`;

            params = data.dealership == 0
                ? []
                : [data.dealership];
        }

        pool.query(
            QueryOld,
            params,
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (!results || results.length === 0) {
                    return callBack("Data Not Found");
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    warrantyRestore: (data, callBack) => {
        const { id, deleteStatus } = data; // assume you're updating `name` and `status`
        let message = "";
        if (deleteStatus == 1) {
            message = "Data Deleted Successfully";
        } else {
            message = "Data Restored Successfully";
        }

        pool.query(
            `UPDATE warranty SET deleteStatus = ?  WHERE id = ?`,
            [deleteStatus, id],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results.affectedRows === 0) {
                    return callBack("Data not found");
                } else {


                    return callBack(null, message);
                }
            }
        );
    },

    deletesByIdWarranty: (id, data, callBack) => {
        const user = data.user;
        const VINNO = data.VINNO;
        const dealership = data.dealership;

        const options = {
            timeZone: 'America/Toronto', // Eastern Time Zone
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };

        const formatter = new Intl.DateTimeFormat('en-CA', options);
        const parts = formatter.formatToParts(new Date());

        const currentDate = `${parts[4].value}-${parts[2].value}-${parts[0].value}`;

        pool.query(`delete from warranty where id=?`,
            [
                id
            ],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    return callBack("Data not found");
                } else {

                    pool.query(
                        `SELECT tradeName FROM dealership WHERE id = ?`,
                        [dealership], // Or replace with dynamic dealership ID variable
                        (err, result) => {
                            if (err) {
                                return callBack(err);
                            }

                            // If no dealership found, set empty string
                            const dealershipTradeName = result.length > 0 ? result[0].tradeName : '';
                            pool.query(
                                `INSERT INTO logdetails(previousUser,currentUser,action,warrantyId,VINNO,dateTime,dealership) VALUES (?,?,?,?,?,?,?)`,
                                [
                                    user,
                                    user,
                                    "delete",
                                    id,
                                    VINNO,
                                    currentDate,
                                    dealershipTradeName
                                ],
                                (error) => {
                                    if (error) {
                                        return callBack(error);
                                    } else {
                                        message = "Data deleted successfully";
                                        return callBack(null, message);
                                    }
                                });

                        });


                }
            }
        );
    },
    gettableDataCount: (data, callBack) => {
        var dealership = data.dealership;
        var userType = data.userType;

        if (userType == "admin") {
            pool.query(
                `SELECT 'Pending' AS table_name, COUNT(*) AS row_count FROM warranty where (deleteStatus = 0 OR deleteStatus ="") AND Status = 'Pending'
                 UNION ALL
                 SELECT 'Closed Won' AS table_name, COUNT(*) AS row_count FROM warranty where (deleteStatus = 0 OR deleteStatus ="") AND Status = 'Closed Won'
                 UNION ALL
                 SELECT 'Dealerships' AS table_name, COUNT(*) AS row_count FROM  dealership`,
                //  [dealership,dealership],
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
        } else {
            pool.query(
                `SELECT 'Pending' AS table_name, COUNT(*) AS row_count FROM warranty where (deleteStatus = 0 OR deleteStatus ="") AND Status = 'Pending' and dealership = ?
                 UNION ALL
                 SELECT 'Closed Won' AS table_name, COUNT(*) AS row_count FROM warranty where (deleteStatus = 0 OR deleteStatus ="") AND  Status = 'Closed Won' and dealership = ?
                 UNION ALL               
                 SELECT 'Users' AS table_name, COUNT(*) AS row_count FROM login_master where dealership = ?`,
                [dealership, dealership, dealership],
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
        }

    },
    getSoldDataCount: (data, callBack) => {
        var dealership = data.dealership;
        var userType = data.userType;
        if (userType == "admin") {
            pool.query(
                `SELECT 
                    m.monthYear,
                    
                    IFNULL(SUM(w.warrantySoldFor), 0) AS total_sale_price
                FROM (
                    SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n MONTH), '%Y-%m') AS monthYear
                    FROM (
                        SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL 
                        SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL 
                        SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11
                    ) AS numbers
                ) m
                CROSS JOIN (
                    SELECT 0 AS package_id UNION ALL SELECT 1 UNION ALL SELECT 2
                ) p
                LEFT JOIN warranty w 
                    ON DATE_FORMAT(w.CurrentDate, '%Y-%m') = m.monthYear
                AND w.packages = p.package_id
                AND w.Status = 'Closed Won'
                AND (w.deleteStatus = 0 OR w.deleteStatus = '')
                AND w.dealership <> 42
                GROUP BY m.monthYear
                ORDER BY m.monthYear`,
                // WITH months AS ( SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n MONTH), '%Y-%m') AS monthYear FROM ( SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 ) AS numbers ) SELECT m.monthYear, IFNULL(SUM(w.warrantySoldFor), 0) AS total_sale_price FROM months m LEFT JOIN warranty w ON DATE_FORMAT(w.createdDate, '%Y-%m') = m.monthYear AND w.Status = 'Closed Won' GROUP BY m.monthYear ORDER BY m.monthYear,
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
        } else {
            pool.query(
                // WITH months AS ( SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n MONTH), '%Y-%m') AS monthYear FROM ( SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 ) AS numbers ) SELECT m.monthYear, IFNULL(SUM(w.warrantySoldFor), 0) AS total_sale_price FROM months m LEFT JOIN warranty w ON DATE_FORMAT(w.createdDate, '%Y-%m') = m.monthYear AND w.Status = 'Closed Won'  AND dealership = ? GROUP BY m.monthYear ORDER BY m.monthYear, [dealership],
                `SELECT 
                    m.monthYear,
                    
                    IFNULL(SUM(w.warrantySoldFor), 0) AS total_sale_price
                FROM (
                    SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL n MONTH), '%Y-%m') AS monthYear
                    FROM (
                        SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL 
                        SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL 
                        SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11
                    ) AS numbers
                ) m
                CROSS JOIN (
                    SELECT 0 AS package_id UNION ALL SELECT 1 UNION ALL SELECT 2
                ) p
                LEFT JOIN warranty w 
                    ON DATE_FORMAT(w.CurrentDate, '%Y-%m') = m.monthYear
                AND w.packages = p.package_id
                AND w.Status = 'Closed Won'
                AND (w.deleteStatus = 0 OR w.deleteStatus = '')
                AND w.dealership <> 42
                AND w.dealership = ?
                GROUP BY m.monthYear
                ORDER BY m.monthYear`,[dealership],
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
        }
    },
    getProductDataOLD: (data, callBack) => {
        var dealership = data.dealership;
        var userType = data.userType;

        if (userType == "admin") {
            pool.query(
                `SELECT 
                warrantyClassText, 
                SUM(warrantySoldFor) AS totalSalePrice 
             FROM 
                warranty 
             WHERE 
                warrantyClassText IN (?, ?, ?) AND createdDate >= DATE_SUB(CURDATE(), INTERVAL 11 MONTH)
             GROUP BY 
                warrantyClassText`,
                ["Gold", "Silver", "Bronze"], // Use placeholders for parameterized query
                (err, results) => {
                    if (err) {
                        // Handle database errors
                        return callBack(err);
                    } else if (!results || results.length === 0) {
                        // Handle case when no data is found
                        return callBack("Data Not Found");
                    } else {
                        // Return results if successful
                        const warrantyClasses = ["Gold", "Silver", "Bronze"];
                        const completeData = warrantyClasses.map((label) => {
                            const result = results.find((item) => item.warrantyClassText === label);
                            return { label, value: result ? result.totalSalePrice : 0 };
                        });

                        // Calculate total sales
                        const totalSales = completeData.reduce((sum, item) => sum + item.value, 0);

                        // Create two arrays
                        const totalArray = completeData.map((item) => ({
                            label: item.label,
                            value: item.value
                        }));

                        const percentageArray = completeData.map((item) => ({
                            label: item.label,
                            value: totalSales > 0 ? parseFloat(((item.value / totalSales) * 100).toFixed(2)) : 0
                        }));

                        let data = {
                            totalArray: totalArray,
                            percentageArray: percentageArray
                        }
                        return callBack(null, data);

                    }
                }
            );
        } else {
            pool.query(
                `SELECT 
                warrantyClassText, 
                SUM(warrantySoldFor) AS totalSalePrice 
             FROM 
                warranty 
             WHERE 
                warrantyClassText IN (?, ?, ?) AND createdDate >= DATE_SUB(CURDATE(), INTERVAL 11 MONTH) AND dealership = ?
             GROUP BY 
                warrantyClassText`,
                ["Gold", "Silver", "Bronze", dealership], // Use placeholders for parameterized query
                (err, results) => {
                    if (err) {
                        // Handle database errors
                        return callBack(err);
                    } else if (!results || results.length === 0) {
                        // Handle case when no data is found
                        return callBack("Data Not Found");
                    } else {
                        // Return results if successful

                        // Ensure all warranty classes are present
                        const warrantyClasses = ["Gold", "Silver", "Bronze"];
                        const completeData = warrantyClasses.map((label) => {
                            const result = results.find((item) => item.warrantyClassText === label);
                            return { label, value: result ? result.totalSalePrice : 0 };
                        });

                        // Calculate total sales
                        const totalSales = completeData.reduce((sum, item) => sum + item.value, 0);

                        // Create two arrays
                        const totalArray = completeData.map((item) => ({
                            label: item.label,
                            value: item.value
                        }));

                        const percentageArray = completeData.map((item) => ({
                            label: item.label,
                            value: totalSales > 0 ? parseFloat(((item.value / totalSales) * 100).toFixed(2)) : 0
                        }));

                        let data = {
                            totalArray: totalArray,
                            percentageArray: percentageArray
                        }
                        return callBack(null, data);
                    }
                }
            );
        }
    },
    getProductGraph: (data, callBack) => {
        // WITH months AS (
        //     SELECT 
        //         1 AS month_num, 'January' AS month_name UNION ALL
        //         SELECT 2, 'February' UNION ALL
        //         SELECT 3, 'March' UNION ALL
        //         SELECT 4, 'April' UNION ALL
        //         SELECT 5, 'May' UNION ALL
        //         SELECT 6, 'June' UNION ALL
        //         SELECT 7, 'July' UNION ALL
        //         SELECT 8, 'August' UNION ALL
        //         SELECT 9, 'September' UNION ALL
        //         SELECT 10, 'October' UNION ALL
        //         SELECT 11, 'November' UNION ALL
        //         SELECT 12, 'December'
        // ),
        // data AS (
        //     SELECT  
        //         MONTH(CurrentDate) AS month_num,  
        //         SUM(warrantySoldFor) AS record_count 
        //     FROM warranty 
        //     WHERE YEAR(CurrentDate) = YEAR(CURRENT_DATE)
        //     GROUP BY MONTH(CurrentDate)
        // )
        // SELECT 
        //     m.month_num,
        //     m.month_name,
        //     COALESCE(d.record_count, 0) AS record_count
        // FROM months m
        // LEFT JOIN data d ON m.month_num = d.month_num
        // ORDER BY m.month_num;

        var dealership = data.dealership;
        var userType = data.userType;

        pool.query(
            `WITH months AS (
            SELECT 
                1 AS month_num, 'January' AS month_name UNION ALL
                SELECT 2, 'February' UNION ALL
                SELECT 3, 'March' UNION ALL
                SELECT 4, 'April' UNION ALL
                SELECT 5, 'May' UNION ALL
                SELECT 6, 'June' UNION ALL
                SELECT 7, 'July' UNION ALL
                SELECT 8, 'August' UNION ALL
                SELECT 9, 'September' UNION ALL
                SELECT 10, 'October' UNION ALL
                SELECT 11, 'November' UNION ALL
                SELECT 12, 'December'
        ),
        data AS (
            SELECT  
                MONTH(CurrentDate) AS month_num,  
                SUM(warrantySoldFor) AS record_count 
            FROM warranty 
            WHERE YEAR(CurrentDate) = YEAR(CURRENT_DATE)
            GROUP BY MONTH(CurrentDate)
        )
        SELECT 
            m.month_num,
            m.month_name,
            COALESCE(d.record_count, 0) AS record_count
        FROM months m
        LEFT JOIN data d ON m.month_num = d.month_num
        ORDER BY m.month_num`,
            ["Gold", "Silver", "Bronze", dealership], // Use placeholders for parameterized query
            (err, results) => {
                if (err) {
                    // Handle database errors
                    return callBack(err);
                } else if (!results || results.length === 0) {
                    // Handle case when no data is found
                    return callBack("Data Not Found");
                } else {
                    // Return results if successful
                    return callBack(null, results);
                }
            }
        );


    },
    getProductData: (data, callBack) => {
        var dealership = data.dealership;
        var userType = data.userType;

        if (userType == "admin") {
            pool.query(
                `SELECT 
    warrantyClassText, 
    SUM(warrantySoldFor) AS totalSalePrice 
FROM 
    warranty 
WHERE 
    warrantyClassText IN (?,?,?) 
    AND createdDate >= DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') 
    AND createdDate < DATE_FORMAT(NOW(), '%Y-%m-01') 
GROUP BY 
    warrantyClassText`,
                ["Gold", "Silver", "Bronze"], // Use placeholders for parameterized query
                (err, results) => {
                    if (err) {
                        // Handle database errors
                        return callBack(err);
                    } else if (!results || results.length === 0) {
                        // Handle case when no data is found
                        return callBack("Data Not Found");
                    } else {
                        // Return results if successful
                        const warrantyClasses = ["Gold", "Silver", "Bronze"];
                        const completeData = warrantyClasses.map((label) => {
                            const result = results.find((item) => item.warrantyClassText === label);
                            return { label, value: result ? result.totalSalePrice : 0 };
                        });

                        // Calculate total sales
                        const totalSales = completeData.reduce((sum, item) => sum + item.value, 0);

                        // Create two arrays
                        const totalArray = completeData.map((item) => ({
                            label: item.label,
                            value: item.value
                        }));

                        const percentageArray = completeData.map((item) => ({
                            label: item.label,
                            value: totalSales > 0 ? parseFloat(((item.value / totalSales) * 100).toFixed(2)) : 0
                        }));

                        let data = {
                            totalArray: totalArray,
                            percentageArray: percentageArray
                        }
                        return callBack(null, data);

                    }
                }
            );
        } else {
            pool.query(
                `SELECT 
    warrantyClassText, 
    SUM(warrantySoldFor) AS totalSalePrice 
FROM 
    warranty 
WHERE 
    warrantyClassText IN (?,?,?) 
    AND createdDate >= DATE_FORMAT(NOW() - INTERVAL 1 MONTH, '%Y-%m-01') 
    AND createdDate < DATE_FORMAT(NOW(), '%Y-%m-01') AND dealership = ?
GROUP BY 
    warrantyClassText`,
                ["Gold", "Silver", "Bronze", dealership], // Use placeholders for parameterized query
                (err, results) => {
                    if (err) {
                        // Handle database errors
                        return callBack(err);
                    } else if (!results || results.length === 0) {
                        // Handle case when no data is found
                        return callBack("Data Not Found");
                    } else {
                        // Return results if successful

                        // Ensure all warranty classes are present
                        const warrantyClasses = ["Gold", "Silver", "Bronze"];
                        const completeData = warrantyClasses.map((label) => {
                            const result = results.find((item) => item.warrantyClassText === label);
                            return { label, value: result ? result.totalSalePrice : 0 };
                        });

                        // Calculate total sales
                        const totalSales = completeData.reduce((sum, item) => sum + item.value, 0);

                        // Create two arrays
                        const totalArray = completeData.map((item) => ({
                            label: item.label,
                            value: item.value
                        }));

                        const percentageArray = completeData.map((item) => ({
                            label: item.label,
                            value: totalSales > 0 ? parseFloat(((item.value / totalSales) * 100).toFixed(2)) : 0
                        }));

                        let data = {
                            totalArray: totalArray,
                            percentageArray: percentageArray
                        }
                        return callBack(null, data);
                    }
                }
            );
        }
    },


    getPendingWarrantyGraph: (data, callBack) => {

        let QueryOld; // Declare the query variable
        let params;   // Declare the params variable

        const currentYear = new Date().getFullYear();

        // Get the first and last date of the year
        const firstDateOfYear = new Date(currentYear, 0, 1); // January 1st
        const lastDateOfYear = new Date(currentYear, 11, 31); // December 31st

        // Format the dates as yyyy-mm-dd
        const formatDate = (date) => date.toISOString().split('T')[0];

        const firstmonthftdate = formatDate(firstDateOfYear);
        const lastmonthdtdate = formatDate(lastDateOfYear);

        if (firstmonthftdate && lastmonthdtdate) {
            // Define the query and params for the date range case
            QueryOld = data.dealership == 0
                ? `SELECT DATE_FORMAT(createdDate, '%d-%m-%Y') AS formatted_date, warrantySoldFor FROM warranty WHERE Status = 'Pending' AND createdDate >= DATE_SUB(CURDATE(), INTERVAL 11 MONTH) AND CURDATE()`  // Query for admin, no user condition
                : `SELECT DATE_FORMAT(createdDate, '%d-%m-%Y') AS formatted_date, warrantySoldFor FROM warranty WHERE Status = 'Pending' AND dealership = ? AND createdDate >= DATE_SUB(CURDATE(), INTERVAL 11 MONTH) AND CURDATE()`;

            params = data.dealership == 0
                ? [firstmonthftdate, lastmonthdtdate]
                : [data.dealership, firstmonthftdate, lastmonthdtdate];
        } else {
            // Define the query and params for no date range case
            QueryOld = data.dealership == 0
                ? `SELECT DATE_FORMAT(CurrentDate, '%d-%m-%Y') AS formatted_date, warrantySoldFor FROM warranty WHERE Status = 'Pending'`  // Query for admin, no user condition
                : `SELECT DATE_FORMAT(CurrentDate, '%d-%m-%Y') AS formatted_date, warrantySoldFor FROM warranty WHERE Status = 'Pending' AND dealership = ?`;

            params = data.dealership == 0
                ? []
                : [data.dealership];
        }


        pool.query(
            QueryOld,
            params,
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    const months = [
                        { monthNum: 1, monthName: "January", warrantySoldFor: 0 },
                        { monthNum: 2, monthName: "February", warrantySoldFor: 0 },
                        { monthNum: 3, monthName: "March", warrantySoldFor: 0 },
                        { monthNum: 4, monthName: "April", warrantySoldFor: 0 },
                        { monthNum: 5, monthName: "May", warrantySoldFor: 0 },
                        { monthNum: 6, monthName: "June", warrantySoldFor: 0 },
                        { monthNum: 7, monthName: "July", warrantySoldFor: 0 },
                        { monthNum: 8, monthName: "August", warrantySoldFor: 0 },
                        { monthNum: 9, monthName: "September", warrantySoldFor: 0 },
                        { monthNum: 10, monthName: "October", warrantySoldFor: 0 },
                        { monthNum: 11, monthName: "November", warrantySoldFor: 0 },
                        { monthNum: 12, monthName: "December", warrantySoldFor: 0 }
                    ];
                    err = "Data Not Found";
                    return callBack(null, months);
                } else {

                    var res = results.length;

                    // const months = [
                    //     { monthNum: 1, monthName: "January", warrantySoldFor: 0 },
                    //     { monthNum: 2, monthName: "February", warrantySoldFor: 0 },
                    //     { monthNum: 3, monthName: "March", warrantySoldFor: 0 },
                    //     { monthNum: 4, monthName: "April", warrantySoldFor: 0 },
                    //     { monthNum: 5, monthName: "May", warrantySoldFor: 0 },
                    //     { monthNum: 6, monthName: "June", warrantySoldFor: 0 },
                    //     { monthNum: 7, monthName: "July", warrantySoldFor: 0 },
                    //     { monthNum: 8, monthName: "August", warrantySoldFor: 0 },
                    //     { monthNum: 9, monthName: "September", warrantySoldFor: 0 },
                    //     { monthNum: 10, monthName: "October", warrantySoldFor: 0 },
                    //     { monthNum: 11, monthName: "November", warrantySoldFor: 0 },
                    //     { monthNum: 12, monthName: "December", warrantySoldFor: 0 }
                    // ];
                    const currentDate = new Date();
                    const last12Months = [];

                    for (let i = 0; i < 12; i++) {
                        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                        last12Months.unshift({
                            monthNum: date.getMonth() + 1, // Month is 0-based, so we add 1
                            monthName: date.toLocaleString('default', { month: 'long' }), // Full month name
                            warrantySoldFor: 0
                        });
                    }
                    results.forEach(item => {
                        const [day, month, year] = item.formatted_date.split('-');
                        const monthNum = parseInt(month, 10);
                        const amount = parseInt(item.warrantySoldFor, 10);

                        // Add the amount to the corresponding month
                        const monthObj = last12Months.find(m => m.monthNum === monthNum);
                        if (monthObj) {
                            monthObj.warrantySoldFor += amount;
                        }
                    });
                    // console.log("results"+ res);
                    return callBack(null, last12Months);
                }

            }
        );
    },

    getClosedWonGraph: (data, callBack) => {

        let QueryOld; // Declare the query variable
        let params;   // Declare the params variable

        const currentYear = new Date().getFullYear();

        // Get the first and last date of the year
        const firstDateOfYear = new Date(currentYear, 0, 1); // January 1st
        const lastDateOfYear = new Date(currentYear, 11, 31); // December 31st

        // Format the dates as yyyy-mm-dd
        const formatDate = (date) => date.toISOString().split('T')[0];

        const firstmonthftdate = formatDate(firstDateOfYear);
        const lastmonthdtdate = formatDate(lastDateOfYear);

        if (firstmonthftdate && lastmonthdtdate) {
            // Define the query and params for the date range case
            QueryOld = data.dealership == 0
                ? `SELECT DATE_FORMAT(createdDate, '%d-%m-%Y') AS formatted_date, warrantySoldFor FROM warranty WHERE Status = 'Closed Won'  AND createdDate BETWEEN DATE_SUB(CURDATE(), INTERVAL 11 MONTH) AND CURDATE()`  // Query for admin, no user condition
                : `SELECT DATE_FORMAT(createdDate, '%d-%m-%Y') AS formatted_date, warrantySoldFor FROM warranty WHERE Status = 'Closed Won' AND dealership = ? AND createdDate BETWEEN DATE_SUB(CURDATE(), INTERVAL 11 MONTH) AND CURDATE()`;

            params = data.dealership == 0
                ? [firstmonthftdate, lastmonthdtdate]
                : [data.dealership, firstmonthftdate, lastmonthdtdate];
        } else {
            // Define the query and params for no date range case
            QueryOld = data.dealership == 0
                ? `SELECT DATE_FORMAT(CurrentDate, '%d-%m-%Y') AS formatted_date, warrantySoldFor FROM warranty WHERE Status = 'Closed Won' `  // Query for admin, no user condition
                : `SELECT DATE_FORMAT(CurrentDate, '%d-%m-%Y') AS formatted_date, warrantySoldFor FROM warranty WHERE Status = 'Closed Won' AND dealership = ?`;

            params = data.dealership == 0
                ? []
                : [data.dealership];
        }


        pool.query(
            QueryOld,
            params,
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results == "") {
                    const months = [
                        { monthNum: 1, monthName: "January", warrantySoldFor: 0 },
                        { monthNum: 2, monthName: "February", warrantySoldFor: 0 },
                        { monthNum: 3, monthName: "March", warrantySoldFor: 0 },
                        { monthNum: 4, monthName: "April", warrantySoldFor: 0 },
                        { monthNum: 5, monthName: "May", warrantySoldFor: 0 },
                        { monthNum: 6, monthName: "June", warrantySoldFor: 0 },
                        { monthNum: 7, monthName: "July", warrantySoldFor: 0 },
                        { monthNum: 8, monthName: "August", warrantySoldFor: 0 },
                        { monthNum: 9, monthName: "September", warrantySoldFor: 0 },
                        { monthNum: 10, monthName: "October", warrantySoldFor: 0 },
                        { monthNum: 11, monthName: "November", warrantySoldFor: 0 },
                        { monthNum: 12, monthName: "December", warrantySoldFor: 0 }
                    ];
                    err = "Data Not Found";
                    return callBack(null, months);
                } else {

                    var res = results.length;

                    const months = [
                        { monthNum: 1, monthName: "January", warrantySoldFor: 0 },
                        { monthNum: 2, monthName: "February", warrantySoldFor: 0 },
                        { monthNum: 3, monthName: "March", warrantySoldFor: 0 },
                        { monthNum: 4, monthName: "April", warrantySoldFor: 0 },
                        { monthNum: 5, monthName: "May", warrantySoldFor: 0 },
                        { monthNum: 6, monthName: "June", warrantySoldFor: 0 },
                        { monthNum: 7, monthName: "July", warrantySoldFor: 0 },
                        { monthNum: 8, monthName: "August", warrantySoldFor: 0 },
                        { monthNum: 9, monthName: "September", warrantySoldFor: 0 },
                        { monthNum: 10, monthName: "October", warrantySoldFor: 0 },
                        { monthNum: 11, monthName: "November", warrantySoldFor: 0 },
                        { monthNum: 12, monthName: "December", warrantySoldFor: 0 }
                    ];

                    const currentDate = new Date();
                    const last12Months = [];

                    for (let i = 0; i < 12; i++) {
                        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                        last12Months.unshift({
                            monthNum: date.getMonth() + 1, // Month is 0-based, so we add 1
                            monthName: date.toLocaleString('default', { month: 'long' }), // Full month name
                            warrantySoldFor: 0
                        });
                    }

                    results.forEach(item => {
                        const [day, month, year] = item.formatted_date.split('-');
                        const monthNum = parseInt(month, 10);
                        const amount = parseInt(item.warrantySoldFor, 10);

                        // Add the amount to the corresponding month
                        const monthObj = last12Months.find(m => m.monthNum === monthNum);
                        if (monthObj) {
                            monthObj.warrantySoldFor += amount;
                        }
                    });
                    // console.log("results"+ res);
                    return callBack(null, last12Months);
                }

            }
        );
    },

    deletesByIdproduct: (id, callBack) => {
        pool.query(`delete from product_details where id=?`,
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


    deletesByIdcategory: (id, callBack) => {
        pool.query(`delete from category where id=?`,
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


    deletesByIdsubcategory: (id, callBack) => {
        pool.query(`delete from subcategory where id=?`,
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

    deletesByIdwarrantyprotection: (id, callBack) => {
        pool.query(`delete from warrantyprotection where id=?`,
            [
                id
            ],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results.length == 0) {
                    return callBack("Data not found");
                } else {
                    message = "Data deleted successfully";
                    return callBack(null, message);
                }
            }
        );
    },
    getUserWarrantyCommissionDetails: (data, callBack) => {
        let query = '';
        let params = [];

        if (data && data.fromDate && data.toDate) {
            // ✅ With Date Filter
            query = `
            SELECT 
                DATE_FORMAT(warranty.CurrentDate, '%Y-%m') AS Month,
                d.id AS dealership,
                d.tradeName,
                FORMAT(SUM(warranty.productCost), 2) AS totalCost,
                COUNT(*) AS warrantyCount,
                lm.firstname,
                lm.lastname,
                d.relationshipManagerPerc AS commissionPerc,
                ROUND(SUM(warranty.productCost) * d.relationshipManagerPerc / 100, 2) AS commissionEarned
            FROM warranty
            INNER JOIN dealership d ON d.id = warranty.dealership
            INNER JOIN login_master lm ON d.id = lm.dealership
            WHERE 
                warranty.Status = 'Closed Won'
                AND lm.id = ?
                AND warranty.CurrentDate BETWEEN ? AND ?
            GROUP BY 
                DATE_FORMAT(warranty.CurrentDate, '%Y-%m'),
                d.id,
                d.tradeName
            ORDER BY Month DESC
        `;
            params = [data.userId, data.fromDate, data.toDate];


        } else {
            // ✅ Without Date Filter
            query = `
            SELECT 
                DATE_FORMAT(warranty.CurrentDate, '%Y-%m') AS Month,
                d.id AS dealership,
                d.tradeName,
                FORMAT(SUM(warranty.productCost), 2) AS totalCost,
                COUNT(*) AS warrantyCount,
                lm.firstname,
                lm.lastname,
                d.relationshipManagerPerc AS commissionPerc,
                ROUND(SUM(warranty.productCost) * d.relationshipManagerPerc / 100, 2) AS commissionEarned
            FROM warranty
            INNER JOIN dealership d ON d.id = warranty.dealership
            INNER JOIN login_master lm ON d.id = lm.dealership
            WHERE 
                warranty.Status = 'Closed Won'
                AND lm.id = ?
            GROUP BY 
                DATE_FORMAT(warranty.CurrentDate, '%Y-%m'),
                d.id,
                d.tradeName
            ORDER BY Month DESC
        `;
            params = [data.userId];
        }

        // ✅ Execute the query
        pool.query(query, params, (err, results) => {
            if (err) {
                return callBack(err);
            } else if (!results || results.length === 0) {
                return callBack("Data Not Found");
            } else {
                return callBack(null, results);
            }
        });
    },
    getDealershipTotalCost: (data, callBack) => {

        let query = '';
        let params = [];

        if (data && data.dealership && data.yearMonth) {
            query = `SELECT 
    DATE_FORMAT(
        CASE
            WHEN CurrentDate LIKE '__-__-____'
                THEN STR_TO_DATE(CurrentDate, '%d-%m-%Y')
            ELSE STR_TO_DATE(CurrentDate, '%Y-%m-%d')
        END,
        '%Y-%m'
    ) AS Month,
    
    dealership.id AS dealership,
    dealership.tradeName,
    warranty.user,
    
    FORMAT(warranty.productCost, 2) AS formattedTotalCost,
    warranty.vinNoText,
    warranty.productCost,
    warranty.warrantySoldForText,
    warranty.make,
    warranty.model,
    warranty.year,
    warranty.id, 
    
    warranty.CurrentDate AS Submitted,
    warranty.CurrentDate AS Contract,
    warranty.customerLastName AS customerName

FROM 
    warranty
INNER JOIN 
    dealership ON dealership.id = warranty.dealership
WHERE 
    warranty.Status = 'Closed Won'
    AND warranty.deleteStatus = 0
    AND dealership.id = ?
    AND DATE_FORMAT(
        CASE
            WHEN CurrentDate LIKE '__-__-____'
                THEN STR_TO_DATE(CurrentDate, '%d-%m-%Y')
            ELSE STR_TO_DATE(CurrentDate, '%Y-%m-%d')
        END,
        '%Y-%m'
    ) = ?
ORDER BY 
    Month DESC`;
            params = [data.dealership, data.yearMonth];
        } else {
            query = `SELECT 
  DATE_FORMAT(
    CASE
      WHEN CurrentDate LIKE '__-__-____'
        THEN STR_TO_DATE(CurrentDate, '%d-%m-%Y')
      ELSE STR_TO_DATE(CurrentDate, '%Y-%m-%d')
    END,
    '%Y-%m'
  ) AS Month,
  dealership.id AS dealership,
  dealership.tradeName,
  FORMAT(SUM(productCost), 2) AS totalCost
FROM warranty
INNER JOIN dealership ON dealership.id = warranty.dealership
WHERE warranty.Status = 'Closed Won'
AND warranty.deleteStatus = 0
  AND dealership.id NOT IN (53, 132)
GROUP BY Month, dealership.id, dealership.tradeName
ORDER BY Month DESC`;
            params = [];
        }

        pool.query(query,
            params,
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results.length == 0) {
                    return callBack("Data not found");
                } else {
                    message = "Data deleted successfully";
                    return callBack(null, results);
                }
            }
        );
    },

    getDealershipUsers: (data, callBack) => {
        pool.query(
            `SELECT id, firstname, lastname FROM login_master where dealership = ?`,
            [data.dealership],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (!results.length) {
                    return callBack("Data Not Found");
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    getDealershipDateTotalCost: (data, callBack) => {
        pool.query(`SELECT 
    DATE_FORMAT(CurrentDate, '%Y-%m') AS Month,
    dealership.id AS dealership,
    dealership.tradeName,
    FORMAT(SUM(productCost), 2) AS totalCost
FROM 
    warranty
INNER JOIN 
    dealership ON dealership.id = warranty.dealership
WHERE 
    warranty.Status = 'Closed Won'
    AND warranty.deleteStatus = 0
    AND CurrentDate BETWEEN ? AND ?
GROUP BY 
    DATE_FORMAT(CurrentDate, '%Y-%m'),
    dealership.id,
    dealership.tradeName
ORDER BY 
    Month DESC`,
            [
                data.fromDate, data.toDate
            ],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results.length == 0) {
                    return callBack("Data not found");
                } else {
                    message = "Data deleted successfully";
                    return callBack(null, results);
                }
            }
        );
    },
    getUserWarrantyCommissionDetailsRM: (callBack) => {
        pool.query(
            `SELECT 
    DATE_FORMAT(warranty.CurrentDate, '%Y-%m') AS Month,
    d.id AS dealershipId,
    d.tradeName,
    lm.id AS managerId,
    lm.firstname,
    lm.lastname,
    FORMAT(SUM(warranty.productCost), 2) AS totalCost,
    COUNT(*) AS warrantyCount,
    r.relationsipPerc AS commissionPerc,
    ROUND(SUM(warranty.productCost) * r.relationsipPerc / 100, 2) AS commissionEarned
FROM warranty
INNER JOIN dealership d 
    ON d.id = warranty.dealership
INNER JOIN relationshipmanagerperc r
    ON r.dealershipId = d.id                 -- ✅ fetch managers mapped to this dealership
INNER JOIN login_master lm 
    ON lm.id = r.userId                       -- ✅ map % to actual user
WHERE 
    warranty.Status = 'Closed Won'
    AND warranty.CurrentDate >= lm.date
GROUP BY 
    DATE_FORMAT(warranty.CurrentDate, '%Y-%m'),
    d.id, d.tradeName,
    lm.id, lm.firstname, lm.lastname,
    r.relationsipPerc
ORDER BY 
    Month DESC`,
            [],
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
    getUserWarrantyCommissionDetailsSR: (data, callBack) => {
        var dealership = data.dealership;
        var queryNW = "";
        var parameter = "";
        if (dealership == 0) {
            queryNW = `SELECT DATE_FORMAT(warranty.CurrentDate, '%Y-%m') AS Month, lm.firstname, lm.lastname, lm.commissionPerc, lm.id, COUNT(*) AS warrantyCount, d.accountName, FORMAT(SUM(warranty.productCost), 2) AS totalCost,ROUND(SUM(warranty.productCost) * lm.commissionPerc / 100, 2) AS commissionEarned FROM warranty INNER JOIN login_master lm ON warranty.userId = lm.id INNER JOIN dealership d ON warranty.dealership = d.id WHERE warranty.Status = 'Closed Won' AND lm.commissionPerc > 0 GROUP BY Month, lm.firstname, lm.lastname, lm.commissionPerc, lm.id, d.accountName ORDER BY Month DESC`;
        } else {

            queryNW = `SELECT DATE_FORMAT(warranty.CurrentDate, '%Y-%m') AS Month, lm.firstname, lm.lastname, lm.commissionPerc, lm.id, COUNT(*) AS warrantyCount, d.accountName, FORMAT(SUM(warranty.productCost), 2) AS totalCost,ROUND(SUM(warranty.productCost) * lm.commissionPerc / 100, 2) AS commissionEarned FROM warranty INNER JOIN login_master lm ON warranty.userId = lm.id INNER JOIN dealership d ON warranty.dealership = d.id WHERE warranty.Status = 'Closed Won' AND lm.commissionPerc > 0 AND lm.dealership = ? GROUP BY Month, lm.firstname, lm.lastname, lm.commissionPerc, lm.id, d.accountName ORDER BY Month DESC`
            parameter = dealership;


        }
        pool.query(
            queryNW,
            parameter,
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
    getDateUserWarrantyCommissionDetailsSR: (data, callBack) => {
        pool.query(`SELECT DATE_FORMAT(warranty.CurrentDate, '%Y-%m') AS Month, lm.firstname, lm.lastname, lm.commissionPerc, lm.id, COUNT(*) AS warrantyCount, d.accountName, FORMAT(SUM(warranty.productCost), 2) AS totalCost,ROUND(SUM(warranty.productCost) * lm.commissionPerc / 100, 2) AS commissionEarned FROM warranty INNER JOIN login_master lm ON warranty.userId = lm.id INNER JOIN dealership d ON warranty.dealership = d.id WHERE warranty.Status = 'Closed Won' AND lm.commissionPerc > 0  AND warranty.CurrentDate BETWEEN ? AND ? GROUP BY Month, lm.firstname, lm.lastname, lm.commissionPerc, lm.id, d.accountName ORDER BY Month DESC`,
            [
                data.fromDate, data.toDate
            ],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (results.length == 0) {
                    return callBack("Data not found");
                } else {
                    message = "Data deleted successfully";
                    return callBack(null, results);
                }
            }
        );
    },
    getDateUserWarrantyCommissionDetailsRM: (data, callBack) => {
        pool.query(
            `SELECT DATE_FORMAT(warranty.CurrentDate, '%Y-%m') AS Month, d.id AS dealership, d.tradeName, FORMAT(SUM(warranty.productCost), 2) AS totalCost, COUNT(*) AS warrantyCount, lm.firstname, lm.lastname, d.relationshipManagerPerc as commissionPerc,ROUND(SUM(warranty.productCost) * d.relationshipManagerPerc / 100, 2) AS commissionEarned FROM warranty INNER JOIN dealership d ON d.id = warranty.dealership INNER JOIN login_master lm ON d.relationshipManager = lm.id WHERE warranty.Status = 'Closed Won' AND warranty.CurrentDate BETWEEN ? AND ? GROUP BY DATE_FORMAT(warranty.CurrentDate, '%Y-%m'), d.id, d.tradeName ORDER BY Month DESC;`,
            [
                data.fromDate, data.toDate
            ],
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
    getUserWarrantyGiftDetails: (data, callBack) => {
        let query = '';
        let params = [];

        if (data.fromDate && data.toDate) {
            // ✅ With Date Filter
            query = `SELECT 
    DATE_FORMAT(w.CurrentDate, '%Y-%m') AS Month,   
    COUNT(*) AS warrantyCount,
    d.accountName,
    FORMAT(SUM(w.productCost), 2) AS ProductCost,
    FORMAT(SUM(w.originalCost), 2) AS originalCost,
    SUM(w.giftCardCredit) AS totalGiftCardCredit
FROM warranty w
INNER JOIN login_master lm ON w.userId = lm.id
INNER JOIN dealership d ON w.dealership = d.id
WHERE 
    w.Status = 'Closed Won'
    AND w.giftCardCredit > 0
    AND w.dealership <> 42
    AND w.CurrentDate BETWEEN ? AND ?
GROUP BY 
    Month, d.accountName
ORDER BY 
    Month DESC`;
            params = [data.fromDate, data.toDate];

        } else {
            // ✅ Without Date Filter
            query = `
            SELECT 
    DATE_FORMAT(w.CurrentDate, '%Y-%m') AS Month,   
    COUNT(*) AS warrantyCount,
    d.accountName,
    FORMAT(SUM(w.productCost), 2) AS ProductCost,
    FORMAT(SUM(w.originalCost), 2) AS originalCost,
    SUM(w.giftCardCredit) AS totalGiftCardCredit
FROM warranty w
INNER JOIN login_master lm ON w.userId = lm.id
INNER JOIN dealership d ON w.dealership = d.id
WHERE 
    w.Status = 'Closed Won'
    AND w.giftCardCredit > 0
    AND w.dealership <> 42
GROUP BY 
    Month, d.accountName
ORDER BY 
    Month DESC
        `;
            params = [];
        }

        // ✅ Execute the query
        pool.query(query, params, (err, results) => {
            if (err) {
                return callBack(err);
            } else if (!results || results.length === 0) {
                return callBack("Data Not Found");
            } else {
                return callBack(null, results);
            }
        });
    },
    saveUserNote: (warrantyId, notes, filePaths, id, action, callBack) => {
        const filesJson = JSON.stringify(filePaths);

        if (action === 'edit' && id) {
            const updateQuery = `
            UPDATE adminwarrantynotes
            SET notes = ?, files = ?
            WHERE id = ?
        `;
            pool.query(updateQuery, [notes, filesJson, id], (updateErr, updateResults) => {
                if (updateErr) return callBack(updateErr);
                return callBack(null, updateResults);
            });
        } else {
            const insertQuery = `
            INSERT INTO adminwarrantynotes (warrantyId, notes, files)
            VALUES (?, ?, ?)
        `;
            pool.query(insertQuery, [warrantyId, notes, filesJson], (insertErr, insertResults) => {
                if (insertErr) return callBack(insertErr);
                return callBack(null, insertResults);
            });
        }
    },

    getUserNote: (data, callBack) => {
        pool.query(
            `SELECT * FROM adminwarrantynotes where warrantyId = ?`,
            [data.warrantyId],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else if (!results.length) {
                    return callBack("Data Not Found");
                } else {
                    return callBack(null, results);
                }
            }
        );
    },

    deleteUserNote: (data, callBack) => {
        const { id } = data;
        if (!id) return callBack({ success: 0, message: "Missing ID" });

        const deleteQuery = `DELETE FROM adminwarrantynotes WHERE id = ?`;
        pool.query(deleteQuery, [id], (err, results) => {
            if (err) return callBack(err);
            return callBack(null, { success: 1, message: "Deleted", data: results });
        });
    },
    getBrokerageDpt: (callback) => {
        pool.query(
            `SELECT id, firstname, lastname
            FROM login_master WHERE isBrokerageDpt = 1`,
            (err, results) => {
                if (err) return callback(err, null);
                return callback(null, results);
            }
        )
    },


















};
