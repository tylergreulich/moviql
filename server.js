const express = require('express');
const models = require('./models');
const schema = require('./schema/schema');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');

const mongoose = require('mongoose');

const session = require('express-session');

const passport = require('passport');

const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);

const port = 4000;
const cors = require('cors');
// const keys = require('./keys');

const app = express();

const posters = require('./routes/poster');

const MONGO_URI = 'mongodb://tyler:tyler@ds119800.mlab.com:19800/moviql';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true // <-- REQUIRED backend setting
};

app.use(cors(corsOptions)); // not having cors enabled will cause an access control error

// app.use();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: 'aaabbbccc',
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  '/graphql',
  bodyParser.json(),
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.use('/uploads', express.static('uploads'));

// Handle requests
app.use('/poster', posters);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(`${port}`, () => {
  console.log(`Listening on Port: ${port}`);
});

module.exports = app;
