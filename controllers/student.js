exports.getAll = async (req, res) => {
    return res.send("ok");
}

exports.getById = async (req, res) => {
    const id = req.params.id;

    res.send(id);
}

exports.create = async (req, res) => {
    const {name, city, age } = req.body;

    return res.send({name, city, age });
}

exports.update = async (req, res) => {
    const {name, city, age } = req.body;

    return res.send({name, city, age });
}

exports.delete = async (req, res) => {
    const id = req.body.id;
    return res.send(id);
}