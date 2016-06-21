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

exports.create = (text) => {
	return new Promise( (resolve,reject) => {
		db.query('insert into posts values (?,?,?,?)',uuid(),moment().toISOString(), text, 0, (err) => {
			if(err)return reject(err);
			// try with all, or without limit  
			db.query('select * from posts order by timeCreated desc limit 1', (err, post) => { 
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
		db.query('update posts set text = ?, score = ? where id = ?',newMessage.text, newMessage.score, newMessage.id, (err) => {
			if(err)return reject(err);
			db.query('select * from posts where id = ?',newMessage.id, (err, post) => { 
				if(err) return reject(err);
				resolve(post);
			});
		});
	});
}

