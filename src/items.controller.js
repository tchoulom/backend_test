const service = require('./items.service');
const mongoose = require('mongoose');

async function findItem(req, res, next, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			message: 'Invalid item',
			errors: { id: 'is not a valid ObjectId' },
		});
	}

	try {
		const item = await service.findItem(id);
		if (!item) {
			return res.status(404).json({
				message: 'Invalid item',
				errors: { id: 'is unknown' },
			});
		}
		req.item = item;
		next();
	} catch (error) {
		next(error); // Pass error to next middleware
	}
}

async function createItem(req, res, next) {
	try {
		const newItem = await service.createItem(req.body);
		return res.json({ item: newItem });
	} catch (error) {
		next(error); // Pass error to next middleware
	}
}

async function getAllItems(req, res, next) {
	try {
		const items = await service.getAllItems();

		// Filtering by activity status
		let filteredItems = items;
		if (req.query.filter_by === 'active') {
			filteredItems = items.filter(item => item.isActive === true);
		} else if (req.query.filter_by === 'inactive') {
			filteredItems = items.filter(item => item.isActive === false);
		}

		return res.json({ items: filteredItems });
	} catch (error) {
		next(error); // Pass error to next middleware
	}
}

async function getOneItem(req, res, next) {
	try {
		return res.json({ item: req.item });
	} catch (error) {
		next(error); // Pass error to next middleware
	}
}

async function updateItem(req, res, next) {
	try {
		const id = req.params.id; // Get ID from query parameters
		const updatedItem = await service.updateItem(id, req.body); // Call updateItem with the ID and data to update
		return res.json({ item: updatedItem });
	} catch (error) {
		next(error); // Pass error to next middleware
	}
}

async function deleteItem(req, res, next) {
	try {
		await service.deleteItem(req.item);
		return res.json({ item: req.item });
	} catch (error) {
		next(error); // Pass error to next middleware
	}
}

module.exports = {
	findItem,
	createItem,
	getAllItems,
	getOneItem,
	updateItem,
	deleteItem,
};
