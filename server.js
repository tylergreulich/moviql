const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const models = require('./models');
const bodyParser = require('body-parser');
const port = 4000;
const schema = require('./schema/schema');
const { apolloUploadExpress } = require('apollo-upload-server');
const cors = require('cors');
const keys = require('./keys');

const posters = require('./routes/poster');

const MONGO_URI = process.env.MONGO_DEV;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(cors()); // not having cors enabled will cause an access control error
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
  // apolloUploadExpress({ uploadDir: './' }),
);

app.use('/uploads', express.static('uploads'));

// Handle requests
app.use('/poster', posters);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

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
