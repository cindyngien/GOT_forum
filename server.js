var express = require("express"),
    path = require("path"),
    bp = require("body-parser"),
    app = express(),
    passport = require("passport");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client')));

require('./server/config/mongoose.js');
require(__dirname + '/server/config/routes.js')(app);

//Server-Side Controllers//
PostsController = require('./server/controllers/posts.js');
CommentsController = require('./server/controllers/comments.js');

var server = app.listen(8000, function() {
  console.log("Listening for port 8000");
});
