const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const partnerRouter = require('./routes/partner.router.js');
const itemRouter = require('./routes/item.router');
const headingRouter = require('./routes/heading.router');
const contactRouter = require('./routes/contact.router');
const unitTypeRouter = require('./routes/unit_type.router');
const opportunityRouter = require('./routes/opportunity.router');
const proposalRouter = require('./routes/proposal.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/partner', partnerRouter);
app.use('/api/item', itemRouter);
app.use('/api/heading', headingRouter);
app.use('/api/contact', contactRouter);
app.use('/api/unit_type', unitTypeRouter);
app.use('/api/opportunity', opportunityRouter);
app.use('/api/proposal', proposalRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
