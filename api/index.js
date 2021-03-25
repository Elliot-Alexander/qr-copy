//Express setup
const express = require("express")
const http = require("http")
const app = express()
const httpServer = http.createServer(app)

//Socket setup
const ioOptions = {
    cors: {
        origin: 'http://localhost:8080',
        methods: ["GET", "POST"]
    }
}
const io = require("socket.io")(httpServer, ioOptions)

//Other setup
const uuid = require("uuid")
const moment = require("moment")
// const UIDGenerator = require('uid-generator')
// const uidgen = new UIDGenerator(128)

let activeSessions = []

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on("getSetup", () => {
        let sessionId = uuid.v4()
        let token = uuid.v1({
            msecs: new Date().getTime()
        })

        let sessionOverview = {
            sessionId: sessionId,
            created: moment(),
            expires: moment().add(30, "minutes")
        }

        activeSessions.push(sessionOverview)

        let sessionDetails = {
            sessionId: sessionId,
            token: token
        }

        console.log(sessionId)
        socket.join(sessionId)
        socket.emit('sessionDetails', sessionDetails)
    })
    socket.on("joinSession", (sessionId) => {
        for(let i = 0; i < activeSessions.length; i++) {
            if(activeSessions[i].sessionId === sessionId) {
                socket.join(sessionId)
                console.log(socket.id + " just joined " + sessionId)
                socket.emit('clientJoined')
            }
        }
    })


})



httpServer.listen(3000)