const studentRouter = require('express').Router();
const controller = require('../controllers/student');

studentRouter.get('/', controller.getAll);
studentRouter.get('/:id', controller.getById);
studentRouter.post('/create', controller.create);
studentRouter.put('/update', controller.update);
studentRouter.delete('/delete', controller.delete);

module.exports = studentRouter;