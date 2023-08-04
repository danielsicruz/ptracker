const express = require("express");
const { route } = require("express/lib/application");
let router = express.Router();
const contextService = require("../services/contextService");

router.post("/", contextService.create);
router.get("/", contextService.select);
router.put("/:id", contextService.update);
//srouter.delete("/:id", userService.delete)

module.exports = router;