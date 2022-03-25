const express = require("express");
const path = require("path");
let app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

// app.get('/', (req,res) => {
//     res.send('Hello from the web server side... ')
// })

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.post("/contact-form", (req, res, next) => {
  let Email = req.body.email;
  let Password = req.body.password;
  let obj = [];
  let read = fs.readFileSync("/express.json");

  let obj = obj + Email + Password

  JSON.parse(read).push(obj);

  fs.writeFileSync("/express.json", JSON.stringify(JSON.parse(read)), (err) => {
    console.log(err);
  });

  app.send("Thank you for your submission");

  next();
});

app.get("/formsubmission", (req, res, next) => {
  fs.readFile(path.join(__dirname, "/express.json"), (err, data) => {
    JSON.parse(data).array.forEach((form) => {});
    res.send(JSON.parse(data));
  });
});
app.listen(3000);
