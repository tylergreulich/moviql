const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoviePosterSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String },
  moviePoster: { type: String }
});

module.exports = mongoose.model('MovieImages', MoviePosterSchema);
