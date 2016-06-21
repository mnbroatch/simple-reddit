"use strict;"

const PORT = process.env.PORT || 8000;

const morgan = require('morgan');
const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');

let Post = require('./models/post');
let app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

app.use('/posts', require('./routes/posts'));
app.set('view engine', 'pug');

app.get('/', (req,res) => {
	Post.retrieveAll()
	.then( posts => {
		posts = posts.map(post => {
			post.createdAt = moment(post.createdAt).format('LLL');
			return post;
		});
		res.render('index',{posts:posts});
	})
	.catch( err => {
		res.status(400).send(err); 
	});
});

app.listen(PORT, err => {
	console.log(err || `Server online. Port ${PORT}`);
});



