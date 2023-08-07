const Place = require("../models/mPlace");
const User = require("../models/mUser");
const placeController = require("../controllers/placeController");
const Check = require("../models/mCheck");

exports.data = async () => {
    const buildObject = {
        include: [
            {
                model: Check,
                as:'whereChecked',
                required: false,
            },
        ],
    }
    response = placeController.joins(buildObject)
    //console.log(response);
    return response;
}
