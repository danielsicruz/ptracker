const contextController = require("../controllers/contextController");

exports.create = async (req, res) => {
    data = req.body;
    let context = await contextController.selectOne({name:data.name});
    if (context == null) {
        context = await contextController.create(data);
        return res.status(201).json(context);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}
exports.select = async (req,res) => {
    data = req.body;
    filter = {
        name: data.name ? data.name : null
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
            context = await contextController.select(null);
            return res.status(200).json(context);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        //rules
        if (true) {
            //return res.status(200).json(filter);

            context = await contextController.select(filter);
            return res.status(200).json(context);
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
        context = await contextController.update(data);
        return res.status(200).json(context);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
    
}
exports.delete = async (req, res) => {
    const id = req.params.id;
    //rules
    if (true) {
        context = await contextController.delete(id);
        return res.status(200).json(context);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}