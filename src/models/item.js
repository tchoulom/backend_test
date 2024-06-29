const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	isActive: { type: Boolean, required: true, default: true },
	lastUpdate: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
