const { creates, gets, getsById, updates, deletesById,getByCategoryId,getProductFeatures, createsDealershipProduct,getDealershipProduct,updateDealershipProduct,deletesByIdDealershipProduct,createsSalesrepProduct,getSalesrepProduct,updateSalesrepProduct,deletesByIdSalesrepProduct } = require("./product.services");
const fs = require('fs');
const mime = require('mime');

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
     createsDealershipProduct:(req,res) => {
        const body = req.body;
        createsDealershipProduct(body, (err, results) => {
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
     createsSalesrepProduct:(req,res) => {
        const body = req.body;
        createsSalesrepProduct(body, (err, results) => {
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
     getDealershipProduct:(req,res) => {       
        getDealershipProduct((err, results) => {
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
     getSalesrepProduct:(req,res) => {       
        getSalesrepProduct((err, results) => {
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
     getByCategoryId:(req,res) => {
        const id = req.params.id;
        getByCategoryId(id, (err, results) => {
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
     getProductFeatures:(req,res) => {
        const id = req.params.id;
        const body = req.body;
        getProductFeatures(id,body,(err, results) => {
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

        // to declare some path to store your converted image
        const folderName = './Images';      
        const relativePath = '/Images';  
        const path = folderName + '/' + Date.now()+'.pdf';
        const imgdata = req.body.pdf;
        // to convert base64 format into random filename

        if(imgdata){
            const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, ''); 
            const flag = 0;  
            if (!fs.existsSync(folderName)) {                
                fs.mkdirSync(folderName);
                fs.writeFileSync(path, base64Data,  {encoding: 'base64'});                         
            }else{
                fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
            }    
    
            body.pdf = path.replace(folderName, relativePath);
        }
             

        updates(body, id, (err, results) => {
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
     updateDealershipProduct:(req,res) => {
        const body = req.body;
        const id = req.params.id;

        // to declare some path to store your converted image
        const folderName = './Images';      
        const relativePath = '/Images';  
        const path = folderName + '/' + Date.now()+'.pdf';
        const imgdata = req.body.pdf;
        // to convert base64 format into random filename

        if(imgdata){
            const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, ''); 
            const flag = 0;  
            if (!fs.existsSync(folderName)) {                
                fs.mkdirSync(folderName);
                fs.writeFileSync(path, base64Data,  {encoding: 'base64'});                         
            }else{
                fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
            }    
    
            body.pdf = path.replace(folderName, relativePath);
        }
             

        updateDealershipProduct(body, id, (err, results) => {
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
     updateSalesrepProduct:(req,res) => {
        const body = req.body;
        const id = req.params.id;

        // to declare some path to store your converted image
        const folderName = './Images';      
        const relativePath = '/Images';  
        const path = folderName + '/' + Date.now()+'.pdf';
        const imgdata = req.body.pdf;
        // to convert base64 format into random filename

        if(imgdata){
            const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, ''); 
            const flag = 0;  
            if (!fs.existsSync(folderName)) {                
                fs.mkdirSync(folderName);
                fs.writeFileSync(path, base64Data,  {encoding: 'base64'});                         
            }else{
                fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
            }    
    
            body.pdf = path.replace(folderName, relativePath);
        }
             

        updateSalesrepProduct(body, id, (err, results) => {
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
     },
     deletesByIdDealershipProduct:(req,res) => {
        const id = req.params.id;
        deletesByIdDealershipProduct(id, (err, results) => {
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
     },
     deletesByIdSalesrepProduct:(req,res) => {
        const id = req.params.id;
        deletesByIdSalesrepProduct(id, (err, results) => {
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
     },
};

