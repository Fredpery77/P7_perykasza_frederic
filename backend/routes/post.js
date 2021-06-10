const router = require("express").Router();
const multer = require('../middlewares/multer-config')
const auth = require('../middlewares/auth');

const posts = require("../controllers/post");

// Get all posts
router.get("/offset/:offSet", auth, posts.findAllPosts);

// Get one post
router.get("/:id", auth, posts.findOne);

// Get all posts of a specific user
router.get("/byAuthor/:authorId", auth, posts.findPostsByUser);

// Create a new post
router.post("/", auth, multer, posts.createPost);

// Delete one post
router.delete("/:id",auth, posts.deletePost);



module.exports = router;