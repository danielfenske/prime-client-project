const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//fetch all unit_type
router.get('/', (req, res) => {
    console.log('in unit_type router GET route');


    if (req.isAuthenticated()) {

        const sqlText = `SELECT * FROM "unit_type";`;

        pool.query(sqlText)
        .then((result) => {
            console.log('result.rows is', result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in item router GETting all items', error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
});


//fetch one unit_type of an item
router.get('/item/:item_id', (req, res) => {
    console.log('in unit_type router Get one unit_type route');
    console.log('req.params.item_id is', req.params.item_id);
    

    if(req.isAuthenticated()) {
        const sqlText = 
        `SELECT "unit_type"."id", "unit_type"."measurement_unit", "unit_type"."pricing_unit"
        FROM "unit_type" 
        JOIN "item"
        ON "item"."unit_type_id" = "unit_type"."id"
        WHERE "item"."id" = $1;`;

        pool.query(sqlText, [req.params.item_id])
        .then((result) => {
            console.log('result.rows is', result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('error GETting one unit_type', error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;
