const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'movie'
  },
  likes: { type: Number, default: 0 },
  firstName: { type: String },
  lastName: { type: String }
});

mongoose.model('actor', ActorSchema);
