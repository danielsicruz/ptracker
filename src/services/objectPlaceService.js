const objectPlaceController = require("../controllers/objectPlaceController");

exports.create = async (req, res) => {
    data = req.body;
    if (true) {
        objectPlace = await objectPlaceController.create(data);
        return res.status(201).json(objectPlace);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}
exports.select = async (req,res) => {
    data = req.body;
    filter = {
        idObject: data.idObject ? data.idObject : null,
        idPlace: data.idPlace ? data.idPlace : null,
        stillThere: data.stillThere ? data.stillThere : null,
        movedBy: data.movedBy ? data.movedBy : null,
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
            objectPlace = await objectPlaceController.select(null);
            return res.status(200).json(objectPlace);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        //rules
        if (true) {
            //return res.status(200).json(filter);

            objectPlace = await objectPlaceController.select(filter);
            return res.status(200).json(objectPlace);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    }
}
exports.update = async (req, res) => {
    data = req.body;
    data.id = req.params.id;
    //rules
    if (true) {
        objectPlace = await objectPlaceController.update(data);
        return res.status(200).json(objectPlace);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
    
}
exports.delete = async (req, res) => {
    const id = req.params.id;
    //rules
    if (true) {
        objectPlace = await objectPlaceController.delete(id);
        return res.status(200).json(objectPlace);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}