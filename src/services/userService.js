const userController = require("../controllers/userController");
const bcrypt = require("bcryptjs");
const Place = require("../models/mPlace");
const User = require("../models/mUser");
const Check = require("../models/mCheck");

exports.create = async (req, res) => {
    data = req.body;
    console.log(data);
    //data.user_image = "/images/"+req.file.originalname;
    //rules
    let user = await userController.selectOne({login:data.login});
    if (user == null) {
        data.password = await bcrypt.hash(data.password,8);
        user = await userController.create(data);
        return res.status(201).json(user);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.select = async (req, res) => {
    data = req.body;
    filter = {
        name: data.name ? data.name : null,
        login: data.login ? data.login : null,
        password: data.password ? data.password : null,
        active: data.active ? data.active : null, //Test because is boolean
        id: data.id ? data.id : null,
        created_at: data.created_at ? data.created_at : null,
        updated_at: data.updated_at ? data.updated_at : null,
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
            users = await userController.select(null);
            return res.status(200).json(users);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        //rules
        if (true) {
            //return res.status(200).json(filter);

            users = await userController.select(filter);
            return res.status(200).json(users);
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
        user = await userController.update(data);
        return res.status(200).json(user);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}
exports.test = async (req, res) => {
    const buildObject = {
        include: [
            {
                model: Check,
                as: 'whoChecked', // Define um apelido para o relacionamento User
            },
        ],
    }
    response = await userController.joins(buildObject);
    return res.status(200).json(response);
}