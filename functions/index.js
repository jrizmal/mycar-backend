const mongoose = require('mongoose');
const { User } = require("./models/user")
const functions = require('firebase-functions');
const { Registration } = require('./models/common');
const { warn } = require("firebase-functions/lib/logger");

/* const admin = require('firebase-admin');
admin.initializeApp(); */

exports.mycarNotifications = functions.https.onRequest(async (req, res) => {

    const connectionString = "mongodb+srv://api-server:apiServerPass.1@cluster0.3sq4g.mongodb.net/myCar?retryWrites=true&w=majority"
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on('error', function () {
        res.json({ message: "Error while connecting to database" })
        return
    });



    db.once('open', async function () {
        warn("Db connected")
        /* Fetch all users */
        warn("Fetching users")
        const users = await User.find({ notifications: true }).exec()
        const dateNow = Date.now()
        warn("Date now: ", dateNow)
        let sent = []
        warn("Iterating through users")
        for (const user in users) {
            warn("New user")
            // warn("User: ",user)
            /* Fetch all registrations */
            warn("Fetching registrations")
            const registrations = await Registration.find({ user: user.fbid }).exec()
            for (const reg in registrations) {
                const exp = reg.expiration
                warn("Expiration: ",exp)
                const diff = exp - dateNow
                if (diff < 1000 * 60 * 60 * 24 * 7) {
                    warn("Reg found")
                    sent.push({
                        fcm_key: user.fcm_id,
                        type: "Registration",
                        date: exp
                    })
                }
            }

        }
        res.json(sent)
    });

    /* module.exports = db
    const messaging = admin.messaging()

    db.collection("users").get().then(qs => {
        let promises: Array<Promise<String>> = []
        qs.docs.forEach(doc => {
            const sub = doc.data()

            const timestamp: firebase.firestore.Timestamp = sub.timezone
            const userDate = timestamp.toDate()

            const now = new Date()
            userDate.setFullYear(now.getFullYear())
            userDate.setMonth(now.getMonth())
            userDate.setDate(now.getDate())

            const times = suncalc.getTimes(userDate, sub.lat, sub.lon)
            const sunset: Date = times.sunset

            promises.push(messaging.send({
                notification: {
                    title: "Hello from Sunlight",
                    body: `Sunset: ${sunset.getHours()}:${sunset.getMinutes()}`,
                    imageUrl: "https://assets.change.org/photos/7/li/lf/RslIlFDZYdbduwG-800x450-noPad.jpg"
                },
                token: sub.message_key,
                webpush: {
                    fcmOptions: {
                        link: "https://sunlight-e0215.web.app/",
                    }
                },
                android: {
                    priority: "high",
                }
            }))
        })
        Promise.all(promises).then(() => {
            res.send("Done")
        })
    }) */
})
