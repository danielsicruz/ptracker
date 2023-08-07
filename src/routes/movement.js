const express = require("express");
const { route } = require("express/lib/application");
let router = express.Router();
const movementService = require("../services/movementService");

router.post("/", movementService.create);
router.get("/", movementService.select);
router.put("/:id", movementService.update);
router.get("/test", movementService.test);
//srouter.delete("/:id", movementService.delete)

module.exports = router;