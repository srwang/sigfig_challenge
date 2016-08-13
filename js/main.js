var urls = ["img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png", "img/7.png", "img/8.png", "img/9.png", "img/10.png"];

var body = document.querySelector('body');

urls.forEach(function(url){
	var figure = document.createElement('figure'),
		img = document.createElement('img'),
		placeholderDiv = document.createElement('div');


	img.setAttribute('src', url);
	placeholderDiv.setAttribute('class', 'placeholder');

	figure.appendChild(img);
	figure.appendChild(placeholderDiv);

	body.appendChild(figure);
})


document.addEventListener('dragstart', function(ev) {
	dragged = ev.target.parentNode;
	console.log(dragged)
	ev.target.style.opacity = .5;
}, false);

document.addEventListener('dragend', function(ev) {
	ev.target.style.opacity = '';
}, false);

document.addEventListener('dragover', function( event ) {
	// prevent default to allow drop
	event.preventDefault();
}, false);

document.addEventListener('dragenter', function(ev) {

	if(ev.target.className == 'placeholder') {
		ev.target.style['background-color'] = 'blue';
	}
}, false);

document.addEventListener('dragleave', function(ev) {
	ev.target.style['background-color'] = 'none';
}, false);

document.addEventListener('drop', function(ev){
	ev.preventDefault();

	if(ev.target.className == 'placeholder') {
		ev.target.style['background-color'] = 'none';
		dragged.parentNode.removeChild(dragged);
		body.insertBefore(dragged, ev.target.parentNode.nextSibling);
	}
}, false);


//add xhr call
//add divs (figure?) to the images
	//set image height and max-width
//change so that image goes between...
//make only images draggable?

//refactor



// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'js/images.json');
// xhr.send(null);

// xhr.onreadystatechange = function () {
// 	if (xhr.readyState === 4) {
// 		if (xhr.status === 200) {
// 			var urls = Json.parse(xhr.responseText).images; 

// 			debugger
// 			urls.forEach(function(url){
// 				$('body').append('<figure><img src="' + url + '"></img></figure>')
// 			});
// 		} else {
// 			console.log('Error: ' + xhr.status); 
// 		}
// 	}
// }
