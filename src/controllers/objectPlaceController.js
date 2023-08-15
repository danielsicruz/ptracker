const ObjectPlace = require("../models/mObjectPlace")

exports.create = async (data) => {
    response = await ObjectPlace.create({
        idObject: data.idObject,
        idPlace: data.idPlace,
        stillThere: data.stillThere,
        movedBy: data.movedBy,
        lastCheck: data.lastCheck,
        whereIs: data.whereIs
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

exports.updateOne = async (data) => {
    const tochange = ObjectPlace.findByPk(data.id);
    tochange = data.idObject ? data.idObject : tochange.idObject;
    tochange = data.idPlace ? data.idPlace : tochange.idPlace;
    tochange = data.stillThere ? data.stillThere : tochange.stillThere; //Test because is boolean
    tochange = data.movedBy ? data.movedBy : tochange.movedBy;
    tochange = data.lastCheck ? data.lastCheck : tochange.lastCheck;
    tochange = data.whereIs ? data.whereIs : tochange.whereIs;

    response = await tochange.save();
    return response;
}

exports.updateMultiple = async (data,where) => {
    response = await ObjectPlace.update(
        data,
        {where:where},
    );
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