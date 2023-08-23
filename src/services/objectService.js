const objectController = require("../controllers/objectController");

exports.create = async (req, res) => {
    data = req.body;
    console.log(data);
    //data.user_image = "/images/"+req.file.originalname;
    //rules
    if (true) {
        object = await objectController.create(data, res);
        return res.status(201).json(object);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.select = async (req, res) => {
    data = req.body;
    filter = {
        name: data.name ? data.name : null,
        description: data.description ? data.description : null,
        imagePath: data.imagePath ? data.imagePath : null,
        dispached: data.dispached ? data.dispached : null, //Test because is boolean
        created_at: data.created_at ? data.created_at : null,
        updated_at: data.updated_at ? data.updated_at : null,
    }
    Object.keys(filter).forEach(key => {
        if (filter[key] == null) {
            delete filter[key];
        }

    });

    if (req.query.filter == undefined) {

        //We should create the 'filter' param to check if have filters and later get
        //all the params to filter the response
        console.log("No filter");
        //rules
        if (true) {
            users = await userController.select(null, res);
            return res.status(200).json(users);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        //rules
        if (true) {
            //return res.status(200).json(filter);

            users = await userController.select(filter, res);
            return res.status(200).json(users);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    }
}

exports.getOne = async (req, res) => {
    const id = req.params.id;
    const response = await objectController.selectOne({ id: id }, null);
    if (response) {
        return res.status(200).json(response);
    } else {
        return res.status(404).json({ "message": "Object not found" });
    }
}

exports.update = async (req, res) => {
    data = req.body;
    data.id = req.params.id;
    //rules
    if (true) {
        object = await objectController.update(data);
        return res.status(200).json(object);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}