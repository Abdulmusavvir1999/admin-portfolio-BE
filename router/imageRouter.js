const express = require('express')
const router = express.Router();
const path = require('path')
const images = require('../image');

const multer = require('multer') // file upload use this package (npm install multer) 

// import
const imageController = require("../controller/imageController")

// upload file storage path 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

//image upload
router.post("/portfolio/image/upload", upload.single('image'), images.storeImage);
router.post("/portfolio/image/update", imageController.updateImage);

module.exports = router;