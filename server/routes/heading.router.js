const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
 router.get('/item', (req, res) => {
    // GET route code here
  });
  
// add a new line item
  router.post('/', (req, res) => {
    console.log('in item router POST request');
    console.log('req.body is', req.body);
  });

module.exports = router;