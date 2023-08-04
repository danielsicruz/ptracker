const placeController = require("../controllers/placeController");

exports.create = async (req, res) => {
    data = req.body;
    let place = await placeController.selectOne({vid:data.vid});
    if (place == null) {
        place = await placeController.create(data);
        return res.status(201).json(place);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}
exports.select = async (req,res) => {
    data = req.body;
    filter = {
        vid: data.vid ? data.vid : null,
        name: data.name ? data.name : null,
        place: data.place ? data.place : null,
        id: data.id ? data.id : null,
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
            place = await placeController.select(null);
            return res.status(200).json(place);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        //rules
        if (true) {
            //return res.status(200).json(filter);
            place = await placeController.select(filter);
            return res.status(200).json(place);
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
        place = await placeController.update(data);
        return res.status(200).json(place);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    //rules
    if (true) {
        place = await placeController.delete(id);
        return res.status(200).json(place);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}