const express = require('express');
const router = express.Router();

const data = require('../dtos')

router.get("/login", (req, res) => {
    res.render('login');
});
router.get("/home", async (req, res) => {
    res.render('home', {"pageName":"Home"});
});
router.get("/places", async (req, res) => {
    const placeData = await data.places.data();
    res.render('places', {
        "datas": placeData,
        "pageName": "Verificar lugares"
    });
});
router.get("/places/verifying/:id", async (req, res) => {
    const objects = await data.placesVerifying.data(req.params.id);
    const placeData = await data.placesVerifying.place(req.params.id);
    const notFound = await data.placesVerifying.notFound();
    res.render('verifyingPlace', {
        "datas": objects,
        "pageName": "Verificando "+placeData.name,
        "placeData": placeData,
        "notFound": notFound,
    });
});
router.get("/objects/verifying", async (req, res) => {
    res.render('verifyingObject', {"pageName":"Verificando objetos"});
});
router.get("/objects/add", async (req, res) => {
    res.render('addObject', {"pageName":"Adicionando objetos"});
});

module.exports = router;