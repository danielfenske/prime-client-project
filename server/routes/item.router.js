const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//fetch all items
router.get('/', (req, res) => {
    console.log('in item router GET request');


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
    console.log('in item router POST request');
    console.log('req.body is', req.body);
    const connection = await pool.connect();

    if (req.isAuthenticated()) {
        try {
            await connection.query('BEGIN;');

            const sqlText =
                `INSERT INTO "item" ("item_code", "name", "description", "price_per_price_unit", "unit_type_id")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING "id";`;

            const valueArray = [req.body.item_code, req.body.name, req.body.description, req.body.price_per_price_unit, req.body.unit_type_id];

            const newItem = await connection.query(sqlText, valueArray);
            const newItemId = newItem.rows[0].id;

            const sqlTextUnitWeight =
                `UPDATE "item" 
        SET "unit_weight" = CASE WHEN "unit_type_id" = 1 OR "unit_type_id" = 2 OR "unit_type_id" = 5 OR "unit_type_id" = 7  THEN 1
                                 WHEN "unit_type_id" = 6 THEN 0.01
                                 WHEN "unit_type_id" = 3 OR "unit_type_id" = 8 THEN $1
                                 WHEN "unit_type_id" = 4 OR "unit_type_id" = 9 THEN $1*0.01
                             END
        WHERE "id" = $2;`;

            const valueArrayUnitWeight = [req.body.unit_weight, newItemId];

            await connection.query(sqlTextUnitWeight, valueArrayUnitWeight);

            await connection.query('COMMIT;');
            res.sendStatus(200);
        } catch (error) {
            await connection.query('ROLLBACK;');
            console.log('Transaction Error', error);
            res.sendStatus(500);
        } finally {
            connection.release();
        }
    } else {
        res.sendStatus(403)
    }
});

module.exports = router;
