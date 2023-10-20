const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//return all students
exports.getAll = async (req, res) => {
    try {
        //read all from database
        const response = await prisma.students.findMany();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

//return student by his id (student number)
exports.getById = async (req, res) => {
    //get student id requested
    const id = req.params.number;
    try {
        //finds student by his id (number)
        const response = await prisma.students.findUnique({
            where: {
                number: id,
            },
        })
        //return student
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

//creates student
exports.create = async (req, res) => {
    //get requested student properties
    const { number, name, city, birthday } = req.body;
    try {
        //creates new student
        const student = await prisma.students.create({
            data: {
                number: number,
                name: name,
                city: city,
                birthday: birthday

            },
        })
        //return student created
        res.status(201).json(student)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//updates student
exports.update = async (req, res) => {
    const { number, name, city, birthday } = req.body;

    try {
        //find student to update their data
        const student = await prisma.students.update({
            where: {
                number: number,
            },
            data: {
                name: name,
                city: city,
                birthday: birthday
            },
        })
        //return student updated
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

//delete student by his id (student number)
exports.delete = async (req, res) => {
    //get student number requested
    const number = req.params.number;
    try {
        //delete student
        await prisma.students.delete({
            where: {
                number: number,
            },
        })
        //just return ok
        res.status(200).send("ok");
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}