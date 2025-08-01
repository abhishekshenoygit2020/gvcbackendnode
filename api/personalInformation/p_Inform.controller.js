const { creates, gets, getsById, updates, deletesById, getsByEmail} = require("./p_Inform.services");


module.exports = {
    create:(req,res) => {
        const body = req.body;
        creates(body, (err, results) => {
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
     getById:(req,res) => {
        const id = req.params.id;
        getsById(id, (err, results) => {
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
     getByEmail:(req,res) => {
        const data = req.body;
        getsByEmail(data, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    success:1,
                    data:results
                });
            }
        });
     },
     get:(req,res) => {        
        gets((err, results) => {
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
     update:(req,res) => {
        const body = req.body;
        const id = req.params.id;
        updates(body, id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    message:results
                });
            }
        });
     },
     deleteById:(req,res) => {
        const id = req.params.id;
        deletesById(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    error:err,
                    status:500
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     }
};

