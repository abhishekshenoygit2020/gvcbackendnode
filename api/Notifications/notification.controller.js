const { getNotifications } = require("./notification.services");

module.exports = {
  getNotifications: (req, res) => {
    const id = req.query.id || null;

    getNotifications(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          data: err,
        });
      } else {
        return res.status(200).json({
          sucsess: 1,
          data: results,
        });
      }
    });
  },
};
