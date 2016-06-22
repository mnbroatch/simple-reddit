"use strict;"

let uuid = require('uuid');
let moment = require('moment');
let db = require('../config/db');

exports.retrieveAll = () => {
	return new Promise( (resolve,reject) => {
		db.query('select * from posts', (err, posts) => {
			if(err) return reject(err); 
			resolve(posts);
		});
	});
}

exports.createPost = (text) => {
	return new Promise( (resolve,reject) => {
		let postToAdd = {
			id:uuid(),
			createdAt:moment().toISOString(),
			text:text,
			score:0
		};
		db.query('insert into posts set ?',postToAdd, (err) => {
			if(err)return reject(err);
			db.query('select * from posts order by createdAt desc limit 1', (err, post) => { 
				if(err) return reject(err);
				resolve(post);
			});
		});
	});
}

exports.delete = id => {
	return new Promise( (resolve,reject) => {
		db.query('select * from posts where id = ?', id, (err,post) => {
			if(err) return reject(err); 
			db.query('delete from posts where id = ?',id, (err) => {
				if(err) return reject(err);
				resolve(post);
			});
		});
	});
}

exports.update = (newMessage) => {
	return new Promise( (resolve,reject) => {
		db.query('update posts set text=?, score=? where id=?',[newMessage.text, newMessage.score, newMessage.id], (err) => {
			if(err)return reject(err);
			db.query('select * from posts where id = ?',newMessage.id, (err, post) => { 
				if(err) return reject(err);
				resolve(post);
			});
		});
	});
}

