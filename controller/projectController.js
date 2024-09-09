const projectService = require("../service/projectService");
const encryptionDecryption = require("./EncryptionDecryption");

module.exports = {
    // Get project
    getProject: async (req, res) => {
        try {
            const response = await projectService.getProject();
            const encryptedResponse = await encryptionDecryption.encryptData(response);
            res.status(200).json(encryptedResponse);
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to fetch projects", error });
        }
    },

    // Update project
    updateProject: async (req, res) => {
        try {
            const decryptedData = await encryptionDecryption.decryptData(req.body);
            const response = await projectService.updateProject(decryptedData);
            const encryptedResponse = await encryptionDecryption.encryptData(response);
            res.status(200).json(encryptedResponse);
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to update project", error });
        }
    },

    // Add project
    addProject: async (req, res) => {
        try {
            const decryptedData = await encryptionDecryption.decryptData(req.body);
            const response = await projectService.addProject(decryptedData);
            const encryptedResponse = await encryptionDecryption.encryptData(response);

            if (response.status === "success") {
                res.status(200).json(encryptedResponse);
            } else {
                res.status(400).json(encryptedResponse); // Changed from 604 to 400
            }
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to add project", error });
        }
    },

    // Delete project
    deleteProject: async (req, res) => {
        try {
            const decryptedData = await encryptionDecryption.decryptData(req.body);
            const response = await projectService.deleteProject(decryptedData);
            const encryptedResponse = await encryptionDecryption.encryptData(response);
            res.status(200).json(encryptedResponse);
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to delete project", error });
        }
    },
};
