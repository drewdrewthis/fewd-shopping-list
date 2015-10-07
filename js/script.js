$(document).ready(function() {

// Create starter list array

var items = [
	{
		"name" : "Item 1",
		"class" : ""
	},
	{
		"name" : "Item 2",
		"class" : "editing"
	},
	{
		"name" : "Finished!",
		"class" : "finished"
	},
	{
		"name" : "Item 3",
		"class" : "done"
	}
];

// Class = C, Index = I, Name = N
// Uncaught SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outside strict mode

function createItemString( C, I, N) {
	
	var htmlString = '<li class="item ' + C + '" value="' + I + '"><span class="item-btn"></span>' + N + '<i class="fa fa-angle-down"></i></li>';
	
	return htmlString;
};

function makeList() { 
	$.each(items, function (index,value) {
	console.log( index + ": " + value );
	/*$.each(items[index],function(key,value) {
		console.log( key + ": " + value );
	});*/

	var C = items[index].class,
		I = index,
		N = items[index].name;

	$('#item-list').append( createItemString( C,I,N ) );
	});
}


// Add New Items on Submit

$('#item-form').submit(function(e) {
	
	e.preventDefault();

	console.log('Submit!');
	var newItem = "",
		newItemString = "";

	newItem = $('input').val();

	if(!newItem) {
		alert("Oops! You didn't write anything!");
	}
	else {
		items.push( { "name " : newItem, "class" : "" } );

		newItemString = createItemString("",0,newItem);

		console.log(items);

		$('#item-list').prepend(newItemString);
	}
});

$('li').click( function() {
	alert("yas");
});



// Mark Items as Done

// Mark Items as Not Done

// Mark Itesm as Important

// Delete Items

makeList();
});