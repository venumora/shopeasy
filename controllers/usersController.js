const db = require("../models");

// Defining methods for the UsersController
module.exports = {
  findById: function(req, res) {
    db.User
      .findOne({id :req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
