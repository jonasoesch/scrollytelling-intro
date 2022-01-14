var main = d3.select("main");
		var scrolly = main.select("#scrolly");
		var figure = scrolly.select("figure");
		var article = scrolly.select("article");
		var step = article.selectAll(".step");

        // Make a list of all the images shown during the scrolling
        const images = [... document.querySelectorAll(".step")].map(d => d.getAttribute("data-img"))

		// initialize the scrollama
		var scroller = scrollama();


		function handleStepEnter(response) {
			// update graphic based on step
			figure.select("img").attr("src", images[response.index])

            // Little message
            console.log("Step", response.index, "entered the stage. The direction is", response.direction)
		}

        function handleStepExit(response) {
            // Little message
            console.log("Step", response.index, "exited the stage. The direction is", response.direction)
        }

        function handleStepProgress(response) {
            console.log("Step", response.index, ":", response.progress*100, "%")
			// Animate the circle-element in the SVG
            d3.select(".animated circle").attr("cx", response.progress*370+20)
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