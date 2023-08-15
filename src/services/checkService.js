const checkController = require("../controllers/checkController");
const objectPlaceController = require("../controllers/objectPlaceController");
const movementController = require("../controllers/movementController");
const Place = require("../models/mPlace");
const User = require("../models/mUser");
const { Op } = require("sequelize");
exports.create = async (req, res) => {
    data = req.body;
    let objectsMatches = 0;
    const idPlace = req.params.id;
    //Select objects to find. Deeeerrr
    const objectsToFind = await objectPlaceController.select({ idPlace: idPlace });

    const wrongPlaceObjectsid = Array();

    //If option selected is move not foundobjects to another room
    if (data.notFoundObjects === 1) {
        const wrongPlaceObjectsToMovements = Array();
        //Create a query to find no back movements of this room objects
        const queryBuilder = {
            idObject: { [Op.or]: data.objects },
            temporary: 1,
            isBack: 0
        }
        //Select them. Deeerrrr
        const movements = await movementController.select(queryBuilder);
        //I don't need to say what a forEach does.
        objectsToFind.forEach(object => {
            //If the object is in the array of objects to find
            if (data.objects.includes(object.idObject.toString())) {
                //Count the number of matches and set that object is there
                objectsMatches++;
                object.isThere = 1;
                //If the object is in the array of movements
            } else if (movements.length > 0) {
                //For each movement and push to wrongPlaceObjects
                movements.forEach(movement => {
                    if (movement.idObject === object.idObject)
                        wrongPlaceObjectsToMovements.push({ idObject: object.idObject, whereIs: movement.toIdPlace });
                    wrongPlaceObjectsid.push({ idObject: object.idObject, whereIs: movement.toIdPlace });
                });
            } else {
                //Set isThere to 0. Deeeerrrr
                //And push to wrongPlaceObjects
                object.isThere = 0;
                wrongPlaceObjectsid.push({ idObject: object.idObject });
            }
        });
        //Move not found objects to another room if have a no back object movement
        const movementQueryBuilder = Array();
        wrongPlaceObjectsToMovements.forEach(object => {
            movementQueryBuilder.push({
                idObject: object.idObject,
                idPlace: object.whereIs,
                isBack: null,
                temporary: null,
                isThere: 1,

            });
        });
        await movementController.bulkCreate(movementQueryBuilder)
    } else {
        //Just set the isThere to 0 for all not found objects and push
        objectsToFind.forEach(object => {
            object.isThere = 0;
            if (data.objects.includes(object.idObject.toString())) {
                objectsMatches++;
                object.isThere = 1;
            } else {
                wrongPlaceObjectsid.push({idObject : object.idObject});
            }

        });
    }
    //If option selected is keep wrong place objects on their place (not this place dude, their original place)
    if (data.wrongPlaceObjects === 0) {
        //Set isThere to 0 for all wrong place objects and update on database
        const whereQueryBuilder = {
            idObject: { [Op.or]: wrongPlaceObjectsid },
        };
        await objectPlaceController.updateMultiple({ whereIs: idPlace, isThere: 0 }, whereQueryBuilder);

    }
    else {
        //Bring objects to this place
        const queryBuilder = Array();
        wrongPlaceObjectsid.forEach(object => {
            queryBuilder.push({
                idObject: object,
                idPlace: idPlace,
                isBack: null,
                temporary: null,
                isThere: 1,
            });
        }
        );
        movementController.bulkCreate(queryBuilder);
    }
    const objectPlaceBuilder = {
        idObject: null,
        idPlace: idPlace,
        stillThere: null,
        movedBy: null,
        lastCheck: null,
    }
    const checkBuilder = {
        objectsToFind: objectsToFind.length,
        foundObjects: data.objects.length,
        missingObjects: (objectsToFind.length - objectsMatches),
        whoChecked: null,
        whereChecked: parseInt(idPlace),
        notFoundObjects: data.notFoundObjects,
        wrongPlaceObjects: data.wrongPlaceObjects
    }
    console.log();
    return res.status(201).json();
    if (true) {
        check = await checkController.create(data);
        return res.status(201).json(check);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}
exports.select = async (req, res) => {
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