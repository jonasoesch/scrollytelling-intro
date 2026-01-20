const main = document.querySelector("main")
const scrolly = main.querySelector("#scrolly")
const figure = scrolly.querySelector("figure")

// ------------
// initialize the scrollama
// More about it here: https://pudding.cool/process/introducing-scrollama/
// ------------
const scroller = scrollama();


function sketch(p) {      // Konfiguration:
	p.setup = function(){
	  p.createCanvas(600, 600);
	  p.noLoop()
	}

	p.redraw = function(position, number) {
		p.clear()
		p.background("rgba(0,0,0,0.2)") // Den grauen Hintergrund zeichnen
		p.ellipse(position, position, 20, 20) // Weissen Kreis darauf
		p.text(number, position-3, position+4) // Text mit der Nummer des aktuellen Steps
	}
  };

const p = new p5(sketch, 'sticky'); // Neues P5-Canvas im Element mit der ID "sticky"


function handleStepEnter(response) { 
    console.log("Step", response.index, "entered the stage. The direction is", response.direction)
}

function handleStepExit(response) {
    console.log("Step", response.index, "exited the stage. The direction is", response.direction)
}

function handleStepProgress(response) {
    console.log("Step", response.index, ":", response.progress*100, "%")
	p.redraw(response.progress*600, response.index) // Hier wird die p5 aufgerufen, das den Kreis neu zeichnet.
}


// generic window resize listener event
function handleResize() {
	// 1. update height of step elements
	const figureHeight = window.innerHeight / 1.2;
	const figureMarginTop = (window.innerHeight - figureHeight) / 1.5;

	if (figure) {
		figure.style.height = figureHeight + "px"
		figure.style.top = figureMarginTop + "px"
	}

	// 2. tell scrollama to update new element dimensions
	scroller.resize();
}

function init() {
	if (!scrolly) {
		return
	}

	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
	handleResize();

	// 2. setup the scroller passing options
	// 		this will also initialize trigger observations
	// 3. bind scrollama event handlers (this can be chained like below)
	scroller
		.setup({
			step: "#scrolly article .step",
			offset: 0.8, // Die Textboxen sollen 0.8-Bildschirmhöhen Abstand haben
            progress: true,
			debug: false
		})
		.onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit)
        .onStepProgress(handleStepProgress)
}

// kick things off
init();
