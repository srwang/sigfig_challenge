var urls = [
	"img/1.png", 
	"img/2.png", 
	"img/3.png", 
	"img/4.png", 
	"img/5.png", 
	"img/6.png", 
	"img/7.png", 
	"img/8.png", 
	"img/9.png", 
	"img/10.png"
];

//creating imgs
var body = document.querySelector('body');

urls.forEach(function(url){
	var figure = document.createElement('figure'),
		img = document.createElement('img'),
		coverUp = document.createElement('div');

	img.setAttribute('src', url);

	//create draggable transculent cover to attach icon
	coverUp.setAttribute('class', 'coverup');
	coverUp.setAttribute('draggable', 'true');
	coverUp.setAttribute('droppable', 'true');

	figure.appendChild(img);
	figure.appendChild(coverUp);

	body.appendChild(figure);
});

//drag functions

(function(){
	var dragged,
		placeholder;

	document.addEventListener('dragstart', function(ev) {
		var img = ev.target.parentNode.querySelector('img');
		//set coverup drag icon to look like image
		var imgClone = img.cloneNode(true);
		ev.dataTransfer.setDragImage(imgClone, 50, 100);

		dragged = ev.target.parentNode;
		//take img out of page flow
		setTimeout(function(){
			dragged.setAttribute('class', 'dragged');
		}, 10);

	}, false);

	document.addEventListener('dragend', function(ev) {
		//revert image if it's not dropped
		ev.target.parentNode.removeAttribute('class');
	}, false);

	document.addEventListener("dragover", function(ev) {
		// prevent default to allow drop
		ev.preventDefault();
	}, false);

	document.addEventListener('dragenter', function(ev) {

		if (ev.target.parentNode.className !== 'placeholder' && ev.target.parentNode !== dragged && ev.target.className === 'coverup') {
			console.log('entering', ev.target)

			ev.target.style.border = '5px solid blue';

			var placeholderEnter = dragged.cloneNode(true);
			placeholderEnter.className = 'placeholder';

			body.insertBefore(placeholderEnter, ev.target.parentNode.nextSibling);

			placeholder = placeholderEnter;
		} 
	}, false);

	document.addEventListener('dragleave', function(ev) {

		console.log('leaving');

		ev.target.style.border = 'none';

		if (placeholder.parentNode) {

			console.log('removing');
			placeholder.parentNode.removeChild(placeholder);
		}
	}, false);

	document.addEventListener('drop', function(ev){
		//ev.preventDefault();

		var placeholderDrop = document.querySelector('.placeholder');

		if (placeholderDrop) {
			dragged.parentNode.removeChild(dragged);
			placeholderDrop.removeAttribute('class');
		} else {
			//show original image
			dragged.removeAttribute('class');
		}
	}, false);

})();


//drag 
	//attach img icon
	//attached 'drag' class to original
//d

//attach drag styles as classes 


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
