// express
const express = require("express")
const router = express.Router()

// import folder
const portfolioController = require("../controller/portfolioControllers")
const tokenCheck = require("../middleware/checkToken")


const multer = require("multer")
const path = require('path');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Route to handle file upload
router.get('/portfolio/image', portfolioController.getImage)
// router.post('/portfolio/heroSection/post', upload.single('skill-image'))

// API link in router

router.get("/portfolio/aboutMe", portfolioController.aboutMe)
router.post("/portfolio/aboutMe/update", tokenCheck.validateToken, portfolioController.aboutUpdate)


router.post("/portfolio/update/heroSectionImageUpdate", portfolioController.heroSectionImageUpdate)
router.post("/portfolio/update/aboutImageUpdate", portfolioController.aboutImageUpdate)
router.post("/portfolio/update/resumeImageUpdate", portfolioController.resumeImageUpdate)


module.exports = router