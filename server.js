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

const MONGO_URI = keys.MONGO_URI;
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
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
  // apolloUploadExpress({ uploadDir: './' }),
);

app.listen(`${port}`, () => {
  console.log(`Listening on Port: ${port}`);
});

module.exports = app;
