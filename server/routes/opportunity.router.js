const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const access_level = req.user.access_level;
    let sqlText;

    console.log(access_level);
    

    if (access_level > 1) {
        sqlText = `SELECT * FROM "opportunity"`

        pool.query(sqlText)
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
        })
    } else {
        sqlText = `SELECT * FROM "opportunity" WHERE "user_id" = $1`;
        
        pool.query(sqlText, [userId])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
        })
    }

});





router.put('/', rejectUnauthenticated, (req, res) => {
    // getting the user
    const userId = req.user.id;


    // need variables for the values that are being changed
    // req.body

    const opportunity_code = 'somethingFromFrontEnd';
    const sqlText = ` UPDATE "opportunity"
    SET "name" = $1, 
    SET "opportunity_code" = $2, 
    SET "status" = $2, 
    SET "due_date" = $3, 
    SET "type" = $4, 
    SET "community_name" = $5, 
    SET "development_type" = $6, 
    SET "address_line_1" = $6, 
    SET "city" = $7, 
    SET "state" = $8, 
    SET "zip" = $9, 
    SET "tax_rate" = $10
    WHERE "opportunity_code" = ${opportunity_code};`;

    pool.query(sqlText)
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
        });
})

//access level
//user id


module.exports = router;