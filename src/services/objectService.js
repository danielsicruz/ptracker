const objectController = require("../controllers/objectController");
const objectPlaceController = require("../controllers/objectPlaceController");

exports.create = async (req, res) => {
    data = req.body;
    console.log(data);
    const similars = JSON.parse(data.similars);
    let path = null;
    if (req.file) {
        path = req.file.path.split("public")[1];
    }
    if (similars.length > 0) {
        const objectDataBuilder = Array();
        if (req.file) {
            similars.forEach(similar => {
                objectDataBuilder.push({
                    id: similar,
                    name: data.name,
                    description: data.description,
                    dispatched: 0,
                    imagePath: path
                });
            });
            objectDataBuilder.push({
                id: data.id,
                name: data.name,
                description: data.description,
                dispatched: 0,
                imagePath: path
            });
        } else {
            similars.forEach(similar => {
                objectDataBuilder.push({
                    id: similar,
                    name: data.name,
                    description: data.description,
                    dispatched: 0
                });
            });
            objectDataBuilder.push({
                id: data.id,
                name: data.name,
                description: data.description,
                dispatched: 0
            });
        }


        const objects = await objectController.bulkCreate(objectDataBuilder);
        const objectPlaceDataBuilder = Array();
        objects.forEach(object => {
            objectPlaceDataBuilder.push({
                movedBy: '2cf96536-daf0-41a6-8c3b-01935834a7c3',
                idObject: object.id,
                idPlace: data.idPlace
            })
        });
        const objectPlaces = await objectPlaceController.bulkCreate(objectPlaceDataBuilder);
        return res.status(201).json(objectPlaces);
    } else {
        const objectTest = await objectController.select({ id: data.id });
        if (objectTest.length > 0) {
            return res.status(422).json({ "message": "The id of object already exists" });
        }
        let dataBuilder;
        if (req.file) {
            dataBuilder = {
                id: data.id,
                name: data.name,
                description: data.description,
                dispatched: 0,
                imagePath: path
            };
        } else {
            dataBuilder = {
                id: data.id,
                name: data.name,
                description: data.description,
                dispatched: 0
            };
        }
        const object = await objectController.create(dataBuilder);
        const objectPlaceBulder = {
            movedBy: '2cf96536-daf0-41a6-8c3b-01935834a7c3',
            idObject: object.id,
            idPlace: data.idPlace
        }
        const objectPlaces = await objectPlaceController.create(objectPlaceBulder);
        return res.status(201).json(objectPlaces);
    }
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
            objects = await objectController.select(null, res);
            return res.status(200).json(objects);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        //rules
        if (true) {
            //return res.status(200).json(filter);

            objects = await objectController.select(filter, res);
            return res.status(200).json(objects);
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