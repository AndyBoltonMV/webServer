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

// Day 2 request params

app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw new Error("No user found");
    }
    res.status(200).send({ user });
  } catch (error) {
    res.status(404).send({ err: error.message });
  }
});

/*
response = await fetch...
data = await response.json()...
if (data.status === 404) {
  do some error handling
  alert(incorrect credentials)
}
*/

app.listen(3000, async () => {
  await db.sync();
  console.log("Server is running");
});
