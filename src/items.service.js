const fs = require('fs').promises; // Using fs.promises for asynchronous operations
const path = require('path');
const itemFilename = process.env.ITEMS_FILENAME || 'items.json';

let items;

async function loadItems() {
	try {
		const data = await fs.readFile(path.join(__dirname, 'data', itemFilename));
		items = JSON.parse(data.toString());
	} catch (err) {
		console.error('Error loading items:', err);
		items = [];
	}
}

async function saveItems() {
	try {
		await fs.writeFile(path.join(__dirname, 'data', itemFilename), JSON.stringify(items, null, 2));
	} catch (err) {
		console.error('Error saving items:', err);
	}
}

async function createItem(itemData = {}) {
	const newItem = { ...itemData, id: items.length + 1, lastUpdate: new Date() };
	items.push(newItem);
	await saveItems();
	return newItem;
}

async function getAllItems() {
	await loadItems(); // Asynchronous loading of items
	return items;
}

async function findItem(id) {
	await loadItems(); // Asynchronous loading of items
	return items.find((i) => +i.id === +id);
}

async function updateItem(item, itemData = {}) {
	const updatedItem = { ...item, ...itemData, lastUpdate: new Date() };
	items = items.map((i) => (i.id === item.id ? updatedItem : i));
	await saveItems();
	return updatedItem;
}

async function deleteItem(item) {
	items = items.filter((i) => i.id !== item.id);
	await saveItems();
}

module.exports = { createItem, getAllItems, findItem, updateItem, deleteItem };
