// express
const express = require("express")
const router = express.Router()

const skillController = require("../controller/skillController")
const tokenCheck = require("../middleware/checkToken")

// skill
router.get("/portfolio/skill", skillController.getSkill)
router.post("/portfolio/skill/update", tokenCheck.validateToken, skillController.updateSkill)
router.post("/portfolio/skill/add", tokenCheck.validateToken, skillController.addSkill)
router.post("/portfolio/skill/delete", tokenCheck.validateToken, skillController.deleteSkill)

// frontEnd Skill
router.get("/portfolio/frontend", skillController.getFrontend)

// backEnd Skill
router.get("/portfolio/backend", skillController.getBackend)


module.exports = router