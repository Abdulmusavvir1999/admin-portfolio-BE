const xss = require('xss');
var xssFilters = require('xss-filters');
const encryptionDecryption = require("../controller/EncryptionDecryption")
// const { body, validationResult } = require('express-validator');



// Middleware function to sanitize the entire req.body
var proceed = 0
const sanitizeInput = async (req, res, next) => {
    proceed = 0
    var decryptData = await encryptionDecryption.decryptData(req.body)
    // var decryptData = req.body;
    decryptData = sanitizeRecursive(decryptData, 0);

    if (proceed == 1)
        res.status(400).json({ error: 'Input contains unwanted HTML tags.' })
    else if (proceed == 2)
        res.status(401).json({ error: 'Input contains disallowed characters.' })
    else
        next();
};

const sanitizeInputForAppSettings = (req, res, next) => {
    proceed = 0
    req.body = sanitizeRecursive(req.body, 1);
    if (proceed == 1)
        res.status(402).json({ error: 'Input contains Script HTML tags.' })
    else if (proceed == 2)
        res.status(401).json({ error: 'Input contains disallowed characters.' })
    else
        next();
};

// Recursive function to sanitize data
const sanitizeRecursive = (data, option) => {
    if (Array.isArray(data)) {
        return data.map((item) => sanitizeRecursive(item, option));
    } else if (typeof data === 'object' && data !== null) {

        const sanitizedObject = {};
        for (const [key, value] of Object.entries(data)) {
            sanitizedObject[key] = sanitizeRecursive(value, option);
        }
        return sanitizedObject;
    } else {
        // if (option === 0) {
        if (data !== null && data !== 0 && typeof data !== 'number') {
            if (xssFilters.inHTMLData(data) !== data) {
                proceed = 1;
                return;
            }
        }
        // }
        if (containsOnlyScriptTag(data)) {
            proceed = 1;
            return;
        }
        if (containsLogicalOperators(data)) {
            proceed = 2;
            return;
        }
        return xss(data);
    }
};

const containsLogicalOperators = (data) => {
    // Check if the request body contains && or ||
    // Customize this logic based on your requirements
    const regex = /(&&|\|\|)/;
    return regex.test(JSON.stringify(data));
};
const containsOnlyScriptTag = (data) => {
    // Check if the request body contains only a <script> tag
    // Customize this logic based on your requirements
    const regex = /^<script>[\s\S]*<\/script>$/i;
    return regex.test(data);
};
const MobileSanitizeInput = async (req, res, next) => {
    let proceed = 0;

    const MobileSanitizeRecursive = (data, option) => {
        if (Array.isArray(data)) {
            return data.map((item) => MobileSanitizeRecursive(item, option));
        } else if (typeof data === 'object' && data !== null) {
            const sanitizedObject = {};
            for (const [key, value] of Object.entries(data)) {
                sanitizedObject[key] = MobileSanitizeRecursive(value, option);
            }
            return sanitizedObject;
        } else {
            if (data !== null && data !== 0 && typeof data !== 'number') {
                // Assuming you want to sanitize all string values
                const sanitizedValue = xssFilters.inHTMLData(data);
                if (sanitizedValue !== data) {
                    proceed = 1;
                    return sanitizedValue;
                }
            }

            if (MobileContainsLogicalOperators(data)) {
                proceed = 2;
                return data;
            }
            return data;
        }
    };
    req.body = MobileSanitizeRecursive(req.body, 0);

    if (proceed === 1) {
        res.status(400).json({ error: 'Input contains unwanted HTML tags.' });
    } else if (proceed === 2) {
        res.status(401).json({ error: 'Input contains disallowed characters.' });
    } else {
        next();
    }
};

const MobileContainsLogicalOperators = (data) => {
    const regex = /(&&|\|\|)/;
    return regex.test(JSON.stringify(data));
};

// validation signup data
const yup = require("yup")
let userSchema = yup.object({
    email: yup.string().email("Enter correct Format Email").required(),
    password: yup.string().min(5).required()
});

const validation = (schema) => async (req, res, next) => {
    const body = req.body

    try {
        await schema.validate(body)
        next()
    } catch (error) {
        return res.status(400).json({ error })
    }
}

module.exports = {
    MobileSanitizeInput,
    sanitizeInput,
    sanitizeInputForAppSettings
};


// module.exports = {
//     MobileSanitizeInput, sanitizeInput, sanitizeInputForAppSettings
// };




/* const { body, validationResult } = require('express-validator');

const sanitizeInput = async (req, res, next) => {
    console.log('sanitize');
    console.log(req.body);
    // const payload = req.body;
    var payload = await encryptionDecryption.decryptDatas(req)

    // Define a function to check for unwanted characters in the payload
    const hasUnwantedCharacters = (value) => {
        return /<[a-z][\s\S]*>/i.test(value) || /\&\&/i.test(value);
    };

    // Check each field in the payload for unwanted characters
    for (const key in payload) {
        if (Object.hasOwnProperty.call(payload, key)) {
            const value = payload[key];

            if (typeof value === 'string' && hasUnwantedCharacters(value)) {
                return res.status(400).json({ error: `Invalid characters detected in ${key}` });
            }
        }
    }

    next(); // Move to the next middleware
};

module.exports = { sanitizeInput }; */

