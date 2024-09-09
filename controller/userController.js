const userService = require("../service/userService");
const encryptionDecryption = require("./EncryptionDecryption");

module.exports = {
    // Get user
    getUser: async (req, res) => {
        try {
            const response = await userService.getUser();
            const encryptedResponse = await encryptionDecryption.encryptData(response);
            res.status(200).json(encryptedResponse);
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to fetch users", error });
        }
    },

    //getAdminDetails
    getAdminDetails: async (req, res) => {
        try {
            const decryptedData = await encryptionDecryption.decryptData(req.body);
            console.log(decryptedData);

            const response = await userService.getAdminDetails(decryptedData);
            const encryptedResponse = await encryptionDecryption.encryptData(response);
            res.status(200).json(encryptedResponse);
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to fetch users", error });
        }
    },

    // Update user
    updateUser: async (req, res) => {
        try {
            const decryptedData = await encryptionDecryption.decryptData(req.body);
            const response = await userService.updateUser(decryptedData);
            const encryptedResponse = await encryptionDecryption.encryptData(response);
            res.status(200).json(encryptedResponse);
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to update user", error });
        }
    },

    // Update user
    updateUserPassword: async (req, res) => {
        try {
            const decryptedData = await encryptionDecryption.decryptData(req.body);
            const response = await userService.updateUserPassword(decryptedData);
            const encryptedResponse = await encryptionDecryption.encryptData(response);
            res.status(200).json(encryptedResponse);
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to update user", error });
        }
    },

    // Add user
    addUser: async (req, res) => {
        try {
            const decryptedData = await encryptionDecryption.decryptData(req.body);
            const response = await userService.addUser(decryptedData);
            const encryptedResponse = await encryptionDecryption.encryptData(response);

            if (response.status === "success") {
                res.status(200).json(encryptedResponse);
            } else {
                res.status(400).json(encryptedResponse); // Changed from 604 to 400
            }
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to add user", error });
        }
    },

    // Delete user
    deleteUser: async (req, res) => {
        try {
            const decryptedData = await encryptionDecryption.decryptData(req.body);
            const response = await userService.deleteUser(decryptedData);
            const encryptedResponse = await encryptionDecryption.encryptData(response);
            res.status(200).json(encryptedResponse);
        } catch (error) {
            res.status(500).json({ status: "error", message: "Failed to delete user", error });
        }
    },
};
