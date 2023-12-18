const express = require("express");
const router = express.Router();

//Express validator is used to validate incoming requsest bodies
const { body, param } = require("express-validator");

const {
  getAllTopicsController,
  createTopicController,
  editTopicController,
  deleteTopicController,
  getIndividualTopicController,
  getTopicsOfAnIndividualController,
  createAComment,
} = require("../controllers/forum-controller");
const verify = require("../utils/JWTVerification");

router.get("/get", getAllTopicsController);

router.get(
  "/get/:id",
  [
    param("id")
      .notEmpty()
      .withMessage("Product ID is required")
      .isMongoId()
      .withMessage("Invalid Product ID"),
  ],
  verify,
  getIndividualTopicController
);

router.get(
  "/getOfAPerson/:id",
  [
    param("id")
      .notEmpty()
      .withMessage("Product ID is required")
      .isMongoId()
      .withMessage("Invalid Product ID"),
  ],
  verify,
  getTopicsOfAnIndividualController
);

router.post(
  "/create",
  verify,
  [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 5 })
      .withMessage("Title must be at least 2 characters long"),
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 11 })
      .withMessage("Description must be at least 10 characters long"),
    body("privacy")
      .notEmpty()
      .withMessage("Privacy is required")
      .isIn(["private", "public"])
      .withMessage('Privacy must be either "private" or "public"'),
  ],
  createTopicController
);

router.patch(
  "/edit/:id",
  verify,
  [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 2 })
      .withMessage("Title must be at least 2 characters long"),
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
    body("privacy")
      .notEmpty()
      .withMessage("Privacy is required")
      .isIn(["private", "public"])
      .withMessage('Privacy must be either "private" or "public"'),
  ],
  editTopicController
);

router.delete(
  "/delete/:id",
  verify,
  [
    param("id")
      .notEmpty()
      .withMessage("Product ID is required")
      .isMongoId()
      .withMessage("Invalid Product ID"),
  ],
  deleteTopicController
);

router.post(
  "/createComment/:id",
  [
    param("id")
      .notEmpty()
      .withMessage("Product ID is required")
      .isMongoId()
      .withMessage("Invalid Product ID"),
    body("message")
      .notEmpty()
      .withMessage("Message is required")
      .isLength({ min: 2 })
      .withMessage("Title must be at least 2 characters long"),
  ],
  verify,
  createAComment
);

module.exports = router;
