const express = require('express');
const { Connection } = require('pg');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
});

// create a new item
router.post('/', (req, res) => {
    console.log('in item POST router');
    console.log('req.body is', req.body);
    const connection = await pool.connect();

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

  




         
  
});

module.exports = router;
