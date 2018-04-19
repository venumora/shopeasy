const db = require("../models");
const ObjectId = require('mongodb').ObjectID;


// Defining methods for the productsController
module.exports = {
  findAll: function (req, res) {
    db.Placement
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Placement
      .findOne({ _id: ObjectId(req.params.id) })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Placement
      .create(req.body)
      .then(dbModel => {
        db.Store.findOneAndUpdate(
          { _id: ObjectId(req.body.store) }, { $push: { placements: dbModel._id } }, { new: true }
        )
          .then(() => res.json(dbModel));
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Placement
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Placement
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
