var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');


var mongoDB = mongoose.connect('mongodb://localhost/tripAPI', { useNewUrlParser: true });
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

var port = process.env.PORT || 3000;

var Trip = require('./models/tripModel');
mainRouter = require('./routes/mainRouter')(Trip);

app.use(express.static('app'));

app.use('/api', mainRouter);

app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.use((req, res) => res.sendFile(`${__dirname}/app/index.html`));

app.listen(port, function(){
    console.log('port run' + port);
    console.log(mongoose.connection.readyState);
});
setTimeout(function(){ console.log(mongoose.connection.readyState); }, 3000);