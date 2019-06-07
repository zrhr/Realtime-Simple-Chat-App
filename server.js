var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');


console.log(process.env.PORT)
app.listen(process.env.PORT || process.env.$PORT || 3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

const users={}

io.on('connection', socket =>{
    socket.on('new-user', name =>{
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message =>{
        socket.broadcast.emit('chat-message',{ message: message, name: users[socket.id]})
    })
    socket.on('disconnect', () =>{
        socket.broadcast.emit('user-disconnected', users[socket.id])
       delete users[socket.id]
        
    })
})