const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// fetch all headings per proposal
router.get('/:id', (req, res) => {
  console.log('in heading router GET route, req.params.id is', req.params.id);

  if (req.isAuthenticated()) {

    const sqlText = `SELECT * FROM "heading" WHERE "heading"."proposal_id" = $1 ORDER BY "heading"."id";`;

    pool.query(sqlText, [req.params.id])
      .then((result) => {
        console.log('result.rows is', result.rows);
        res.send(result.rows);
      }).catch((error) => {
        console.log('error in item router GETting all headings', error);
        res.sendStatus(500)
      })
  } else {
    res.sendStatus(403)
  }
});

// add a new heading
router.post('/', (req, res) => {
  // console.log('in heading router POST route');
  // console.log('req.body is', req.body);
  if (req.isAuthenticated()) {

    const sqlText =
      `INSERT INTO "heading" ("name", "message", "proposal_id", "surcharge", "taxable")
            VALUES ($1, $2, $3, $4, $5);`;

    const valueArray = [req.body.name, req.body.message, req.body.proposal_id, req.body.surcharge, req.body.taxable];

    pool.query(sqlText, valueArray)
      .then((result) => {
        res.sendStatus(201);
      }).catch((error) => {
        console.log('error posting a new heading', error);
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403)
  }
});

// update a heading
router.put('/:id', (req, res) => {
  // console.log('in heading router PUT route');
  // console.log('req.body is', req.body);
  if (req.isAuthenticated()) {
    const sqlText =
      `UPDATE "heading" 
         SET "name" = $1, "message" = $2, "proposal_id" = $3, "surcharge" = $4, "taxable" = $5
         WHERE "id" = $6;`

    const valueArray = [req.body.name, req.body.message, req.body.proposal_id, req.body.surcharge, req.body.taxable, req.params.id]

    pool.query(sqlText, valueArray)
      .then((result) => {
        res.sendStatus(200)
      }).catch((error) => {
        console.log('Error updating a heading', error);
        res.sendStatus(500)
      })
  } else {
    res.sendStatus(403)
  }
})

// delete a heading
router.delete('/:id', (req, res) => {
  // console.log('in heading router DELETE route');
  if (req.isAuthenticated()) {
    const sqlText = `DELETE FROM "heading" WHERE "id" = $1`;

    pool.query(sqlText, [req.params.id])
      .then((result) => {
        res.sendStatus(200);
      }).catch((error) => {
        console.log('Error deleting a heading', error);
        res.sendStatus(500)
      })
  } else {
    res.sendStatus(403)
  }
});

//get all line items per heading
router.get('/:id/item', (req, res) => {
  // console.log('in heading/item router GET route');

  if (req.isAuthenticated()) {
    const sqlText = `SELECT * FROM "item_heading" WHERE "heading_id" = $1 ORDER BY "id";`
    pool.query(sqlText, [req.params.id])
      .then((result) => {
        console.log('result.rows is', result.rows);
        res.send(result.rows);
      }).catch((error) => {
        console.log('error in item router GETting all headings', error);
        res.sendStatus(500)
      })
  } else {
    res.sendStatus(403)
  }
});

//get all line items and related item information
router.get('/item_with_item_code/:id', (req, res) => {
  // console.log('in heading/item_with_item_code router GET route');

  if (req.isAuthenticated()) {

    const sqlText =
      `SELECT
        "item_heading"."id",
        "item_heading"."heading_id",
        "item_heading"."item_id",
        "item_heading"."message",
        "item_heading"."order",
        "item_heading"."price_per_pricing_unit" AS "override_price",
        "item_heading"."ft",
        "item_heading"."inches",
        "item_heading"."measurement_per_unit",
        "item_heading"."rounded_measurement_per_unit",
        "item_heading"."rounded_measurement_per_unit_unit_weight",
        "item_heading"."qty",
        "item_heading"."single_item_price",
        "item_heading"."item_price_total",
        "item"."item_code",
        "item"."name",
        "item"."price_per_pricing_unit" AS "default_price",
        "item"."unit_weight",
        "unit_type"."measurement_unit",
        "unit_type"."pricing_unit"
      FROM "item_heading"
      JOIN "item"
      ON "item_heading"."item_id" = "item"."id"
      JOIN "unit_type"
      ON "item"."unit_type_id" = "unit_type"."id";
    `;

    pool.query(sqlText)
      .then((result) => {
        console.log('result.rows is', result.rows);
        res.send(result.rows);
      }).catch((error) => {
        console.log('error in item_heading/item_code router GETting all data', error);
        res.sendStatus(500)
      })
  } else {
    res.sendStatus(403);
  }

})

// add a new line item (this will create an empty item card)
router.post('/:id/item', (req, res) => {
  console.log('in heading/item router POST route');
  console.log('req.params.id is', req.params.id);

  if (req.isAuthenticated()) {
    const sqlText =
      `INSERT INTO "item_heading" ("heading_id", "item_id")
        VALUES ($1, 1)`;

    const valueArray = [req.params.id];

    pool.query(sqlText, valueArray)
      .then((result) => {
        res.sendStatus(201)
      }).catch((error) => {
        console.log('error posting a new heading', error);
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403)
  }
});

//update the item code of a line item
router.put('/item/item_code', async (req, res) => {
  // console.log('in heading/item/item_code PUT route');
  // console.log('req.body is', req.body);

  if (req.isAuthenticated()) {

    // use this to get the item so we can update its information
    const itemSqlText = `SELECT * FROM "item" WHERE "id" = $1;`;
    const itemSqlOptions = [req.body.item_id];
    const item = await pool.query(itemSqlText, itemSqlOptions);

    const sqlText =
      `UPDATE "item_heading"
        SET 
          "item_id" = $1,
          "price_per_pricing_unit" = $2
        WHERE "id" = $3;
      `;

    const valueArray = [req.body.item_id, item.price_per_pricing_unit, req.body.heading_item_id]

    pool.query(sqlText, valueArray)
      .then((result) => {
        res.sendStatus(200);
      }).catch((error) => {
        console.log('error updating item code in the line item', error);
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403);
  }
});

// update a new line item (the user actually saves the information on the new line item or updates an existing line item)
router.put('/item/update', async (req, res) => {
  // console.log('in heading/item router PUT route');
  // console.log('req.body is', req.body);
  const connection = await pool.connect();

  if (req.isAuthenticated()) {
    try {
      await connection.query('BEGIN;');


      const sqlText =
        `UPDATE "item_heading"
                 SET "measurement_per_unit" = $1, "qty" = $2, "price_per_pricing_unit" = $3, "message" = $4
                 WHERE "id" = $5;`;

      const valueArray = [req.body.measurement_per_unit, req.body.qty, req.body.price_per_pricing_unit, req.body.message, req.body.heading_item_id];

      await connection.query(sqlText, valueArray);

      // rounded_measure_per_unit gets updated based on the partner rounding type
      const sqlTextRounding =
        `UPDATE "item_heading"
                SET "rounded_measurement_per_unit" = CASE WHEN "partner"."rounding_type" = 1 THEN "measurement_per_unit"
                                                  WHEN "partner"."rounding_type" = 2 THEN (SELECT CASE WHEN "item"."unit_type_id" = 1 THEN "measurement_per_unit"
                                                                                                       WHEN "item"."unit_type_id" != 1 THEN CEILING("measurement_per_unit")
                                                                                                  END)
                                                         
                                                  WHEN "partner"."rounding_type" = 3 THEN (SELECT CASE WHEN "item"."unit_type_id" = 1 THEN "measurement_per_unit"
                                                                                                       WHEN "item"."unit_type_id" != 1 THEN CEILING("measurement_per_unit"/5.0)*5
                                                                                                  END)
                                             END
                FROM "item",
                     "unit_type",
                     "heading",
                     "proposal",
                     "opportunity",
                     "partner"
                WHERE "item"."unit_type_id" = "unit_type"."id"
                  AND "item_heading"."item_id" = "item"."id"
                  AND "heading"."id" = "item_heading"."heading_id"
                  AND "proposal"."id" = "heading"."proposal_id"
                  AND "opportunity"."id" = "proposal"."opportunity_id"
                  AND "partner"."id" = "opportunity"."partner_id"
                  AND "item_heading"."id" = $1;`;

      await connection.query(sqlTextRounding, [req.body.heading_item_id]);

      //calculate rounded_measurement_per_unit_*_unit_weight

      const sqlTextPriceUnit =
        `UPDATE "item_heading"
             SET "rounded_measurement_per_unit_unit_weight" = "rounded_measurement_per_unit" * "item"."unit_weight"
             FROM "item"
             WHERE "item_heading"."item_id" = "item"."id"
             AND "item_heading"."id" = $1;`;

      await connection.query(sqlTextPriceUnit, [req.body.heading_item_id]);

      //calculate single_item_price

      const sqlTextSingleUnitPrice =
        `UPDATE "item_heading"
             SET "single_item_price" = "rounded_measurement_per_unit_unit_weight"*"price_per_pricing_unit"
             WHERE "item_heading"."id" = $1;`;

      await connection.query(sqlTextSingleUnitPrice, [req.body.heading_item_id]);

      //calculate total_item_price

      const sqlTextTotalItemPrice =
        `UPDATE "item_heading"
             SET "item_price_total" = "single_item_price"*"qty"
             WHERE "item_heading"."id" = $1;`;

      await connection.query(sqlTextTotalItemPrice, [req.body.heading_item_id]);

      await connection.query('COMMIT;');
      res.sendStatus(200);
    } catch (error) {
      await connection.query('ROLLBACK;');
      console.log('Transaction Error', error);
      res.sendStatus(500);
    } finally {
      connection.release();
    }
  } else {
    res.sendStatus(403)
  }
});

// update a new line item with ft and inches (the user actually saves the information on the new line item or updates an existing line item)
router.put('/item/update/ft_inches', async (req, res) => {
  // console.log('in heading/item/ft_inches router PUT route');
  console.log('req.body is', req.body);
  const connection = await pool.connect();

  if (req.isAuthenticated()) {
    try {
      await connection.query('BEGIN;');


      const sqlText =
        `UPDATE "item_heading"
          SET "ft" = $1,
          "inches" = $2,
          "qty" = $3,
          "order" = $4,
          "price_per_pricing_unit" = $5,
          "message" = $6
          WHERE "id" = $7;`;

      const valueArray = [req.body.ft, req.body.inches, req.body.qty, req.body.order, req.body.price_per_pricing_unit, req.body.message, req.body.heading_item_id];

      await connection.query(sqlText, valueArray);

      // convert ft and inches to ft(measure_unit)

      const sqlTextConvert =
        `UPDATE "item_heading"
             SET "measurement_per_unit" = "ft" + "inches" * 0.0833333
             WHERE "id" = $1;`;

      await connection.query(sqlTextConvert, [req.body.heading_item_id]);

      // rounded_measure_unit gets updated based on the partner rounding type
      const sqlTextRounding =
        `UPDATE "item_heading"
        SET "rounded_measurement_per_unit" = CASE WHEN "partner"."rounding_type" = 1 THEN "measurement_per_unit"
                                         WHEN "partner"."rounding_type" = 2 THEN CEILING("measurement_per_unit")
                                         WHEN "partner"."rounding_type" = 3 THEN CEILING("measurement_per_unit"/5.0)*5
                                            END
        FROM "heading",
        "proposal",
        "opportunity",
        "partner"
        WHERE "heading"."id" = "item_heading"."heading_id"
          AND "proposal"."id" = "heading"."proposal_id"
          AND "opportunity"."id" = "proposal"."opportunity_id"
          AND "partner"."id" = "opportunity"."partner_id"
          AND "item_heading"."id" = $1; `;

      await connection.query(sqlTextRounding, [req.body.heading_item_id]);

      //calculate rounded_measurement_per_unit_*_unit_weight

      const sqlTextPriceUnit =
        `UPDATE "item_heading"
             SET "rounded_measurement_per_unit_unit_weight" = "rounded_measurement_per_unit" * "item"."unit_weight"
             FROM "item"
             WHERE "item_heading"."item_id" = "item"."id"
             AND "item_heading"."id" = $1; `;

      await connection.query(sqlTextPriceUnit, [req.body.heading_item_id]);

      //calculate single_unit_price

      const sqlTextSingleUnitPrice =
        `UPDATE "item_heading"
             SET "single_item_price" = "rounded_measurement_per_unit_unit_weight"*"price_per_pricing_unit"
             WHERE "item_heading"."id" = $1; `;

      await connection.query(sqlTextSingleUnitPrice, [req.body.heading_item_id]);

      //calculate total_item_price

      const sqlTextTotalItemPrice =
        `UPDATE "item_heading"
             SET "item_price_total" = "single_item_price" * "qty"
             WHERE "item_heading"."id" = $1; `;

      await connection.query(sqlTextTotalItemPrice, [req.body.heading_item_id]);



      await connection.query('COMMIT;');
      res.sendStatus(200);
    } catch (error) {
      await connection.query('ROLLBACK;');
      console.log('Transaction Error', error);
      res.sendStatus(500);
    } finally {
      connection.release();
    }
  } else {
    res.sendStatus(403)
  }
});

// //update line item order (go down)
// router.put('/item/order_down', async (req, res) => {
//     // console.log('in heading/item/order_down router PUT route');
//     // console.log('req.body is', req.body);
//     const connection = await pool.connect();

//     if (req.isAuthenticated()) {
//         try {
//             await connection.query('BEGIN;');

//             const sqlText =
//                 `UPDATE "item_heading"
//                  SET "order" = "order" + 1
//                  WHERE "heading_id" = $1 AND "order" = $2
//                  RETURNING "item_id", "order";`;

//             const valueArray = [req.body.heading_id, req.body.order];

//             const response = await connection.query(sqlText, valueArray);
//             console.log('response is', response.rows[0].item_id);

//             const idToUpdate = response.rows[0].item_id;
//             const orderToUpdate = response.rows[0].order;


//             // update the order value of the row that now has the same order
//             const sqlTextRounding =
//             `UPDATE "item_heading"
//             SET "order" = "order" - 1
//             WHERE "heading_id" = $1 AND "order" = $2 AND "item_id" != $3;`;

//             await connection.query(sqlTextRounding, [req.body.heading_id, orderToUpdate, idToUpdate]);
//             console.log('updated the second order');


//             await connection.query('COMMIT;');
//             res.sendStatus(200);
//         } catch (error) {
//             await connection.query('ROLLBACK;');
//             console.log('Transaction Error', error);
//             res.sendStatus(500);
//         } finally {
//             connection.release();
//         }
//     } else {
//         res.sendStatus(403)
//     }
// });

// //update line item order (go up)
// router.put('/item/order_up', async (req, res) => {
//     // console.log('in heading/item/order_up router PUT route');
//     // console.log('req.body is', req.body);
//     const connection = await pool.connect();

//     if (req.isAuthenticated()) {
//         try {
//             await connection.query('BEGIN;');

//             const sqlText =
//                 `UPDATE "item_heading"
//                  SET "order" = "order" - 1
//                  WHERE "heading_id" = $1 AND "order" = $2
//                  RETURNING "item_id", "order";`;

//             const valueArray = [req.body.heading_id, req.body.order];

//             const response = await connection.query(sqlText, valueArray);
//             console.log('response is', response.rows[0].item_id);

//             const idToUpdate = response.rows[0].item_id;
//             const orderToUpdate = response.rows[0].order;


//             // update the order value of the row that now has the same order
//             const sqlTextRounding =
//             `UPDATE "item_heading"
//             SET "order" = "order" + 1
//             WHERE "heading_id" = $1 AND "order" = $2 AND "item_id" != $3;`;

//             await connection.query(sqlTextRounding, [req.body.heading_id, orderToUpdate, idToUpdate]);
//             console.log('updated the second order');


//             await connection.query('COMMIT;');
//             res.sendStatus(200);
//         } catch (error) {
//             await connection.query('ROLLBACK;');
//             console.log('Transaction Error', error);
//             res.sendStatus(500);
//         } finally {
//             connection.release();
//         }
//     } else {
//         res.sendStatus(403)
//     }
// });


// delete a line item
router.delete('/item/:id', (req, res) => {
  // console.log('in heading/item router DELETE route', req.params.id);
  if (req.isAuthenticated()) {
    const sqlText = `DELETE FROM "item_heading" WHERE "id" = $1;`;

    pool.query(sqlText, [req.params.id])
      .then((result) => {
        res.sendStatus(200);
      }).catch((error) => {
        console.log('Error deleting a line item', error);
        res.sendStatus(500)
      })
  } else {
    res.sendStatus(403)
  }
});






module.exports = router;