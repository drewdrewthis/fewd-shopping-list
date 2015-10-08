$(document).ready(function() {

// Create starter list array

var newItem = $('input').val(),
	newItemString = "",
	htmlString = "",
	C = "",
	I = "",
	N = "",
	items = [
		{
			"name" : "Finished!",
			"class" : "finished"
		}
	],
	itemCount = items.length-1;

// Class = C, Index = I, Name = N
// Uncaught SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outside strict mode

function createItemString( C, I, N) {
	
	htmlString = '<li class="item ' + C + '" value="' + I + '">\
					<span class="item-btn"></span>\
					<i class="fa fa-exclamation"></i>\
					<span class="item-name">' + N + '</span>\
					<i class="fa fa-angle-down"></i>\
					<div class="controls">\
						<button class="important">IMPORTANT!</button>\
						<button class="delete">DELETE</button>\
					</div>\
				</li>';
	
	return htmlString;
};

function makeList() { 
	$.each(items, function (index,value) {
		console.log( index + ": " + value );

		C = items[index].class,
		I = index,
		N = items[index].name;

		$('#item-list').append( createItemString( C,I,N ) );
	});

	$('.item-count').text(itemCount);
}

function checkCount() {
	$('.item-count').text(itemCount);
	if(itemCount >= 10)
		$('.item-count').css({'font-size':'2em'});
	else {
		$('.item-count').css({'font-size':'4em'});
		if(itemCount == 1)
			$('.count-words').text("item left");
		else
			$('.count-words').text("items left");
	};
};

// Add New Items on Submit

$('#item-form').submit(function(e) {
	
	e.preventDefault();
	$('.container ol').css({"display":"block"});

	newItem = $('input').val(),
	newItemString = "";

	if(!newItem) {
		alert("Oops! You didn't write anything!");
	}
	else {
		items.push( { "name " : newItem, "class" : "" } );

		newItemString = createItemString("",0,newItem);

		console.log(items);

		$('#item-list').prepend(newItemString);
		itemCount++;
	}

	checkCount();
	this.reset();
});

$('#item-list').on('click', '.item-btn', function(e){

	pos = $(this).parents('.item').attr("value");
	items.splice(pos, 1);
	if($(this).parent().prevAll('.finished').length == 0) {		
		$(this).parent().insertAfter('.finished').toggleClass('done');
		itemCount--;
		checkCount();
	}
	else {
		$(this).parent().insertBefore('.finished').toggleClass('done');
		itemCount++;
		checkCount();
	}
  // fires when any LIs are clicked on
  // including LIs that aren't on the page when it is initially loaded
})
.on('click', '.fa-angle-down', function(e){
	$(this).parent().toggleClass('editing');
})
.on('click', '.important', function(e){
	$(this).toggleClass('clicked');
	$(this).parents('.item').children('.fa-exclamation').toggle();
})
.on('click', '.delete', function(e){
	pos = $(this).parents('.item').attr("value");
	items.splice(pos, 1);
	$(this).parents('.item').fadeOut("slow", function() {
		$(this).remove();
	});
	if($(this).parent().parent('.done').length == 0)
		itemCount--;
	checkCount();
})

makeList();
});