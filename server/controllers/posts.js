import Post from "../models/Post.js";
import User from "../models/User.js";
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";
import { s3, bucketName } from "../index.js";

//CREATE

export const createPost = async (req, res) => {
  try {
    const randomImageName = (byte = 32) =>
      crypto.randomBytes(byte).toString("hex");

      let postImageUrl = "";

      if (req.file) {
      const postImageName = randomImageName();
      postImageUrl = `https://friendsvault.s3.us-east-2.amazonaws.com/${postImageName}`
      const params = {
        Bucket: bucketName,
        Key: postImageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);
      await s3.send(command);
    }

    const { userId, description } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({ 
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath: postImageUrl, 
      likes: {},
      comments: [],
    });
  
    await newPost.save();
    console.log(newPost)
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


// READ
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};


export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(201).json(posts);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// ADD comments 

export const comment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      { $push: { comments: comment } }, 
      { new: true }
    );

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// DELETE

export const deletePost = async(req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await Post.findByIdAndDelete( id );
    if (!deletePost) {
      alert ("Post not found"); 
    }
    res.status(200).json({ message: "Post successfully deleted", deletePost });
  } catch (error) {
    console.log("Error in posts controller")
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
}