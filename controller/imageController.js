const imageService = require("../service/imageService")

module.exports = {
    updateImage: async (req, res) => {
        let response = await imageService.updateImage(req.body)
        return res.status(200).json(await response)
    }
}