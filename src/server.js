const express = require("express"); // Imported the express function
const app = express(); // Captures the return value of express() in app, this is the web server
const db = require("./db/connection"); // Grabs the db constant from my connection file
const { User } = require("./models"); // Grabs the User model from my models folder

// Tells my app to start listening on port 3000, any code under this will not run.
app.listen(3000, async () => {
  // This controller/handler will run as soon as app.listen starts listening on port 3000
  await db.sync();
  console.log("Server is running");
});

// Code here will not run unless app.listen fails
