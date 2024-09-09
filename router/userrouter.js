// express
const express = require("express")
const router = express.Router()

const userController = require("../controller/userController")
const { validation, userSchema } = require("../middleware/yup")
const tokenCheck = require("../middleware/checkToken")

// user
router.get("/portfolio/user", userController.getUser)
router.post("/portfolio/gedAdminDetails", userController.getAdminDetails)
router.post("/portfolio/user/update", tokenCheck.validateToken, userController.updateUser)
router.post("/portfolio/user/update/password", tokenCheck.validateToken, userController.updateUserPassword)
router.post("/portfolio/user/add", tokenCheck.validateToken, validation(userSchema), userController.addUser)
router.post("/portfolio/user/delete", tokenCheck.validateToken, userController.deleteUser)

module.exports = router