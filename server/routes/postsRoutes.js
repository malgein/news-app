const express = require("express");
const {
    createPost,
    deletePost,
    getCommentPostById,
    getPostById,
    getPosts,
    modifyPost,
    CreateAndDeleteComments
} = require('../controllers/postControllers')


const router = express.Router();

router.route('/').get(getPosts)

router.route('/:id').get(getPostById)

router.route('/:id/comments').get(getCommentPostById)

router.route('/').post(createPost)

router.route('/:id').put(modifyPost)

router.route('/:id').patch(CreateAndDeleteComments)

router.route('/:id').delete(deletePost)

module.exports = router;
