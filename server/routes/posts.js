import express from "express";
import { getFeedPosts, getUserPosts, likePost, comment, deletePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

router.post('/:id/comment', verifyToken, comment);
export default router;

// DELETE
router.delete('/:id', deletePost);
