const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// fetch all headings
router.get('/', (req, res) => {
    console.log('in heading router GET route');

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
    console.log('in heading router POST route');
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
router.post('/:id/item', (req, res) => {
    console.log('in heading/item router POST route');
    console.log('req.body is', req.body);

    if (req.isAuthenticated()) {
        const sqlText =
        `INSERT INTO "item_heading" ("heading_id")
        VALUES ($1)
        RETURNING "id";`;

        const valueArray = [req.params.id];

        pool.query(sqlText, valueArray)
            .then((result) => {
                console.log('new item_heading id is', result.rows[0].id);
                res.send(result.rows)
            }).catch((error) => {
                console.log('error posting a new heading', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403)
    }
});

// update a new line item
router.put('/:id/item/:id', async (req, res) => {
    console.log('in heading/item router PUT route');
    console.log('req.body is', req.body);
    const connection = await pool.connect();

    if (req.isAuthenticated()) {
        try{
        await connection.query('BEGIN;');

        const sqlText = 
        `UPDATE "item_heading"
         SET "item_id" = $1, "order" = $2, "measure_unit" = $3, "qty" = $4
         WHERE "id" = $5;`;

        const valueArray = [req.body.item_id, req.body.order, req.body.measure_unit, req.body.qty, req.body.id];
        
        await connection.query(sqlText, valueArray);

        const sqlTextRounding = 
        `UPDATE "item_heading"
        SET "rounded_measure_unit" = CASE WHEN "partner"."rounding_type" = 1 THEN "measure_unit"
                                         WHEN "partner"."rounding_type" = 2 THEN CEILING("measure_unit")
                                         WHEN "partner"."rounding_type" = 3 THEN CEILING("measure_unit"/5.0)*5
                                            END
        FROM "heading",
             "proposal",
             "opportunity",
             "partner"
        WHERE "heading"."id" = "item_heading"."heading_id"
          AND "proposal"."id" = "heading"."proposal_id"
          AND "opportunity"."id" = "proposal"."opportunity_id"
          AND "partner"."id" = "opportunity"."partner_id"
          AND "item_heading"."id" = $1;`;

        const valueArrayRounding = [req.body.id];

        await connection.query(sqlTextRounding, valueArrayRounding);
        
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