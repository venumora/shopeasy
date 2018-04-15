const router = require("express").Router();
const placementsController = require("../../controllers/placementsController");

// Matches with "/api/placements"
router.route("/")
  .get(placementsController.findAll)
  .post(placementsController.create);

// Matches with "/api/placements/:id"
router
  .route("/:id")
  .get(placementsController.findById)
  .put(placementsController.update)
  .delete(placementsController.remove);

module.exports = router;
