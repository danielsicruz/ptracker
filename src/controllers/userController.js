const User = require("../models/mUser")

exports.create = async (data) => {
    response = await User.create({
        id: data.id,
        name: data.name,
        login: data.login,
        password: data.password
    });
    return response;
}

exports.findById = async (id) => {
    response = await User.findOne({
        where: { id: id }
    })
}

exports.select = async (filters = null) => {
    let response;
    if (filters == null) {

        response = await User.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later

        response = await User.findAll({
            where: filters
        });
        return response;
    }

}

exports.selectOne = async (filters = null) => {
    response = await User.findOne({
        where: filters
    });
    return response;
}

exports.update = async (data) => {
    const tochange = await User.findByPk(data.id);
    tochange.name = data.name ? data.name : tochange.name;
    tochange.password = data.password ? data.password : tochange.password;
    tochange.active = data.active ? data.active : tochange.active; //test because is boolean
    tochange.login = data.login ? data.login : tochange.login

    response = await tochange.save();
    return response;
}

exports.delete = async (data) => {
    return User.destroy({
        where: {
            id: data.id
        }
    });
}
exports.joins = async (data = null) => {

    response = await User.findAll(data);

return response;
}