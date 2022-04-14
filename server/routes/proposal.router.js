const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    default: axios
} = require('axios');

// #region ==== PROPOSAL ROUTES ====

// get all proposals
router.get('/', (req, res) => {

    let userId = req.user.id;
    let access_level = req.user.access_level;

    let queryText;
    let requestedProposals;

    console.log('userId', userId);
    console.log('access_level', access_level);

    if (req.isAuthenticated()) {
        if (access_level > 1) {
            queryText = `SELECT * FROM "proposal";`;

            pool.query(queryText)
                .then((result) => {
                    
                    requestedProposals = result.rows;

                    res.sendStatus(requestedProposals);
                })
                .catch((error) => {
                    res.sendStatus(500);
                })

        } else {
            queryText = `
            SELECT "proposal".*
            
            FROM "opportunity"
            JOIN "proposal" ON "proposal"."opportunity_id" = "opportunity"."id"
            WHERE "opportunity"."user_id" = $1;`;

            pool.query(queryText, [userId])
                .then((result) => {

                    requestedProposals = result.rows;

                    res.sendStatus(requestedProposals);
                })
                .catch((error) => {
                    res.sendStatus(500);
                })
        }
    } else {
        res.sendStatus(403);
    }
})

// get single proposal
router.get('/:id', (req, res) => {

    let opportunity_id = req.params.id;

    let queryText = `SELECT * FROM "proposal" WHERE "opportunity_id" = $1;`;

    if (req.isAuthenticated()) {
        pool.query(queryText, [opportunity_id])
            .then((result) => {
                let requestedProposal = result.rows;

                res.send(requestedProposal);
            })
            .catch((error) => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;