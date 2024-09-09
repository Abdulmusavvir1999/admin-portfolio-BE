const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');

router.post('/portfolio/login', loginController.login);
// logout

router.post("/portfolio/logout", loginController.logout)




module.exports = router;
