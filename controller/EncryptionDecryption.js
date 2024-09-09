const cryptoJs = require('crypto-js')
const key = 'my-secret-key-is-safe'


module.exports = {
    decryptData: async function (payload) {
        // console.log(payload);
        let decryptData = cryptoJs.AES.decrypt(payload.data, 'my-secret-key-is-safe').toString(cryptoJs.enc.Utf8)
        let decryption = JSON.parse(decryptData);
        // console.log(decryption);
        return decryption
    },
    encryptData: async function (payload) {
        // console.log(payload);
        let encrypted = cryptoJs.AES.encrypt(JSON.stringify(payload), 'my-secret-key-is-safe').toString()
        // console.log(encrypted);
        let encryptData = JSON.parse(JSON.stringify(encrypted))
        // console.log(typeof encryptData);
        return encrypted
    }
}


// module.exports = {
//     decryptData: function (payload) {
//         try {
//             // Decrypt payload
//             let bytes = cryptoJs.AES.decrypt(payload, key);
//             let decryptedData = bytes.toString(cryptoJs.enc.Utf8);

//             // Parse decrypted data as JSON
//             return JSON.parse(decryptedData);
//         } catch (error) {
//             console.error('Decryption failed:', error);
//             throw new Error('Decryption failed');
//         }
//     },

//     encryptData: function (payload) {
//         try {
//             // Encrypt payload
//             let encrypted = cryptoJs.AES.encrypt(JSON.stringify(payload), key).toString();
//             return encrypted;
//         } catch (error) {
//             console.error('Encryption failed:', error);
//             throw new Error('Encryption failed');
//         }
//     }
// }
