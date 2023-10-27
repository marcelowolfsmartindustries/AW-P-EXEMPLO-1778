const router = require('express').Router();
const authRouter = require('./auth');
const studentRouter = require('./students');

router.use('/auth', authRouter);
router.use('/students', studentRouter);

module.exports = router;