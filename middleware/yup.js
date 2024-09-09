const yup = require('yup');

const decryptions = require("../controller/EncryptionDecryption")

// Define the user schema with an additional role field
const userSchema = yup.object({
    email: yup.string().email("Enter a valid email address").required("Email is required"),
    password: yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
    role: yup.string().required("Role is a required field") // Added 'role' field
});

// Validation middleware
const validation = (schema) => async (req, res, next) => {

    const decryption = await decryptions.decryptData(req.body)
    const body = decryption;

    try {
        await schema.validate(body, { abortEarly: false }); // `abortEarly: false` ensures all errors are returned
        next();
    } catch (error) {
        // Extract and format errors
        const errors = error.inner.map(err => ({
            path: err.path,
            message: err.message
        }));
        return res.status(400).json({ errors });
    }
};

module.exports = {
    validation,
    userSchema
};
