const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/config');

// Set up Handlebars.js engine with custom helpers
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sesh = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 300000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
};

app.use(session(sesh));

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// Turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('Now listening on port ${PORT}!');
    });
});