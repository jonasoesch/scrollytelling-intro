var main = d3.select("main");
		var scrolly = main.select("#scrolly");
		var figure = scrolly.select("figure");
		var article = scrolly.select("article");
		var step = article.selectAll(".step");

		// initialize the scrollama
		var scroller = scrollama();


		function handleStepEnter(response) {

			p.redraw = function(position) {
				p.clear()
				p.background("rgba(0,0,0,0.2)")
				p.ellipse(position, position, 20, 20)
				p.text(response.index, position-3, position+4)
			}

            // Little message
            console.log("Step", response.index, "entered the stage. The direction is", response.direction)
		}

        function handleStepExit(response) {
            // Little message
            console.log("Step", response.index, "exited the stage. The direction is", response.direction)
        }

        function handleStepProgress(response) {
            console.log("Step", response.index, ":", response.progress*100, "%")
			p.redraw(response.progress*400)
        }


        // generic window resize listener event
		function handleResize() {
			// 1. update height of step elements
			var figureHeight = window.innerHeight / 1.2;
			var figureMarginTop = (window.innerHeight - figureHeight) / 1.5;

			figure
				.style("height", figureHeight + "px")
				.style("top", figureMarginTop + "px");

			// 2. tell scrollama to update new element dimensions
			scroller.resize();
		}

		function init() {
			// 1. force a resize on load to ensure proper dimensions are sent to scrollama
			handleResize();

			// 2. setup the scroller passing options
			// 		this will also initialize trigger observations
			// 3. bind scrollama event handlers (this can be chained like below)
			scroller
				.setup({
					step: "#scrolly article .step",
					offset: 0.8,
                    progress: true,
					debug: false
				})
				.onStepEnter(handleStepEnter)
                .onStepExit(handleStepExit)
                .onStepProgress(handleStepProgress)
		}

		// kick things off
		init();

		function sketch(p) {
			p.setup = function(){
			  p.createCanvas(400, 400);
			  p.noLoop()
			}

		  };
		  let p = new p5(sketch, 'sticky');