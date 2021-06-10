const models = require('../models');
const Post = models.post;
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const like = require('../models/like');

// Create and Save a new post.
exports.createPost = (req, res) => {
    // Validate request
    if (!req.body.content) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const newPost = {
        ...req.body
    };

    // Save post in the database
    Post.create(newPost)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: err || "Some error occurred while creating the post." });
        });
};

// Retrieve all posts from the database.
exports.findAllPosts = (req, res) => {
    let offSet = JSON.parse(req.params.offSet);
    Post.findAll(
        {include: [{all:true}],
        // order: Sequelize.literal('rand()'), limit: 1})
        order: [
            ['createdAt', 'DESC']
        ], offset: offSet, limit: 1})
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving posts." });
    });
};

// Retrieve one post from the database.
exports.findOne = (req, res) => {
    const postId = req.params.id;

    Post
        .findOne({where: {id: postId},include: [{all:true}]})
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving post with id=" + postId });
        });
};

// Delete a post from database.
exports.deletePost = (req, res) => {
    const postId = req.params.id;

    Post.destroy({ where : {id: postId}})
        .then(rowDeleted => {  
            if (rowDeleted == 1) {
                res.status(200).json({ message: "Post was deleted successfully!"});
            } else {
                res.send({ message: `Cannot delete post with id=${postId}. Maybe the post was not found!`});
            }
        })
        .catch(err => {
        res.status(500).send({ message: "Could not delete post with id=" + postId});
        });

};

// Find all posts of a specific user.
exports.findPostsByUser = (req, res) => {
    const authorId = req.params.authorId;

    Post.findAll({
        where: {authorId: authorId}, include: [{all:true}]
    })
        .then((user) => {
        res.send(user)
        })
        .catch((err) => {
        console.log("Error while find company : ", err)
        })
};

