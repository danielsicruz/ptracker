const Movement = require("../models/mMovement")

exports.create = async (data) => {
    response = await Movement.create({
        idObject: data.idObject,
        fromIdPlace: data.fromIdPlace,
        toIdPlace: data.toIdPlace,
        whoChanged: data.whoChanged,
        temporary: data.temporary,
        whenBack: data.whenBack,
        isBack: data.isBack,
    });

    return response;
}

exports.bulkCreate = async (data) => {
    response = await Movement.bulkCreate(data);
    return response;
}

exports.select = async (filters) => {
    let response;
    if (filters == null) {
        response = await Movement.findAll();
    } else {
        response = await Movement.findAll({ where: filters })
    }
    return response;
}

exports.joins = async (data) => {
    let response;
    response = await Movement.findAll(data);
    return response;
}

exports.selectOne = async (filters) => {
    response = await Movement.findOne({
        where: filters
    });
    return response;
}

exports.findById = async (id) => {
    response = await Movement.findOne({
        where: { id: id }
    });
}

exports.update = async (data) => {
    const tochange = Movement.findByPk(data.id);
    tochange = data.idObject ? data.idObject : tochange.idObject;
    tochange = data.fromIdPlace ? data.fromIdPlace : tochange.fromIdPlace;
    tochange = data.toIdPlace ? data.toIdPlace : tochange.toIdPlace;
    tochange = data.whoChanged ? data.whoChanged : tochange.whoChanged;
    tochange = data.temporary ? data.temporary : tochange.temporary; //Test because is boolean
    tochange = data.whenBack ? data.whenBack : tochange.whenBack;
    tochange = data.isBack ? data.isBack : tochange.isBack; //Test because is boolean

    response = await tochange.save();
    return response;
}