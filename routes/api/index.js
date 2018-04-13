const router = require("express").Router();
const productRoutes = require("./products");
const storeRoutes = require("./stores");
const userRoutes = require("./users");

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/stores", storeRoutes);



module.exports = router;
