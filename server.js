const express = require('express'); //web appp

const port = 2222; //port
const app = express(); //instantiate
app.use(express.static('./game/level-1')); //serve
app.listen(port, function() { //Listener for specified port
    console.log("Server running at: http://localhost:" + port)
});
