"use strict;"

const express = require('express');

let router = express.Router();
let Post = require('../models/post');

router.get('/', (req,res) => {
	Post.retrieveAll()
	.then( posts => {
		res.send(posts);
	})
	.catch( err => {
		res.status(400).send(err); 
	});
});

router.post('/', (req,res) => {
	Post.create(req.body.text)
	.then( post => {
		res.send(post);
	})
	.catch( err => {
		res.status(400).send(err); 
	});
});

router.delete('/', (req,res) => {
	Post.delete(req.body.id)
	.then( post => {
		res.send(post);
	})
	.catch( err => {
		res.status(400).send(err); 
	});
});

router.put('/', (req,res) => {
	Post.update(req.body)
	.then( post => {
		res.send(post);
	})
	.catch( err => {
		res.status(400).send(err); 
	});
});

module.exports = router;

