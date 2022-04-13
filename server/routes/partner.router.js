const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        let name = req.body.name; // name of partner
        // let userId = Number(req.user.id);
        let type = req.body.type; //no idea what this is
        let partner_code = req.body.partner_code; // the code for the partner? 3 letters?
        let partner_discount = req.body.partner_discount; //the percent value for the partner?
        let rounding_type = req.body.rounding_type; // ?????? why is this in this table? 
        let disabled = req.body.disabled; // boolean of whether or not the partner is active still or not
        
        console.log(name, partner_code, partner_discount, rounding_type, disabled);
        const queryText = ` INSERT INTO "partner" ("name", "type", "partner_code", "partner_discount", "rounding_type", "disabled")
                            VALUES($1, $2, $3, $4, $5, $6);`;
        pool
            .query(queryText, [type, partner_code, partner_discount, rounding_type, disabled])
            .then(() => res.sendStatus(201))
            .catch((error) => {
                console.log('Item Posted Failed: ', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403)
    }
});


module.exports = router;