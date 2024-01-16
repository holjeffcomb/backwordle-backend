var createError = require("http-errors");
const express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

const words = [
  "strip",
  "smash",
  "shock",
  "linen",
  "chart",
  "tough",
  "white",
  "wrong",
  "plane",
  "taste",
  "noise",
  "share",
  "fault",
  "cheek",
  "yearn",
  "braid",
  "treat",
  "judge",
  "front",
  "fling",
  "color",
  "state",
  "scene",
  "harsh",
  "heavy",
  "coach",
  "means",
  "evoke",
  "knock",
  "mouth",
  "lunch",
  "hobby",
  "right",
  "grass",
  "torch",
  "glide",
  "visit",
  "movie",
  "clean",
  "throw",
  "light",
  "twist",
  "stall",
  "creed",
  "glass",
  "grace",
  "cruel",
  "witch",
  "liver",
  "night",
];

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/word", (req, res) => {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  res.send({ word: randomWord });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
