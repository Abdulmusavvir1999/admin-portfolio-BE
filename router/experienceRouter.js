// express
const express = require("express")
const router = express.Router()

const experienceController = require("../controller/experienceController")
const tokenCheck = require("../middleware/checkToken")

// experience
router.get("/portfolio/experience", experienceController.getExperience)
router.post("/portfolio/experience/update", tokenCheck.validateToken, experienceController.updateExperience)
router.post("/portfolio/experience/add", tokenCheck.validateToken, experienceController.addExperience)
router.post("/portfolio/experience/delete", tokenCheck.validateToken, experienceController.deleteExperience)

module.exports = router