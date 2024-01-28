const router = require('express').Router();

const userRoutes = require('./api/user-routes');
const postRoutes = require('./api/post-routes');
const commentRoutes = require('./comment-routes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;