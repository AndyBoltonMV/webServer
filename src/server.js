const express = require("express"); // Imported the express function
const app = express(); // Captures the return value of express() in app
const db = require("./db/connection");
const { User } = require("./models");

app.use("/andyWeb", express.static("public"));
// .use is adding functionality to the app web server
// "/andyWeb" is a router/path that I am creating, it doesn't point to a file/folder
// express.static is an express method for serving static files
// it takes a folder location from the parent directory

app.post("/createUser", async (request, response) => {
  console.log(request);
  console.log(response);
  const user = await User.create({
    username: "AndyB",
    email: "andyb@email.com",
    password: "test123",
  });
  response.send(user);
});

app.listen(3000, async () => {
  await db.sync();
  console.log("Server is running");
});
