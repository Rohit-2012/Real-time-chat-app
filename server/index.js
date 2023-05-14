const express = require('express')
const app = express() //instance of express
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io') //importing Server class of the socket.io library

app.use(cors())

const server = http.createServer(app)

//instance of Server class
const io = new Server (server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

//socket.io works on events
io.on("connection", (socket)=>{
    console.log(`User connected: ${socket.id}`)

    //creating an event in socket.io(backend), which will determine if someone wants to join a room
    socket.on('join_room', (data)=>{
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room ${data}`)
    })

    //creating an event for sending message
    socket.on("send_message", (data)=>{
        console.log(data)
        socket.to(data.room).emit("receive_message", data)
    })
    //for disconnecting
    socket.on('disconnect', ()=>{
        console.log('User Disconnected', socket.id)
    })
})

server.listen(3001, ()=>{
    console.log('SERVER RUNNING')
})
