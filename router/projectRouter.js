// express
const express = require("express")
const router = express.Router()

const projectController = require("../controller/projectController")
const tokenCheck = require("../middleware/checkToken")

// project
router.get("/portfolio/project", projectController.getProject)
router.post("/portfolio/project/update", tokenCheck.validateToken, projectController.updateProject)
router.post("/portfolio/project/add", tokenCheck.validateToken, projectController.addProject)
router.post("/portfolio/project/delete", tokenCheck.validateToken, projectController.deleteProject)

module.exports = router