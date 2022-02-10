// // creation du server
// const http = require("http");
// const app = require("./app");

// app.set("port", process.env.PORT || 3000);
// // /create a server for each request http
// // get express app
// const server = http.createServer(app);

// // const server = http.createServer((req, res) => {
// //   res.end("voila notre reponse du 10eme server");
// // });

// // choose port to listen
// server.listen(process.env.PORT || 3000);

//improve our server file after installing express
const http = require("http");
const app = require("./app");

// normalizePort function returns a valid port, provided as a number or a string

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// express app needs to know the port that we use.

const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

// check if our port is used or and listen error
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      //permission denied

      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;

    case "EADDRINUSE":
      //Address already in use. 

      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// run our express app with node server

const server = http.createServer(app);

// server error or server status listining

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("serveur écouter " + bind);
});

server.listen(port);
