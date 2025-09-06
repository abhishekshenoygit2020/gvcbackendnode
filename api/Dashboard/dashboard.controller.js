const { getLastMonthSales, getTotalCost } = require("./dashboard.services");

module.exports = {
  // get last months Sales 
    getLastMonthSales :(req,res) => {   
        const {id, user_type } = req.params;
        getLastMonthSales(id, user_type, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },

    getTotalCost : (req,res) => {   
        const id = req.params.id;  
        getTotalCost(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
};
