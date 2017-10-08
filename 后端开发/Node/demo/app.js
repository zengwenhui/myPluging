var express = require("express");
var bodyParset = require("body-parser");

var app = express();
app.use(bodyParset.json());
app.use(bodyParset.urlencoded({
    extended: false
}))
app.use(express.static(__dirname + "/public"));
app.use("/user", require("./router/user.js"));
// app.get("/", (request, response) => {
//     response.end("hello")

// })
app.listen(80)