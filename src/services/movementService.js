const movementController = require("../controllers/movementController");
const Place = require("../models/mPlace");

exports.create = async (req, res) => {
    data = req.body;
    if (true) {
        movement = await movementController.create(data);
        return res.status(201).json(movement);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}
exports.select = async (req,res) => {
    data = req.body;
    filter = {
        idObject: data.idObject ? data.idObject : null,
        fromIdPlace: data.fromIdPlace ? data.fromIdPlace : null,
        toIdPlace: data.toIdPlace ? data.toIdPlace : null,
        whoChanged: data.whoChanged ? data.whoChanged : null,
        temporary: data.temporary ? data.temporary : null,
        whenBack: data.whenBack ? data.whenBack : null,
        isBack: data.isBack ? data.isBack : null,
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
            movement = await movementController.select(null);
            return res.status(200).json(movement);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        //rules
        if (true) {
            //return res.status(200).json(filter);

            movement = await movementController.select(filter);
            return res.status(200).json(movement);
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
        movement = await movementController.update(data);
        return res.status(200).json(movement);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }    
}
exports.test = async (req,res) => {
    // const buildObject = {
    // }
    // response = await movementController.select();
    // response2 = await response.getPlace();
    return res.status(200).json({"Test":"test"});

}