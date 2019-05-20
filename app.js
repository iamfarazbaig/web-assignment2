const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const { connectMongo } = require("./config/db");
const app = express();
//Helmet helps to secure Express apps by setting various HTTP headers.
app.use(
  helmet({
    dnsPrefetchControl: { allow: "true" }
  })
);

//Connect to MongoDB
connectMongo().catch(err => console.log(err));

//Morgan logger
if (app.get("env") === "development") {
  app.use(morgan("dev")); //logging only in development phase
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//To prevent CORS errors. this should be before routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // * gives  access to any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    //we check req.method(which gives access to the http method used:get,post etc) to OPTIONS. browser always sends options request along with post or put.
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next(); // this is included if we dont immediately return the output from the above if statement, so that other routes can take over
});

//Routes which should handle requests
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/posts", require("./routes/posts"));

//serve static assets in prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
module.exports = app;
