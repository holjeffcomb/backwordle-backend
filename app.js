const words = require("./words");
const checkWords = require("./checkWords");
const cron = require("node-cron");

var createError = require("http-errors");
const express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

let wordOfTheDay = "slice";

cron.schedule("0 0 * * *", () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  wordOfTheDay = words[randomIndex];
  console.log(`Selected word of the day: ${wordOfTheDay}`);
});

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
  res.send({ word: wordOfTheDay });
});

app.get("/new-word", (req, res) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  wordOfTheDay = words[randomIndex];
  console.log(`Selected word of the day: ${wordOfTheDay}`);
  res.send(wordOfTheDay);
});

app.get("/check-word/:word", (req, res) => {
  const wordToCheck = req.params.word;
  const isAWord = checkWords.includes(wordToCheck.toLowerCase());
  res.send(isAWord);
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
