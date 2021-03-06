const express = require("express");
const User = require('./user-model');
const db = require("../../data/db-config.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  db("users")
    .then(users => {
      res.json(users);
    })
    .catch(next)
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.getUserBy(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
});

router.get("/:id/posts", async (req, res, next) => {
  try {
    res.json(await User.getPostsBy(req.params.id))
  } catch (err) {
    next(err)
  }
})

router.post("/", (req, res) => {
  const userData = req.body;

  db("users")
    .insert(userData, "id")
    .then(ids => {
      res.status(201).json({ created: ids[0] });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("users")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("users")
    .where({ id })
    .del()
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;
