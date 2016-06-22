"use strict";


document.addEventListener("DOMContentLoaded", function(event) { 

	$('#new-message-area').on('click','.submit-button', function(e) {
		let $message = $(this).closest('.message-box');
		let newText = $(this).siblings('.message-field').val();
		let post = {};
		post.score = $message.find('.score').text();
		post.text = newText;
		post.id = $message.data('id');
		post.time = $message.find('.time').text();
		let settings = {
			method:"POST",
			data:post,
			success: blah => {addMessageToDOM(blah[0])}
		};
		$.ajax('/posts', settings);
	});

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
		let postToChange = e.target.parentNode.parentNode.parentNode;
		let post = {};
		post.text = e.target.parentNode.parentNode.childNodes[1].innerText;
		post.score = e.target.parentNode.childNodes[1].innerText - 1;
		post.id = postToChange.dataset.id;
		let settings = {
			method:"PUT",
			data: post,
			success:() => {e.target.parentNode.childNodes[1].innerText = post.score}
		}
		$.ajax('/posts', settings);
	});

	$('#message-area').on('click','.delete-button', function(e) {
		//  native js practice
		let post = {};
		let postToDelete = e.target.parentNode.parentNode.parentNode;
		post.id = postToDelete.dataset.id;
		let settings = {
			method:"DELETE",
			data: post,
			success:() => { postToDelete.remove(); }
		};
		$.ajax('/posts', settings);
	});

	// OK enough vanilla
	$('#message-area').on('click','.edit-button', function(e) {
		$(this).closest('.message').css("display","none");
		$(this).closest('.message-box').find('.edit-box').css("display","block");
	});

	$('#message-area').on('click','.edit-cancel-button', function(e) {
		$(this).closest('.edit-box').css("display","none");
		$(this).closest('.message-box').find('.message').css("display","flex");
	});

	$('#message-area').on('click','.edit-save-button', function(e) {
		let $message = $(this).closest('.message-box');
		let newText = $(this).siblings('.edit-message-field').val();
		let post = {};
		post.score = $message.find('.score').text();
		post.text = newText;
		post.id = $message.data('id');
		post.time = $message.find('.time').text();
		let settings = {
			method:"PUT",
			data:post,
			success: () => {
				$message.find('.text').text(newText);
				$message.find('.message').css("display","flex");
				$(this).parent().css("display","none");
			}
		};
		$.ajax('/posts', settings);
	});

});

function addMessageToDOM(post){
	let $elToAdd = $('.message-box.template').clone();
	$elToAdd.removeClass('template');
	$elToAdd.attr('data-id',post.id);
	$elToAdd.find('.text').text(post.text);
	$elToAdd.find('.time').text(moment(post.createdAt).format('LLL'));
	$elToAdd.find('.score').text(post.score);
	$('#message-area').append($elToAdd);
}




