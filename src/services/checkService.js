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
    const idsToThere1 = Array();
    const idsToThere0 = Array();
    //If option selected is move not found objects to another room
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
                idsToThere1.push(object.idObject);
                //If the object is in the array of movements
            } else if (movements.length > 0) {
                //For each movement and push to wrongPlaceObjects
                movements.forEach(movement => {
                    //If have not retorned object out of this place (verified place)
                    if (movement.idObject === object.idObject) {
                        //Push to wrongPlaceObjectsToMovements to be moved to another place later
                        wrongPlaceObjectsToMovements.push({ idObject: object.idObject, whereIs: movement.toIdPlace });
                        wrongPlaceObjectsid.push({ idObject: object.idObject, whereIs: movement.toIdPlace });
                    }
                    else {
                        //Set isThere to 0.
                        idsToThere0.push(object.idObject);
                        //Else push to wrongPlaceObjectsid to be identfied as missing
                        wrongPlaceObjectsid.push({ idObject: object.idObject });
                    }
                });
            } else {
                //Set isThere to 0.
                idsToThere0.push(object.idObject);
                //And push to wrongPlaceObjectsid
                wrongPlaceObjectsid.push({ idObject: object.idObject });
            }
        });
        //Update isThere on database

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
        console.log("Bulk Create on Movement | 61:");
        console.log(movementController.bulkCreate(movementQueryBuilder));
    } else {
        //Just set the isThere to 0 for all not found objects and push
        objectsToFind.forEach(object => {
            if (data.objects.includes(object.idObject.toString())) {
                objectsMatches++;
                object.isThere = 1;
                idsToThere1.push(object.idObject);
                console.log('Id para 1', idsToThere1);
            } else {
                wrongPlaceObjectsid.push({ idObject: object.idObject });
                idsToThere0.push(object.idObject);
                console.log('Id para 0', idsToThere0);
            }

        });
    }
    //Update isThere on database
    if (idsToThere1.length > 0) {
        await objectPlaceController.updateMultiple({ isThere: 1 }, { idObject: { [Op.or]: idsToThere1 } });
    }
    if (idsToThere0.length > 0) {
        await objectPlaceController.updateMultiple({ isThere: 0 }, { idObject: { [Op.or]: idsToThere0 } });
    }
    //Create a check on database.
    const checkBuilder = {
        objectsToFind: objectsToFind.length,
        foundObjects: data.objects.length,
        missingObjects: (objectsToFind.length - objectsMatches),
        whoChecked: '2cf96536-daf0-41a6-8c3b-01935834a7c3',
        whereChecked: parseInt(idPlace),
        notFoundObjects: data.notFoundObjects,
        wrongPlaceObjects: data.wrongPlaceObjects
    }
    const check = await checkController.create(checkBuilder);

    //If option selected is keep wrong place objects on their place (not this place dude, their original place)
    if (data.wrongPlaceObjects === 0) {
        //Set isThere to 0 for all wrong place objects and update on database
        const whereQueryBuilder = {
            idObject: { [Op.or]: wrongPlaceObjectsid },
        };
        if (wrongPlaceObjectsid.length > 0) {
            console.log("Multiple Update on ObjectPlace | 96:");
            console.log(await objectPlaceController.updateMultiple({ whereIs: idPlace, isThere: 0, lastCheck: check.id }, whereQueryBuilder));
        }
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
        const objectPlaceQueryBuilder = {
            idObject: { wrongPlaceObjectsid }
        }
        if (wrongPlaceObjectsid.length > 0) {
            console.log("Bulk Create on Movement | 117:");
            console.log(await movementController.bulkCreate(queryBuilder));
            console.log("Multiple Update on ObjectPlace | 119:");
            console.log(await objectPlaceController.updateMultiple(
                {
                    whereIs: idPlace,
                    isThere: 1,
                    idPlace: idPlace,
                    movedBy: '2cf96536-daf0-41a6-8c3b-01935834a7c3', //Authenticate
                    lastCheck: check.id,
                }, objectPlaceQueryBuilder));
        }
    }
    const whereQueryBuilder = {
        idObject: { [Op.or]: data.objects },
    };
    if (data.objects.length > 0) {
        console.log("Multiple Update on ObjectPlace | 134:");
        console.log(await objectPlaceController.updateMultiple({ lastCheck: check.id }, whereQueryBuilder));
    }
    if (true) {
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