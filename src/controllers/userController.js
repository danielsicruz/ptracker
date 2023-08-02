const db = require("../models/db")
const user = require("../models/mUser")

exports.create = async (data, res) => {
    response = await User.create({
        id: data.id,
        name: data.name,
        login: data.login,
        password: data.password
    });
    return response;
}

exports.findById = async (id, res) => {
    response = await User.findOne({
        where: { id: id }
    })
}

exports.select = async (filters = null, res) => {
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

exports.selectOne = async (filters = null, res) => {
    response = await User.findOne({
        where: filters
    });
    return response;
}

exports.update = async (data, res) => {
    const tochange = await User.findByPk(data.id);
    tochange.name = data.name ? data.name : tochange.name;
    tochange.password = data.password ? data.password : tochange.password;
    tochange.active = data.active ? data.active : tochange.active;
    tochange.login = data.login ? data.login : tochange.login
}

exports.delete = async (data, res) => {
    return User.destroy({
        where: {
            cpfUsers: data.cpfUsers
        }
    });


}