const Object = require("../models/mObject")

exports.create = async (data) => {
    response = await Object.create({
        id: data.id,
        name: data.name,
        description: data.description,
        imagePath: data.imagePath,
        dispached: data.dispached,
    });
}

exports.select = async (filters = null, res) => {
    let response;
    if (filters == null) {

        response = await Object.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await Object.findAll({
            where: filters
        });
        return response;
    }

}

exports.selectOne = async (filters = null, res) => {
    response = await Object.findOne({
        where: filters
    });
    return response;
}

exports.update = async (data) => {
    const tochange = await Object.findByPk(data.id);

    tochange.name = data.name ? data.name : tochange.name;
    tochange.description = data.description ? data.description : tochange.description;
    tochange.imagePath = data.imagePath ? data.imagePath : tochange.imagePath;
    tochange.dispached = data.dispached ? data.dispached : tochange.dispached; //Test because is boolean

    response = await tochange.save();
    return response;
}

exports.delete = async (data, res) => {
    return Object.destroy({
        where: {
            id: data.id
        }
    });
}