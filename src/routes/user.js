const { body, validationResult } = require("express-validator");
const { User } = require("../models");
const { Router } = require("express");
const userRouter = Router();

userRouter.get("/byName/:name", async (req, res) => {
  try {
    const user = await User.findOne({ where: { name: req.params.name } });
    if (!user) {
      throw new Error("Not found");
    } else {
      res.status(200).send({ user });
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).send({ allUsers }); // {allUsers: allUsers}
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

userRouter.post("/", body("email").isEmail(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Not a valid email");
    }
    const user = await User.create(req.body);
    if (!user) {
      throw new Error("User not created");
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});

module.exports = userRouter;
