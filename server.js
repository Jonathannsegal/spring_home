const express = require('express'); //web appp

const port = process.env.PORT || 2222; //port
const app = express(); //instantiate
app.use(express.static(__dirname + '/game'));

app.get('/', function(req, res) {
    
    res.redirect('menu');
});

app.listen(port, function() { //Listener for specified port
    console.log("Server running at: http://localhost:" + port)
});
