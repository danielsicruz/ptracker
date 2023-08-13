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
    res.render('verifyingPlace', {
        "datas": objects,
        "pageName": "Verificando "+placeData.name,
        "placeData": placeData
    });
});

module.exports = router;