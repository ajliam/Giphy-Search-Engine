document.querySelector(".js-go").addEventListener('click', function() {
	let inputValue = document.querySelector('.js-userinput').value;
		let userInput = getUserInput();
	searchGiphy( userInput );

});

document.querySelector('.js-userinput').addEventListener('keyup', function (e) {
	if (e.which === 13) {
 		let userInput = getUserInput();
 		searchGiphy( userInput );
    }
});

function getUserInput() {
	const inputValue = document.querySelector('.js-userinput').value;

	return inputValue;
}


function searchGiphy( searchQuery ) {
	const url = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + searchQuery;

	// AJAX Request
	let GiphyAJAXCall = new XMLHttpRequest();
	GiphyAJAXCall.open( 'GET', url );
	GiphyAJAXCall.send();


	GiphyAJAXCall.addEventListener('load', function( data ) {

			const actualData = data.target.response;
			pushToDOM(actualData);
			console.log(actualData);
		
	});

}

function pushToDOM( response ) {
	// turn response into real javascript object
	response = JSON.parse( response );
	// drill down to the data array
	const images = response.data;

	// find the container to hold this stuff in DOM
	const container = document.querySelector('.js-container');
	// clear it of old content since this function will be used on every search
	// we want to reset the div
	container.innerHTML = "";

	// loop through data array and add IMG html
	images.forEach(function(image){
		// find img src
		let src = image.images.fixed_height.url;

		// concatenate a new IMG tag
		container.innerHTML += "<img src='"+ src +"' class='container-image' />";
	});
}