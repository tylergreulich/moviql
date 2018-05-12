const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} = graphql;
const MovieType = require('./movie_type');
const ActorType = require('./actor_type');
const Actor = mongoose.model('actor');
const Movie = mongoose.model('movie');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    movies: {
      // get all the movies
      type: new GraphQLList(MovieType),
      resolve() {
        return Movie.find({});
      }
    },
    movie: {
      type: MovieType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Movie.findById(id);
      }
    },
    actor: {
      type: ActorType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Actor.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
