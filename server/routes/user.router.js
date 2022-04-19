const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// gets all the users from the database (not including the admins)
router.get('/all', rejectUnauthenticated, async (req, res) => {
  if (req.user.access_level > 2) {
    try {
      const sqlText = `
        SELECT
          "id",
          "username",
          "first_name",
          "last_name",
          "access_level"
        FROM "user" WHERE "access_level" < 3 AND "disabled" != true;
      `;

      const response = await pool.query(sqlText);

      res.send(response.rows);
    } catch (err) {
      // send internal server error to client
      console.error('Error in /api/user/all get', err);
      res.sendStatus(500);
    }
  } else {
    // send unauthenticated to client
    res.sendStatus(403);
  }
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password, first_name, last_name)
    VALUES ($1, $2, '', '') RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// update a users password through the admin view
router.put('/update/admin/password', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      // get the user id and password from the request
      const { userId, newPassword } = req.body;

      // encrypt the new password
      const password = encryptLib.encryptPassword(newPassword);

      // sql query
      const sqlText = `
        UPDATE "user" SET "password" = $1
        WHERE
          "id" = $2 AND
          "id" = $3;
      `
      // sql options for preventing sql injection
      const sqlOption = [password, userId, req.user.id];

      // query the database
      await pool.query(sqlText, sqlOption);

      res.sendStatus(201);
    } catch (err) {
      console.error('Error in password update', err);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
})

router.put('/update', async (req, res) => {
  if (req.isAuthenticated() && req.user.access_level > 2) {
    try {

      // console.log(req.body);

      res.sendStatus(201);
    } catch (err) {
      console.error('Error updating user', err);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
})

// update a users password when from the logged in user
router.put('/update/user/password', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      // get the user id and password from the request
      const { userId, newPassword } = req.body;

      // encrypt the new password
      const password = encryptLib.encryptPassword(newPassword);

      // sql query
      const sqlText = `
        UPDATE "user" SET "password" = $1
        WHERE
          "id" = $2 AND
          "id" = $3;
      `
      // sql options for preventing sql injection
      const sqlOption = [password, userId, req.user.id];

      // query the database
      await pool.query(sqlText, sqlOption);

      res.sendStatus(201);
    } catch (err) {
      console.error('Error in password update', err);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
})

router.delete('/:id', (req, res) => {
  if (req.isAuthenticated()) {
      let disabled = true;
      let id = req.params.id;
      let queryText = `UPDATE "user" SET "disabled" = $1 WHERE "id" = $2;`;
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
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
