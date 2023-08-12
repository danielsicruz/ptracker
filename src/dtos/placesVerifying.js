const Object = require("../models/mObject");
const Place = require("../models/mPlace");
const objectPlaceController = require("../controllers/objectPlaceController")
const placeController = require("../controllers/placeController")

exports.data = async (id) => {
    const buildObject = {
        include: [
            {
                model: Object,
            },
        ],
        where:[{idPlace:id}]
    }
    response = objectPlaceController.joins(buildObject)
    return response;
}
exports.place = async (id) => {
    response = placeController.findById(id)
    return response;
}
