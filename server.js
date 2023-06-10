const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const net = require('net');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;
const connectHost = '10.0.0.22';
const connectPort = 8080;






function writeToLog(logText, type) {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const logFileName = `${year}-${month}-${day}.log`;
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const logFilePath = path.join(__dirname, 'logs', logFileName);
  const logLine = `Time: ${hour}:${minute}|  Type: ${type} |  Log info:  ${logText}\n`;
  //const logLine = `${new Date().toISOString()} ${logText}\n`;
  fs.appendFile(logFilePath, logLine, (err) => {
    if (err) {
      console.error(err);
    }
  });
}



app.post('/', function(req, res) {
  // Handle the message here
  sendMessage(req.body.message);
  //console.log("Working")
  const logText = `API request: ${req.body.message}`;
  writeToLog(logText, "Request");
  res.sendStatus(200);
});


app.listen(port, () => {
  const logText = `Server listening at http://localhost:${port}`;
  console.log(`Server listening at http://localhost:${port}`);
  writeToLog(logText, "REST   ");
});


function sendMessage(command) {
  const socket = new net.Socket();
  socket.connect(connectPort, connectHost, () => {
    const logText = `Connected to ${connectHost}:${connectPort}`;
    console.log(`Connected to ${connectHost}:${connectPort}`);
    writeToLog(logText, "Socket ");
    socket.write(command);
  });

  socket.on("data", (data) => {
    const logText = `Received data from server: ${data}`;
    console.log(`Received data from server: ${data}`);
    writeToLog(logText, "Socket ");
  });

  socket.on("close", () => {
    const logText = "Connection closed";
    console.log("Connection closed");
    writeToLog(logText, "Socket ");
  });

  socket.on("error", (err) => {
    const logText = `Socket error occurred: ${err}\n Exiting application now`;
    console.error(`Error occurred: ${err}`);
    writeToLog(logText, "Socket ");
    setTimeout(function(){
      process.exit(1);
    }, 1000);
  });

}




// const socket = new net.Socket();
// socket.connect(connectPort, connectHost, () => {
//   console.log(`Connected to ${connectHost}:${connectPort}`);
//   //socket.write("<11PR00\r");
// });

// socket.on('data', (data) => {
//   console.log(`Received data from server: ${data}`);
// });

// socket.on('close', () => {
//   console.log('Connection closed');
// });

// socket.on('error', (err) => {
//   console.error(`Error occurred: ${err}`);
// });