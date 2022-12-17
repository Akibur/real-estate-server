const admin = require("firebase-admin");

module.exports = async function verifyToken(req, res, next) {
    if (req.headers?.authorization?.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            console.log("verify token", token);
            const decodedUser = await admin.auth().verifyIdToken(token);
            console.log(decodedUser.email);
            req.decodedEmail = decodedUser.email;
        }
        catch {
        }
    }
    next();
};