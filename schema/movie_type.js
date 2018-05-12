const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;
const ActorType = require('./actor_type');
const Movie = mongoose.model('movie');

const MovieType = new GraphQLObjectType({
  name: 'MovieType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    director: { type: GraphQLString },
    releaseDate: { type: GraphQLString },
    rating: { type: GraphQLString },
    description: { type: GraphQLString },
    actors: {
      type: new GraphQLList(ActorType),
      resolve(parentValue) {
        return Movie.findActors(parentValue.id);
      }
    }
  })
});

module.exports = MovieType;
