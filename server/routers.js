const express = require('express');
const router = express.Router();
const List = require('./models/list');

router.get('/todolist', (req, res) => {
	List.find({})
		.then((ress) => {
			res.send(ress);
		});
});

router.get('/todolist/:id', (req, res) => {
	List.find({_id: req.params.id})
		.then((ress) => {
			res.send(ress);
		});
});

router.post('/todolist', (req, res, next) => {
	const { title } = req.body

	List.create(req.body)
		.then((ress) => {
			res.send(ress);
		})
		.catch(next);
});

router.put('/todolist/:id', (req, res) => {
	List.findOneAndUpdate({_id: req.params.id}, req.body)
		.then((ress) => {
			List.findOne({_id: req.params.id})
				.then((resUpdated) => {
					res.send(resUpdated);
				});
		});
});

router.delete('/todolist/:id', (req, res, next) => {
	List.findOneAndRemove({_id: req.params.id})
		.then((ress) => {
			res.send(ress);
		})
		.catch(next);
});

module.exports = router;