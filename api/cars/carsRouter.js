const express = require("express");

const db = require("../../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("cars")
    .then(cars => {
      res.status(200).json({ data: cars });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.post("/", (req, res) => {
  const car = req.body;

  db("cars")
    .insert(car)
    .returning("id")
    .then(ids => {
      res.status(201).json({ inserted: ids });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const carId = req.params.id;

  db("cars")
    .where({ id: carId })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: "updated successfully" });
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", (req, res) => {
  const carId = req.params.id;

  db("cars")
    .where({ id: carId })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ message: "removed successfully" });
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

module.exports = router; 