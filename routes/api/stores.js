const router = require("express").Router();
const storesController = require("../../controllers/storesController");

// Matches with "/api/stores"
router.route("/")
  .post(storesController.create);

// Matches with "/api/stores/:id"
router
  .route("/:id")
  .get(storesController.findById);

module.exports = router;
