const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



// GET for ALL opportunities with conditions
router.get('/', rejectUnauthenticated, (req, res) => {

    const userId = req.user.id;
    const access_level = req.user.access_level;
    let sqlText;

    console.log(access_level);

    // GET all opportunities for an admin
    if (access_level > 1) {
        sqlText = `SELECT * FROM "opportunity" WHERE "disabled" = false ORDER BY "id" DESC;`;

        pool.query(sqlText)
            .then((result) => {
                res.send(result.rows)
            }).catch((error) => {
                console.log(error);
            })
        // GET for all opportunities, associated with that user 
    } else {
        sqlText = `SELECT * FROM "opportunity" WHERE "user_id" = $1 AND "disabled" = false;`;

        pool.query(sqlText, [userId])
            .then((result) => {
                res.send(result.rows)
            }).catch((error) => {
                console.log(error);
            })
    }

});

// GET for specific opportunity that the user clicked on
router.get('/:id', rejectUnauthenticated, (req, res) => {
    // get for a single opportunity

    // unique opportunity id
    const opportunityId = req.params.id;
    const sqlText = `SELECT * FROM "opportunity" WHERE "id" = $1;`

    pool.query(sqlText, [opportunityId])
        .then((result) => {
            res.send(result.rows[0])
        }).catch((error) => {
            console.log(error);
        })
});



router.post('/', rejectUnauthenticated, async (req, res) => {

    const userId = req.user.id;
    const defaultOpportunityCode = 'AAA-2022-01';
    const defaultName = 'new opportunity';

    const sqlText = `INSERT INTO "opportunity" ("user_id", "opportunity_code", "name")
    VALUES($1, $2, $3) RETURNING id;`;

    try {
        const result = await pool.query(sqlText, [userId, defaultOpportunityCode, defaultName])

        const opportunity_id = result.rows[0].id;

        res.send({ opportunity_id: opportunity_id });

    } catch (error) {
        res.sendStatus(500);
    }
});




router.put('/:id', rejectUnauthenticated, (req, res) => {
    // getting the user
    const userId = req.user.id;
    const opportunityCode = req.params.id;

    // need variables for the values that are being changed
    // req.body
    const sqlText = ` UPDATE "opportunity"
    SET "name" = $1, 
    "status" = $2, 
    "due_date" = $3, 
    "type" = $4, 
    "community_name" = $5, 
    "development_type" = $6, 
    "address_line_1" = $7, 
    "city" = $8, 
    "state" = $9, 
    "zip" = $10, 
    "tax_rate" = $11,
    "opportunity_code" = $12
    WHERE "id" = $13;`;

    pool.query(sqlText, [req.body.name, req.body.status, req.body.due_date, req.body.type, req.body.community_name, req.body.development_type, req.body.address_line_1, req.body.city, req.body.state, req.body.zip, req.body.tax_rate, req.body.opportunity_code, opportunityCode])
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
        });
})




router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // opportunity id
    const opportunityId = req.params.id;
    const sqlText = `UPDATE "opportunity"
    SET "disabled" = true
    WHERE "id" = $1;`;

    pool.query(sqlText, [opportunityId])
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
        })

})


module.exports = router;