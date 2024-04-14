import { Router, type Response, type Request } from "express";
import { Post, Comment } from "../models/post";
const router = Router();
// get all posts
router.get("/", async (_, res: Response) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to get all the posts" });
  }
});

// get post by id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to get the post" });
  }
});

// create a post
router.post("/", async (req: Request, res: Response) => {
  const { title, description, author } = req.body;
  try {
    const post = await Post.create({ title, description, author });
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to create post" });
  }
});

// update a post by id
router.put("/:id", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true },
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ updatedPost: post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to update the post" });
  }
});

// delete a post by id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ deletedPost: post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to delete the post" });
  }
});

// Retrieve all comments for a posts
router.get("/:postId/comments", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comments = await Comment.find({ _id: { $in: post.comments } });
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to get comments" });
  }
});

// Create a comment for a post
router.post("/:postId/comments", async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const { comment, by } = req.body;
    const comment_created = await Comment.create({ comment, by });
    post.comments.push(comment_created._id);
    await post.save();
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to create comment" });
  }
});
export const postRouter = router;
