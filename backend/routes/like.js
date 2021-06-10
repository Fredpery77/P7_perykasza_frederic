const router = require("express").Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config')

const likes = require("../controllers/like");

// Add reaction on post
router.post("/", auth, likes.reactOnPost);

// Delete one reaction
router.delete("/", auth, likes.deleteReaction);


module.exports = router;