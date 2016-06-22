"use strict;"

const express = require('express');

let router = express.Router();
let Comment = require('../models/comment');

router.post('/', (req,res) => {
	Comment.create(req.body.text, req.body.postId)
	.then( comment => {
		res.send(comment);
	})
	.catch( err => {
		res.status(400).send(err); 
	});
});

router.get('/', (req,res) => {
	Comment.retrieveAll()
	.then( comments => {
		res.send(comments);
	})
	.catch( err => {
		res.status(400).send(err); 
	});
});

router.delete('/', (req,res) => {
	Comment.delete(req.body.id)
	.then( comment => {
		res.send(comment);
	})
	.catch( err => {
		res.status(400).send(err); 
	});
});

router.put('/', (req,res) => {
	Comment.update(req.body)
	.then( comment => {
		res.send(comment);
	})
	.catch( err => {
		res.status(400).send(err); 
	});
});

module.exports = router;
