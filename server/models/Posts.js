var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  author: String
});

PostSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
  console.log('the posts upvote has been saved');
};

mongoose.model('Post', PostSchema);
