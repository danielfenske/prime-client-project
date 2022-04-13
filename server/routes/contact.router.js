const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    default: axios
} = require('axios');

//  #region ==== CONTACT ROUTES ====
// get contacts
router.get('/', (req, res) => {

    let queryText = `SELECT * FROM "contact" WHERE "disabled" = false;`;

    if (req.isAuthenticated()) {
        pool.query(queryText)
            .then((result) => {
                let contactList = result.rows;

                res.send(contactList);
            })
            .catch((error) => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

// post contact
router.post('/', (req, res) => {

    let name = req.body.name;
    let phone = req.body.phone;
    let work_phone = req.body.work_phone;
    let email = req.body.email;

    let queryText = `INSERT INTO "contact" ("name", "phone", "work_phone", "email")
        VALUES($1, $2, $3, $4);`;

    if (req.isAuthenticated()) {
        pool.query(queryText, [name, phone, work_phone, email])
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((error) => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.put('/:id', (req, res) => {

    let name = req.body.name;
    let phone = req.body.phone;
    let work_phone = req.body.work_phone;
    let email = req.body.email;

    let contactId = req.params.id;

    let queryText = `UPDATE "contact" SET "name" = $1, "phone" = $2, "work_phone" = $3, "email" = $4 WHERE "id" = $5;`;

    if (req.isAuthenticated()) {
        pool.query(queryText, [name, phone, work_phone, email, contactId])
            .then((result) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.delete('/:id', (req, res) => {

    let disabled = true;
    let contactId = req.params.id;

    let queryText = `UPDATE "contact" SET "disabled" = $1 WHERE "id" = $2;`;

    if (req.isAuthenticated()) {
        pool.query(queryText, [disabled, contactId])
            .then((result) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;