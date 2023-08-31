const { Socket } = require("socket.io");

const io=require("socket.io")(3000,{
    cors:{
        origin:"*",
    },
})

let users={};
io.on("connection",socket=>{
    socket.on("new-user",name=>{
        users[socket.id]=name
        socket.broadcast.emit("user-connected",name)
    })
    socket.on("send-chat-message",(data)=>{
        socket.broadcast.emit("chat-message",{user:users[socket.id],data})
        console.log(data)
    })
    socket.on("disconnect",()=>{
        socket.broadcast.emit("user-disconnected",users[socket.id])
        delete  users[socket.id]
    })
})

