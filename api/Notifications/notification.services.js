const pool = require("../../config/dbconfig");

module.exports = {
  getNotifications: (id, callBack) => {
    pool.query(
      `SELECT * FROM notifications ORDER BY date DESC`,
      (err, results) => {
        if (err) {
          return callBack(err);
        } else if (!results.length) {
          return callBack("No notifications found");
        } else {
          return callBack(null, results);
        }
      }
    );
  },
  markAllRead: (callBack) => {
    pool.query(
      `UPDATE notifications SET status = 1 `,
      (err, results) => {
        if (err) {
          return callBack(err)
        } else {
          return callBack(null, results)
        }
      }
    )
  }
};
