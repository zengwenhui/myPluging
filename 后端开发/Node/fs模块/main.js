"use  strict"
var fs = require("fs")
var pro = process.argv[1];
var currentPath = pro.lastIndexOf("\\")
var path = pro.substring(0, currentPath + 1)
fs.readFile(path + "demo.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }

})