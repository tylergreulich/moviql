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
const User = mongoose.model('user');
const MovieType = require('../types/movie_type');
const ActorType = require('../types/actor_type');
const UserType = require('../types/user_type');
const AuthService = require('../../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    },
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
        description: { type: GraphQLString, required: true },
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
