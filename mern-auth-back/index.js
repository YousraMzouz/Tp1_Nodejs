const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
 

var http = require('http');
//2. Express.js
var app = express();
//3. Create a server that will serve both http and socket connection using the app function of Express.js
var server = http.createServer(app);
//4. Socket.io
//Pass the server to the socket.io to handle socket connection
var io = require('socket.io')(server);

app.get('/', function (request, response) {
  //The file will include the socket.io.js file to establish the socket connection
  response.sendFile(__dirname + '/index.html');
});




app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000 ;

server.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));


// set up mongoose

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");

    }
);

//5. This function will be executed every time a user connect to the socket through the "/" express route
io.on('connection', function (socket) {
  console.log("A new client connected!");
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
// set up routes

app.use("/users", require("./routes/userRouter"));