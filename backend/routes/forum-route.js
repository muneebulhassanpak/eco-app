const express = require("express");
const router = express.Router();

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

router.get("/get/:id", verify, getIndividualTopicController);

router.get("/getOfAPerson/:id", verify, getTopicsOfAnIndividualController);

router.post("/create", verify, createTopicController);

router.patch("/edit/:id", verify, editTopicController);

router.delete("/delete/:id", verify, deleteTopicController);

router.post("/createComment/:id", verify, createAComment);

module.exports = router;
