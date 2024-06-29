const mongoose = require('mongoose');
const Item = require('./models/item');

async function connectToMongoDB() {
	try {
		await mongoose.connect(process.env.DB_HOST || 'mongodb://localhost:27017/backend-test', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		process.exit(1);
	}
}

async function createItem(itemData = {}) {
	try {
		const newItem = await Item.create({
			...itemData,
			isActive: itemData.isActive !== undefined ? itemData.isActive : true,
			lastUpdate: new Date()
		});
		return newItem;
	} catch (error) {
		console.error('Error creating item:', error);
		throw error;
	}
}

async function getAllItems() {
	try {
		const items = await Item.find({});
		return items;
	} catch (error) {
		console.error('Error fetching items:', error);
		throw error;
	}
}

async function findItem(id) {
	try {
		const item = await Item.findById(id);
		return item;
	} catch (error) {
		console.error('Error finding item:', error);
		throw error;
	}
}

async function updateItem(id, itemData = {}) {
	try {
		const updatedItem = await Item.findByIdAndUpdate(id, {
			isActive: itemData.isActive !== undefined ? itemData.isActive : true,
			...itemData,
			lastUpdate: new Date()
		}, { new: true });
		return updatedItem;
	} catch (error) {
		console.error('Error updating item:', error);
		throw error;
	}
}

async function deleteItem(item) {
	try {
		await Item.findByIdAndDelete(item._id);
	} catch (error) {
		console.error('Error deleting item:', error);
		throw error;
	}
}

module.exports = { connectToMongoDB, createItem, getAllItems, findItem, updateItem, deleteItem };
