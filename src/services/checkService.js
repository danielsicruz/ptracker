const checkController = require("../controllers/checkController");
const Place = require("../models/mPlace");
const User = require("../models/mUser");
exports.create = async (req, res) => {
    data = req.body;
    const placeId = req.params.id;
    console.log(data);
    return res.status(201).json();
    if (true) {
        check = await checkController.create(data);
        return res.status(201).json(check);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}
exports.select = async (req,res) => {
    data = req.body;
    filter = {
        id: data.id ? data.id : null,
        whoChecked: data.whoChecked ? data.whoChecked : null,
        whereChecked: data.whereChecked ? data.whereChecked : null,
        objectsToFind: data.objectsToFind ? data.objectsToFind : null,
        foundObjects: data.foundObjects ? data.foundObjects : null,
        missingObjects: data.missingObjects ? data.missingObjects : null,
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
            check = await checkController.select(null);
            return res.status(200).json(check);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        //rules
        if (true) {
            //return res.status(200).json(filter);

            check = await checkController.select(filter);
            return res.status(200).json(check);
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
        check = await checkController.update(data);
        return res.status(200).json(check);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }    
}

exports.test = async (req, res) => {
    const buildObject = {
        include: [
            {
                model: User,
                
            },
            {
                model: Place,
                
            },
        ],
    }
    response = await checkController.joins(buildObject);
    return res.status(200).json(response);
}