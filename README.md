# RESTful-blog-app
A simple blog application that follows RESTful routing conventions and displays CRUD functionality, built with mongoDB, express, node and semantic UI.

Usage Instructions:-

1) You will need to have mongoDB installed and running on one terminal -- mongod
2) Run the app.js file with node -- node app.js
3) By default the application will run on port 1337 and ip "127.0.0.1". So you can visit the homepage with http://127.0.0.1:1337
4) The port and ip can be changed by editing the app.js file at 
   app.listen(1337, "127.0.0.1", function() {
     console.log("restful_blog_app server has started!");
   });

P.S:- I will be deploying my apps to heroku for live preview soon
