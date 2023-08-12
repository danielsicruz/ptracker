const ObjectPlace = require("../models/mObjectPlace")

exports.create = async (data) => {
    response = await ObjectPlace.create({
        idObject: data.idObject,
        idPlace: data.idPlace,
        stillThere: data.stillThere,
        movedBy: data.movedBy,
    });

    return response;
}

exports.select = async (filters) => {
    let response;
    if (filters == null) {
        response = await ObjectPlace.findAll();
    } else {
        response = await ObjectPlace.findAll({ where: filters })
    }
    return response;
}

exports.selectOne = async (filters) => {
    response = await ObjectPlace.findOne({
        where: filters
    });
    return response;
}

exports.findById = async (id) => {
    response = await ObjectPlace.findOne({
        where: { id: id }
    });
}

exports.update = async (data) => {
    const tochange = ObjectPlace.findByPk(data.id);
    tochange = data.idObject ? data.idObject : tochange.idObject;
    tochange = data.idPlace ? data.idPlace : tochange.idPlace;
    tochange = data.stillThere ? data.stillThere : tochange.stillThere; //Test because is boolean
    tochange = data.movedBy ? data.movedBy : tochange.movedBy;

    response = await tochange.save();
    return response;
}

exports.delete = async (id) => {
    return ObjectPlace.destroy({
        where: {
            id: id
        }
    });
}

exports.joins = async (data) => {
    return ObjectPlace.findAll(data);
}