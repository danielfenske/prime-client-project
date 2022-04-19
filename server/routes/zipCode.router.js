const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/:zip/:id', rejectUnauthenticated, (req, res) => {
    const zip = req.params.zip;
    const opportunityId = req.params.id;
    axios.get(`https://service.zipapi.us/zipcode/${zip}/?X-API-KEY=${process.env.API_KEY}`)
        .then((response) => {
            const city = response.data.data.city;
            const state = response.data.data.state;
            const sqlText = `UPDATE "opportunity" SET "city" = $1, "state" = $2, "zip" = $3 WHERE "id" = $4;`;
            pool.query(sqlText, [city, state, zip, opportunityId])
                .then((result) => {
                    res.sendStatus(200)
                }).catch((error) => {
                    console.log('error updating SQL', error);
                })
        }).catch((error) => {
            console.log('error GETTING from API', error);
        })
});


module.exports = router;