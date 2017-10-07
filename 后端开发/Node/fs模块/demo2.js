"use strict"
var fs = require("fs")
var pro = process.argv[1];
var currentPath = pro.lastIndexOf("\\")
var path = pro.substring(0, currentPath + 1)
fs.readFile(path + "test.png", (error, data) => {
    if (error) {
        console.log(error)
    } else {
        console.log(data)
        console.log(data.length)
    }
})