
// Sucht die IDs aller Elemente mit der Klasse `scrolly` raus und initialisiert ein Scrollytelling
Array.from(document.querySelectorAll(".scrolly")).forEach(scrolly => {
	init(scrolly.id)
})

function handleStepEnter(response, images, figure) {
	// update graphic based on step
	figure.select("img").attr("src", images[response.index])

	// Little message
	console.log("Step", response.index, "entered the stage. The direction is", response.direction)
}

function handleStepExit(response) {
	// Little message
	console.log("Step", response.index, "exited the stage. The direction is", response.direction)
}


// generic window resize listener event
function handleResize(figure, scroller) {
	// 1. update height of step elements
	var figureHeight = window.innerHeight / 1.2;
	var figureMarginTop = (window.innerHeight - figureHeight) / 1.5;

	figure
		.style("height", figureHeight + "px")
		.style("top", figureMarginTop + "px");

	// 2. tell scrollama to update new element dimensions
	scroller.resize();
}

function init(id) {

	// initialize the scrollama
	let scroller = scrollama();


	// Make a list of all the images shown during the scrolling
	// we get all the `.step`-elements and make a list of image paths from `data-img`
	let images = [... document.querySelectorAll(`#${id} .step`)].map(d => d.getAttribute("data-img"))
	let figure = d3.select(`#${id} .figure`);


	// force a resize on load to ensure proper dimensions are sent to scrollama
	handleResize(figure, scroller);

	scroller
		.setup({
			step: `#${id} .step`,
			offset: 1,
			debug: false
		})
		.onStepEnter((response) => {handleStepEnter(response, images, figure)})
		.onStepExit((response)  => { handleStepExit(response)})
}