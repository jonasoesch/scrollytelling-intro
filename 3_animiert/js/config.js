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
		
		// Animated rainbow gradient
		p.colorMode(p.HSB, 360, 100, 100);
		for (let i = 0; i < 600; i++) {
			let hue = (i / 600 * 360 + position * 0.6) % 360;
			p.stroke(hue, 50, 95);
			p.line(0, i, 600, i);
		}
		
		p.colorMode(p.RGB, 255);
		p.noStroke();
		p.fill(255);
		p.ellipse(position, position, 20, 20) // Erster Kreis (oben links nach unten rechts)
		p.fill(0);
		p.text(number, position-3, position+4) // Text mit der Nummer des aktuellen Steps

		p.fill(255);
		p.ellipse(position, 600 - position, 20, 20) // Zweiter Kreis (unten links nach oben rechts)
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
			step: "#scrolly .step",
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
