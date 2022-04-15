const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    default: axios
} = require('axios');

// #region ==== PROPOSAL ROUTES ====

// get all proposals
router.get('/', (req, res) => {

    let disabled = false;
    let userId = req.user.id;
    let access_level = req.user.access_level;

    let queryText;
    let requestedProposals;

    console.log('userId', userId);
    console.log('access_level', access_level);

    if (req.isAuthenticated()) {
        if (access_level > 1) {
            queryText = `SELECT * FROM "proposal" WHERE "disabled" = $1;`

            pool.query(queryText, [disabled])
                .then((result) => {
                    let requestedProposals = result.rows;

                    res.send(requestedProposals);
                })
                .catch((error) => {
                    res.sendStatus(500);
                })

        } else {
            queryText = `
            SELECT "proposal".*
            
            FROM "opportunity"
            JOIN "proposal" ON "proposal"."opportunity_id" = "opportunity"."id"
            WHERE "opportunity"."user_id" = $1 AND "proposal"."disabled" = $2;`;

            pool.query(queryText, [userId, disabled])
                .then((result) => {
                    requestedProposals = result.rows;

                    res.send(requestedProposals);
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
router.get('/:opportunityId/:proposalId', (req, res) => {

    let opportunity_id = req.params.opportunityId;
    let id = req.params.proposalId;

    let queryText = `SELECT * FROM "proposal" WHERE "opportunity_id" = $1 AND "id" = $2;`;

    if (req.isAuthenticated()) {
        pool.query(queryText, [opportunity_id, id])
            .then((result) => {
                let requestedProposal = result.rows[0];

                res.send(requestedProposal);
            })
            .catch((error) => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
})

// post new proposal
router.post('/:id', async (req, res) => {

    let opportunity_id = req.params.id;

    let queryText = `INSERT INTO "proposal" ("opportunity_id") VALUES ($1) RETURNING id;`;

    if (req.isAuthenticated()) {

        try {
            const result = await pool.query(queryText, [opportunity_id])

            const proposalId = result.rows[0].id;
    
            res.send({proposalId: proposalId});

        } catch (error) {
            re.sendStatus(500);
        }

    } else {
        res.sendStatus(403);
    }
})

// update general info for proposal
router.put('/:id', (req, res) => {

    let proposalId = req.params.id;

    let date = req.body.date;
    let proposal_code = req.body.proposal_code;
    let house_type = req.body.house_type;
    let plan_identifier = req.body.plan_identifier;
    let plan_date = req.body.plan_date;
    let building_code = req.body.building_code;
    let partner_discount = req.body.partner_discount;
    let surcharge = req.body.surcharge;
    let surcharge_description = req.body.surcharge_description;
    let method = req.body.method;
    let method_message = req.body.method_message;
    let delivery_charge = req.body.delivery_charge;
    let field_weld_charge = req.body.field_weld_charge;
    let field_weld_message = req.body.field_weld_message;
    let description = req.body.description;

    let queryText = `UPDATE "proposal" SET 
    "date" = $1,
    proposal_code = $2,
    house_type = $3,
    plan_identifier = $4,
    plan_date = $5, 
    building_code = $6,
    partner_discount = $7,
    surcharge = $8,
    surcharge_description = $9,
    method = $10,
    method_message = $11,
    delivery_charge = $12,
    field_weld_charge = $13,
    field_weld_message = $14,
    description = $15 
    
    WHERE "id" = $16;`;

    if (req.isAuthenticated()) {
        pool.query(queryText,
                [date, proposal_code, house_type, plan_identifier, plan_date,
                    building_code, partner_discount, surcharge, surcharge_description,
                    method, method_message, delivery_charge, field_weld_charge,
                    field_weld_message, description, proposalId
                ])
            .then((result) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
})

// delete (disable) proposal
router.delete('/:id', (req, res) => {

    let disabled = true;
    let id = req.params.id;

    let queryText = `UPDATE "proposal" SET "disabled" = $1 WHERE "id" = $2;`;

    if (req.isAuthenticated()) {
        
        pool.query(queryText, [disabled, id])
            .then((result) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;