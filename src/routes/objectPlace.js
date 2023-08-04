const express = require("express");
const { route } = require("express/lib/application");
let router = express.Router();
const objectPlaceService = require("../services/objectPlaceService");

router.post("/", objectPlaceService.create);
router.get("/", objectPlaceService.select);
router.put("/:id", objectPlaceService.update);
//srouter.delete("/:id", objectPlaceService.delete)

module.exports = router;