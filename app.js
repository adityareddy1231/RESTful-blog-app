//Please see package.json for all dependencies.
var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  methodOverride = require('method-override'),
  expressSanitizer = require('express-sanitizer'),
  app = express();

//Connecting to mongoDB with mongoose
mongoose.connect("mongodb://localhost/restful_blog_app");

//Defining data schema
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
});

//Modelling the schema
var blog = mongoose.model("blog", blogSchema);

//Setting stactic directory to public
app.use(express.static("public"));

//Overriding regular form methods in HTML to specify put and delete methods
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(expressSanitizer());

app.set("view engine", "ejs");

//Redirecting all traffic to index route
app.get("/", function(req, res) {
  res.redirect("/blogs");
});

//Index route
app.get("/blogs", function(req, res) {
  blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        blogs: blogs
      });
    }
  });
});

//New route - Shows form for new blog post
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

//Create route - create a new post in the database then redirect
app.post("/blogs", function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

//Show route - shows detailed info of selected blog post
app.get("/blogs/:id", function(req, res) {
  blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", {
        blog: foundBlog
      });
    }
  });
});

//Edit route - Shows edit form for selected blog post
app.get("/blogs/:id/edit", function(req, res) {
  blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      console.log(err);
    } else {
      res.render("edit", {
        blog: foundBlog
      });
    }
  });
});

//Update route - Update the particular blog post and then redirect
app.put("/blogs/:id", function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

//Delete route - Remove the blog post from the database and then redirect
app.delete("/blogs/:id", function(req, res) {
  blog.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/blogs");
    }
  });
});

app.listen(1337, "127.0.0.1", function() {
  console.log("restful_blog_app server has started!");
});
