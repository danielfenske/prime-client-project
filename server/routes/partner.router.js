const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/post', (req, res) => {
    if (req.isAuthenticated()) {
        let name = req.body.name; // name of partner
        let type = req.body.type; 
        let partner_code = req.body.partner_code; 
        let partner_discount = req.body.partner_discount; //the percent value for the partner?
        let rounding_type = req.body.rounding_type;
        let phone_number = req.body.phone_number;
        let address = req.body.address_line_1;
        let city = req.body.city;
        let state = req.body.state;
        let zip = req.body.zip;
        let disabled = req.body.disabled;// boolean of whether or not the partner is active still or not
        
        console.log(name, type, partner_code, partner_discount, rounding_type, phone_number, address, city, state, zip, disabled);
        const queryText = `INSERT INTO "partner" ("name", "type", "partner_code", "partner_discount", "rounding_type", "phone_number", "address_line_1", "city", "state", "zip", "disabled")
                            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
        pool
            .query(queryText, [name, type, partner_code, partner_discount, rounding_type, phone_number, address, city, state, zip, disabled])
            .then(() => res.sendStatus(201))
            .catch((error) => {
                console.log('Item Posted Failed: ', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403)
    }
});

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const queryText = `SELECT * FROM "partner";`;
      pool
        .query(queryText)
        .then((result) => {
          res.send(result.rows)
        })
        .catch((error) => {
          console.log('rut ro scoob', error);
        })
    } else {
      res.sendStatus(403);
    }
  });
  
// Update this single partner
router.put('/:id', (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);
    if (req.isAuthenticated()) {
        let name = req.body.name; // name of partner
        let type = req.body.type; 
        let partner_code = req.body.partner_code; 
        let partner_discount = req.body.partner_discount; //the percent value for the partner?
        let rounding_type = req.body.rounding_type;
        let phone_number = req.body.phone_number;
        let address = req.body.address_line_1;
        let city = req.body.city;
        let state = req.body.state;
        let zip = req.body.zip;
        let disabled = req.body.disabled;
  
      const idToUpdate = req.params.id;
      const sqlText = `UPDATE "partner" SET "name" = $1, "type" = $2, "partner_code" = $3, "partner_discount" = $4 , "rounding_type" = $5, "phone_number" = $6, "address_line_1" = $7, "city" = $8, "state" = $9, "zip" = $10, "disabled" = $11 WHERE "id" = $12;`;
      pool.query(sqlText, [name, type, partner_code, partner_discount, rounding_type, phone_number, address, city, state, zip, disabled, idToUpdate])
        .then((result) => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log(`Error making database query ${sqlText}`, error);
          res.sendStatus(500);
        });
  
    } else {
      res.sendStatus(403);
    }
  
  });

module.exports = router;