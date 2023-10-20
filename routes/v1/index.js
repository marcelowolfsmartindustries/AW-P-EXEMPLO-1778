const router = require('express').Router();
const studentRouter = require('./students');

router.use('/students', studentRouter);

module.exports = router;