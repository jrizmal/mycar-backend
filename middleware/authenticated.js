const admin = require("firebase-admin");
const { User } = require("../models/user");
const serviceAccount = require("./fbadmin.json");
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mycar-6d0a2.firebaseio.com"
});

module.exports = async function (req, res, next) {
    if (req.headers['authorization']) {
        const token = req.headers['authorization']
        app.auth().verifyIdToken(token).then(async (decoded) => {
            // console.log(decoded);
            const dbuser = await User.findOne({fbid: decoded.uid}).exec()
            if(!dbuser){
                console.log("New user");
                const newUser = new User({
                    fbid: decoded.uid,
                    email: decoded.email,
                    name: decoded.name,
                    notifications: false,
                    fcm_id: null,
                })
                await newUser.save()
            }
            req.user = decoded
            next()
        }).catch(err => {
            res.sendStatus(403)
        })
    } else {
        res.sendStatus(403)
    }

}