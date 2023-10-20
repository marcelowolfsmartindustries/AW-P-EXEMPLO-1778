const studentRouter = require('express').Router();
const controller = require('../../controllers/v1/student');

//students CRUD
studentRouter.get('/', controller.getAll); //read all
studentRouter.get('/:number', controller.getById); //read one by his id (student number)
studentRouter.post('/create', controller.create); //create new student
studentRouter.put('/update', controller.update); //update student
studentRouter.delete('/delete/:number', controller.delete); //delete student

module.exports = studentRouter;