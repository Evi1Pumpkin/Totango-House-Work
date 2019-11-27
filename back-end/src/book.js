var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    isbn: { type: String, require: true, unique: true },
	title: { type: String, require: true },
	genre: { type: String, require: true },
	description: { type: String, require: true  },
	authors: [{ type: String, require: true }],
	publishedDate: { type: Date, require: true },
	thumbnailUrl: { type: String },
	price: { type: String, require: true },
});

var Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.getBooks = function( callback ){
	Book.find(callback);
}

module.exports.addBooks = function( books, callback ){
	Book.insertMany(books, callback);
}

module.exports.deleteBook = function( id, callback ){
	var query = { isbn: id};
	
	Book.remove(query, callback);
}