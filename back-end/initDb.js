Book = require('./src/book');
var mongoose = require('mongoose');
var fs = require('fs');

var books = JSON.parse(fs.readFileSync('./assets/books.json', 'utf8'));

mongoose.connect('mongodb://localhost/BookTango');
var db = mongoose.connection.on('connected', () => {
    Book.addBooks(books, ()=>db.close());
});
    



