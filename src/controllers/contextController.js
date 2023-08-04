const Context = require("../models/mContext")

exports.create = async (data) => {
    response = await Context.create({
        name: data.name
    });

    return response;
}

exports.select = async (filters) => {
    let response;
    if (filters == null) {
        response = await Context.findAll();
    } else {
        response = await Context.findAll({ where: filters })
    }
    return response;
}

exports.selectOne = async (filters) => {
    response = await Context.findOne({
        where: filters
    });
    return response;
}

exports.findById = async (id) => {
    response = await Context.findOne({
        where: { id: id }
    });
}

exports.update = async (data) => {
    const tochange = Context.findByPk(data.id);
    tochange = data.name ? data.name : tochange.name;

    response = await tochange.save();
    return response;
}

exports.delete = async (id) => {
    return Context.destroy({
        where: {
            id: id
        }
    });
}