const Token = require("../models/token");

async function admin_authenticator(req, res, next) {
    try {
        const userToken = req.headers["authorization"];
        console.log('userToken:', userToken)
        if (!userToken) {
            throw new Error("Authorization header missing.");
        }

        if (userToken !== "predefined_admin_token") {
            throw new Error("Not authorized as admin.");
        }
        
        console.log('Authorization success')

        next();
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
}

module.exports = admin_authenticator;
