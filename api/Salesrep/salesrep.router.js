const express = require('express');
const router = express.Router();
const salesrepController = require('./salesrep.controller'); // make sure this file has the methods


// Get salesrep by email
router.post('/', salesrepController.get);

// Post salesrep by data
router.post('/add', salesrepController.create);
router.post('/:id/update', salesrepController.update);

// Get salesrep by ID
router.get('/:id', salesrepController.getById);

// Get salesrep by email
router.get('/email', salesrepController.getByEmail);

module.exports = router;