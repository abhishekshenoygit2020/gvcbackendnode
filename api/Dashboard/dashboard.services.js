const pool = require("../../config/dbconfig");

module.exports = {
   getLastMonthSales: (id, user_type, callBack) => {
    if (user_type === "admin") {
      pool.query(
      //         `SELECT 
      //     c.categoryName,
      //     COUNT(*) AS category_count,
      //     SUM(w.warrantySoldFor) AS last_month_sales
      // FROM category c
      // JOIN dealership_product_details dpd 
      //     ON c.id = dpd.category
      // JOIN warranty w 
      //     ON dpd.category = w.warrantyClass
      // WHERE w.status = 'Closed Won'
      //   AND (w.deleteStatus = 0 OR w.deleteStatus = '') 
      //   AND w.CurrentDate BETWEEN DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH, '%Y-%m-01')
      //                         AND LAST_DAY(CURDATE() - INTERVAL 1 MONTH)
      // GROUP BY c.categoryName;
      // `,
      `SELECT 
            CASE p.package_id
                WHEN 0 THEN 'Essential Warranty'
                WHEN 1 THEN 'Premium Warranty'
                WHEN 2 THEN 'GAP Protection'
            END AS categoryName,
            IFNULL(SUM(w.warrantySoldFor), 0) AS last_month_sales
        FROM (
            SELECT 0 AS package_id UNION ALL SELECT 1 UNION ALL SELECT 2
        ) p
        LEFT JOIN warranty w 
            ON w.packages = p.package_id
          AND w.Status = 'Closed Won'
          AND (w.deleteStatus = 0 OR w.deleteStatus = '')
          AND w.dealership <> 42
          AND w.CurrentDate BETWEEN DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH, '%Y-%m-01')
                                  AND LAST_DAY(CURDATE() - INTERVAL 1 MONTH)
        GROUP BY p.package_id
        ORDER BY p.package_id;`,
        (err, results) => {
          if (err) {
            return callBack(err);
          } else {
            return callBack(null, results);
          }
        }
      );
    } else  {
      pool.query(
          `SELECT 
            CASE p.package_id
                WHEN 0 THEN 'Essential Warranty'
                WHEN 1 THEN 'Premium Warranty'
                WHEN 2 THEN 'GAP Protection'
            END AS categoryName,
            IFNULL(SUM(w.warrantySoldFor), 0) AS last_month_sales
        FROM (
            SELECT 0 AS package_id UNION ALL SELECT 1 UNION ALL SELECT 2
        ) p
        LEFT JOIN warranty w 
            ON w.packages = p.package_id
          AND w.Status = 'Closed Won'
          AND (w.deleteStatus = 0 OR w.deleteStatus = '')
          AND w.dealership <> 42
          AND w.CurrentDate BETWEEN DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH, '%Y-%m-01')
                                  AND LAST_DAY(CURDATE() - INTERVAL 1 MONTH) AND dealership = ?
        GROUP BY p.package_id
        ORDER BY p.package_id;`,
        [id], 
        (err, results) => {
          if (err) {
            return callBack(err);
          } else {
            return callBack(null, results);
          }
        }
      );
    }
  },

  getTotalCost: (id, callBack) => {

    if(id == 0){
      pool.query(
        // `SELECT 
        //       DATE_FORMAT(CurrentDate, '%Y-%m') AS YearMonth,
        //       SUM(productCost) AS  TotalProductCost ,
        //       SUM(warrantySoldFor) AS TotalSold,
        //       SUM(warrantySoldFor - productCost) AS TotalProfit
        //   FROM warranty
        //     WHERE CurrentDate BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 10 MONTH), '%Y-%m-01')
        //                         AND LAST_DAY(DATE_ADD(CURDATE(), INTERVAL 1 MONTH))
        //   GROUP BY YearMonth
        //   ORDER BY YearMonth
        // `,
        `SELECT 
              DATE_FORMAT(CurrentDate, '%Y-%m') AS YearMonth,
              SUM(productCost) AS TotalProductCost,
              SUM(warrantySoldFor) AS TotalSold,
              SUM(warrantySoldFor - productCost) AS TotalProfit
          FROM warranty
          WHERE (deleteStatus = 0 OR deleteStatus = '') 
            AND Status = 'Closed Won'
            AND CurrentDate BETWEEN DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 10 MONTH)
                                AND LAST_DAY(CURDATE()) AND dealership <> 42
          GROUP BY YearMonth
          ORDER BY YearMonth;
          `,
        (err, results) => {
          if (err) {
            return callBack(err);
          } else {
            return callBack(null, results);  // ✅ this is an array
          }
        }
      );
        }else{
          pool.query(
          // `SELECT 
          //       DATE_FORMAT(CurrentDate, '%Y-%m') AS YearMonth,
          //       SUM(productCost) AS TotalProductCost,
          //       SUM(warrantySoldFor) AS TotalSold,
          //       SUM(warrantySoldFor - productCost) AS TotalProfit
          //   FROM warranty
          //   WHERE dealership = ?
          //     AND CurrentDate BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 10 MONTH), '%Y-%m-01')
          //                         AND LAST_DAY(DATE_ADD(CURDATE(), INTERVAL 1 MONTH))
          //   GROUP BY YearMonth
          //   ORDER BY YearMonth
          // `,
         `SELECT 
              DATE_FORMAT(CurrentDate, '%Y-%m') AS YearMonth,
              SUM(productCost) AS TotalProductCost,
              SUM(warrantySoldFor) AS TotalSold,
              SUM(warrantySoldFor - productCost) AS TotalProfit
          FROM warranty
          WHERE (deleteStatus = 0 OR deleteStatus = '') 
          	AND dealership = 48
            AND Status = 'Closed Won'
            AND CurrentDate BETWEEN DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 10 MONTH)
                                AND LAST_DAY(CURDATE()) AND dealership <> 42
          GROUP BY YearMonth
          ORDER BY YearMonth;` ,[id],
        (err, results) => {
          if (err) {
            return callBack(err);
          } else {
            return callBack(null, results);  // ✅ this is an array
          }
        }
      );
    }
  },
saveTermsCondition: (content, callBack) => {
  pool.query(
    `INSERT INTO terms_conditions (content) VALUES ($1) RETURNING *`,
    [content],
    (err, results) => {
      if (err) {
        return callBack(err);
      }
      return callBack(null, results.rows[0]); // return the inserted row
    }
  );
}





};




// AND w.CurrentDate >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH)
//           AND w.CurrentDate < DATE_SUB(CURDATE(), INTERVAL 1 MONTH)