const imageRepository = require("../repository/imageRepository")

module.exports = {
    updateImage: async (req, res) => {
        let response = await imageRepository.updateImage(req)
        return response
    }
}