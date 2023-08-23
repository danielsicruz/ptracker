const Object = require("../models/mObject");
const Movement = require("../models/mMovement");
const Place = require("../models/mPlace");
const objectPlaceController = require("../controllers/objectPlaceController")
const placeController = require("../controllers/placeController");
const User = require("../models/mUser");
const { Op } = require("sequelize");
const Context = require("../models/mContext");

exports.data = async (id) => {
    const buildObject = {
        include: [
            {
                model: Object,
                include: [
                    {
                        model: Movement,
                        as: 'movement',
                        where: {
                            isBack: false,
                            whenBack: {
                                [Op.gt]: new Date()
                            },
                        },
                        required: false,
                        include: [{
                            model: Place,
                            as: 'toPlace',
                            associate: 'toIdPlace'
                        },
                        { model: User }
                        ]
                    }],
                as: 'object',
            },
            {
                model: Place,
                required: false,
                as: 'place',
                include: [{
                    model: Context,
                    as: 'contextPlace',
                    attributes: ['name'],
                }]
            }
        ],
        where: [{ idPlace: id }]
    }
    response = objectPlaceController.joins(buildObject);
    return response;
}
exports.place = async (id) => {
    response = await placeController.findById(id);
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
                                { model: Place, as: 'toPlace', associate: 'toIdPlace' },
                                { model: User }
                            ]
                    }
                ],
                as: 'object',
            },

            {
                model: Place,
                required: false,
                as: 'place',
                associate: 'place',
                include: [{
                    model: Context,
                    as: 'contextPlace',
                    attributes: ['name'],
                }]
            }
        ],
        where: [{ isThere: 0, whereIs: { [Op.or]: [null] } }]
    }

    response = objectPlaceController.joins(buildObject);
    return response;
}
