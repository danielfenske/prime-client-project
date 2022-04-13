const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/api/opportunity', rejectUnauthenticated, (req, res) => {
    const userId = rew.user.id;
    const sqlText = `SELECT * FROM "opportunity" WHERE "user_id" = $1`;

    pool.query(sqlText, [userId])
        .then((response) => {
            res.send(result.rows)
        })
});