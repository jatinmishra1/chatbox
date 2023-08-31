let messagecontainer=document.getElementById("message-container");
let messageInput=document.getElementById("message-input")
let sendbutton=document.getElementById("send-button")

const socket=io("http://localhost:3000")

const username=prompt("enter your user name")
let names=['h1','h2','h3','h4','h5'];
let pknames=names[Math.floor(Math.random()*names.length)]
// appendMessage("you joined the chat","rihgt")

socket.emit("new-user",username)
socket.on("user-connected",user=>{
    appendMessage2(user+"joined the chat","center")
})
socket.on("user-disconnected",user=>{
    appendMessage2(user+'Left the chat',"center")
})
socket.on("chat-message",(data)=>{
    appendMessage(data.user+":"+data.data,"left")
    console.log(data)
})

// socket.emit("send-chat-message","use tackel")
sendbutton.addEventListener("click",e=>{
    e.preventDefault();
    socket.emit("send-chat-message",messageInput.value)
    appendMessage(messageInput.value,"right")
    messageInput.value=""
})

function appendMessage(data,dir){
let message=document.createElement("div");
message.classList.add("message")
message.classList.add(dir);
message.textContent=data;
messagecontainer.append(message)
}

function appendMessage2(data,dir){
    let message=document.createElement("h1");
    message.classList.add("message")
    message.classList.add(dir);
    message.textContent=data;
    messagecontainer.append(message)
    }

