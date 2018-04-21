const db = require("../models");
const ObjectId = require('mongodb').ObjectID;


// Defining methods for the productsController
module.exports = {
  findAll: function (req, res) {
    const regQuery = { $regex: new RegExp(req.params.key, 'i') };
    const query = req.params.key === 'all' ? { store: ObjectId(req.params.store) } : {
      $and: [
        { store: ObjectId(req.params.store) },
        { $or: [{ name: regQuery }, { keywords: { $in: [new RegExp(req.params.key, 'i')] } }] }
      ]
    };
    db.Product
      .find(query)
      .sort({ name: -1 })
      .populate('placements')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Product
      .findOne({ _id: ObjectId(req.params.id) })
      .populate('placements')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Product
      .create(req.body)
      .then(dbModel => {
        db.Store.findOneAndUpdate(
          { _id: ObjectId(req.body.store) }, { $push: { products: dbModel._id } }, { new: true })
          .then(() => res.json(dbModel));
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Product
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Product
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
