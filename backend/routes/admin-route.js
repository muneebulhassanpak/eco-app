const express = require("express");
const router = express.Router();

const adminVerification = require("../utils/adminVerification");

const {
  getAllProducts,
  getOneProduct,
  createProduct,
  editProductHandler,
  deleteProductHandler,
  getAllForumTopicsHandler,
} = require("../controllers/admin-controller");

router.get("/getAllProducts", getAllProducts);
router.get("/getAllForumTopics", getAllForumTopicsHandler);
router.get("/getOneProduct/:productId", getOneProduct);
router.post("/createProduct", adminVerification, createProduct);
router.delete(
  "/deleteProduct/:productId",
  adminVerification,
  deleteProductHandler
);
router.patch("/editProduct/:productId", adminVerification, editProductHandler);

module.exports = router;
