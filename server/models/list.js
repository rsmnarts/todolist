const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
	title: {
		type: String,
		required: true
	}
});

const List = mongoose.model('list', ListSchema);

module.exports = List;