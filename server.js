const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.set("views", "./public/views");
app.set("view engine", "pug");
//create middleware
const check = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hours = date.getHours();
  if (day >= 1 && day <= 5 && hours >= 9 && hours <= 17) {
    next();
  } else {
    res.render("index");
  }
};
app.use(check);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "HomePage.html"));
});
app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "ourServices.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "contactUs.html"));
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`visit http://localhost:${port}`);
});
