var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  methodOverride = require('method-override'),
  expressSanitizer = require('express-sanitizer'),
  app = express();

mongoose.connect("mongodb://localhost/restful_blog_app");

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
});

var blog = mongoose.model("blog", blogSchema);

app.use(express.static("public"));

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(expressSanitizer());

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.redirect("/blogs");
});

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

app.get("/blogs/new", function(req, res) {
  res.render("new");
});

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
