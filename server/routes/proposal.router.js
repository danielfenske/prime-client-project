const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    default: axios
} = require('axios');

// #region ==== PROPOSAL ROUTES ====
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