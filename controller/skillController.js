const skillService = require("../service/skillService");
const encryptionDecryption = require("./EncryptionDecryption");

module.exports = {
    // Get skill
    getSkill: async (req, res) => {
        try {
            const response = await skillService.getSkill();
            const encryptedResponse = await encryptionDecryption.encryptData(response);
            res.status(200).json(encryptedResponse);
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to fetch skills", error });
        }
    },

    // Update skill
    updateSkill: async (req, res) => {
        try {
            const decryptedData = await encryptionDecryption.decryptData(req.body);
            const response = await skillService.updateSkill(decryptedData);
            const encryptedResponse = await encryptionDecryption.encryptData(response);
            res.status(200).json(encryptedResponse);
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to update skill", error });
        }
    },

    // Add skill
    addSkill: async (req, res) => {
        try {
            const decryptedData = await encryptionDecryption.decryptData(req.body);
            const response = await skillService.addSkill(decryptedData);
            const encryptedResponse = await encryptionDecryption.encryptData(response);

            if (response.status === "success") {
                res.status(200).json(encryptedResponse);
            } else {
                res.status(400).json(encryptedResponse); // Changed from 604 to 400
            }
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to add skill", error });
        }
    },

    // Delete skill
    deleteSkill: async (req, res) => {
        try {
            const decryptedData = await encryptionDecryption.decryptData(req.body);
            const response = await skillService.deleteSkill(decryptedData);
            const encryptedResponse = await encryptionDecryption.encryptData(response);
            res.status(200).json(encryptedResponse);
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to delete skill", error });
        }
    },

    // get frontend skill
    getFrontend: async (req, res) => {
        try {
            let response = await skillService.getFrontend()
            let encrypt = await encryptionDecryption.encryptData(response)
            return res.status(200).json(await encrypt)

        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to fetch skills", error });
        }
    },

    // get backend skill

    getBackend: async (req, res) => {
        try {
            let response = await skillService.getBackend()
            let encrypt = await encryptionDecryption.encryptData(response)
            return res.status(200).json(await encrypt)

        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to fetch skills", error });
        }
    },

};
