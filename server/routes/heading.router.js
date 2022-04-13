const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// fetch all headings
router.get('/', (req, res) => {
    console.log('in heading router GET request');

    if (req.isAuthenticated()) {

        const sqlText = `SELECT * FROM "heading";`;

        pool.query(sqlText)
        .then((result) => {
            console.log('result.rows is', result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in item router GETting all headings', error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
});

// add a new heading
router.post('/', (req, res) => {
    console.log('in heading router POST request');
    console.log('req.body is', req.body);
    if (req.isAuthenticated()) {

        const sqlText =
            `INSERT INTO "heading" ("name", "message", "proposal_id", "surcharge", "order", "taxable")
            VALUES ($1, $2, $3, $4, $5, $6);`;

        const valueArray = [req.body.name, req.body.message, req.body.proposal_id, req.body.surcharge, req.body.order, req.body.taxable];

        pool.query(sqlText, valueArray)
            .then((result) => {
                res.sendStatus(201);
            }).catch((error) => {
                console.log('error posting a new heading', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403)
    }
});


router.get('/item', (req, res) => {
    // GET route code here
});

// add a new line item
router.post('/item', (req, res) => {
    console.log('in item router POST request');
    console.log('req.body is', req.body);

    


});

module.exports = router;