const admin = require("firebase-admin");
const serviceAccount = require("./fbadmin.json");
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mycar-6d0a2.firebaseio.com"
});

module.exports = async function (req, res, next) {
    if (req.headers['authorization']) {
        const token = req.headers['authorization']
        app.auth().verifyIdToken(token).then(decoded => {
            req.user = decoded
            next()
        }).catch(err => {
            res.sendStatus(403)
        })
    } else {
        res.sendStatus(403)
    }

}