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

    if (req.isAuthenticated()) {
        if (access_level > 1) {
            queryText = `SELECT * FROM "proposal"`

            pool.query(queryText)
                .then((result) => {

                    let requestedProposals = result.rows;

                    res.sendStatus(requestedProposals);
                })
                .catch((error) => {
                    res.sendStatus(500);
                })

        } else {
            queryText = `
            SELECT 
            "proposal"."id", 
            "proposal"."date",
            "proposal"."proposal_code",
            "proposal"."opportunity_id",
            "proposal"."house_type",
            "proposal"."plan_identifier",
            "proposal"."plan_date",
            "proposal"."building_code",
            "proposal"."partner_discount",
            "proposal"."surcharge",
            "proposal"."surcharge_description",
            "proposal"."method",
            "proposal"."method_message",
            "proposal"."delivery_charge",
            "proposal"."field_weld_charge",
            "proposal"."field_weld_message",
            "proposal"."description",
            "proposal"."disabled"
            
            FROM "opportunity"
            JOIN "proposal" ON "proposal"."opportunity_id" = "opportunity"."id"
            WHERE "opportunity_id" = 1 AND "opportunity"."user_id" = $1;`

            pool.query(queryText, [userId])
                .then((result) => {

                    let requestedProposals = result.rows;

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