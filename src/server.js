const express = require("express"); // Imported the express function
const app = express(); // Captures the return value of express() in app, this is the web server
const db = require("./db/connection"); // Grabs the db constant from my connection file
const { User } = require("./models"); // Grabs the User model from my models folder

app.use(express.json()); // Middleware for parsing JSON

app.post("/user", async (req, res) => {
  try {
    // const userObj = req.body;
    const user = await User.create(req.body);

    res.status(200).send({ msg: "Success", user });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

app.get("/user", async (req, res) => {
  try {
    // Cannot accept body
    const allUsers = await User.findAll();
    res.status(200).send({ allUsers });
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

app.put("/user", async (req, res) => {
  try {
    const result = await User.update(req.body.update, {
      where: req.body.where,
    });
    if (result[0] > 0) {
      res.status(200).send({ msg: "Success" });
    } else {
      throw new Error("No update made");
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    // Cannot accept body
    const deleted = User.destroy({ where: { id: req.params.id } });

    if (deleted[0] > 0) {
      res.status(200).send({ msg: "Success" });
    } else {
      throw new Error("Not deleted");
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

// Tells my app to start listening on port 3000, any code under this will not run.
app.listen(3000, async () => {
  // This controller/handler will run as soon as app.listen starts listening on port 3000
  await db.sync();
  console.log("Server is running");
});
// Code here will not run unless app.listen fails
