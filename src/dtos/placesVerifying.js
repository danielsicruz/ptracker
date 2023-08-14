const Object = require("../models/mObject");
const Movement = require("../models/mMovement");
const Place = require("../models/mPlace");
const objectPlaceController = require("../controllers/objectPlaceController")
const placeController = require("../controllers/placeController");
const User = require("../models/mUser");
const { Op } = require("sequelize");

exports.data = async (id) => {
    const buildObject = {
        include: [
            {
                model: Object,
                include: [{ model: Movement, as: 'movement', where: { isBack: false, whenBack: { [Op.gt]: new Date() }, }, required: false, include: [{ model: Place }, { model: User }] }],

            },
            {
                model: Place,
                required: false,
            }
        ],
        where: [{ idPlace: id }]
    }
    response = objectPlaceController.joins(buildObject);
    return response;
}
exports.place = async (id) => {
    response = placeController.findById(id);
    return response;
}

exports.notFound = async () => {
    const buildObject = {
        include: [
            {
                model: Object,
                include: [
                    {
                        model: Movement, as: 'movement',
                        where:
                        {
                            isBack: false,
                            whenBack: { [Op.lt]: new Date() },
                        },
                        required: false, include:
                            [
                                { model: Place },
                                { model: User }
                            ]
                    }
                ],

            },

            {
                model: Place,
                required: false,
            }
        ],
        where: [{ isThere: 0 }]
    }

    response = objectPlaceController.joins(buildObject);
    return response;
}
