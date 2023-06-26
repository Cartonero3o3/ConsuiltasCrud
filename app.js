var createError = require('http-errors');
var mongoConnection = require('./mongodbconnection');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var indexRouter = require('./routes/index');
var app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(upload.array()); 
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);

function miFuncion() {
  // Lógica de la función
  console.log('¡Hola desde la función!');
}

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true})); 


app.get('/', (req, res) => {
  // Pasar la función a la vista EJS utilizando el método render
  res.render('miVista', { miFuncion: miFuncion });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

mongoConnection.connect();

// app runs on port 3000
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

module.exports = {
	app,
	express,
};
