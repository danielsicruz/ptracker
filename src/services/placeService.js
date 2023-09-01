const { Op } = require("sequelize");
const placeController = require("../controllers/placeController");
const Check = require("../models/mCheck");

exports.create = async (req, res) => {
    data = req.body;

    const placesToCheck = Array();
    const placesNotAdded = Array();
    placesToCheck.push({ vid: data.vid, name: data.name, context: data.idContext });

    data.notAdded.forEach(place => {
        placesNotAdded.push({
            vid: place.vid,
            name: place.name,
            context: place.context,
            comment: "Have missing content",
            code: 400
        })
    });

    if (data.morePlaces.length > 0) {

        data.morePlaces.forEach(place => {
            placesToCheck.push({
                vid: place.vid,
                name: place.name,
                context: place.context
            })
        });

        const dbPlacesToCheck = await placeController.select({ vid: { [Op.or]: placesToCheck.map(place => place.vid) } });

        const placesToAdd = Array();

        if (dbPlacesToCheck.length > 0) {
            dbPlacesToCheck.forEach(place => {
                placesNotAdded.push({
                    vid: place.vid,
                    name: place.name,
                    context: place.context,
                    comment: "Already used VID",
                    code: 405
                });
            });
        }

        placesToCheck.forEach(place => {
            if (!dbPlacesToCheck.find(dbPlace => dbPlace.vid === place.vid)) {
                placesToAdd.push(place);
            }
        });

        const places = await placeController.bulkCreate(placesToAdd);
        if (places.length > 0 && placesNotAdded.length === 0) {
            return res.status(201).json(places);
        } else if (places.length > 0 && placesNotAdded.length > 0) {
            return res.status(201).json({ "created": places, "notCreated": placesNotAdded });
        } else {
            return res.status(405).json(placesNotAdded);
        }
    } else {
        const place = await placeController.selectOne({ vid: data.vid });
        if (place == null) {
            place = await placeController.create(data);
        } else {
            placesNotAdded.push({
                vid: place.vid,
                name: place.name,
                context: place.context,
                comment: "Already used VID",
                code: 405
            });
            return res.status(405).json(placesNotAdded);
        }
    }
}
exports.select = async (req, res) => {
    data = req.query;
    filter = {
        vid: data.vid ? data.vid : null,
        name: data.name ? data.name : null,
        context: data.context ? data.context : null,
        id: data.id ? data.id : null,
    }
    Object.keys(filter).forEach(key => {
        if (filter[key] == null) {
            delete filter[key];
        }
    });

    if (Object.keys(filter).length === 0) {

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
exports.test = async (req, res) => {
    const buildObject = {
        include: [
            {
                model: Check,
                as: 'whereChecked',
                required: false,
            },
        ],
    }
    response = await placeController.joins(buildObject)
    //console.log(response);
    return res.status(200).json(response);
}