const express = require("express");
const chalk = require("chalk");
const auth = require("../../middleware/auth");
const Recipe = require("../../db/models/recipes/recipes.model");
const User = require("../../db/models/users/users.model");
const Comment = require("../../db/models/postComments/posts.comments.model");

const router = new express.Router();

// add notification to db
router.post("/posts/comments", auth, async (req, res) => {
  try {
    let comment = await Comment.findOneAndUpdate(
      { postId: req.body.postId },
      { $push: { blog: { owner: req.user._id, name: req.user.name, content: req.body.content } } }
    );

    if (!comment) {
      comment = new Comment({
        postId: req.body.postId,
        blog: [{ owner: req.user._id, name: req.user.name, content: req.body.content }],
        // updatedAt: new Date() //todo bug to fix later
      });
    }

    await comment.save();
    res.status(201).send(comment);
    // console.log(chalk.inverse.green("New comment added to  DB"));
  } catch (error) {
    res.status(400).send(error.message);
    console.log(chalk.red(error.message));
    console.log(chalk.inverse.red("Failed to add comment"));
  }
});

// *Get recipes
router.get("/posts/comments/:postId/", async (req, res) => {
  // console.log(req.query);
  const comment = await Comment.findOne({ postId: req.params.postId });
  try {
    if (!comment || comment.blog.length === 0) {
      // console.log("no comments");
      res.send([]);
      return;
    }
    res.send({ data: comment.blog.reverse().slice(0, parseInt(req.query.load)), length: comment.blog.length });
    console.log(comment.blog.length);
  } catch (error) {
    console.log(chalk.red(error.message));
    res.status(404).send(error.message);
  }
});

router.delete("/posts/comments/:postId/delete", async (req, res) => {
  try {
    const comment = await Comment.findOne({ postId: req.params.postId, "blog._id": req.query.commentId });
    if (!comment || comment.blog.length === 0) {
      console.log("no comments");
      res.send([]);
      return;
    }

    // console.log(req.query.commentId);
    const newComentBlog = comment.blog.filter((c) => {
      // console.log(c._id.toString());
      return c._id.toString() !== req.query.commentId;
    });

    comment.blog = newComentBlog;
    await comment.save();

    res.send(comment.blog);
  } catch (e) {
    res.status(404).send(e.message);
    console.log(e.message);
  }
});

// //* Get user recipes
// router.get("/user/comments", auth, async (req, res) => {
//   try {

//     await req.user.populate({ path: "notifications", options: { sort: { createdAt: -1 } } });
//     res.send({ notifiation: req.user.notifications, owner: req.user.name });
//   } catch (e) {
//     res.status(500).send(e.message);
//     console.log(chalk.red(e.message));
//   }
// });

module.exports = router;
