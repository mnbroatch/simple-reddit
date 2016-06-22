"use strict;"

const PORT = process.env.PORT || 8000;

const morgan = require('morgan');
const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');

let Post = require('./models/post');
let Comment = require('./models/comment');
let app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));

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

app.get('/:postId', (req,res) => {
console.log('sdasdasd');
	Comment.retrieve(req.params.postId)
	.then( comments => {
		comments = comments.map(comment => {
			comment.createdAt = moment(comment.createdAt).format('LLL');
			return comment;
		});
		console.log(comments);
		res.render('comments',{comments:comments,postId:req.params.postId});
	})
	.catch( err => {
		res.status(400).send(err); 
	});
});

app.listen(PORT, err => {
	console.log(err || `Server online. Port ${PORT}`);
});



