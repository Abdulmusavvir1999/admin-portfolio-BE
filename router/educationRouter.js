// express
const express = require("express")
const router = express.Router()

const educationController = require("../controller/educationController")
const tokenCheck = require("../middleware/checkToken")

// education
router.get("/portfolio/education", educationController.getEducation)
router.post("/portfolio/education/update", tokenCheck.validateToken, educationController.updateEducation)
router.post("/portfolio/education/add", tokenCheck.validateToken, educationController.addEducation)
router.post("/portfolio/education/delete", tokenCheck.validateToken, educationController.deleteEducation)

module.exports = router