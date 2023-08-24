const express = require("express");
const axios = require("axios");
const {
  getTopStories,
  getBestStories,
  getNewStories,
  getAskStories,
  getJobStories,
  getShowStories,
  getPastStories,
  getComments,
  getUser,
} = require("../controller/controller");

const router = express.Router();

router.get("/topstories", getTopStories);
router.get("/newstories", getNewStories);
router.get("/beststories", getBestStories);
router.get("/showstories", getShowStories);
router.get("/askstories", getAskStories);
router.get("/jobstories", getJobStories);
router.get("/paststories", getPastStories);
router.get("/comments/:id", getComments);
router.get("/user/:id", getUser);

module.exports = router;
