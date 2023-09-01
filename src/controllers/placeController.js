const Place = require("../models/mPlace")

exports.create = async (data) => {
    response = await Place.create({
        name: data.name,
        vid: data.vid,
        context: data.context
    });

    return response;
}

exports.bulkCreate = async (data)=>{
    const response = await Place.bulkCreate(data);
    return response;
}

exports.select = async (filters) => {
    let response;
    if (filters == null) {
        response = await Place.findAll();
    } else {
        response = await Place.findAll({ where: filters })
    }
    return response;
}

exports.selectOne = async (filters) => {
    response = await Place.findOne({
        where: filters
    });
    return response;
}

exports.findById = async (id) => {
    response = await Place.findOne({
        where: { id: id }
    });
    return response;
}

exports.update = async (data) => {
    const tochange = Place.findByPk(data.id);
    tochange = data.name ? data.name : tochange.name;
    tochange = data.vid ? data.vid : tochange.vid;
    tochange = data.context ? data.context : tochange.context;

    response = await tochange.save();
    return response;
}

exports.delete = async (data) => {
    return Place.destroy({
        where: {
            id: data.id
        }
    });
}
exports.joins = async (data) => {
    return Place.findAll(data);
}