const {Router}  = require('express');
const router = Router();
const movies = require('./movie.route');
const users = require('./user.route');
const authors = require('./author.route');
const books = require('./book.route');

router.use('/api',movies);
router.use('/api',users);
router.use('/api',authors);
router.use('/api',books);

module.exports = router;