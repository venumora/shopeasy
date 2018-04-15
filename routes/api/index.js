const router = require("express").Router();
const productRoutes = require("./products");
const placementRoutes = require("./placements");
const storeRoutes = require("./stores");
const userRoutes = require("./users");


router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/stores", storeRoutes);
router.use("/placements", placementRoutes);


module.exports = router;
