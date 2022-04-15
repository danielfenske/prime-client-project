const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//fetch all items
router.get('/', (req, res) => {
    console.log('in item router GET route');


    if (req.isAuthenticated()) {

        const sqlText = `SELECT * FROM "item";`;

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

// create a new item
router.post('/', async (req, res) => {
    console.log('in item router POST route');
    console.log('req.body is', req.body);
    const connection = await pool.connect();

    if (req.isAuthenticated()) {
        
            const sqlText =
            `INSERT INTO "item" ("item_code", "name", "description", "price_per_price_unit", "unit_type_id", "unit_weight")
            VALUES ($1, $2, $3, $4, $5);`;

            const valueArray = [req.body.item_code, req.body.name, req.body.description, req.body.price_per_price_unit, req.body.unit_type_id];
            pool.query(sqlText, valueArray)
            .then((result) => {
                res.sendStatus(200);
            }).catch((error) => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403)
    }
});


module.exports = router;
