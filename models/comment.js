"use strict;"

let uuid = require('uuid');
let moment = require('moment');
let db = require('../config/db');

exports.create = (text,postId) => {
	return new Promise( (resolve,reject) => {
		let postToAdd = {
			id:uuid(),
			createdAt:moment().toISOString(),
			text:text,
			postId:postId
		};
		db.query('insert into comments set ?',postToAdd, (err) => {
			if(err)return reject(err);
			db.query('select * from comments order by createdAt desc limit 1', (err, post) => { 
				if(err) return reject(err);
				resolve(post);
			});
		});
	});
}

exports.retrieveAll = () => {
	return new Promise( (resolve,reject) => {
		db.query('select * from comments', (err, comments) => {
			if(err) return reject(err); 
			resolve(comments);
		});
	});
}

exports.retrieve = (postId) => {
	return new Promise( (resolve,reject) => {
		db.query('SELECT posts.text as postText, comments.* FROM posts JOIN comments ON posts.id = comments.postId WHERE posts.id = ?', postId,(err, comments) => {
			if(err) return reject(err); 
			resolve(comments);
		});
	});
}

exports.update = (newComment) => {
	return new Promise( (resolve,reject) => {
		db.query('update comments set text=?, postId=? where id=?',[newComment.text, newComment.postId, newComment.id], (err) => {
			if(err)return reject(err);
			db.query('select * from comments where id = ?',newComment.id, (err, comment) => { 
				if(err) return reject(err);
				resolve(comment);
			});
		});
	});
}

exports.delete = id => {
	return new Promise( (resolve,reject) => {
		db.query('select * from comments where id = ?', id, (err,comment) => {
			if(err) return reject(err); 
			db.query('delete from comments where id = ?',id, (err) => {
				if(err) return reject(err);
				resolve(comment);
			});
		});
	});
}

