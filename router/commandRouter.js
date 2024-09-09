// express
const express = require("express")
const router = express.Router()

const commandController = require("../controller/commandController")
const tokenCheck = require("../middleware/checkToken")

// command
router.get("/portfolio/command", commandController.getCommand)
router.post("/portfolio/command/add", commandController.addCommand)
router.post("/portfolio/command/delete", tokenCheck.validateToken, commandController.deleteCommand)

module.exports = router