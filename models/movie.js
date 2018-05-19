const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  title: { type: String },
  genre: { type: String },
  director: { type: String },
  releaseDate: { type: String },
  rating: { type: String },
  description: { type: String },
  actors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'actor'
    }
  ],
  likes: { type: Number, default: 0 },
  imgUrl: { type: String },
  headerImg: { type: String }
});

MovieSchema.statics.addActor = function(id, firstName, lastName) {
  const Actor = mongoose.model('actor');

  return this.findById(id).then(movie => {
    const actor = new Actor({ firstName, lastName, movie });
    movie.actors.push(actor);
    return Promise.all([actor.save(), movie.save()]).then(
      ([actor, movie]) => movie
    );
  });
};

MovieSchema.statics.like = function(id) {
  const Movie = mongoose.model('movie');

  return Movie.findById(id).then(movie => {
    ++movie.likes;
    return movie.save();
  });
};

MovieSchema.statics.findActors = function(id) {
  return this.findById(id)
    .populate('actors')
    .then(movie => movie.actors);
};

module.exports = mongoose.model('movie', MovieSchema);
