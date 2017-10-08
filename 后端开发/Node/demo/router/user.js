var express = require("express");
var router = express.Router();

router.all("/list", (request, response) => {
    console.log(request.method)
    console.log(request.baseUrl)
    console.log(request.path)
    console.log(request.header['user-agent'])
        // response.end("{'a':22}")
    response.json({
        a: 111,
        b: [true, "11", 11]
    })
})


module.exports = router;