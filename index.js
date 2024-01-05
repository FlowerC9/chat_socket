import express from 'express';
import http from 'node:http';

import {Server} from 'socket.io'

const app=express();
const server=http.createServer(app);
const io=new Server(server);
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile('index.html');
})

io.on('connection',(socket)=>{
    console.log(`a user connected ${socket.id}`);
    socket.on('chat message',(msg)=>{
        io.emit('chat message',msg);
    })
})

server.listen(3000,()=>{
    console.log('The server is running on http://localhost:3000')
})