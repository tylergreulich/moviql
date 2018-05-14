const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt
} = graphql;
const mongoose = require('mongoose');
const Movie = mongoose.model('movie');
const Actor = mongoose.model('actor');
const MovieType = require('./movie_type');
const ActorType = require('./actor_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addActor: {
      type: ActorType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { firstName, lastName }) {
        return new Actor({ firstName, lastName }).save();
      }
    },
    addActorToMovie: {
      type: MovieType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        movieId: { type: GraphQLID }
      },
      resolve(parentValue, { firstName, lastName, movieId }) {
        return Movie.addActor(movieId, firstName, lastName);
      }
    },
    deleteActor: {
      type: ActorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return Actor.remove({ _id: id });
      }
    },
    addMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString, required: true },
        genre: { type: GraphQLString, required: true },
        director: { type: GraphQLString },
        releaseDate: { type: GraphQLString },
        rating: { type: GraphQLString },
        description: { type: GraphQLString },
        imgUrl: { type: GraphQLString }
      },
      resolve(
        parentValue,
        {
          title,
          director,
          genre,
          releaseDate,
          rating,
          description,
          imgUrl,
          uploadFile
        }
      ) {
        return new Movie({
          title,
          director,
          genre,
          releaseDate,
          rating,
          description,
          imgUrl,
          uploadFile
        }).save();
      }
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return Movie.remove({ _id: id });
      }
    },
    likeMovie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Movie.like(id);
      }
    }
  }
});

module.exports = mutation;
