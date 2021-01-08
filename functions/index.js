const mongoose = require('mongoose');
const { User } = require("./models/user")
const functions = require('firebase-functions');
const { Registration, FirstAid } = require('./models/common');
const { warn } = require("firebase-functions/lib/logger");

const admin = require('firebase-admin');
admin.initializeApp();

exports.mycarNotifications = functions.https.onRequest(async (req, res) => {

    const connectionString = "mongodb+srv://api-server:apiServerPass.1@cluster0.3sq4g.mongodb.net/myCar?retryWrites=true&w=majority"
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on('error', function () {
        res.json({ message: "Error while connecting to database" })
        return
    });

    db.once('open', async function () {
        const users = await User.find({ notifications: true }).exec()
        const dateNow = Date.now()
        let sent = []
        for (const user of users) {
            /* Registracija */
            const registrations = await Registration.find({ user: user.fbid }).exec()
            for (const reg of registrations) {
                const exp = reg.expiration
                const diff = exp - dateNow
                if (diff < 1000 * 60 * 60 * 24 * 7) {
                    sent.push({
                        fcm_key: user.fcm_id,
                        message: "V kratkem vam poteče registracija.",
                        date: exp
                    })
                }
            }

            /* Prva pomoč */
            const firstaids = await FirstAid.find({ user: user.fbid }).exec()
            for (const fa of firstaids) {
                const exp = fa.expiration
                const diff = exp - dateNow
                if (diff < 1000 * 60 * 60 * 24 * 7) {
                    sent.push({
                        fcm_key: user.fcm_id,
                        message: "V kratkem vam poteče prva pomoč.",
                        date: exp
                    })
                }
            }
        }
        let msg_promises = []
        for (const msg of sent) {
            msg_promises.push(admin.messaging().send({
                notification: {
                    title: "myCar",
                    body: msg.message,
                    imageUrl: "https://i.ibb.co/qW5hCyc/logo.png"
                },
                token: msg.fcm_key,
                webpush: {
                    fcmOptions: {
                        link: "https://mycar-6d0a2.web.app/dashboard",
                    }
                },
                android: {
                    priority: "high",
                }
            }))
        }
        await Promise.all(msg_promises)
        res.send(`Sent ${sent.length} messages.`)

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
