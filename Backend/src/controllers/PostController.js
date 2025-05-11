import PostModel from "../models/Post.js";

export const PostController = {
  getAll: async (req, res) => {
    try {
      const posts = await PostModel.find().populate("user").exec();
      res.json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get posts" });
    }
  },

  getOne: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await PostModel.findOneAndUpdate({ _id: postId }, { $inc: { viewsCount: 1 } }, { new: true }).populate("user");

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get post" });
    }
  },

  create: async (req, res) => {
    try {
      const doc = new PostModel({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      });

      const post = await doc.save();
      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to create post" });
    }
  },

  remove: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await PostModel.findOneAndDelete({ _id: postId });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to delete post" });
    }
  },

  update: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          title: req.body.title,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
          tags: req.body.tags,
          user: req.userId,
        },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to update post" });
    }
  },

  getLastTags: async (req, res) => {
    try {
      const posts = await PostModel.find().limit(5).exec();
      const tags = [...new Set(posts.map((post) => post.tags).flat())].slice(0, 5);
      res.json(tags);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get tags" });
    }
  },
};
