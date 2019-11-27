var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

Book = require('./book');

mongoose.connect('mongodb://localhost/BookTango');
var db = mongoose.connection;

app.get('/api/books', function(req, res) {
  Book.getBooks(function(err, books) {
	if (err){
		res.status(500).json({
			status: 'error',
			message: 'An error occurred trying to process your request',
		  })
	} else{
		res.json(books);
	} 
  });
});

app.post('/api/books', function(req, res) {
  var books;

  if (Array.isArray(req.body)) {
    books = req.body;
  } else {
    books = [req.body];
  }

  Book.addBooks(books, function(err, books) {
	if (err){
		res.status(500).json({
			status: 'error',
			message: 'An error occurred trying to process your request',
		  })
	} else{
		res.json(books);
	} 
  });
});

app.delete('/api/books/:_id', function(req, res) {
  var id = req.params._id;

  Book.deleteBook(id, function(err, data) {
    if (err || (data && data.deletedCount < 1)){
		res.status(500).json({
			status: 'error',
			message: 'An error occurred trying to process your request',
		  })
	} else{
		res.json(id);
	} 
  });
});

app.listen(3000);
console.log('BookTango is serving on port 3000...');
