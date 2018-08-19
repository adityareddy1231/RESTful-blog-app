var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  app = express();

mongoose.connect("mongodb://localhost/restful_blog_app");

app.set("view-engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

var blog = mongoose.model("blog", blogSchema);

blog.create({
  title: "Test Blog",
  image: "https://images.unsplash.com/photo-1534575180408-b7d7c0136ee8?ixlib=rb-0.3.5&s=367ff10fba304039102c67f8d92b170d&auto=format&fit=crop&w=1350&q=80",
  body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
});

app.listen(1337, "127.0.0.1", function() {
  console.log("Zorro's yelp server has started!");
});
