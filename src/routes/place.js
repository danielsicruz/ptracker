const express = require("express");
const { route } = require("express/lib/application");
let router = express.Router();
const placeService = require("../services/placeService");

router.post("/", placeService.create);
router.get("/", placeService.select);
router.get("/test", placeService.test);
router.put("/:id", placeService.update);
//srouter.delete("/:id", placeService.delete)

module.exports = router;