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
    title: { type: GraphQLString, required: true },
    genre: { type: GraphQLString, required: true },
    director: { type: GraphQLString },
    releaseDate: { type: GraphQLString },
    rating: { type: GraphQLString },
    description: { type: GraphQLString, required: true },
    actors: {
      type: new GraphQLList(ActorType),
      resolve(parentValue) {
        return Movie.findActors(parentValue.id);
      }
    },
    imgUrl: { type: GraphQLString },
    headerImg: { type: GraphQLString }
  })
});

module.exports = MovieType;
