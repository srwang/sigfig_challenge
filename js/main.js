var images = [
	{url: "img/1.png"}, 
	{url: "img/2.png"}, 
	{url: "img/3.png"}, 
	{url: "img/4.png"}, 
	{url: "img/5.png"}, 
	{url: "img/6.png"},  
	{url: "img/7.png"},  
	{url: "img/8.png"}, 
	{url: "img/9.png"}, 
	{url: "img/10.png"}
];

var body = document.querySelector('body');

//creating imgs
images.forEach(function(image){
	var figure = document.createElement('figure'),
		img = document.createElement('img'),
		coverUp = document.createElement('div');

	img.setAttribute('src', image.url);

	//create draggable transculent cover 
	coverUp.setAttribute('class', 'coverup');
	coverUp.setAttribute('draggable', 'true');
	coverUp.setAttribute('droppable', 'true');

	//figure to bundle img and cover
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
		//take actual img out of page flow
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

		var existingHolder = document.querySelector('.placeholder');

		//prevent from generating several placeholders
		if (!existingHolder && ev.target.parentNode.className !== 'placeholder' && ev.target.parentNode !== dragged && ev.target.className === 'coverup') {

			placeholder = dragged.cloneNode(true);
			placeholder.className = 'placeholder';

			setTimeout(function(){//prevent from immediately triggering dragleave
				body.insertBefore(placeholder, ev.target.parentNode.nextSibling);
			}, 10)
		} 
	}, false);

	document.addEventListener('dragleave', function(ev) {

		if (placeholder.parentNode) {//if currently appended
			placeholder.parentNode.removeChild(placeholder);
		}
	}, false);

	document.addEventListener('drop', function(ev){

		if (placeholder.parentNode) { 
			dragged.parentNode.removeChild(dragged);
			placeholder.removeAttribute('class');
		} else {//show original image
			dragged.removeAttribute('class');
		}
	}, false);

})();

//set placeholder to add when event on body, not specific image?




