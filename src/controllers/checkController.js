const Check = require("../models/mCheck")

exports.create = async (data) => {
    response = await Check.create({
        whoChecked: data.whoChecked,
        whereChecked: data.whereChecked,
        objectsToFind: data.objectsToFind,
        foundObjects: data.foundObjects,
        missingObjects: data.missingObjects,
    });

    return response;
}

exports.select = async (filters) => {
    let response;
    if (filters == null) {
        response = await Check.findAll();
    } else {
        response = await Check.findAll({ where: filters })
    }
    return response;
}

exports.selectOne = async (filters) => {
    response = await Check.findOne({
        where: filters
    });
    return response;
}

exports.findById = async (id) => {
    response = await Check.findOne({
        where: { id: id }
    });
}

exports.update = async (data) => {
    const tochange = Check.findByPk(data.id);
    tochange = data.whoChecked ? data.whoChecked : tochange.whoChecked;
    tochange = data.whoChanged ? data.whoChanged : tochange.whoChanged;
    tochange = data.objectsToFind ? data.toIdPlace : tochange.toIdPlace;
    tochange = data.whoChanged ? data.whoChanged : tochange.whoChanged;
    tochange = data.foundObjects ? data.foundObjects : tochange.foundObjects;
    tochange = data.missingObjects ? data.missingObjects : tochange.missingObjects;

    response = await tochange.save();
    return response;
}

exports.joins = async (data = null) => {

        response = await Check.findAll(data);

    return response;
}