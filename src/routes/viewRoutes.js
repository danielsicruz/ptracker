const express = require('express');
const router = express.Router();

const data = require('../dtos')

router.get("/login", (req, res) => {
    return res.render('login');
});
router.get("/home", async (req, res) => {
    return res.render('home', {"pageName":"Home"});
});
router.get("/places", async (req, res) => {
    const placeData = await data.places.data();
    return res.render('places', {
        "datas": placeData,
        "pageName": "Verificar lugares"
    });
});
router.get("/places/verifying/:id", async (req, res) => {
    const objects = await data.placesVerifying.data(req.params.id);
    const placeData = await data.placesVerifying.place(req.params.id);
    const notFound = await data.placesVerifying.notFound();
    return res.render('verifyingPlace', {
        "datas": objects,
        "pageName": "Verificando "+ placeData.name,
        "placeData": placeData,
        "notFound": notFound,
    });
});
router.get("/objects/verifying", async (req, res) => {
    return res.render('verifyingObject', {"pageName":"Verificando objetos"});
});
router.get("/objects/add", async (req, res) => {
    return res.render('addObject', {"pageName":"Adicionando objetos"});
});
router.get("/places/add", async(req, res)=>{
    return res.render('addAmbient',{"pageName":"Adicionando ambientes"});
})
module.exports = router;