const db = require("../models");
const ObjectId = require('mongodb').ObjectID;

// Defining methods for the storesController
module.exports = {
  findById: function(req, res) {
    db.Store
      .findOne({ user: ObjectId(req.params.id) })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    db.Store
      .find(req.query)
      .sort({ name: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Store
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
