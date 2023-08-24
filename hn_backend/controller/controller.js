const axios = require("axios");
const hnApi = require("../helpers/hackerNewsApi");

const formatStory = (item) => {
  var data = {};
  data.id = item.id;
  data.title = item.title;
  data.url = item.url;
  data.points = item.score;
  data.author = item.by;
  data.time = new Date(item.time * 1000).toISOString();
  data.text = item.text;
  data.parent_id = item.parent;
  data.descendants = item.descendants;
  data.kids = item.kids;
  data.type = item.type;
  return data;
};

const getTopStories = async (req, res) => {
  const pageNum = parseInt(req.query.pagenumber) || 0;
  const storyPerPage = parseInt(req.query.storyperpage) || 10;
  try {
    const response = await hnApi.fetchTopStories();

    let stories = [];
    let storyIds = response
      ? response.slice(
          pageNum * storyPerPage,
          pageNum * storyPerPage + storyPerPage
        )
      : [];
    for (let storyId of storyIds) {
      const story = await hnApi.fetchItem(storyId);
      stories.push(formatStory(story));
    }
    res.json(stories);
  } catch (error) {
    console.error("Error fetching top stories:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getNewStories = async (req, res) => {
  const pageNum = parseInt(req.query.pagenumber) || 0;
  const storyPerPage = parseInt(req.query.storyperpage) || 10;
  try {
    const response = await hnApi.fetchNewStories();

    let stories = [];
    let storyIds = response
      ? response.slice(
          pageNum * storyPerPage,
          pageNum * storyPerPage + storyPerPage
        )
      : [];
    for (let storyId of storyIds) {
      const story = await hnApi.fetchItem(storyId);
      stories.push(formatStory(story));
    }
    res.json(stories);
  } catch (error) {
    console.error("Error fetching top stories:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getBestStories = async (req, res) => {
  const pageNum = parseInt(req.query.pagenumber) || 0;
  const storyPerPage = parseInt(req.query.storyperpage) || 10;
  try {
    const response = await hnApi.fetchBestStories();

    let stories = [];
    let storyIds = response
      ? response.slice(
          pageNum * storyPerPage,
          pageNum * storyPerPage + storyPerPage
        )
      : [];
    for (let storyId of storyIds) {
      const story = await hnApi.fetchItem(storyId);
      stories.push(formatStory(story));
    }
    res.json(stories);
  } catch (error) {
    console.error("Error fetching top stories:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
const getShowStories = async (req, res) => {
  const pageNum = parseInt(req.query.pagenumber) || 0;
  const storyPerPage = parseInt(req.query.storyperpage) || 10;
  try {
    const response = await hnApi.fetchShowStories();

    let stories = [];
    let storyIds = response
      ? response.slice(
          pageNum * storyPerPage,
          pageNum * storyPerPage + storyPerPage
        )
      : [];
    for (let storyId of storyIds) {
      const story = await hnApi.fetchItem(storyId);
      stories.push(formatStory(story));
    }
    res.json(stories);
  } catch (error) {
    console.error("Error fetching top stories:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
const getAskStories = async (req, res) => {
  const pageNum = parseInt(req.query.pagenumber) || 0;
  const storyPerPage = parseInt(req.query.storyperpage) || 10;
  try {
    const response = await hnApi.fetchAskStories();

    let stories = [];
    let storyIds = response
      ? response.slice(
          pageNum * storyPerPage,
          pageNum * storyPerPage + storyPerPage
        )
      : [];
    for (let storyId of storyIds) {
      const story = await hnApi.fetchItem(storyId);
      stories.push(formatStory(story));
    }
    res.json(stories);
  } catch (error) {
    console.error("Error fetching top stories:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
const getJobStories = async (req, res) => {
  const pageNum = parseInt(req.query.pagenumber) || 0;
  const storyPerPage = parseInt(req.query.storyperpage) || 10;
  try {
    const response = await hnApi.fetchJobStories();

    let stories = [];
    let storyIds = response
      ? response.slice(
          pageNum * storyPerPage,
          pageNum * storyPerPage + storyPerPage
        )
      : [];
    for (let storyId of storyIds) {
      const story = await hnApi.fetchItem(storyId);
      stories.push(formatStory(story));
    }
    res.json(stories);
  } catch (error) {
    console.error("Error fetching top stories:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getPastStories = async (req, res) => {
  const pageNum = parseInt(req.query.pagenumber) || 0;
  const storyPerPage = parseInt(req.query.storyperpage) || 10;
  try {
    const response = await hnApi.fetchTopStories();

    let stories = [];
    let storyIds = response
      ? response.slice(
          pageNum * storyPerPage + storyPerPage,
          pageNum * storyPerPage + 2 * storyPerPage
        )
      : [];
    // console.log(storyIds);
    for (let storyId of storyIds) {
      const story = await hnApi.fetchItem(storyId);
      stories.push(formatStory(story));
    }
    res.json(stories);
  } catch (error) {
    console.error("Error fetching Past stories:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const formatComment = (item) => {
  var data = {};
  data.id = item.id;
  data.text = item.text;
  data.time = new Date(item.time * 1000).toISOString();
  data.parent_id = item.parent;
  data.kids = item.kids;
  data.author = item.by;
  // data.kidsLength = item.kids.length
  data.type = item.type;
  return data;
};

const getComments = async (req, res) => {
  const itemId = req.params.id;
  const sectionNumber = parseInt(req.query.sectionnumber) || 0;

  try {
    const response = await hnApi.fetchItem(itemId);
    let comments = [];
    let commentIds = response.kids
      ? response.kids.slice(0, sectionNumber * 10 + 10)
      : [];

    for (let commentId of commentIds) {
      const comment = await hnApi.fetchItem(commentId);
      comments.push(formatComment(comment));
    }

    const result = {
      author: response.by,
      title: response.title,
      url: response.url,
      time: new Date(response.time * 1000).toISOString(),
      type: response.type,
      totalKids: response.kids ? response.kids.length : 0,
      kids: comments,
    };

    res.json(result);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const formatUser = (item) => {
  var data = {};
  data.about = item.about;
  data.id = item.id;
  data.created = new Date(item.created * 1000).toISOString();
  data.karma = item.karma;
  data.submitted = item.submitted;
  return data;
};

const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await hnApi.fetchUser(userId);
    // console.log(response);
    res.json(formatUser(response));
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getTopStories,
  getBestStories,
  getNewStories,
  getAskStories,
  getJobStories,
  getShowStories,
  getPastStories,
  getComments,
  getUser,
};
