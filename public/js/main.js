"use strict";


document.addEventListener("DOMContentLoaded", function(event) { 

	$('#message-area').on('click','.up-arrow', function(e) {
		//  native js practice
		let post = {};
		let postToChange = e.target.parentNode.parentNode.parentNode;
		post.text = e.target.parentNode.parentNode.childNodes[1].innerText;
		post.score = +e.target.parentNode.childNodes[1].innerText + 1;
		post.id = postToChange.dataset.id;
		post.time = moment(postToChange.childNodes[0].innerText).toISOString();
		let settings = {
			method:"PUT",
			data: post,
			success:() => {e.target.parentNode.childNodes[1].innerText = post.score}
		}
		$.ajax('/posts', settings);
	});

	$('#message-area').on('click','.down-arrow', function(e) {
		//  native js practice
		let post = {};
		let postToChange = e.target.parentNode.parentNode.parentNode;
		post.text = e.target.parentNode.parentNode.childNodes[1].innerText;
		post.score = e.target.parentNode.childNodes[1].innerText - 1;
		post.id = postToChange.dataset.id;
		post.time = postToChange.childNodes[0].innerText;
		let settings = {
			method:"PUT",
			data: post,
			success:() => {e.target.parentNode.childNodes[1].innerText = post.score}
		}
		$.ajax('/posts', settings);
	});

});

