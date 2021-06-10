const models = require('../models');
const Like = models.like;

// Create and Save a new like.
exports.reactOnPost = (req, res, next) => {
    const newLike = {
        ...req.body
    };

    Like.findOne({where: { authorId: req.body.authorId, postId: req.body.postId }})
        .then((result) => {
            if(!result) {
                Like.create(newLike)
                    .then((data) => {
                        res.status(200).json({ data });
                    })
                    .catch(err => {
                        res.status(500).send({message: err });
                    });
            }else{
                res.status(409).json({message: `L'utilisateur a déjà liké le post.`})
            }
        })
};

// Delete a reactioin
exports.deleteReaction = (req, res) => {
    
    // The Axios delete method won't accept a body, we have to use the req.param() option
    authorId = req.param('authorId');
    postId = req.param('postId');


    Like.findOne({where: {authorId: authorId, postId: postId}})
        .then((like) => {
            Like.destroy({where: {id: like.id}})
            .then((deletedRows) => {
                if(deletedRows == 1){
                    res.status(200).json({message: 'Like supprimé'});
                }
            })
            .catch(err => {
                res.status(500).send({ message: 'Error deleting the like', err });
            });
        })
        .catch((err) => {
            res.status(404).json({message: 'Like not found', err})
        })

};

