"use strict";


document.addEventListener("DOMContentLoaded", function(event) { 

	$('#comment-area').on('click','.delete-button', function(e) {
		//  native js practice
		let comment = {};
		let commentToDelete = e.target.parentNode.parentNode.parentNode;
		comment.id = commentToDelete.dataset.id;
		let settings = {
			method:"DELETE",
			data: comment,
			success:() => { commentToDelete.remove(); }
		};
		$.ajax('/comments', settings);
	});

	// OK enough vanilla
	$('#comment-area').on('click','.edit-button', function(e) {
		$(this).closest('.comment').css("display","none");
		$(this).closest('.comment-box').find('.edit-box').css("display","block");
	});

	$('#comment-area').on('click','.edit-cancel-button', function(e) {
		$(this).closest('.edit-box').css("display","none");
		$(this).closest('.comment-box').find('.comment').css("display","flex");
	});

	$('#comment-area').on('click','.edit-save-button', function(e) {
		let $comment = $(this).closest('.comment-box');
		let newText = $(this).siblings('.edit-comment-field').val();
		let comment = {};
		comment.postId = $('body').find('.message-box').data('id');
		comment.text = newText;
		comment.id = $comment.data('id');
		comment.time = $comment.find('.time').text();
		console.log(comment);
		let settings = {
			method:"PUT",
			data:comment,
			success: () => {
				$comment.find('.text').text(newText);
				$comment.find('.comment').css("display","flex");
				$(this).parent().css("display","none");
			}
		};
		$.ajax('/comments', settings);
	});

});

function addMessageToDOM(comment){
	let $elToAdd = $('.comment-box.template').clone();
	$elToAdd.removeClass('template');
	$elToAdd.attr('data-id',comment.id);
	$elToAdd.find('.text').text(comment.text);
	$elToAdd.find('.time').text(moment(comment.createdAt).format('LLL'));
	$elToAdd.find('.score').text(comment.score);
	$('#comment-area').append($elToAdd);
}





