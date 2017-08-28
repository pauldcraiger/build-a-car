//	main.js

//	global variables and arrays

//	model and base price
var vehicleOptions = [
	{choice: 'cadenza', price: 35000},
	{choice: 'forte', price: 20000},
	{choice: 'optima', price: 29050},
	{choice: 'sedona', price: 38650},
	{choice: 'soul', price: 42200}
];

//	color options and price
var colorOptions = [
	{choice: 'black', price: 50},
	{choice: 'white', price: 100},
	{choice: 'silver', price: 250}
];

//	available options and price
var packageOptions = [
	{choice: 'Rear Camera', price: 150},
	{choice: 'LED Positioning Light', price: 150},
	{choice: 'Rear Camera and LED Positioning Light', price: 200}
];

//	current model build, includes model, color and options
var currentBuild = {
	vehicle: {model: 'Not Specified', price: 0},
	color: {color: 'Not Specified', price: 0},
	option: {option: 'Not Specified', price: 0}
};

$(document).ready(function() {

	//	listen for tab click event
	$('ul.nav-tabs li').on('click', function() {

		var tab = $(this).attr('data-tab');

		//	remove active class from tabs
		$('ul.nav-tabs li').removeClass('active');

		//	add active class to the clicked tab (this)
		$(this).addClass('active');

		//	reset the tab's display area to blank
		$('#options-display').html('');

		//	render display
		renderDisplay(tab);

	});

	//	listen for vehicle tab click event
	$('#options-display').on('click', '.vehicle-option', function() {

		//	which vehicle was selected?
		var vehicle = $(this).attr('data-option');
		var price = $(this).attr('data-price');
		var imgSrc = "assets/" + vehicle + ".jpg";

		//	display vehicle image
		$("img.vehicle-display").attr("src", imgSrc);

		//	update model of current build 
		currentBuild.vehicle.model = vehicle;
		currentBuild.vehicle.price = price;

		//	update running cost
		currentBuildCost();

	});

	//	listen for color click event
	$('#options-display').on('click', '.color-option', function() {
		
		//	which color was selected?
		var color = $(this).attr('data-option');
		var price = $(this).attr('data-price');

		// current model selected, needed to select image
		var vehicle = currentBuild.vehicle.model;

		// update build color and color price
		currentBuild.color.color = color;
		currentBuild.color.price = price;

		//  use appropriate image
		var imgSrc = "assets/" + vehicle + "-" + color + ".jpg";

		//	display vehicle image
		$("img.vehicle-display").attr("src", imgSrc);

		//	update running cost
		currentBuildCost();
		
	});

	//	listen for packages click event
	$('#options-display').on('click', '.package-option', function() {
		
		//	which package was selected?
		var option = $(this).attr('data-option');
		var price = $(this).attr('data-price');

		// current model selected
		var vehicle = currentBuild.vehicle.model;

		// update current build color and color price
		currentBuild.option.option = option;
		currentBuild.option.price = price;

		//	update running cost
		currentBuildCost();
		
	});

});

function currentBuildCost() {
	//	convert strings to numbers
	var modelPrice = Number(currentBuild.vehicle.price);
	var colorPrice = Number(currentBuild.color.price);
	var optionPrice = Number(currentBuild.option.price);

	var totalCost = modelPrice + colorPrice + optionPrice;

	//	format displayed cost
	var displayCost = "$" + totalCost.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	
	$('.cost-display').text(displayCost);
}

function renderDisplay(tab) {

	var source = "";
	var sourceString = "";
	var html = "";
	var feature = "";
	var price = 0;
	var model = "";
	var modelPrice = 0;
	var color = "";
	var colorPrice = 0;
	var option = "";
	var optionPrice = 0;
	var template = "";
	var content = "";
	var useArray;
	
	//	based on the clicked tab
	//		specify the handlebar template
	//		specify the data array to use
	//			vehicles
	//			colors
	//			packages

	switch (tab) {
		case "vehicle":
			sourceString = $('#vehicle-options-template').html();
			workingArray = vehicleOptions;
			break;
		case "color":
			sourceString = $('#color-options-template').html();
			workingArray = colorOptions;
			break;
		case "package":
			sourceString = $('#package-options-template').html();
			workingArray = packageOptions;
			break;
		case "summary":
			sourceString = $('#summary-options-template').html();
			workingArray = currentBuild;
			break;
		default:
			sourceString = $('#vehicle-options-template').html();
			workingArray = vehicleOptions;
	};

	//	needed for handlebars.js to work
	source = sourceString;
	template = Handlebars.compile(source);

	if (tab === 'summary') {
		
		model = currentBuild.vehicle.model;
		modelPrice = Number(currentBuild.vehicle.price);
		modelPrice = modelPrice.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		color = currentBuild.color.color;
		colorPrice = currentBuild.color.price;
		option = currentBuild.option.option;
		optionPrice = currentBuild.option.price;

		content = {model:model, modelPrice:modelPrice, color:color, colorPrice:colorPrice, option:option, optionPrice:optionPrice}; 
		$("#options-display").append(template(content));

	} else {
		//	loop through the correct array and output the html
		for (var i = 0; i < workingArray.length; i++) {
			feature = workingArray[i].choice;
			price = workingArray[i].price;
			content = {feature:feature, price:price};
			$("#options-display").append(template(content));
		}	
	}
};

renderDisplay();